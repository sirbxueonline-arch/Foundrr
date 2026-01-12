import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { TEMPLATES } from '@/lib/generator-templates'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const maxDuration = 300
export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch { }
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prompt, style = 'minimal', lang = 'en' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    // Generate a secure ID immediately
    const siteId = Math.random().toString(36).substring(2, 9)
    const fileName = `${user.id}/${siteId}/index.html`

    const systemPrompt = `
    You are an expert Frontend Architect.
    
    GOAL: Build a single-file HTML website using Tailwind CSS based on the user's prompt.
    
    STRICT RULES:
    1.  **Output**: Return ONLY the raw HTML code. Do not wrap in markdown \`\`\`.
    2.  **Tech Stack**: HTML5, Tailwind CSS (CDN), FontAwesome (CDN), Google Fonts.
    3.  **Language**: All visible text MUST be in ${lang === 'az' ? 'Azerbaijani' : 'English'}.
    4.  **Images**: Use \`/api/images/proxy?query=KEYWORD\` for ALL images. Do not use Unsplash links directly.
    5.  **Multi-Page Hooks**: The Navbar MUST have links to \`/about\`, \`/contact\`, even if they don't exist yet.
    
    COMPONENTS TO USE (Adapt text/colors to the prompt "${prompt}" and style "${style}"):
    
    - Use this for Navbar:
    ${TEMPLATES.NAVBAR}
    
    - Use this for PRO HERO (If style is Dark/Cyberpunk/Corporate):
    ${TEMPLATES.HERO_DARK}
    
    - Use this for MODERN HERO (If style is Minimal/Vibrant/Luxury):
    ${TEMPLATES.HERO_MODERN}
    
    - Use this for FEATURES (Bento Grid is mandatory):
    ${TEMPLATES.BENTO_GRID}
    
    - Use this for FOOTER:
    ${TEMPLATES.FOOTER}
    
    STRUCTURE:
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
      <script>
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
              },
              colors: {
                primary: '${style === 'vibrant' ? '#4f46e5' : style === 'retro' ? '#be185d' : '#18181b'}',
              }
            }
          }
        }
      </script>
    </head>
    <body class="font-sans antialiased">
    
    <!-- YOUR CONTENT HERE -->
    
    </body>
    </html>
    `

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Build a website for: ${prompt}. Style: ${style}.` },
            ],
            stream: true,
          })

          let fullHtml = ''

          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              fullHtml += content
              // Stream to client
              controller.enqueue(encoder.encode(content))
            }
          }

          // CLEANUP & SAVE (After stream finishes)
          // We need to clean markdown if present (though system prompt says no)
          const cleanHtml = fullHtml.replace(/```html/g, '').replace(/```/g, '').trim()

          // Save to Storage
          await supabase.storage
            .from('websites')
            .upload(fileName, cleanHtml, {
              contentType: 'text/html',
              upsert: true,
            })

          // Save to DB
          await supabase.from('websites').insert({
            id: siteId,
            user_id: user.id,
            html_path: fileName,
            paid: false,
            name: prompt.substring(0, 30) || 'Untitled Project',
            created_at: new Date().toISOString(),
          })

          // Send a special "end of stream" marker with the site ID so client knows where to redirect
          const metaInfo = JSON.stringify({ siteId })
          controller.enqueue(encoder.encode(`\n<!-- SITE_ID:${siteId} -->`))

          controller.close()
        } catch (err) {
          console.error('Stream Error:', err)
          controller.error(err)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })

  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}

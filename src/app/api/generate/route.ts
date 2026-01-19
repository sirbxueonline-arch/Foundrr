import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { TEMPLATES } from '@/lib/generator-templates'

// Initialize lazily
export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
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

    const { prompt, style = 'minimal', lang = 'en', primaryColor = '', pages = [] } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    // Generate a secure ID immediately
    const siteId = Math.random().toString(36).substring(2, 9)
    const fileName = `${user.id}/${siteId}/index.html`

    const systemPrompt = `
    You are an expert Frontend Architect and UI/UX Designer.
    
    GOAL: Build a high-performance, WORLD-CLASS Single Page Application (SPA) using Tailwind CSS.
    
    STRICT RULES:
    1.  **Output**: Return ONLY the raw HTML code. Do not wrap in markdown \`\`\`.
    2.  **Tech Stack**: HTML5, Tailwind CSS (CDN), FontAwesome (CDN), Google Fonts, AOS (Animate On Scroll).
    3.  **Language**: All visible text MUST be in ${lang === 'az' ? 'Azerbaijani' : 'English'}.
    4.  **SEO (CRITICAL)**: You MUST include the following in the <head>:
        - <title>Catchy Title | Brand</title>
        - <meta name="description" content="Engaging 160 char description...">
    5.  **Images**: Use \`/api/images/proxy?query=KEYWORD\` for ALL images. Choose highly relevant, specific keywords.
        - NEVER use generic keywords like "business" or "office". Use "minimalist scandinavian office" or "modern SaaS dashboard".
    6.  **Design**: MUST be premium, modern, and "WOW".
        - **Visuals**: Use glassmorphism (bg-white/80 backdrop-blur-md), smooth gradients, and subtle shadows (shadow-xl).
        - **Typography**: Use "Outfit" for headings (font-heading) and "Inter" for body (font-sans).
        - **Spacing**: Use generous whitespace (py-32, gap-12, px-8). NEVER create cramped layouts.
        - **Colors**: NEVER use default Tailwind colors like 'bg-blue-500'. Use specific, sophisticated shades (e.g., 'bg-indigo-600', 'text-slate-800', 'bg-slate-50').
        - **Radii**: Use \`rounded-2xl\` or \`rounded-3xl\` for all cards and buttons.
        - **Animations**: heavily utilize AOS attributes (data-aos="fade-up", data-aos-delay="100") on EVERY section and major element.
    
    7. **Copywriting**:
        - NEVER use "Lorem Ipsum" or generic placeholders like "Feature 1" or "Brand Name".
        - Write CREATIVE, MARKETING-ORIENTED copy based on the prompt "${prompt}".
        - If the prompt is "Coffee Shop", the Hero title should be "Sip the Extraordinary", not "Welcome to our Coffee Shop".
        - Be concise and punchy.

    COMPONENT SELECTION:
    Analyze the user's prompt "${prompt}" and choose the best sections.
    
    1. **Navbar**: Always use this (Contains navigation logic). REPLACE 'BRAND_NAME' with a creative name.
    ${TEMPLATES.NAVBAR}
    
    2. **Hero Section** (Pick ONE based on prompt type):
       - If SaaS/Startup/Business -> Use HERO_SAAS
         ${TEMPLATES.HERO_SAAS}
       - If Portfolio/Creative/Art or user asks for "Creative" -> Use HERO_CREATIVE
         ${TEMPLATES.HERO_CREATIVE}
       - If style is 'dark' or user asks for "Dark Mode" -> Use HERO_DARK
         ${TEMPLATES.HERO_DARK}
       - If style is 'neobrutal' -> Use HERO_NEOBRUTAL
         ${TEMPLATES.HERO_NEOBRUTAL}
       - If style is 'retro' -> Use HERO_RETRO
         ${TEMPLATES.HERO_RETRO}
       - If style is 'luxury' -> Use HERO_LUXURY
         ${TEMPLATES.HERO_LUXURY}
       - Else (Default) -> Use HERO_MODERN
         ${TEMPLATES.HERO_MODERN}
    
    3. **Content Sections** (Pick relevant ones based on prompt):
       - If selling a product/service -> Include PRICING:
         ${TEMPLATES.PRICING}
       - If showing work/images -> Include GALLERY:
         ${TEMPLATES.GALLERY}
       - If building trust -> Include TESTIMONIALS:
         ${TEMPLATES.TESTIMONIALS}
       - Always include features -> BENTO_GRID:
         ${TEMPLATES.BENTO_GRID}
       - If requested 'FAQ' -> FAQ:
         ${TEMPLATES.FAQ}
       - If requested 'Team' -> TEAM:
         ${TEMPLATES.TEAM}
       - Always include contact -> CONTACT:
         ${TEMPLATES.CONTACT}

    4. **Extra Pages** (YOU MUST INCLUDE THESE AS HIDDEN SECTIONS):
       - About Page: ${TEMPLATES.PAGE_ABOUT}
       - Login Page: ${TEMPLATES.PAGE_LOGIN}
       - Signup Page: ${TEMPLATES.PAGE_SIGNUP}
       ${(pages || []).includes('Pricing') ? `- Pricing Page: <section id="pricing-page" class="page-section hidden pt-32 pb-12 bg-white dark:bg-slate-900">${TEMPLATES.PRICING}</section>` : ''}
    
    5. **Footer**: Always use this:
    ${TEMPLATES.FOOTER}

    6. **Router Script**: REQUIRED for navigation:
    ${TEMPLATES.JS_ROUTER}
    
    INSTRUCTIONS:
    - **Assemble**: Put all the selected sections into the \`body\`.
    - **Customize**: MODIFY the text, colors, and images in the templates to MATCH the user's request explicitly.
    - **Styles**: 
      - If the user asks for "Dark Mode" or style='dark', add \`bg-slate-950 text-white\` to the body and ensure all components adapt (use dark: classes).
    
    STRUCTURE:
    <!DOCTYPE html>
    <html lang="${lang}" class="${style === 'dark' ? 'dark' : ''}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${prompt}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet">
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
      <script>
        tailwind.config = {
          darkMode: 'class',
          theme: {
            extend: {
                fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['Space Grotesk', 'monospace'],
              },
                colors: {
                primary: '${primaryColor ? primaryColor : style === 'vibrant' ? '#4f46e5' : style === 'corporate' ? '#0f172a' : '#18181b'}',
              },
              animation: {
                'fade-in-down': 'fadeInDown 0.5s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'gradient': 'gradient 8s ease infinite',
              },
              keyframes: {
                fadeInDown: {
                  '0%': { opacity: '0', transform: 'translateY(-10px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
                    '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
                },
              }
            }
          }
        }
      </script>
      <style>
        .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.05); }
        html.dark .glass { background: rgba(15, 23, 42, 0.7); border-bottom: 1px solid rgba(255,255,255,0.05); }
        html { scroll-behavior: smooth; }
        .page-section { transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out; }
        .hidden { display: none !important; }
      </style>
    </head>
    <body class="font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 dark:text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">
    
    <!-- GENERATED SECTIONS GO HERE -->

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
      });
    </script>
    </body>
    </html>
    `

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
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
            price: 49.99, // Force explicit price
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

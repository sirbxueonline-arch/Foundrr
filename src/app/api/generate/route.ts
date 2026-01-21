import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { TEMPLATES, generateNavbarHTML, generateFooterHTML } from '@/lib/generator-templates'
import { APP_CONFIG } from '@/lib/constants'

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

    // Generate Navbar Links
    const standardLinks = ['Home'] // Home is always there
    if (pages.includes('Features')) standardLinks.push('Features')
    if (pages.includes('Pricing')) standardLinks.push('Pricing')
    if (pages.includes('About')) standardLinks.push('About')
    if (pages.includes('Blog')) standardLinks.push('Blog')
    if (pages.includes('Contact')) standardLinks.push('Contact')

    // Detect if this is an architecture/minimal site
    const isArchitectural = prompt.toLowerCase().includes('architecture') || 
                           prompt.toLowerCase().includes('interior') || 
                           prompt.toLowerCase().includes('construction') ||
                           style === 'minimal' || 
                           style === 'elegant';

    // Use Helpers
    const navbarTemplate = generateNavbarHTML(standardLinks, isArchitectural)
    const footerTemplate = generateFooterHTML(pages)

    const systemPrompt = `
    You are an expert React/Tailwind Architect.
    
    GOAL: Build a high-performance, WORLD-CLASS Single Page Application (SPA) using React 18 and Tailwind CSS.
    
    STRICT OUTPUT RULES:
    1.  **Output**: Return ONLY the raw React code for a single functional component named \`App\`.
    2.  **No Markdown**: Do NOT wrap coverage in \`\`\`jsx\` or \`\`\`. Just return the code.
    3.  **Imports**: 
        - DO NOT import \`react\` or \`lucide-react\`. They are available globally.
        - Use \`const { useState, useEffect } = React;\` if needed (but I have already destructured them in the shell, so you can just use \`useState\`).
        - Use icons directly: \`<Camera />\`, \`<Menu />\`. I have destructured common Lucide icons in the shell.
    
    4.  **Language**: All visible text MUST be in ${lang === 'az' ? 'Azerbaijani (Azərbaycan dili)' : 'English'}.
    
    5.  **Design System**:
        - Use Tailwind CSS for all styling.
        - Use \`lucide\` icons for UI elements.
        - **Colors**: Use \`bg-primary\`, \`text-primary-foreground\` etc. variables found in shadcn/ui where possible, or stick to sophisticated palettes (slate/emerald/indigo).
        - **Animations**: Use \`data-aos="fade-up"\` for scroll animations.
    
    6.  **Component Structure (\`App\`)**:
        - Return a SINGLE component \`function App() { ... }\`.
        - Inside, you can define sub-components (Navbar, Hero, Footer) as separate functions BEFORE \`App\`, or keep it monolithic if simple.
        - **Navigation**: Use state for routing. 
          \`const [page, setPage] = useState('home');\`
          Conditional rendering: \`{page === 'home' && <Hero />}\`
    
    7.  **Content Requirements**:
        - **Navbar**: Functional, responsive (use state for mobile menu).
        - **Hero**: Impressive, high-conversion.
        - **Features**: Grid layout.
        - **Pricing**: Pricing cards (Price: ${APP_CONFIG.PRICING.WEBSITE_PRICE}).
        - **Footer**: standard links.
    
    8.  **Images**: Use \`/api/images/proxy?query=KEYWORD\`.
    
    9.  **Persona**: Adopt the persona: ${style}.
    
    GENERATE THE REACT CODE FOR \`App\` NOW.
    `

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Prepare Shell Parts
          const parts = TEMPLATES.REACT_SHELL.split('{{REACT_CODE}}')
          const shellStart = parts[0]
          const shellEnd = parts[1] || ''

          // 1. Send Shell Start
          controller.enqueue(encoder.encode(shellStart))

          const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Build a website for: ${prompt}. Style: ${style}.` },
            ],
            stream: true,
          })

          let reactCodeFull = ''

          // 2. Stream React Code
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              const CLEAN_CONTENT = content.replace(/```jsx/g, '').replace(/```/g, '')
              reactCodeFull += CLEAN_CONTENT
              controller.enqueue(encoder.encode(CLEAN_CONTENT))
            }
          }

          // 3. Send Shell End
          controller.enqueue(encoder.encode(shellEnd))

          // CLEANUP & SAVE
          const cleanReactCode = reactCodeFull.replace(/```jsx/g, '').replace(/```/g, '').trim()
          const finalHtml = shellStart + cleanReactCode + shellEnd

          // Save to Storage
          await supabase.storage
            .from('websites')
            .upload(fileName, finalHtml, {
              contentType: 'text/html',
              upsert: true,
            })

          // Save to DB
          await supabase.from('websites').insert({
            id: siteId,
            user_id: user.id,
            html_path: fileName,
            paid: false,
            price: APP_CONFIG.PRICING.WEBSITE_PRICE,
            name: prompt.substring(0, 30) || 'Untitled Project',
            created_at: new Date().toISOString(),
          })

          // Send a special "end of stream" marker
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

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

    const { prompt, style = 'minimal', lang = 'en', pages = [] } = await request.json()

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
        - <meta name="keywords" content="relevant, keywords, here">
        - <meta property="og:image" content="/api/images/proxy?query=hero keyword">
        - <meta property="og:title" content="...">
        - <meta property="og:type" content="website">
    5.  **Images**: Use \`/api/images/proxy?query=KEYWORD\` for ALL images. Choose highly relevant, specific keywords (not generic).
    5.  **Design**: MUST be premium, modern, and "WOW".
        - **Visuals**: Use glassmorphism (bg-white/10 backdrop-blur-md), smooth gradients, and subtle shadows (shadow-2xl).
        - **Typography**: Use large, bold headings (text-6xl+) with tight tracking (tracking-tighter) and generous line height.
        - **Spacing**: Use generous whitespace (py-32, gap-12, px-8). NEVER create cramped layouts.
        - **Colors**: NEVER use default Tailwind colors like 'bg-blue-500'. Use specific, sophisticated shades (e.g., 'bg-indigo-950', 'text-slate-800', 'bg-emerald-50') or custom hex codes.
        - **Radii**: Use \`rounded-2xl\` or \`rounded-3xl\` for all cards and buttons.
        - **Animations**: heavily utilize AOS attributes (data-aos="fade-up") on EVERY section and major element.
        - **Styles**: 
           - **Neo-Brutalism**: Strict black borders (border-2 border-black), heavy shadowing, vibrant neopop colors.
           - **Luxury**: Serif fonts (Cinzel/Playfair), black/gold scale, minimal layout.
           - **Tech/SaaS**: Deep blues/purples, gradients, glowing effects, Inter font.
           - **Retro**: Monospace fonts, high contrast, pixelated effects.
    
    COMPONENT SELECTION:
    Analyze the user's prompt "${prompt}" and choose the best sections.
    
    1. **Navbar**: Always use this (Contains navigation logic). REPLACE 'BRAND_NAME' with a creative name based on the prompt.
    ${TEMPLATES.NAVBAR}
    
    2. **Hero Section** (Pick ONE based on prompt type):
       - If SaaS/Startup/Business -> Use HERO_SAAS
         ${TEMPLATES.HERO_SAAS}
       - If Portfolio/Creative/Art -> Use HERO_CREATIVE
         ${TEMPLATES.HERO_CREATIVE}
       - If Corporate/Dark Mode -> Use HERO_DARK
         ${TEMPLATES.HERO_DARK}
       - If style is 'neobrutal' -> Use HERO_NEOBRUTAL
         ${TEMPLATES.HERO_NEOBRUTAL}
       - If style is 'retro' -> Use HERO_RETRO
         ${TEMPLATES.HERO_RETRO}
       - If style is 'luxury' -> Use HERO_LUXURY
         ${TEMPLATES.HERO_LUXURY}
       - Else -> Use HERO_MODERN
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

    4. **Extra Pages** (YOU MUST INCLUDE THESE AS HIDDEN SECTIONS - DO NOT OMIT):
       - If user requested 'About' page or by default -> About Page (<section id="about" class="page-section hidden ...">):
         ${TEMPLATES.PAGE_ABOUT}
       
       - If user requested 'Login' page or by default -> Login Page (<section id="login" class="page-section hidden ...">):
         ${TEMPLATES.PAGE_LOGIN}
       
       - If user requested 'Signup' page or by default -> Signup Page (<section id="signup" class="page-section hidden ...">):
         ${TEMPLATES.PAGE_SIGNUP}
         
       ${(pages || []).includes('Pricing') ? `
       - Pricing Page (Create if requested):
         <section id="pricing-page" class="page-section hidden pt-32 pb-12 bg-white dark:bg-slate-900">
           ${TEMPLATES.PRICING}
         </section>` : ''}
         
       ${(pages || []).includes('Blog') ? `
       - Blog Page (Create if requested):
          <section id="blog" class="page-section hidden pt-32 pb-12 bg-white dark:bg-slate-900">
            <div class="container mx-auto px-6">
               <h1 class="text-4xl font-bold mb-12 text-center" data-aos="fade-up">Latest Insights</h1>
               <div class="grid md:grid-cols-3 gap-8">
                  <!-- Generate 3 placeholder blog posts with images -->
                  <article class="group cursor-pointer">
                     <div class="overflow-hidden rounded-2xl mb-4 aspect-video">
                        <img src="/api/images/proxy?query=technology" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Blog">
                     </div>
                     <span class="text-xs font-bold text-primary uppercase tracking-wider">Technology</span>
                     <h3 class="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">The Future of AI Web Design</h3>
                     <p class="text-muted-foreground text-sm">How artificial intelligence is reshaping the landscape of modern web development and user experience.</p>
                  </article>
                   <article class="group cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                     <div class="overflow-hidden rounded-2xl mb-4 aspect-video">
                        <img src="/api/images/proxy?query=design" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Blog">
                     </div>
                     <span class="text-xs font-bold text-primary uppercase tracking-wider">Design</span>
                     <h3 class="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">Minimalism in 2026</h3>
                     <p class="text-muted-foreground text-sm">Why less continues to be more in the digital age, and how to implement it effectively.</p>
                  </article>
                   <article class="group cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                     <div class="overflow-hidden rounded-2xl mb-4 aspect-video">
                        <img src="/api/images/proxy?query=coding" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Blog">
                     </div>
                     <span class="text-xs font-bold text-primary uppercase tracking-wider">Development</span>
                     <h3 class="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">Optimizing React Performance</h3>
                     <p class="text-muted-foreground text-sm">Key strategies to ensure your applications run smoothly on all devices.</p>
                  </article>
               </div>
            </div>
          </section>` : ''}
    
    5. **Footer**: Always use this:
    
    5. **Footer**: Always use this:
    ${TEMPLATES.FOOTER}

    6. **Router Script**: REQUIRED for navigation to work. DO NOT MODIFY THE LOGIC:
    ${TEMPLATES.JS_ROUTER}
    
    INSTRUCTIONS:
    - **Assemble**: Put all the selected sections into the \`body\`.
    - **Customize**: MODIFY the text, colors, and images in the templates to MATCH the user's request explicitly.
    - **Branding**: Everywhere you see "BRAND_NAME", replace it with a catchy name for the project.
    - **Pages**: Ensure the 'Extra Pages' (About, Login, Signup) are present in the HTML but with the class \`hidden\` initially. The router script will handle showing them.
    - **Styling**: 
      - If the user asks for "Dark Mode", add \`bg-slate-900 text-white\` to the body and update component backgrounds.
      - If "Minimal", use black/white/gray.
      - If "Vibrant", use saturated gradients.
      - If "Neo-Brutalism", use high contrast, bold borders, and pops of color.
      - If "Retro", use computer blue backgrounds and gray containers.
    
    STRUCTURE:
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${prompt}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Outfit:wght@300;400;600;800&family=Playfair+Display:wght@400;700&family=Orbitron:wght@400;700&family=Roboto:wght@300;400;500;700&family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
      <script>
        tailwind.config = {
          darkMode: 'class',
          theme: {
            extend: {
                fontFamily: {
                sans: ['${style === 'corporate' ? 'Roboto' : 'Inter'}', 'sans-serif'],
                heading: ['${style === 'luxury' ? 'Cinzel' : style === 'retro' ? 'Courier New' : 'Outfit'}', '${style === 'retro' ? 'monospace' : 'sans-serif'}'],
              },
                colors: {
                primary: '${style === 'vibrant' ? '#4f46e5' : style === 'corporate' ? '#0f172a' : style === 'luxury' ? '#000000' : style === 'neobrutal' ? '#FF6B6B' : style === 'retro' ? '#000080' : '#18181b'}',
                secondary: '${style === 'luxury' ? '#ca8a04' : '#64748b'}',
              },
              backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              },
              animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              },
              keyframes: {
                fadeInUp: {
                  '0%': { opacity: '0', transform: 'translateY(20px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
              }
            }
          }
        }
      </script>
      <style>
        .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
        .glass-dark { background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
        html { scroll-behavior: smooth; }
        .page-section { transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out; }
        .hidden { display: none !important; }
      </style>
    </head>
    <body class="font-sans antialiased text-slate-900 bg-white selection:bg-black selection:text-white overflow-x-hidden">
    
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

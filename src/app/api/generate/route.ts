import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
            } catch {}
          },
        },
      }
    )

    // Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { prompt, style = 'minimal' } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    // 🎨 STYLE CONFIGURATIONS
    const styleConfigs: Record<string, string> = {
        minimal: `
            - Primary: Zinc 900 (#18181b), Secondary: Zinc 100 (#f4f4f5)
            - Background: White (#ffffff)
            - Font: 'Inter', sans-serif
            - Vibe: Clean, whitespace-heavy, minimalistic, Apple-esque.
            - Border Radius: rounded-none or rounded-sm
            - Buttons: Black background, white text, no rounded corners.
        `,
        vibrant: `
            - Primary: Indigo 600 (#4f46e5), Secondary: Purple 500 (#a855f7)
            - Background: White with subtle mesh gradients.
            - Font: 'Outfit', sans-serif
            - Vibe: High energy, startups, tech, youthful.
            - Border Radius: rounded-2xl
            - Buttons: Gradient background (bg-gradient-to-r), rounded-full, heavy shadows.
        `,
        corporate: `
            - Primary: Slate 800 (#1e293b), Secondary: Blue 600 (#2563eb)
            - Background: Slate 50 (#f8fafc)
            - Font: 'Roboto', sans-serif
            - Vibe: Trustworthy, financial, enterprise, serious.
            - Border Radius: rounded-md
            - Buttons: Solid blue, slight shadow, rounded-md.
        `,
        dark: `
            - Primary: Emerald 400 (#34d399) or key accent color, Secondary: Zinc 800 (#27272a)
            - Background: Zinc 950 (#09090b)
            - Font: 'Inter', sans-serif
            - Vibe: Dark mode, sleek, cyber, premium, night life.
            - Border Radius: rounded-xl
            - Buttons: Outline or neon glow, glassmorphism.
            - TEXT MUST BE WHITE/LIGHT GRAY.
        `
    }

    const selectedStyleConfig = styleConfigs[style] || styleConfigs.minimal

    // 🔒 SYSTEM PROMPT (VERSION 4.2 - SINGLE PROMPT)
    const systemPrompt = `
You are an expert AI Frontend Engineer specializing in **Awwwards-winning, high-conversion landing pages**.
Your goal is to generate a SINGLE html file containing a complete, production-ready website based on the user's description.

⚠️ CRITICAL TECH STACK REQUIREMENTS:
1.  **Framework**: NONE. Use vanilla HTML5.
2.  **Styling**: **Tailwind CSS (via CDN)**.
3.  **Icons**: **FontAwesome (via CDN)**.
4.  **Google Fonts**: Import the specific font requested below.
5.  **Images**: Use \`UNSPLASH_IMG:{specific_keyword}\`.

🎨 SELECTED VISUAL STYLE: **${style.toUpperCase()}**
You must strictly follow these design tokens:
${selectedStyleConfig}

⚠️ LAYOUT & STRUCTURE RULES (STRICT):
1.  **Padding**: ALL sections must have \`py-20\` or \`py-24\` (desktop) and \`py-12\` (mobile). NEVER use small padding.
2.  **Containers**: Use \`container mx-auto px-4 sm:px-6 lg:px-8\` for all inner content.
3.  **Hero Section**: 
    - Must be \`min-h-[80vh]\` or \`min-h-screen\`.
    - Content must be vertically centered (\`flex items-center\`).
    - Title must be \`text-5xl md:text-7xl\`.
4.  **Grid Systems**: Use \`grid-cols-1 md:grid-cols-2 lg:grid-cols-3\` for feature/card/bento grids.
5.  **Whitespace**: Use negative space generously. Don't crowd elements.

🧩 RICH COMPONENT LIBRARY (MANDATORY):
1.  **Navbar**: Sticky, glassmorphism (\`backdrop-blur-md\`). specific Logo + Links + CTA Button.
2.  **Hero**: Headline + Subheadline + Two Buttons (Primary & Secondary) + Hero Image/Graphic.
3.  **Features**: Grid of cards with icons.
4.  **Social Proof**: Logo strip of "Trusted by" or "As seen in" (use FontAwesome company icons or placeholders).
5.  **Testimonials**: Carousel or Grid.
6.  **CTA Section**: Big bold section at the bottom before footer.
7.  **Footer**: Multi-column with newsletter input.

✍️ COPYWRITING:
- **Hero**: Value Proposition Formula.
- **Tone**: Match the '${style}' vibe.

✨ ANIMATIONS:
- Add \`aos\` library via CDN or simple IntersectionObserver script for "fade-up" animations on scroll.
- All main elements should have \`opacity-0\` initially and animate in.

OUTPUT FORMAT:
Return ONLY the raw HTML code. Do not wrap in markdown code blocks.
`

    // Implement Retry Logic (Max 2 Attempts)
    let html = ''
    let attempts = 0
    const maxAttempts = 2

    while (attempts < maxAttempts) {
      attempts++
      console.log(`Generation Attempt ${attempts} (Style: ${style})...`)
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3, // Slightly higher for creativity within constraints
      })

      html = completion.choices[0].message.content || ''
      html = html.replace(/```html/g, '').replace(/```/g, '').trim()

      // Post-Check: Verify HTML structure
      const hasDoctype = html.toLowerCase().includes('<!doctype html')
      const hasTailwind = html.includes('cdn.tailwindcss.com')
      const hasStyle = html.toLowerCase().includes('<style')

      if (hasDoctype && (hasStyle || hasTailwind)) {
         // 🖼️ PROCESS IMAGES (Server-side Unsplash Interception)
         try {
             // ... image processing code ...
             const regex = /UNSPLASH_IMG:([a-zA-Z0-9\-\s]+)/g;
             const matches = [...html.matchAll(regex)];
             const uniqueKeywords = [...new Set(matches.map(m => m[1]))];

             if (uniqueKeywords.length > 0) {
                 console.log('Fetching Unsplash images for:', uniqueKeywords);
                 
                 const imageMap = new Map();
                 await Promise.all(uniqueKeywords.map(async (keyword) => {
                     try {
                          // Add "minimal", "dark" etc to query based on style to match vibe
                         const query = `${keyword} ${style === 'minimal' ? 'minimal' : style === 'dark' ? 'dark' : ''}`.trim();
                         const unsplashRes = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
                         if (unsplashRes.ok) {
                             const data = await unsplashRes.json();
                             const imageUrl = data.urls?.regular || data.urls?.small; // Prefer regular
                             if (imageUrl) imageMap.set(keyword, imageUrl);
                         } else {
                            console.warn(`Unsplash Error for ${keyword}:`, unsplashRes.status);
                         }
                     } catch (e) {
                         console.error(`Failed to fetch image for ${keyword}`, e);
                     }
                 }));

                 // Replace placeholders
                 html = html.replace(regex, (match, keyword) => {
                     return imageMap.get(keyword) || `https://loremflickr.com/1600/900/${keyword}`; // Fallback if API fails/limits
                 });
             }
         } catch (e) {
             console.error('Image processing failed:', e);
             // If processing fails, regex replace with loremflickr fallback
             html = html.replace(/UNSPLASH_IMG:([a-zA-Z0-9\-\s]+)/g, 'https://loremflickr.com/1600/900/$1');
         }

         break // Valid output, exit loop
      } else if (attempts < maxAttempts) {
        console.warn(`Attempt ${attempts} failed validation (Missing DOCTYPE or Tailwind/Style). Retrying...`)
      }
    }

    // Sanitize - ALLOW Tailwind Scripts for MVP
    // We strictly remove on* events and javascript: protocols, but allow <script> tags for Tailwind/FontAwesome
    html = html.replace(/\son\w+="[^"]*"/gmi, '')
    html = html.replace(/javascript:/gi, '')
    // html = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, '') // REMOVED to allow Tailwind

    // Auto-fix viewport if missing (common AI error)
    if (!html.includes('<meta name="viewport"')) {
        html = html.replace('<head>', '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">')
    }

    const siteId = Math.random().toString(36).substring(2, 9)
    const fileName = `${user.id}/${siteId}/index.html`

    const { error: uploadError } = await supabase.storage
      .from('websites')
      .upload(fileName, html, {
        contentType: 'text/html',
        upsert: true,
      })

    if (uploadError) throw new Error('Failed to save website')

    const { error: dbError } = await supabase.from('websites').insert({
      id: siteId,
      user_id: user.id,
      html_path: fileName,
      paid: false,
      created_at: new Date().toISOString(),
    })

    if (dbError) throw new Error('Failed to save record')

    return NextResponse.json({ siteId })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}

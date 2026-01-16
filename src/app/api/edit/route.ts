
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize lazily to avoid build-time errors if env var is missing
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
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch { }
          },
        },
      }
    )

    // 1. Auth & Ownership Check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { siteId, prompt, currentHtml } = await request.json()

    if (!siteId || !prompt || !currentHtml) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify ownership via DB
    const { data: site } = await supabase
      .from('websites')
      .select('user_id, html_path')
      .eq('id', siteId)
      .single()

    if (!site || site.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // 2. OpenAI Edit Logic
    const systemPrompt = `
You are an expert Frontend Developer and HTML Editor known for "Awwwards" winning designs.
Your task is to modify the provided HTML code based on the user's request, while MAINTAINING or UPGRADING the premium design.

Rules:
1.  **Modify ONLY what is asked.** Do not rewrite the whole page unless asked.
2.  **Preserve existing structure** and logic where possible.
3.  **Return ONLY the raw HTML.** No markdown, no comments, no explanations.
4.  **No JavaScript** allowed (keep it CSS-only).
5.  **Use Premium Assets**:
    - If adding images, use local proxy: \`/api/images/proxy?query=keyword\`.
    - If adding text, match the existing Google Fonts (Outfit/Playfair).
6.  **Fix "Ugly" on sight**: If you see stretched images, broken spacing, or default fonts, FIX THEM automatically.
    - Images: \`object-fit: cover; width: 100%; height: 100%;\`
    - Spacing: Use ample padding (4rem+ for sections).

User Request: "${prompt}"
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast and efficient model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: currentHtml }
      ],
      temperature: 0.2, // Low temperature for precision
    })

    let newHtml = completion.choices[0].message.content || currentHtml
    newHtml = newHtml.replace(/```html/g, '').replace(/```/g, '').trim()

    console.log(`[Edit Debug] Old Length: ${currentHtml.length}, New Length: ${newHtml.length}`)
    if (currentHtml === newHtml) {
      console.warn('[Edit Debug] AI returned identical HTML')
    }

    // 3. Update Storage
    // Use Service Role to bypass RLS policies for reliable editing
    const adminSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() { return [] },
          setAll() { }
        }
      }
    )

    const { error: uploadError } = await adminSupabase.storage
      .from('websites')
      .upload(site.html_path, newHtml, {
        contentType: 'text/html',
        upsert: true
      })

    if (uploadError) {
      console.error('Supabase Service Role Upload Error:', uploadError)
      throw new Error(`Failed to update website file: ${uploadError.message}`)
    }

    const filename = site.html_path.split('/').pop() || 'index.html'

    return NextResponse.json({
      html: newHtml,
      action: 'update',
      filename: filename
    })

  } catch (err: any) {
    console.error('Edit Error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}

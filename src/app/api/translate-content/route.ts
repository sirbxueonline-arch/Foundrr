
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

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

    const { siteId, currentHtml, targetLanguage } = await request.json()

    if (!siteId || !currentHtml || !targetLanguage) {
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

    // 2. OpenAI Translation Logic
    const systemPrompt = `
You are a professional translator and web developer.
Your task is to translate the TEXT content of the provided HTML to ${targetLanguage}.
Rules:
1.  **Preserve HTML Structure**: Do NOT change class names, IDs, or structure. Return valid HTML.
2.  **Translate Visible Text**: Translate all headings, paragraphs, buttons, and labels.
3.  **Translate Attributes**: Translate 'placeholder', 'title', and 'alt' attributes.
4.  **Do NOT Translate**: Do not translate image src, link hrefs (unless they are hash links with text text like #contact), or data attributes.
5.  **Return ONLY HTML**: No markdown, no comments.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: currentHtml }
      ],
      temperature: 0.1,
    })

    let newHtml = completion.choices[0].message.content || currentHtml
    newHtml = newHtml.replace(/```html/g, '').replace(/```/g, '').trim()

    // 3. Update Storage (Auto-save the translation)
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
      throw new Error(`Failed to save translated file: ${uploadError.message}`)
    }

    return NextResponse.json({
      html: newHtml,
      action: 'translated',
      language: targetLanguage
    })

  } catch (err: any) {
    console.error('Translation Error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}

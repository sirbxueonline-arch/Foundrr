import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { siteId, html } = await request.json()

    if (!siteId || !html) {
      return NextResponse.json({ error: 'Missing siteId or html' }, { status: 400 })
    }

    // Verify Ownership
    const { data: site, error: fetchError } = await supabase
      .from('websites')
      .select('user_id, html_path')
      .eq('id', siteId)
      .single()

    if (fetchError || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    if (site.user_id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Save to Storage
    // Overwrite the existing file
    const { error: uploadError } = await supabase.storage
      .from('websites')
      .upload(site.html_path, html, {
        contentType: 'text/html',
        upsert: true,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to save HTML' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Save error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}

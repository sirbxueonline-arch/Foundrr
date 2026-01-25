
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as Blob
    const siteId = formData.get('siteId') as string

    if (!file || !siteId) {
      return NextResponse.json({ error: 'Missing file or siteId' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Auth Check
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Compress/Convert to Buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to 'websites' bucket (assuming it exists, or create 'thumbnails')
    // We'll use 'websites' bucket, folder 'thumbnails'
    const path = `thumbnails/${siteId}-${Date.now()}.jpg`

    // Use Service Role if RLS is strict, but usually authenticated user can upload to their own folder.
    // We'll use the standard client context.
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('websites')
      .upload(path, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      })

    if (uploadError) {
      console.error("Upload Error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('websites')
      .getPublicUrl(path)

    // Update Database
    const { error: dbError } = await supabase
      .from('websites')
      .update({ thumbnail_url: publicUrl })
      .eq('id', siteId)
      .eq('user_id', userId)

    if (dbError) throw dbError

    return NextResponse.json({ success: true, url: publicUrl })

  } catch (error: any) {
    console.error('Thumbnail Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

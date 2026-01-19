import { createServerClient } from '@supabase/ssr'
import { resolveImageQuery } from '@/lib/image-resolver'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // 1. Check Ownership & Payment
  const { data: site } = await supabase
    .from('websites')
    .select('*')
    .eq('id', id)
    .single()

  if (!site) {
    return new NextResponse('Site not found', { status: 404 })
  }

  if (site.user_id !== user.id) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (!site.paid) {
    return new NextResponse('Payment required', { status: 402 })
  }

  // 2. Download File
  const { data: fileData, error: downloadError } = await supabase.storage
    .from('websites')
    .download(site.html_path)

  if (downloadError || !fileData) {
    console.error('Download Error:', downloadError)
    return new NextResponse('File error', { status: 500 })
  }

  // Convert Blob to text to process images
  let htmlContent = await fileData.text()

  // Find all image proxy URLs and resolve them to absolute URLs
  // Matches: /api/images/proxy?query=something
  const imageRegex = /\/api\/images\/proxy\?query=([^"'\s]+)/g
  const matches = [...htmlContent.matchAll(imageRegex)]

  // Resolve unique queries concurrently
  const uniqueQueries = [...new Set(matches.map(m => m[1]))]
  const imageMap = new Map<string, string>()

  await Promise.all(uniqueQueries.map(async (q) => {
    // Decode URI component because match captures encoded string
    const decodedQuery = decodeURIComponent(q)
    const resolvedUrl = await resolveImageQuery(decodedQuery)
    imageMap.set(q, resolvedUrl)
  }))

  // Replace in HTML
  htmlContent = htmlContent.replace(imageRegex, (match, query) => {
    return imageMap.get(query) || match
  })

  // 3. Return as attachment
  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="foundry-${site.id}.html"`,
    },
  })
}

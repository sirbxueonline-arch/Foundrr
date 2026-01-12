import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.redirect('https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80') // Gradient backup
  }

  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    
    if (res.ok) {
      const data = await res.json()
      const imageUrl = data.urls?.regular || data.urls?.small
      if (imageUrl) {
        return NextResponse.redirect(imageUrl)
      }
    }
  } catch (error) {
    console.error('Unsplash Proxy Error:', error)
  }

  // Fallback to robust placeholder if Unsplash fails
  const fallbackText = query || 'Image'
  return NextResponse.redirect(`https://placehold.co/800x600/1e1e1e/FFF.png?text=${encodeURIComponent(fallbackText)}`)
}

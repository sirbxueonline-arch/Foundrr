import { NextResponse } from 'next/server'
import { resolveImageQuery } from '@/lib/image-resolver'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  const imageUrl = await resolveImageQuery(query || '')
  return NextResponse.redirect(imageUrl)
}

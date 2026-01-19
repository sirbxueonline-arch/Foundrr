import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
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

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { siteId, paymentIdentifier } = body

    if (!siteId) {
      return NextResponse.json({ error: 'Missing site ID' }, { status: 400 })
    }

    // Update to PENDING status (Require Admin Approval)
    const { error } = await supabase
      .from('websites')
      .update({
        paid: false, // Do not unlock yet
        payment_status: 'pending',
        payment_method: (body.paymentMethod || 'm10'),
        payment_identifier: paymentIdentifier,
        price: 75.99 // Enforce static price for everything
      })
      .eq('id', siteId)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })

  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

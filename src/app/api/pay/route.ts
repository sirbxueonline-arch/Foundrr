import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { userId } = await auth()
    if (!userId) {
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
      .eq('user_id', userId)

    if (error) throw error

    return NextResponse.json({ success: true })

  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

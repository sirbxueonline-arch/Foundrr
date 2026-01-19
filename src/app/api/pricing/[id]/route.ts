import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { id } = await context.params

    // Fetch site data including payment status
    const { data: site, error } = await supabase
        .from('websites')
        .select('price, payment_status, paid')
        .eq('id', id)
        .single()

    if (error || !site) {
        // Fallback for missing sites or errors
        return NextResponse.json({
            price: 75.99,
            currency: 'USD',
            payment_status: 'pending',
            paid: false
        })
    }

    return NextResponse.json({
        price: site.price || 75.99,
        currency: 'USD',
        payment_status: site.payment_status || 'pending',
        paid: site.paid || false
    })
}

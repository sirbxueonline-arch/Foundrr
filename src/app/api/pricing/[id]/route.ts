import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { currentUser } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { id } = await context.params

    // Check for authenticated user to apply discount
    const user = await currentUser()

    // Fetch site data including payment status
    const { data: site, error } = await supabase
        .from('websites')
        .select('price, payment_status, paid')
        .eq('id', id)
        .single()

    let finalPrice = site?.price || 75.99;

    // Apply 95% discount for specific user
    if (user?.emailAddresses[0]?.emailAddress === 'alcipanbaki@gmail.com') {
        finalPrice = 3.80; // Hardcoded discounted price ~5% of 75.99
    }

    if (error || !site) {
        // Fallback for missing sites or errors
        return NextResponse.json({
            price: finalPrice,
            currency: 'USD',
            payment_status: 'pending',
            paid: false
        })
    }

    return NextResponse.json({
        price: finalPrice,
        currency: 'USD',
        payment_status: site.payment_status || 'pending',
        paid: site.paid || false
    })
}

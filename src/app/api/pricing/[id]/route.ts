import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { id } = await context.params

    // Check for authenticated user to apply discount
    const cookieStore = await cookies()
    const authSupabase = createServerClient(
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
    const { data: { user } } = await authSupabase.auth.getUser()
    
    // Fetch site data including payment status
    const { data: site, error } = await supabase
        .from('websites')
        .select('price, payment_status, paid')
        .eq('id', id)
        .single()

    let finalPrice = site?.price || 75.99;
    
    // Apply 95% discount for specific user
    if (user?.email === 'alcipanbaki@gmail.com') {
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

import { dodo } from '@/lib/dodo';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
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
        );

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { siteId } = await request.json();
        if (!siteId) {
            return NextResponse.json({ error: 'Missing site ID' }, { status: 400 });
        }

        // Create a payment link/checkout session
        // Adjust amount as needed. Here we assume a fixed price or fetch it.
        // For now, let's say 49.99 + 15.00 = 64.99 AZN ~ 38 USD (Example conversion or use exact currency if supported)
        // Dodo Payments likely supports various currencies.

        const payment = await dodo.payments.create({
            billing_currency: 'USD', // Dodo defaults or check supported currencies
            payment_link: true,
            billing: {
                city: 'Baku',
                country: 'AZ',
                state: 'AZ',
                street: 'Street',
                zipcode: '1000',
            },
            customer: {
                email: user.email!,
                name: user.user_metadata?.full_name || 'Customer',
            },
            metadata: {
                siteId: siteId,
                userId: user.id
            },
            product_cart: [
                {
                    product_id: process.env.DODO_PAYMENTS_PRODUCT_ID || 'prod_website_unlock',
                    quantity: 1,
                    // amount is optional if defined in product
                }
            ],
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/website/${siteId}?payment=success`,
        });

        return NextResponse.json({ paymentLink: payment.payment_link });

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Internal Server Error';
        console.error('Dodo checkout error:', err);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

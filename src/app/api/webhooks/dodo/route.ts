import { dodo } from '@/lib/dodo';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        const headersList = request.headers;
        const headers = Object.fromEntries(headersList.entries());

        const event = dodo.webhooks.unwrap(rawBody, {
            headers,
            key: process.env.DODO_PAYMENTS_WEBHOOK_SECRET, // Ensure this env var is set
        });

        if (event.type === 'payment.succeeded') {
            const { data } = event;
            const { metadata } = data;
            const siteId = metadata?.siteId;


            if (siteId) {
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

                // Update website status
                const { error } = await supabase
                    .from('websites')
                    .update({
                        paid: true,
                        payment_status: 'approved',
                        payment_method: 'dodo',
                        payment_identifier: data.payment_id
                    })
                    .eq('id', siteId);

                if (error) {
                    console.error('Error updating website status:', error);
                    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
                }
            }
        }

        return NextResponse.json({ received: true });

    } catch (err: unknown) {
        console.error('Webhook error:', err);
        return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown Error' }, { status: 400 });
    }
}

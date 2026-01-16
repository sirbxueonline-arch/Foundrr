import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 🔒 RESTRICTED ADMIN EMAIL
const ADMIN_EMAILS = [process.env.ADMIN_EMAIL!]

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies()

        // 1. Client for AUTH (Uses Cookies + Anon Key)
        const supabaseAuth = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll() },
                    setAll() { }
                },
            }
        )

        // Verifying User
        const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()

        if (authError || !user) {
            console.error("Auth Error:", authError)
            return NextResponse.json({ error: 'Unauthorized: Please log in' }, { status: 401 })
        }

        // 2. Admin Check
        if (!ADMIN_EMAILS.includes(user.email || '')) {
            return NextResponse.json({ error: 'Forbidden: Admin access only' }, { status: 403 })
        }

        // 3. Client for DATABASE (Uses Service Role Key) - Bypasses RLS
        // We use supabase-js here for a simple admin client, not ssr since we don't need cookies for this part
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        // 4. Fetch Pending Sites
        const { data: pendingSites, error } = await supabaseAdmin
            .from('websites')
            .select('*')
            // .eq('payment_status', 'pending') // Fetch ALL to allow client-side filtering & stats
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json({ sites: pendingSites, isAdmin: true })

    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

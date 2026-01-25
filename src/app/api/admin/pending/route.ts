import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

// 🔒 RESTRICTED ADMIN EMAIL
const ADMIN_EMAILS = [process.env.ADMIN_EMAIL!]

export async function GET(request: Request) {
    try {
        // Verifying User
        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized: Please log in' }, { status: 401 })
        }

        // 2. Admin Check
        const userEmail = user.emailAddresses[0]?.emailAddress
        if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
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

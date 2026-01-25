import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(request: Request) {
    try {
        const user = await currentUser()
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        // 2. Admin Check
        const ADMIN_EMAILS = [process.env.ADMIN_EMAIL!]
        const userEmail = user.emailAddresses[0]?.emailAddress
        if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { siteId, action } = await request.json()

        if (!siteId || !['approve', 'reject'].includes(action)) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        }

        // 3. Admin DB Client (Service Role)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        // 4. Perform Action
        const updates = action === 'approve'
            ? { paid: true, payment_status: 'approved' }
            : { paid: false, payment_status: 'rejected' }

        const { error } = await supabaseAdmin
            .from('websites')
            .update(updates)
            .eq('id', siteId)

        if (error) throw error

        return NextResponse.json({ success: true, status: updates.payment_status })

    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

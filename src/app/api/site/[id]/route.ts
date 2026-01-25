import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: site, error } = await supabase
            .from('websites')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !site) {
            return NextResponse.json({ error: 'Site not found' }, { status: 404 })
        }

        if (site.user_id !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        return NextResponse.json(site)
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { name } = body

        if (!name) {
            return NextResponse.json({ error: 'Missing name' }, { status: 400 })
        }

        // specific update for name, verify ownership implicitly via RLS or explicit check
        // We'll do explicit check for consistency
        const { data: site } = await supabase
            .from('websites')
            .select('user_id')
            .eq('id', id)
            .single()

        if (!site) return NextResponse.json({ error: 'Site not found' }, { status: 404 })
        if (site.user_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

        const { error: updateError } = await supabase
            .from('websites')
            .update({ name })
            .eq('id', id)

        if (updateError) {
            throw updateError
        }

        return NextResponse.json({ success: true })

    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}

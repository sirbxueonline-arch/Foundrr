import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
    try {
        const { siteId, publish, slug } = await request.json()

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Auth & Ownership Check
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        // Validate Slug if publishing
        if (publish) {
            if (!slug || slug.length < 3) return NextResponse.json({ error: 'Slug must be at least 3 chars' }, { status: 400 });
            const { data: existing } = await supabase.from('websites').select('id').eq('slug', slug).neq('id', siteId).single();
            if (existing) return NextResponse.json({ error: 'Name already taken' }, { status: 409 });
        }

        // Update
        const { error } = await supabase
            .from('websites')
            .update({ is_published: publish, slug: publish ? slug : null })
            .eq('id', siteId)
            .eq('user_id', userId)

        if (error) throw error

        return NextResponse.json({ success: true, slug })

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

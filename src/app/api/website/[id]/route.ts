
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // 1. Auth Check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get Site to verify ownership & get file path
    const { data: site, error: fetchError } = await supabase
      .from('websites')
      .select('user_id, html_path')
      .eq('id', id)
      .single()

    if (fetchError || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    if (site.user_id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 3. Delete from Database first (Cascading logic or just cleanup)
    // Actually, usually safer to delete storage first or transactionally.
    // We'll try deleting storage first.

    // Use Service Role for Storage Deletion if standard policy is finicky, 
    // BUT we fixed policies earlier. Let's try standard client first.
    // If it fails, we might need service role, but properly configured RLS should work.
    // Given previous issues, let's just use the Admin Client for the critical delete operation to be 100% sure.
    // Re-using the pattern from the Edit API for reliability.

    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error: storageError } = await adminSupabase.storage
      .from('websites')
      .remove([site.html_path])

    if (storageError) {
      console.error('Storage Delete Error:', storageError)
      // We continue to delete the DB record even if storage fails, to avoid "ghost" projects in UI
      // Or we could return error. Let's log and proceed.
    }

    // 4. Delete from DB
    const { error: dbError } = await supabase
      .from('websites')
      .delete()
      .eq('id', id)

    if (dbError) {
      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('Delete API Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

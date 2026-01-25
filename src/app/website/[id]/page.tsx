import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PreviewWrapper from '@/components/PreviewWrapper'
import { currentUser } from '@clerk/nextjs/server'

export default async function WebsitePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const user = await currentUser()
  if (!user) {
    redirect('/login')
  }

  const { data: site } = await supabase
    .from('websites')
    .select('*')
    .eq('id', id)
    .single()

  if (!site) {
    return <div className="p-8 text-center">Site not found</div>
  }

  if (site.user_id !== user.id) {
    return <div className="p-8 text-center">Unauthorized</div>
  }

  return (
    <PreviewWrapper siteId={site.id} isPaid={site.paid} />
  )
}

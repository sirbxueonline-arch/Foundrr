import { Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PayContent } from '@/components/billing/PayContent'
import { BillingHistory } from '@/components/billing/BillingHistory'
import { currentUser } from '@clerk/nextjs/server'

export default async function BillingPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const siteId = searchParams.site

  if (siteId) {
    if (Array.isArray(siteId)) {
      return <div>Invalid Site ID</div>
    }
    return <PayContent siteId={siteId} />
  }

  // If no siteId, show billing history
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const user = await currentUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: paidSites } = await supabase
    .from('websites')
    .select('*')
    .eq('user_id', user.id)
    .eq('paid', true)
    .order('created_at', { ascending: false })

  return <BillingHistory sites={paidSites || []} />
}


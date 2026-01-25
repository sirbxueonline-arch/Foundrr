import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import LandingContent from '@/components/landing/LandingContent'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  title: 'foundrr | AI Website Builder No Subscription',
  description: 'Building a website shouldn\'t exist on a lease. Generate, download, and own your code forever. One-time payment.',
}

export default async function Home() {
  const user = await currentUser()

  // Note: We are passing the user object to the client component.
  // We need to map Clerk user to the expected shape if LandingContent relies on specific fields,
  // or update LandingContent. For now, we pass null as user is null here.
  return <LandingContent user={null} />
}

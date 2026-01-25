
import { DashboardShell } from '@/components/layout/DashboardShell'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardShell email={user.emailAddresses[0]?.emailAddress || ''}>
      {children}
    </DashboardShell>
  )
}

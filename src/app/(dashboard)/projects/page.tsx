
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Plus } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectsView } from '@/components/dashboard/ProjectsView'
import { currentUser } from '@clerk/nextjs/server'

export default async function ProjectsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const user = await currentUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch user's websites
  const { data: userProjects } = await supabase
    .from('websites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <ProjectsView projects={userProjects || []} />
}

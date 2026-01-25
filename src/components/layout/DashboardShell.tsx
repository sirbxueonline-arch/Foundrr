'use client'

import { useClerk } from '@clerk/nextjs'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  PlusCircle,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export function DashboardShell({ children, email }: { children: React.ReactNode, email: string }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, lang, toggleLanguage } = useLanguage()
  const { signOut } = useClerk()

  const navigation = [
    { name: t.nav.myWebsites, href: '/projects', icon: LayoutDashboard },
    { name: t.nav.generateNew, href: '/generate', icon: PlusCircle },
    { name: t.nav.billing, href: '/billing', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-muted/20 flex font-sans text-stone-900">

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-white border-r border-stone-200 shadow-[2px_0_20px_rgba(0,0,0,0.02)] z-30">
        <div className="h-16 flex items-center justify-between px-6 border-b border-stone-100">
          <Link href="/projects" className="flex items-center gap-2">
            <Image src="/vercel.svg" alt="Foundry Logo" width={24} height={24} className="invert-0" />
            <span className="font-bold text-lg tracking-tight text-stone-900">foundrr</span>
          </Link>
          <button
            onClick={toggleLanguage}
            className="text-xs font-mono border border-stone-200 px-2 py-0.5 rounded hover:bg-stone-50 text-stone-500"
          >
            {lang === 'az' ? 'EN' : 'AZ'}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href} // changed key to href since name changes
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-stone-100 text-stone-900 shadow-sm ring-1 ring-stone-900/5'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
                {item.name}
                {isActive && <ChevronRight className="ml-auto w-4 h-4 text-stone-400" />}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-stone-200">
          <div className="bg-stone-50 rounded-lg p-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-900 truncate" title={email}>
                {email}
              </p>
              <p className="text-xs text-stone-500">Free Plan</p>
            </div>
            <button
              onClick={async () => {
                const supabase = createClient()
                await supabase.auth.signOut()
                window.location.href = '/'
              }}
              className="text-stone-400 hover:text-red-500 transition-colors p-1"
              title={t.nav.logout || "Log out"}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 relative">
        {/* Top Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Image src="/vercel.svg" alt="Foundry Logo" width={24} height={24} className="invert-0" />
            <span className="font-bold text-lg">foundrr</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-600">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-10 px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50"
              >
                <item.icon className="w-5 h-5 text-stone-400" />
                {item.name}
              </Link>
            ))}
          </div>
        )}

        <main className="flex-1 p-6 lg:p-10 w-full max-w-7xl mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}

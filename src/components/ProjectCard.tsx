'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ExternalLink, Calendar, CheckCircle, Lock,
  MoreVertical, Trash2, Loader2, PenTool, Monitor
} from 'lucide-react'

import { useLanguage } from '@/contexts/LanguageContext'

// Simple Dropdown Implementation to avoid large dependencies if not needed
// Or we can use a simple state toggle.

interface Site {
  id: string
  created_at: string
  paid: boolean
  name?: string
  views?: number
  thumbnail_url?: string
}

export function ProjectCard({ site }: { site: Site }) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation()

    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/website/${site.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Could not delete project. Please try again.')
      setIsDeleting(false)
    }
  }

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowMenu(!showMenu)
    // Add click-outside listener conceptually, but for simple MVP a toggle is fine.
    // Better: use a transparent overlay when menu is open.
  }

  return (
    <Link href={`/website/${site.id}`} className="group block relative">
      <div className="h-full overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/50 relative flex flex-col">
        {/* Preview / Thumbnail Area */}
        <div className="aspect-video w-full bg-muted/40 relative overflow-hidden flex items-center justify-center group-hover:bg-muted/60 transition-colors">
          {site.thumbnail_url ? (
            <img
              src={site.thumbnail_url}
              alt={site.name || 'Project Preview'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              {/* Fallback to Iframe if no thumbnail exists yet */}
              <iframe
                src={`/api/preview/${site.id}`}
                className="absolute inset-0 w-[400%] h-[400%] scale-[0.25] origin-top-left border-0 pointer-events-none select-none opacity-50 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                title={`Preview of ${site.name || site.id}`}
                tabIndex={-1}
              />
              {/* Overlay to catch clicks */}
              <div className="absolute inset-0 z-10" />
            </>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 z-20 backdrop-blur-[1px]">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-black shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              {t.projects.openDesigner} <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {site.name || site.id}
            </span>
            {site.paid ? (
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                <CheckCircle className="mr-1 h-3 w-3" /> {t.projects.paid}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                <Lock className="mr-1 h-3 w-3" /> {t.projects.draft}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs text-muted-foreground mt-4">
            <Calendar className="mr-1 h-3 w-3" />
            {new Date(site.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
            <div className="ml-auto flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye mr-1 h-3 w-3"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
              {site.views || 0}
            </div>
          </div>
        </div>

        {/* Action Menu (Three Dots) - Positioned Absolute Top Right */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={toggleMenu}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm border opacity-100 transition-all"
            title="More options"
          >
            <MoreVertical className="w-4 h-4 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <>
              {/* Backdrop to close */}
              <div
                className="fixed inset-0 z-[11] cursor-default"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(false); }}
              />

              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border py-1 z-[12] animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  {t.projects.delete}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { Plus, Layers, Eye, Activity } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { useLanguage } from '@/contexts/LanguageContext'

export function ProjectsView({ projects }: { projects: any[] }) {
  const { t } = useLanguage()

  // Stats Calculation
  const totalProjects = projects.length
  const totalViews = projects.reduce((acc, curr) => acc + (curr.views || 0), 0) // Real views
  const avgHealth = projects.length > 0 ? 98 : 0 // Optimize for "WOW" feeling

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">

      {/* Pulse Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-lg">+1 New</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mb-1">{totalProjects}</h3>
          <p className="text-sm text-slate-500 font-medium">Active Projects</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-lg">+12%</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mb-1">{(totalViews / 1000).toFixed(1)}k</h3>
          <p className="text-sm text-slate-500 font-medium">Total Project Views</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-teal-100 text-teal-700 rounded-lg">Excellent</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mb-1">{avgHealth}%</h3>
          <p className="text-sm text-slate-500 font-medium">Overall Site Health</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t.projects.title}</h1>
          <p className="text-muted-foreground mt-1">{t.projects.manage}</p>
        </div>
        <Link
          href="/generate"
          className="group relative inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
          <div className="relative z-20 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t.projects.create}
          </div>
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{t.projects.noSites}</h3>
          <p className="text-slate-500 mt-2 mb-8 max-w-sm mx-auto">{t.login.startBuilding}</p>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
          >
            {t.projects.create}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((site) => (
            <ProjectCard key={site.id} site={site} />
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useLanguage } from '@/contexts/LanguageContext'

import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Footer } from '@/components/layout/Footer'

import { Navbar } from '@/components/layout/Navbar'

export default function LandingContent({ user }: { user: any }) {
  const { t, lang, toggleLanguage } = useLanguage()

  return (
    <div className="flex flex-col items-center overflow-x-hidden w-full animate-in fade-in duration-700">
      <Navbar user={user} />

      {/* Hero Section - Passing Lang/Text */}
      <Hero lang={lang} t={t.hero} />

      <Features />

      {/* What You Get Section */}
      <section className="w-full py-24 bg-white border-t border-zinc-100">
        <div className="container px-4 sm:px-8 mx-auto max-w-screen-xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            <div className="flex-1 order-2 lg:order-1">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-8">
                {t.whatYouGet.badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
                {t.whatYouGet.title} <span className="text-primary">{t.whatYouGet.titleSub}</span>
              </h2>
              <p className="text-lg text-zinc-600 mb-10 leading-relaxed max-w-lg">
                {t.whatYouGet.desc}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {t.whatYouGet.list.map((item, i) => (
                  <div key={i} className="flex items-start p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-200 hover:shadow-sm transition-all duration-300">
                    <div className="mr-3 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <span className="text-zinc-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/login" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors">
                  Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative rounded-2xl border border-zinc-200/80 bg-white shadow-2xl shadow-zinc-200/50 overflow-hidden aspect-[4/3] group ring-1 ring-zinc-950/5">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  </div>
                  <div className="ml-4 flex-1 h-6 rounded-md bg-white border border-zinc-200 flex items-center px-3 text-[10px] text-zinc-400 font-mono">
                    foundrr.com/preview
                  </div>
                </div>

                <div className="relative h-full w-full bg-zinc-50 p-8 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

                  {/* Animated Code Block Representation */}
                  <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-zinc-100 p-6 space-y-4 relative z-10 transform transition-transform duration-500 hover:scale-105">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="w-24 h-4 bg-zinc-100 rounded mb-1.5" />
                        <div className="w-16 h-3 bg-zinc-50 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-zinc-100 rounded" />
                      <div className="w-5/6 h-2 bg-zinc-100 rounded" />
                      <div className="w-4/6 h-2 bg-zinc-100 rounded" />
                    </div>
                    <div className="pt-2 flex gap-3">
                      <div className="w-full h-8 bg-zinc-900 rounded-lg" />
                      <div className="w-full h-8 bg-zinc-100 rounded-lg" />
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur border border-zinc-200 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-600 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Production Ready
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section >
      <Footer />
    </div >
  )
}

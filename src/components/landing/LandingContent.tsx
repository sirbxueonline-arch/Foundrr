'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useLanguage } from '@/contexts/LanguageContext'

import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { PricingCards } from '@/components/pricing/PricingCards'
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
      <section className="w-full py-24 bg-muted/30 border-t border-border/40">
        <div className="container px-4 sm:px-8 mx-auto max-w-screen-xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-primary/20 bg-primary/5 text-primary mb-6">
                {t.whatYouGet.badge}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                {t.whatYouGet.title}<br />{t.whatYouGet.titleSub}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t.whatYouGet.desc}
              </p>
              <ul className="space-y-4">
                {t.whatYouGet.list.map((item, i) => (
                  <li key={i} className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mr-3 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground/90 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="relative rounded-xl border bg-card shadow-2xl overflow-hidden aspect-[4/3] group">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b bg-muted/50 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-green-400/80 shadow-sm" />
                <div className="ml-4 flex-1 h-6 rounded-md bg-background/50 border flex items-center px-3 text-[10px] text-muted-foreground font-mono shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                  foundrr.com/preview
                </div>
              </div>
              <div className="relative h-full w-full bg-slate-950 text-slate-300 p-6 font-mono text-sm leading-relaxed overflow-hidden">
                {/* Abstract Code Animation */}
                <div className="space-y-2 opacity-60">
                  <div className="w-1/3 h-4 bg-slate-700/50 rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-slate-700/50 rounded animate-pulse delay-75" />
                  <div className="w-1/2 h-4 bg-slate-700/50 rounded animate-pulse delay-150" />
                </div>
                {/* Preview Card */}
                <div className="absolute inset-x-8 inset-y-12 bg-background rounded-lg shadow-xl border overflow-hidden transform translate-y-[110%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out flex flex-col">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="w-3/4 h-6 bg-foreground/10 rounded" />
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-foreground/5 rounded" />
                    </div>
                    <div className="pt-2">
                      <div className="w-24 h-8 bg-primary rounded" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Generated
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                  <div className="bg-background/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-white text-xs font-medium">
                    {t.whatYouGet.preview}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Pricing Section on Homepage */}
      < div className="w-full bg-background border-t border-border/40 pt-24" >
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t.whatYouGet.title} {t.whatYouGet.titleSub}</h2>
          <p className="text-muted-foreground">{t.whatYouGet.desc}</p>
        </div>
        <PricingCards />
      </div >

      <Footer />
    </div >
  )
}

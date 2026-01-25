"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Terminal, Code2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypewriterText } from "@/components/landing/TypewriterText";

export function Hero({ lang, t }: { lang?: string; t?: any }) {
  // Demo State
  const [demoStep, setDemoStep] = React.useState<'idle' | 'analyzing' | 'building' | 'complete'>('idle');

  const runDemo = () => {
    if (demoStep !== 'idle') return;
    setDemoStep('analyzing');
    setTimeout(() => setDemoStep('building'), 1500);
    setTimeout(() => setDemoStep('complete'), 3500);
  };

  const text = t || {
    badge: "foundrr v2.0 is Live",
    badgeSub: "New Generation Engine",
    headline: "Build software,",
    headlineSub: "without the code.",
    desc: "foundrr turns your ideas into production-ready websites in seconds. Powered by advanced AI that understands design, code, and business logic.",
    ctaPrimary: "Start Building Free",
    ctaSecondary: "See Examples"
  }

  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32 bg-black text-white selection:bg-primary/30 selection:text-primary-foreground">
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-16">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {text.badge}
            <span className="w-px h-3 bg-white/20 mx-1" />
            <span className="opacity-60">{text.badgeSub}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl"
          >
            {text.headline} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-primary animate-gradient-x pb-2">
              {text.headlineSub}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed text-balance mb-10"
          >
            {text.desc}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
          >
            <Link
              href="/login"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-bold text-black transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl hover:shadow-white/20"
            >
              <span className="relative flex items-center gap-2 z-10">
                {text.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-8 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
            >
              {text.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Demo/Visual Area - Glassmorphism Browser */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.2 }}
          className="relative w-full max-w-6xl mx-auto perspective-1000"
        >
          {/* Glossy Reflection */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-2xl -z-10 blur-3xl opacity-30" />

          <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/80 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-white/10 transition-transform duration-700 hover:scale-[1.01]">

            {/* Browser Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                {/* URL Bar */}
                <div className="hidden sm:flex ml-4 items-center gap-2 px-3 py-1 rounded-md bg-zinc-950/50 border border-white/5 text-[11px] text-zinc-500 font-mono w-64 shadow-inner">
                  <span className="text-zinc-600">https://</span>
                  <span className="text-zinc-300">foundrr.ai/generate</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] text-zinc-500 font-bold">
                      U{i}
                    </div>
                  ))}
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-xs text-zinc-500 font-medium">v2.4.0</span>
              </div>
            </div>

            {/* Browser Content - Split View */}
            <div className="grid md:grid-cols-12 min-h-[500px] divide-y md:divide-y-0 md:divide-x divide-white/5">

              {/* Left: Input Console */}
              <div className="md:col-span-5 bg-zinc-950/50 p-6 md:p-8 flex flex-col justify-between relative group/console">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover/console:opacity-100 transition-opacity" />

                <div className="relative space-y-8">
                  <div>
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal className="w-3 h-3" />
                      Prompt Input
                    </div>
                    <div className="text-xl md:text-2xl font-medium text-white leading-normal font-sans">
                      "{text.prompt}"
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Code2 className="w-3 h-3" />
                      Engine Output
                    </div>
                    <div className="bg-zinc-950 rounded-lg border border-white/5 p-4 font-mono text-xs text-zinc-400 h-40 overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-2 bg-zinc-950/80 backdrop-blur-sm border-l border-b border-white/5 rounded-bl-lg text-[10px] text-zinc-600">
                        LOGS
                      </div>
                      {demoStep === 'idle' ? (
                        <div className="flex items-center justify-center h-full text-zinc-700">Waiting to start...</div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-emerald-500/80">&gt; Initializing neural engine...</div>
                          {(demoStep === 'analyzing' || demoStep === 'building' || demoStep === 'complete') && (
                            <div className="text-blue-400/80">&gt; Parsing prompt intent... Ok.</div>
                          )}
                          {(demoStep === 'building' || demoStep === 'complete') && (
                            <>
                              <div className="text-amber-400/80">&gt; Generating component structure...</div>
                              <div className="text-zinc-500">&gt; Added Hero.tsx</div>
                              <div className="text-zinc-500">&gt; Added Features.tsx</div>
                              <div className="text-purple-400/80">&gt; Applying distinctive visual style...</div>
                            </>
                          )}
                          {demoStep === 'complete' && (
                            <div className="text-emerald-500 font-bold">&gt; Build successfully complated (0.4s)</div>
                          )}
                          <div className="w-2 h-4 bg-primary animate-pulse mt-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative pt-6">
                  {demoStep === 'idle' ? (
                    <button
                      onClick={runDemo}
                      className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-white/5"
                    >
                      <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform text-amber-500" />
                      Visualize Idea
                    </button>
                  ) : (
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary animate-[shimmer_1.5s_infinite] w-full" />
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Visual Preview */}
              <div className="md:col-span-7 bg-zinc-900 relative overflow-hidden flex items-center justify-center p-8 bg-[url('/grid.svg')] bg-center">
                <div className={`transition-all duration-1000 ease-out transform ${demoStep === 'complete' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-40 scale-95 translate-y-4 blur-sm grayscale'}`}>
                  {/* Generated Site Mockup */}
                  <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-none select-none relative">
                    {/* Overlay for "Building" state */}
                    {demoStep === 'building' && (
                      <div className="absolute inset-0 z-50 bg-black/10 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-primary animate-spin" />
                          Constructing...
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="h-12 bg-white border-b flex items-center justify-between px-4">
                      <div className="font-serif font-bold text-amber-900">Brew & Bean</div>
                      <div className="flex gap-2">
                        <div className="w-12 h-2 bg-stone-100 rounded-full" />
                        <div className="w-8 h-2 bg-stone-100 rounded-full" />
                      </div>
                    </div>
                    {/* Hero */}
                    <div className="h-48 bg-stone-100 relative overflow-hidden flex items-center px-6">
                      <div className="absolute right-[-20%] top-0 h-full w-2/3 bg-amber-900/10 rounded-l-full" />
                      <div className="relative z-10 w-2/3 space-y-2">
                        <div className="h-6 w-full bg-amber-900/50 rounded" />
                        <div className="h-4 w-2/3 bg-amber-900/20 rounded" />
                        <div className="mt-4 h-8 w-24 bg-amber-600 rounded-full shadow-lg" />
                      </div>
                    </div>
                    {/* Grid */}
                    <div className="p-4 grid grid-cols-2 gap-3">
                      <div className="h-24 bg-stone-50 rounded border border-stone-100" />
                      <div className="h-24 bg-stone-50 rounded border border-stone-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

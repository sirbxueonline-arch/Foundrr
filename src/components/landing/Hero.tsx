"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Terminal, Code2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypewriterText } from "@/components/landing/TypewriterText";

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
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden">
        <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            {text.badge}
            <span className="ml-2 pl-2 border-l border-primary/20 text-xs opacity-70">
              {text.badgeSub}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 pb-4"
          >
            {text.headline} <br />
            <span className="text-primary relative underline decoration-primary/30 underline-offset-8 decoration-4">
              {text.headlineSub}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed text-balance"
          >
            {text.desc}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link
              href="/login"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-foreground px-8 font-medium text-background transition-all hover:bg-foreground/90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
              <span className="relative flex items-center gap-2 z-20">
                {text.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent/50 hover:text-accent-foreground"
            >
              {text.ctaSecondary}
            </Link>

          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/5 w-full max-w-3xl"
          >
            <p className="text-xs font-semibold text-muted-foreground/40 uppercase tracking-widest mb-6">Trusted by modern teams</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
               {/* Placeholder Logos - utilizing text for performance/simplicity or SVGs if available */}
               <div className="flex items-center gap-2 font-bold text-lg"><div className="w-5 h-5 bg-foreground rounded-full" /> Acme Corp</div>
               <div className="flex items-center gap-2 font-bold text-lg"><div className="w-5 h-5 bg-foreground rounded-sm" /> Layers</div>
               <div className="flex items-center gap-2 font-bold text-lg"><div className="w-5 h-5 border-2 border-foreground rounded-full" /> Sisyphus</div>
               <div className="flex items-center gap-2 font-bold text-lg"><div className="w-5 h-5 bg-foreground rotate-45" /> Quotient</div>
            </div>
          </motion.div>

          {/* Made In Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-xs font-medium text-muted-foreground/60 tracking-wider uppercase"
          >
            {text.madeIn}
            <img
              src="https://flagcdn.com/20x15/az.png"
              alt="Azerbaijan Flag"
              className="inline-block h-3 w-4 ml-2 object-contain"
            />
          </motion.div>

          {/* Visual/Demo Area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="mt-20 relative w-full max-w-5xl rounded-xl border border-border/40 bg-zinc-950/50 shadow-2xl overflow-hidden backdrop-blur-sm ring-1 ring-white/10 group/browser hover:shadow-primary/20 hover:ring-primary/20 transition-all duration-500"
          >
            {/* Ambient Glow behind mock browser */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-2xl opacity-0 group-hover/browser:opacity-100 transition-opacity duration-700 -z-10" />
            {/* Mock Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 transition-colors group-hover/browser:bg-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
              </div>
              <div className="ml-4 flex-1 max-w-sm h-6 rounded bg-white/5 border border-white/10 flex items-center px-3 text-[10px] text-zinc-400 font-mono overflow-hidden">
                <span className="text-emerald-500 mr-2">🔒</span>
                foundrr.ai/generate
              </div>

              {/* Price Badge in Header */}
              <div className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/5 text-[10px] font-medium text-white/60">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Premium Engine v2.0</span>
              </div>
            </div>

              {/* Split View: Prompt vs Code */}
              <div className="grid md:grid-cols-2 h-[400px] md:h-[500px]">
                {/* Left: Input/AI Interface */}
                <div className="p-6 md:p-10 flex flex-col justify-center border-r border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 border border-white/10">
                        <Sparkles className={`w-5 h-5 ${demoStep === 'idle' ? 'text-amber-400' : 'text-primary animate-pulse'}`} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-zinc-400">User Prompt</p>
                        <div className="text-xl md:text-2xl font-medium text-zinc-100 leading-tight">
                          "{text.prompt}"
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="space-y-3">
                      {demoStep === 'idle' ? (
                         <button 
                            onClick={runDemo}
                            className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary/20 transition-all flex items-center justify-center gap-2 group/btn"
                         >
                            <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                            Click to Generate
                         </button>
                      ) : (
                        <>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                            <Terminal className="w-3 h-3" />
                            AI Reasoning
                            </div>
                            <div className="space-y-2 text-sm font-mono text-emerald-400/80 bg-zinc-900/50 p-3 rounded border border-white/5 min-h-[120px]">
                                {demoStep === 'analyzing' && (
                                    <>
                                        <TypewriterText text={text.reasoning[1]} delay={0} />
                                        <div className="flex items-center gap-2 text-emerald-400/50 mt-2">
                                            <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
                                            <span className="text-xs">Analyzing requirements...</span>
                                        </div>
                                    </>
                                )}
                                {demoStep === 'building' && (
                                    <>
                                        <div className="opacity-50">{text.reasoning[1]}</div>
                                        <TypewriterText text={text.reasoning[2]} delay={0} />
                                        <div className="flex items-center gap-2 text-emerald-400/50 mt-2">
                                            <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
                                            <span className="text-xs">Constructing layout...</span>
                                        </div>
                                    </>
                                )}
                                {demoStep === 'complete' && (
                                    <>
                                        <div className="opacity-50">{text.reasoning[1]}</div>
                                        <div className="opacity-50">{text.reasoning[2]}</div>
                                        <div className="text-emerald-400 font-bold">✔ Generation Complete</div>
                                    </>
                                )}
                            </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Preview/Code */}
                <div className="relative bg-zinc-950 p-6 md:p-10 overflow-hidden hidden md:block">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                  <div className="relative z-10 space-y-4 h-full flex items-center justify-center">
                    {/* Mock Website Preview */}
                    <div className={`rounded-lg border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden transition-all duration-700 w-full max-w-sm ${demoStep === 'complete' ? 'scale-100 opacity-100 rotate-0 translate-x-0' : 'scale-95 opacity-50 rotate-2 translate-x-4 blur-[1px]'}`}>
                      {/* Hero of the generated site */}
                      {demoStep === 'complete' ? (
                          <div className="animate-in fade-in duration-1000">
                             <div className="relative h-64 bg-neutral-900 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/80" />
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                                <div className="relative text-center p-6 z-10">
                                  <h3 className="text-4xl font-serif text-amber-100 mb-2 drop-shadow-lg">Brew & Bean</h3>
                                  <p className="text-amber-100/80 text-sm font-light tracking-widest uppercase">Artisan Coffee Roasters</p>
                                  <div className="mt-6 px-6 py-2 bg-amber-600 text-white text-xs font-bold rounded-full inline-block shadow-lg hover:bg-amber-500 transition-colors cursor-pointer">Order Fresh Beans</div>
                                </div>
                              </div>
                              {/* Next section */}
                              <div className="h-32 bg-neutral-900 p-4 grid grid-cols-2 gap-4 border-t border-white/5">
                                <div className="bg-white/5 rounded h-full animate-pulse" />
                                <div className="bg-white/5 rounded h-full animate-pulse delay-100" />
                              </div>
                          </div>
                      ) : (
                          <div className="blur-sm grayscale opacity-30">
                              <div className="relative h-64 bg-neutral-900 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/80" />
                                <div className="relative text-center p-6">
                                  <h3 className="text-3xl font-serif text-amber-100 mb-2">Brew & Bean</h3>
                                  <p className="text-amber-100/60 text-sm">Artisan Coffee Roasters</p>
                                  <div className="mt-4 px-4 py-2 bg-amber-600 text-white text-xs rounded-full inline-block">Order Now</div>
                                </div>
                              </div>
                              <div className="h-32 bg-neutral-800 p-4 grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded h-full" />
                                <div className="bg-white/5 rounded h-full" />
                              </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

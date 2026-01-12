
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Wand2, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { INSPIRATION_PROMPTS } from '@/lib/inspiration-prompts'

const LOADING_STEPS = [
  "Analyzing business profile...",
  "Designing layout structure...",
  "Selecting typography & color palette...",
  "Fetching premium imagery...",
  "Writing copy...",
  "Polishing details..."
]

import { useLanguage } from '@/contexts/LanguageContext'

// ... imports ...

export default function GeneratePage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [formData, setFormData] = useState({
    prompt: '',
    style: 'minimal' // Default style
  })

  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)

  // Update LOADING_STEPS to use translation
  const currentLoadingSteps = t.generate.loading

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % currentLoadingSteps.length)
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [loading, currentLoadingSteps])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleStyleSelect = (style: string) => {
    setFormData(prev => ({ ...prev, style }))
  }



  // ... existing code ...

  const handleInspireMe = () => {
    const random = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)]
    setFormData(prev => ({ ...prev, ...random }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to generate website')
      }

      const { siteId } = await res.json()

      router.push(`/website/${siteId}`)
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate website. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const styles = [
    { id: 'minimal', name: t.generate.form.style.minimal, desc: t.generate.form.style.minimalDesc, color: 'bg-zinc-100 border-zinc-200' },
    { id: 'vibrant', name: t.generate.form.style.vibrant, desc: t.generate.form.style.vibrantDesc, color: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' },
    { id: 'corporate', name: t.generate.form.style.corporate, desc: t.generate.form.style.corporateDesc, color: 'bg-slate-800 text-white' },
    { id: 'dark', name: t.generate.form.style.dark, desc: t.generate.form.style.darkDesc, color: 'bg-black border-zinc-800 text-white' },
    { id: 'retro', name: t.generate.form.style.retro, desc: t.generate.form.style.retroDesc, color: 'bg-[#fef3c7] border-black border-2 text-black' },
    { id: 'cyberpunk', name: t.generate.form.style.cyberpunk, desc: t.generate.form.style.cyberpunkDesc, color: 'bg-black border-yellow-400 text-yellow-400' },
    { id: 'luxury', name: t.generate.form.style.luxury, desc: t.generate.form.style.luxuryDesc, color: 'bg-[#1c1917] border-[#d4af37] text-[#d4af37]' },
  ]

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center p-4 overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden">
        <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 -left-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/4 -right-4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="w-full max-w-3xl animate-fade-in relative z-10">
        <div className="text-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 pb-1"
          >
            {t.generate.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-base font-light text-balance max-w-lg mx-auto leading-relaxed"
          >
            {t.generate.desc}
          </motion.p>
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit} className="relative w-full">

            {loading && (
              <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center p-8 space-y-6 animate-in fade-in duration-500 rounded-2xl">
                <div className="relative w-16 h-16">
                  <Loader2 className="w-full h-full animate-spin text-primary opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2 max-w-sm">
                  <h3 className="text-lg font-light tracking-tight text-foreground">
                    {currentLoadingSteps[loadingStep]}
                  </h3>
                  <p className="text-muted-foreground text-xs font-light">Creating your masterpiece...</p>
                </div>
                <div className="w-40 h-1 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-progress-indeterminate" />
                </div>
              </div>
            )}

            <div className={`transition-all duration-700 ${loading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>

              {/* Header Actions */}
              <div className="flex justify-center mb-6">
                <button
                  type="button"
                  onClick={handleInspireMe}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 text-[10px] font-medium text-primary transition-all duration-300"
                >
                  <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                  {t.generate.form.inspireMe}
                </button>
              </div>

              <div className="space-y-4 max-w-xl mx-auto">
                {/* Prompt Box with Border Beam */}
                <div className="group relative rounded-2xl p-[1px] overflow-hidden">
                  {/* Animated Border Beam */}
                  <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,var(--color-primary)_100%)] opacity-100 transition-opacity duration-500" />

                  <div className="relative rounded-2xl bg-background backdrop-blur-xl border border-white/10">
                    <textarea
                      id="prompt"
                      name="prompt"
                      rows={2}
                      className="w-full bg-transparent text-lg md:text-xl font-light rounded-2xl border-none px-6 py-4 placeholder:text-muted-foreground/50 focus:ring-0 resize-none transition-all duration-300 leading-relaxed text-center"
                      placeholder={t.generate.form.promptPlaceholder}
                      value={formData.prompt}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Style Selection */}
              <div className="mt-8 space-y-4">
                <div className="text-center text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest">{t.generate.form.style.title}</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStyleSelect(s.id)}
                      className={`group relative px-4 py-2 rounded-full border transition-all duration-300 ${formData.style === s.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border/40 hover:border-border hover:bg-muted/30 text-muted-foreground'
                        }`}
                    >
                      <span className="relative z-10 text-xs font-medium">{s.name}</span>
                      {formData.style === s.id && (
                        <motion.div
                          layoutId="activeStyle"
                          className="absolute inset-0 rounded-full border border-primary opacity-50"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  disabled={loading || !formData.prompt.trim()}
                  className="group relative inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background shadow-xl transition-all hover:scale-105 hover:bg-foreground/90 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                  <div className="flex items-center gap-2 relative z-20">
                    <span>{t.generate.form.submit}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

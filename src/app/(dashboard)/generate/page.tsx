
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Wand2, Sparkles } from 'lucide-react'

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
  const { t } = useLanguage()
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

  const handleInspireMe = () => {
    const scenarios = [
        {
            prompt: "A cozy portfolio for a landscape photographer based in Seattle. Use earth tones and a gallery grid layout.",
            style: "minimal"
        },
        {
            prompt: "A high-energy landing page for a new crypto wallet app called 'VaultX'. Needs to look futuristic with neon accents.",
            style: "dark"
        },
        {
            prompt: "A professional corporate site for a legal consultancy firm. Trustworthy blue colors, heavy on typography.",
            style: "corporate"
        },
        {
            prompt: "A playful, vibrant e-commerce store for handmade candles. Use bright colors and soft shapes.",
            style: "vibrant"
        }
    ]
    const random = scenarios[Math.floor(Math.random() * scenarios.length)]
    setFormData(prev => ({ ...prev, ...random }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
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
  ]

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6 md:p-12 overflow-hidden bg-background">
      {/* ... backgrounds ... */}
      
      <div className="w-full max-w-4xl animate-fade-in relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md shadow-sm mb-6 uppercase tracking-wide">
            <Sparkles className="w-3 h-3" />
            {t.generate.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            {t.generate.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl text-balance max-w-xl mx-auto font-medium">
            {t.generate.desc}
          </p>
        </div>

        <div className="relative">
            {/* ... glow ... */}
            
            <form onSubmit={handleSubmit} className="relative border border-border/50 p-8 sm:p-10 rounded-3xl bg-card/80 backdrop-blur-xl shadow-2xl">
            
            {loading && (
              <div className="absolute inset-0 z-50 bg-card/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 space-y-6 animate-in fade-in duration-300">
                  <div className="relative w-24 h-24">
                    <Loader2 className="w-full h-full animate-spin text-primary opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Wand2 className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                     <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-sky-500">
                        {currentLoadingSteps[loadingStep]}
                     </h3>
                     <p className="text-muted-foreground text-sm">This usually takes about 30 seconds.</p>
                  </div>
                  <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-progress-indeterminate" />
                  </div>
              </div>
            )}

            <div className={`space-y-8 transition-opacity duration-500 ${loading ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
                
                {/* Header Actions */}
                <div className="flex justify-end">
                    <button 
                        type="button"
                        onClick={handleInspireMe}
                        className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Inspire Me
                    </button>
                </div>

                <div className="space-y-2.5">
                     <label htmlFor="prompt" className="text-sm font-semibold text-foreground ml-1">{t.generate.form.promptLabel}</label>
                     <textarea
                         id="prompt"
                         name="prompt"
                         rows={4}
                         className="flex min-h-[140px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none leading-relaxed"
                         placeholder={t.generate.form.promptPlaceholder}
                         value={formData.prompt}
                         onChange={handleChange}
                         disabled={loading}
                     />
                </div>

                {/* Style Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground ml-1">{t.generate.form.style.title}</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {styles.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => handleStyleSelect(s.id)}
                                className={`relative group flex flex-col gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-left h-full ${
                                    formData.style === s.id 
                                    ? 'border-primary ring-2 ring-primary/20 scale-[1.02]' 
                                    : 'border-transparent hover:border-border/50 hover:bg-muted/50'
                                }`}
                            >
                                <div className={`w-full aspect-video rounded-lg shadow-sm mb-1 ${s.color} flex items-center justify-center`}>
                                   {formData.style === s.id && (
                                     <div className="bg-background/20 backdrop-blur-md rounded-full p-1.5">
                                        <Sparkles className="w-4 h-4 text-white" />
                                     </div>
                                   )}
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">{s.name}</div>
                                    <div className="text-[10px] text-muted-foreground leading-tight">{s.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.01] hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-8"
            >
                <div className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  <span>{loading ? t.generate.form.generating : t.generate.form.submit}</span>
                </div>
            </button>
            </form>
        </div>
      </div>
    </div>
  )
}

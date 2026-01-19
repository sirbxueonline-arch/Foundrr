'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Wand2, Sparkles, ArrowRight, BookOpen, Code2, CheckCircle2, Palette, Terminal, LayoutTemplate } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { INSPIRATION_PROMPTS } from '@/lib/inspiration-prompts'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GeneratePage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [outputLang, setOutputLang] = useState<'en' | 'az'>('az')

  const [formData, setFormData] = useState<{
    prompt: string;
    style: string;
    primaryColor: string;
    pages: string[];
  }>({
    prompt: '',
    style: 'minimal',
    primaryColor: '#000000',
    pages: []
  })

  // State for streaming
  const [loading, setLoading] = useState(false)
  const [streamData, setStreamData] = useState('') // Full raw data
  const [previewHtml, setPreviewHtml] = useState('') // Throttled for iframe
  const [logs, setLogs] = useState<{ text: string, type: 'info' | 'success' | 'warning' | 'error' }[]>([])

  // Ref for auto-scrolling terminal
  const logContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleStyleSelect = (style: string) => {
    setFormData(prev => ({ ...prev, style }))
    // Update default color based on style if user hasn't touched it? 
    // For now, let's keep it manual or simple.
  }

  const handleInspireMe = () => {
    const random = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)]
    setFormData(prev => ({ ...prev, ...random }))
  }

  const addLog = (text: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setLogs(prev => [...prev, { text, type }])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStreamData('')
    setPreviewHtml('')
    setLogs([])

    // Initial logs
    addLog(t.generate.form.logs.init, 'info')
    setTimeout(() => addLog(t.generate.form.logs.analyzing, 'info'), 500)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, lang: outputLang }),
      })

      if (!response.ok || !response.body) {
        throw new Error(response.statusText)
      }

      addLog(t.generate.form.logs.connection, 'success')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let buffer = ''
      let lastUpdateTime = 0

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading

        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          buffer += chunk
          setStreamData(prev => prev + chunk) // Keep raw data synced

          // Throttle iframe updates to every 1000ms to stop flickering
          const now = Date.now()
          if (now - lastUpdateTime > 1000) {
            setPreviewHtml(buffer)
            lastUpdateTime = now
          }

          // Localized log simulator
          if (chunk.includes('<nav')) addLog(t.generate.form.logs.nav, 'info')
          if (chunk.includes('<header') || chunk.includes('id="hero"')) addLog(t.generate.form.logs.hero, 'success')
          if (chunk.includes('class="grid')) addLog(t.generate.form.logs.grid, 'info')
          if (chunk.includes('<img')) addLog(t.generate.form.logs.assets, 'warning')
          if (chunk.includes('<section')) addLog(t.generate.form.logs.content, 'info')
          if (chunk.includes('<form')) addLog(t.generate.form.logs.forms, 'success')
          if (chunk.includes('<footer')) addLog(t.generate.form.logs.footer, 'info')
          if (chunk.includes('<script')) addLog(t.generate.form.logs.interactivity, 'warning')

          // Check for redirection
          if (buffer.includes('<!-- SITE_ID:')) {
            const match = buffer.match(/<!-- SITE_ID:(.*?) -->/)
            if (match && match[1]) {
              addLog(t.generate.form.logs.complete, 'success')
              window.location.href = `/website/${match[1]}`
              return
            }
          }
        }
      }
      // Final update
      setPreviewHtml(buffer)

    } catch (error) {
      console.error('Generation failed:', error)
      addLog(`${t.generate.form.logs.error} ${error || 'Unknown error'}`, 'error')
      alert('Failed to generate. Please try again.')
      setLoading(false)
    }
  }

  const styles = [
    {
      id: 'minimal',
      name: t.generate.form.style.minimal,
      desc: t.generate.form.style.minimalDesc,
      class: 'bg-white border-slate-200 text-slate-800 hover:border-slate-400',
      activeClass: 'ring-2 ring-slate-900 border-transparent',
      preview: 'bg-slate-50'
    },
    {
      id: 'vibrant',
      name: t.generate.form.style.vibrant,
      desc: t.generate.form.style.vibrantDesc,
      class: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent hover:brightness-110 shadow-md',
      activeClass: 'ring-2 ring-indigo-500 ring-offset-2',
      preview: 'bg-gradient-to-br from-indigo-500 to-pink-500'
    },
    {
      id: 'corporate',
      name: t.generate.form.style.corporate,
      desc: t.generate.form.style.corporateDesc,
      class: 'bg-zinc-900 text-white border-zinc-700 hover:border-zinc-500 shadow-md',
      activeClass: 'ring-2 ring-blue-500 ring-offset-2',
      preview: 'bg-zinc-800'
    },
    {
      id: 'futuristic',
      name: 'Futuristic',
      desc: 'Sleek, neon, minimal',
      class: 'bg-zinc-950 text-indigo-400 border-indigo-900/50 hover:border-indigo-500/50 shadow-md',
      activeClass: 'ring-2 ring-indigo-500 ring-offset-2',
      preview: 'bg-zinc-900'
    },
    {
      id: 'dark',
      name: t.generate.form.style.dark,
      desc: t.generate.form.style.darkDesc,
      class: 'bg-zinc-950 text-white border-white/20 hover:border-white/50 shadow-md',
      activeClass: 'ring-2 ring-white ring-offset-2',
      preview: 'bg-zinc-900'
    },
    {
      id: 'luxury',
      name: t.generate.form.style.luxury,
      desc: t.generate.form.style.luxuryDesc,
      class: 'bg-neutral-900 text-[#d4af37] border-[#d4af37]/30 hover:border-[#d4af37] shadow-md',
      activeClass: 'ring-2 ring-[#d4af37] ring-offset-2',
      preview: 'bg-neutral-900'
    },
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

      <div className={`animate-fade-in relative z-10 w-full transition-all duration-700 ${loading ? 'max-w-[98vw] h-[calc(100vh-6rem)]' : 'max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12'}`}>

        {/* LEFT COLUMN: FORM */}
        {!loading && (
          <div className="transition-all duration-700 opacity-100 scale-100 flex flex-col justify-center">
            <div className="text-left mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-black drop-shadow-sm"
              >
                {t.generate.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-black/60 text-sm md:text-base font-medium text-balance leading-relaxed"
              >
                {t.generate.desc}
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="relative w-full space-y-8 p-6">

              {/* Prompt Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="prompt" className="text-sm font-semibold text-black flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-primary" />
                    {t.generate.form.promptLabel}
                  </label>
                  <button
                    type="button"
                    onClick={handleInspireMe}
                    className="group/btn text-xs flex items-center gap-1.5 text-primary hover:text-primary/80 transition-all bg-primary/10 px-3 py-1.5 rounded-full font-medium"
                  >
                    <Sparkles className="w-3 h-3 transition-transform group-hover/btn:rotate-12" />
                    {t.generate.form.inspireMe}
                  </button>
                </div>

                <div className="relative group">
                  <div className="relative rounded-2xl bg-transparent border-2 border-primary/20 focus-within:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                    <textarea
                      id="prompt"
                      name="prompt"
                      rows={3}
                      className="w-full bg-transparent text-lg font-light rounded-2xl border-none px-6 py-4 placeholder:text-black/40 focus:ring-0 resize-none transition-all duration-300 leading-relaxed text-black"
                      placeholder={t.generate.form.promptPlaceholder}
                      value={formData.prompt}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Style Selection - V2 Cards */}
              <div className="space-y-4">
                <span className="text-sm font-semibold text-black px-1 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-500" />
                  {t.generate.form.visualStyle}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStyleSelect(s.id)}
                      className={`group relative p-4 rounded-2xl flex flex-col items-start gap-2 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${formData.style === s.id ? 'bg-primary/5 ' + s.activeClass : 'bg-transparent border border-border hover:border-primary/50'
                        } ${s.class.replace('border-2', 'border')}`}
                    >
                      <div className={`w-full h-12 rounded-lg mb-1 ${s.preview} shadow-sm opacity-90 group-hover:opacity-100 transition-opacity ring-1 ring-black/5 dark:ring-white/10`} />
                      <div className="space-y-0.5 z-10 w-full">
                        <span className={`text-sm font-bold leading-none truncate w-full block`}>{s.name}</span>
                        <span className="text-[10px] opacity-70 leading-tight block">{s.desc}</span>
                      </div>
                      {/* Selection Indicator */}
                      {formData.style === s.id && (
                        <div className="absolute top-2 right-2 scale-75">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors & Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Color Picker */}
                <div className="space-y-3">
                  <label htmlFor="color" className="text-sm font-semibold text-black flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-green-500 shadow-sm" />
                    {t.generate.form.primaryColor}
                  </label>
                  <div className="flex items-center gap-4 p-3 bg-transparent rounded-2xl border border-border hover:border-primary/50 transition-all group cursor-pointer shadow-sm hover:shadow-md" onClick={() => document.getElementById('primaryColor')?.click()}>
                    <div className="relative shrink-0">
                      <input
                        type="color"
                        id="primaryColor"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleChange}
                        className="w-10 h-10 rounded-full cursor-pointer border-none p-0 bg-transparent opacity-0 absolute inset-0 z-10"
                      />
                      <div className="w-10 h-10 rounded-full border-2 border-white shadow-md ring-1 ring-gray-100" style={{ backgroundColor: formData.primaryColor }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-medium text-black bg-secondary px-2 py-0.5 roundedElement w-fit mb-0.5">{formData.primaryColor}</span>
                      <span className="text-[10px] text-black/60">{t.generate.form.clickToChange}</span>
                    </div>
                  </div>
                </div>

                {/* Multi-Page Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-black flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    {t.generate.form.includePages}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['About', 'Contact', 'Pricing', 'Blog', 'Features'].map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => {
                          const current = formData.pages || [];
                          const newPages = current.includes(page)
                            ? current.filter(p => p !== page)
                            : [...current, page];
                          setFormData(prev => ({ ...prev, pages: newPages }));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${(formData.pages || []).includes(page)
                          ? 'bg-foreground text-background border-transparent shadow-md transform scale-105'
                          : 'bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:bg-secondary/50'
                          }`}
                      >
                        {(formData.pages || []).includes(page) && <CheckCircle2 className="w-3 h-3 inline mr-1.5 mb-0.5" />}
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit & Lang */}
              <div className="flex items-center gap-4 pt-6 border-t border-border mt-6">
                <div className="flex bg-secondary/50 p-1 rounded-full shrink-0">
                  {(['en', 'az'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setOutputLang(l)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${outputLang === l ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {l === 'en' ? 'EN' : 'AZ'}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.prompt.trim()}
                  className="flex-1 group relative inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-zinc-200 px-8 text-base font-bold text-white dark:text-black shadow-xl shadow-black/10 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" />
                      {t.generate.form.submit}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* RIGHT COLUMN: TERMINAL / PREVIEW */}
        <div className={`relative transition-all duration-700 ease-in-out ${loading ? 'w-full h-full' : 'hidden lg:flex items-center justify-center h-[600px]'}`}>
          <AnimatePresence mode="wait">
            {!loading ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                className="relative w-full h-full p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 rounded-[3rem] blur-3xl opacity-50 animate-pulse" />
                <div className="relative w-full h-full border border-white/10 bg-black/40 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center p-12 group">
                  <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Code2 className="w-10 h-10 text-white/60" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Foundrr Architect</h3>
                  <p className="text-white/40 max-w-sm text-sm leading-relaxed">
                    {t.generate.desc}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="generating"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full flex flex-col lg:flex-row gap-6 p-4"
              >
                {/* TERMINAL UI - CLEAN SANS SERIF CONSOLE */}
                <div className="w-full lg:w-[400px] shrink-0 bg-zinc-950 rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[300px] lg:h-full font-mono relative group">
                  <div className="bg-zinc-900/50 px-4 py-3 flex items-center justify-between border-b border-white/5 backdrop-blur-sm">
                    <div className="flex gap-2 items-center">
                      <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-xs font-medium text-zinc-400">Build Stream</span>
                    </div>
                  </div>

                  <div
                    className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3"
                    ref={logContainerRef}
                  >
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-3 text-[11px] leading-relaxed font-mono tracking-tight animate-fade-in-up">
                        <span className="text-zinc-700 select-none w-4 text-right">{(i + 1)}</span>
                        <span className={`${log.type === 'error' ? 'text-red-400' :
                          log.type === 'success' ? 'text-emerald-400' :
                            log.type === 'warning' ? 'text-amber-400' :
                              'text-zinc-300'
                          }`}>
                          {log.text}
                        </span>
                      </div>
                    ))}
                    <div className="flex gap-3 text-[11px] animate-pulse">
                      <span className="text-zinc-800 select-none w-4 text-right">{(logs.length + 1)}</span>
                      <span className="w-1.5 h-4 bg-zinc-600 block" />
                    </div>
                  </div>
                </div>

                {/* LIVE PREVIEW IFRAME */}
                <div className="flex-1 bg-transparent rounded-xl border border-white/10 shadow-xl overflow-hidden relative">
                  <div className="absolute top-3 right-3 z-50">
                    <div className="bg-zinc-950/80 backdrop-blur text-zinc-400 text-[10px] px-3 py-1.5 rounded-full font-medium border border-white/10 flex items-center gap-2 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live Preview
                    </div>
                  </div>

                  {/* Iframe Container */}
                  <div className="w-full h-full">
                    {previewHtml ? (
                      <iframe
                        srcDoc={previewHtml}
                        className="w-full h-full border-0 bg-white"
                        title="Live Preview"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-3 bg-white/5 backdrop-blur-sm">
                        <Loader2 className="w-6 h-6 animate-spin opacity-20" />
                        <p className="text-xs font-medium opacity-40 uppercase tracking-widest">{t.generate.form.generating}</p>
                      </div>
                    )}

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

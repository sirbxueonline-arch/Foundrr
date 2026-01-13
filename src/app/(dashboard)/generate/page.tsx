
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Wand2, Sparkles, ArrowRight, BookOpen, Code2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { INSPIRATION_PROMPTS } from '@/lib/inspiration-prompts'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GeneratePage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [outputLang, setOutputLang] = useState<'en' | 'az'>('en')

  const [formData, setFormData] = useState<{
    prompt: string;
    style: string;
    pages: string[];
  }>({
    prompt: '',
    style: 'minimal',
    pages: []
  })

  // State for streaming
  const [loading, setLoading] = useState(false)
  const [streamData, setStreamData] = useState('') // Full raw data
  const [previewHtml, setPreviewHtml] = useState('') // Throttled for iframe
  const [logs, setLogs] = useState<string[]>([])

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
  }

  const handleInspireMe = () => {
    const random = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)]
    setFormData(prev => ({ ...prev, ...random }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStreamData('')
    setPreviewHtml('')
    setLogs(['> Initializing Architect Agent...', '> Analysing request...'])

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

      setLogs(prev => [...prev, '> Connection established. Streaming design...'])

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

          // Simple log simulator
          if (chunk.includes('<nav')) setLogs(prev => [...prev, '> Architecting Navigation System...'])
          if (chunk.includes('<header') || chunk.includes('id="hero"')) setLogs(prev => [...prev, '> Designing Hero Section...'])
          if (chunk.includes('class="grid')) setLogs(prev => [...prev, '> Structuring Grid Layouts...'])
          if (chunk.includes('<img')) setLogs(prev => [...prev, '> Selecting Premium Assets...'])
          if (chunk.includes('<section')) setLogs(prev => [...prev, '> Building Content Section...'])
          if (chunk.includes('<form')) setLogs(prev => [...prev, '> Integrating Contact Forms...'])
          if (chunk.includes('<footer')) setLogs(prev => [...prev, '> Finalizing Footer Components...'])
          if (chunk.includes('<script')) setLogs(prev => [...prev, '> Injecting Interactivity...'])

          // Check for redirection
          if (buffer.includes('<!-- SITE_ID:')) {
            const match = buffer.match(/<!-- SITE_ID:(.*?) -->/)
            if (match && match[1]) {
              setLogs(prev => [...prev, '> Generation Complete. Redirecting...'])
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
      setLogs(prev => [...prev, `> Error: ${error || 'Unknown error'}`])
      alert('Failed to generate. Please try again.')
      setLoading(false)
    }
  }

  const styles = [
    { id: 'minimal', name: t.generate.form.style.minimal, desc: t.generate.form.style.minimalDesc },
    { id: 'vibrant', name: t.generate.form.style.vibrant, desc: t.generate.form.style.vibrantDesc },
    { id: 'corporate', name: t.generate.form.style.corporate, desc: t.generate.form.style.corporateDesc },
    { id: 'dark', name: t.generate.form.style.dark, desc: t.generate.form.style.darkDesc },
    { id: 'luxury', name: t.generate.form.style.luxury, desc: t.generate.form.style.luxuryDesc },
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

      <div className={`animate-fade-in relative z-10 w-full transition-all duration-700 ${loading ? 'max-w-[98vw] h-[calc(100vh-6rem)]' : 'max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12'}`}>

        {/* LEFT COLUMN: FORM */}
        {!loading && (
        <div className="transition-all duration-700 opacity-100 scale-100">
          <div className="text-left mb-8">
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
              className="text-muted-foreground text-sm md:text-base font-light text-balance leading-relaxed"
            >
              {t.generate.desc}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="relative w-full space-y-8">

            {/* Prompt Input */}
            <div className="group relative rounded-2xl p-[1px] overflow-hidden">
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,var(--color-primary)_100%)] opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl bg-background backdrop-blur-xl border border-white/10">
                <textarea
                  id="prompt"
                  name="prompt"
                  rows={3}
                  className="w-full bg-transparent text-lg font-light rounded-2xl border-none px-6 py-4 placeholder:text-muted-foreground/50 focus:ring-0 resize-none transition-all duration-300 leading-relaxed"
                  placeholder={t.generate.form.promptPlaceholder}
                  value={formData.prompt}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Style Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{t.generate.form.style.title}</span>
                {/* Inspire Me */}
                <button
                  type="button"
                  onClick={handleInspireMe}
                  className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  {t.generate.form.inspireMe}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleStyleSelect(s.id)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${formData.style === s.id
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary/20'
                      : 'border-border/40 bg-white/5 hover:border-border hover:bg-muted/30'
                      }`}
                  >
                    <div className="text-xs font-bold mb-0.5">{s.name}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{s.desc}</div>
                  </button>
                ))}
              </div>

               {/* Multi-Page Selection */}
               <div className="space-y-4 pt-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Pages & Features</span>
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
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                          (formData.pages || []).includes(page)
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                          : 'bg-background border-border/50 hover:bg-muted'
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
            <div className="flex items-center gap-4 pt-4">
              <div className="flex bg-secondary/50 p-1 rounded-full border border-border/50 shrink-0">
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
                className="flex-1 group relative inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-bold text-background shadow-lg shadow-foreground/20 transition-all hover:scale-[1.02] hover:bg-foreground/90 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    {t.generate.form.submit} <ArrowRight className="h-4 w-4" />
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
                className="relative w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 rounded-[3rem] blur-3xl opacity-50 animate-pulse" />
                <div className="relative w-full h-full border border-white/10 bg-black/40 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center p-12">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10 shadow-inner">
                    <Code2 className="w-10 h-10 text-white/40" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to Build</h3>
                  <p className="text-white/40 max-w-sm">
                    Our AI Architect is standing by. Enter a prompt to start the new streaming engine.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="generating"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full flex flex-col lg:flex-row gap-6"
              >
                {/* TERMINAL UI */}
                <div className="w-full lg:w-[400px] shrink-0 bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[300px] lg:h-full">
                  <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 ml-2">architect-agent — zsh</span>
                  </div>
                  <div
                    className="p-4 font-mono text-[10px] leading-3 text-green-400/80 overflow-y-auto custom-scrollbar flex-1"
                    ref={logContainerRef}
                  >
                     <pre className="whitespace-pre-wrap break-all font-mono">
                        {logs.join('\n')}
                        <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1 align-middle">_</span>
                     </pre>
                  </div>
                </div>

                {/* LIVE PREVIEW IFRAME */}
                <div className="flex-1 bg-white rounded-xl border border-white/10 shadow-2xl overflow-hidden relative group">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full z-50 font-medium border border-white/10 flex items-center gap-2 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_1.5s_infinite]" />
                    LIVE PREVIEW
                  </div>
                  
                  {/* Iframe Container */}
                  <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900">
                    {previewHtml ? (
                       <iframe
                       srcDoc={previewHtml}
                       className="w-full h-full border-0"
                       title="Live Preview"
                     />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                        <Loader2 className="w-8 h-8 animate-spin opacity-20" />
                        <p className="text-sm font-light opacity-50">Waiting for HTML stream...</p>
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

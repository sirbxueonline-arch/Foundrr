'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Terminal, ChevronRight, Minimize2, Maximize2, Loader2, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FoundryAgentProps {
  siteId: string
  activeFile: string
  onUpdate: (filename?: string) => void
  onNavigate?: (filename: string) => void
  className?: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export function FoundryAgent({ siteId, activeFile, onUpdate, onNavigate, className }: FoundryAgentProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Initialising editing environment...", timestamp: new Date().toLocaleTimeString() },
    { role: 'assistant', content: "Ready for instructions. Type a command to edit the site.", timestamp: new Date().toLocaleTimeString() }
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: new Date().toLocaleTimeString() }])
    setInput('')
    setIsLoading(true)

    try {
      // 1. Fetch current HTML from ACTIVE file
      const htmlRes = await fetch(`/api/preview/${siteId}?file=${activeFile}`)
      const currentHtml = await htmlRes.text()

      // 2. Send to Edit API
      const res = await fetch('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          prompt: userMsg,
          currentHtml
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to edit')
      }

      const data = await res.json()

      // 3. Update Success
      if (data.action === 'create') {
        const time = new Date().toLocaleTimeString()
        setMessages(prev => [...prev, { role: 'assistant', content: `Creating file: ${data.filename}... OK`, timestamp: time }])
        onUpdate(data.filename) // Switch to new file
      } else {
        const time = new Date().toLocaleTimeString()
        setMessages(prev => [...prev, { role: 'assistant', content: `Patching ${activeFile}... Success`, timestamp: time }])
        onUpdate(data.filename) // Refresh current
      }

    } catch (error: any) {
      console.error(error)
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}`, timestamp: new Date().toLocaleTimeString() }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col bg-[#1e1e1e] text-green-400 font-mono text-xs overflow-hidden h-full border border-white/10 rounded-xl shadow-2xl", className)}>
      {/* Terminal Header */}
      <div className="flex shrink-0 items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-black/20 select-none">
        <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-1.5 ml-2 text-white/40">
                <Terminal className="w-3 h-3" />
                <span>foundry-agent — zsh</span>
            </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto w-full p-4 space-y-1 custom-scrollbar scroll-smooth">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
               "break-words font-mono",
               msg.role === 'user' ? "text-white font-bold" : "text-green-400"
            )}
          >
             <span className="opacity-40 mr-2 text-[10px] text-white">[{msg.timestamp}]</span>
             {msg.role === 'user' && <span className="mr-2 text-blue-400">➜ ~</span>}
             {msg.role === 'assistant' && <span className="mr-2 text-green-500">{'>'}</span>}
             {msg.content}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-center gap-2 text-yellow-400 animate-pulse mt-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Processing instruction...</span>
            </div>
        )}
        <div className="animate-pulse text-green-500 font-bold mt-1">_</div>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#1e1e1e] border-t border-white/5 shrink-0">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-green-500 shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe change (e.g. 'Make the hero title larger')..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 h-8 font-mono text-xs focus:ring-0"
            disabled={isLoading}
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}

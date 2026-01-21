'use client'

import { useState, useEffect, useRef } from 'react'
import { FoundryAgent } from '@/components/FoundryAgent'
import { Lock, Download, Smartphone, Tablet, Monitor, Sparkles, Rocket, Globe, Pencil, CheckCircle2, Loader2, Languages } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface PreviewWrapperProps {
  siteId: string
  isPaid: boolean
}

export default function PreviewWrapper({ siteId, isPaid }: PreviewWrapperProps) {
  const { t } = useLanguage()
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedImage, setSelectedImage] = useState<{ src: string, id: string } | null>(null)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publicUrl, setPublicUrl] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isTextEditing, setIsTextEditing] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [publishSlug, setPublishSlug] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)

  const handleTranslate = async () => {
    if (!confirm("This will auto-translate all text on the page to Azerbaijani. It might take ~10 seconds. Continue?")) return;
    
    setIsTranslating(true);
    try {
       // Get current HTML
       let currentHtml = '';
       if (iframeRef.current?.contentDocument) {
           currentHtml = iframeRef.current.contentDocument.documentElement.outerHTML;
       } else {
           // Fallback fetch
           const res = await fetch(`/api/preview/${siteId}?file=${activeFile}`);
           currentHtml = await res.text();
       }

       const res = await fetch('/api/translate-content', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ siteId, currentHtml, targetLanguage: 'Azerbaijani' })
       });

       if (!res.ok) throw new Error("Translation failed");
       
       const data = await res.json();
       if (data.html) {
          // Update iframe
          if (iframeRef.current?.contentDocument) {
              iframeRef.current.contentDocument.open();
              iframeRef.current.contentDocument.write(data.html);
              iframeRef.current.contentDocument.close();
          }
          alert("Translation complete! Page updated.");
          setReloadKey(prev => prev + 1); // Force reload to ensure everything syncs
       }

    } catch (e) {
      console.error(e);
      alert("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  }

  const handlePublishSubmit = async () => {
    if (!publishSlug.trim()) return;

    setIsPublishing(true);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        body: JSON.stringify({ siteId, publish: true, slug: publishSlug })
      });

      if (res.status === 409) {
        alert("That name is already taken. Please try another.");
        return;
      }

      if (res.ok) {
        setPublicUrl(publishSlug); // Store SLUG only, we construct URL dynamically
        setIsPublishModalOpen(false);
        // alert(`🚀 Published!`); // Optional, maybe just show the green button state
      } else {
        throw new Error("Failed");
      }
    } catch (e) {
      alert("Failed to publish. Name might be taken or invalid.");
    } finally {
      setIsPublishing(false);
    }
  }

  // Toggle Editor
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'TOGGLE_EDIT_MODE',
        enabled: isTextEditing
      }, '*')
    }
  }, [isTextEditing])

  const captureThumbnail = async () => {
    if (!iframeRef.current?.contentDocument?.body) return;
    try {
        // Dynamic import to avoid SSR issues
        const html2canvas = (await import('html2canvas')).default
        
        const canvas = await html2canvas(iframeRef.current.contentDocument.body, {
            width: 1280, 
            height: 720,
            scale: 0.5, // Reduced scale for smaller file size
            useCORS: true,
            logging: false
        })

        canvas.toBlob(async (blob) => {
            if (!blob) return
            const formData = new FormData()
            formData.append('file', blob)
            formData.append('siteId', siteId)
            
            // Upload in background, don't block UI
            fetch('/api/thumbnail', { method: 'POST', body: formData })
              .catch(e => console.error("Thumbnail upload failed", e))
        }, 'image/jpeg', 0.8)
    } catch (e) {
        console.error("Failed to capture thumbnail", e)
    }
  }

  const handleSaveText = () => {
     if (iframeRef.current?.contentWindow) {
       // Request HTML from child
       iframeRef.current.contentWindow.postMessage({
         type: 'GET_HTML'
       }, '*')
     }
  }

  // Autosave Logic
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Listen for HTML changes from Iframe (for autosave)
  useEffect(() => {
     const handleHtmlChanged = (event: MessageEvent) => {
         if (event.data?.type === 'HTML_CHANGED' && event.data?.html) {
             setHasUnsavedChanges(true);
             
             // Debounce Autosave (2 seconds)
             if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
             
             autosaveTimerRef.current = setTimeout(async () => {
                 try {
                    await fetch('/api/save-site', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ siteId, html: event.data.html })
                    })
                    // Capture Thumbnail silently
                    captureThumbnail();
                    setHasUnsavedChanges(false);
                    // Don't alert on autosave, just save.
                 } catch (e) {
                    console.error("Autosave failed", e);
                 }
             }, 2000);
         }
     }
     window.addEventListener('message', handleHtmlChanged);
     return () => {
        window.removeEventListener('message', handleHtmlChanged);
        if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
     }
  }, [siteId])

  // Listen for manual SAVE_HTML response (Keep existing for button click)
  useEffect(() => {
    const handleSave = async (event: MessageEvent) => {
        if (event.data.type === 'SAVE_HTML' && event.data.html) {
             // Handle manual save
             // Clear any pending autosave to avoid double save
             if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);

             setIsTextEditing(false); // Turn off edit mode
             try {
                await fetch('/api/save-site', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ siteId, html: event.data.html })
                })
                alert("Changes saved successfully!");
                captureThumbnail();
                setReloadKey(prev => prev + 1);
                setHasUnsavedChanges(false);
              } catch (e) {
                console.error('Failed to save', e)
                alert('Failed to save changes')
              }
        }
    }
    window.addEventListener('message', handleSave);
    return () => window.removeEventListener('message', handleSave);
  }, [siteId])

  // Rename features
  const [projectName, setProjectName] = useState("Untitled Project")
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState("")


  // Image Gen Features
  const [imagePrompt, setImagePrompt] = useState("")
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    setIsGeneratingImage(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({ prompt: imagePrompt })
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      if (data.url) {
        setNewImageUrl(data.url);
        setImagePrompt(""); // Clear after success
      }
    } catch (e) {
      console.error(e)
      alert("Generation failed. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  }

  // Multi-page features
  const [activeFile, setActiveFile] = useState("index.html")

  // Listen for navigation events from Iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NAVIGATION' && event.data?.path) {
        // Path might be 'about.html' or '/about.html'
        const cleanPath = event.data.path.replace(/^\//, '')
        setActiveFile(cleanPath)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    // Fetch site details for name
    const fetchSite = async () => {
      try {
        const res = await fetch(`/api/site/${siteId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.name) setProjectName(data.name)
          if (data.is_published && data.slug) setPublicUrl(data.slug)
        }
      } catch (e) {
        console.error("Failed to fetch site details", e)
      }
    }
    fetchSite()
  }, [siteId])

  const handleNameSave = async () => {
    if (!tempName.trim()) {
      setIsEditingName(false)
      return
    }
    const oldName = projectName
    setProjectName(tempName)
    setIsEditingName(false)

    try {
      await fetch(`/api/site/${siteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tempName })
      })
    } catch (e) {
      console.error("Failed to update name", e)
      setProjectName(oldName) // Revert on error
    }
  }

  const handleUpdate = (filename?: string) => {
    if (filename) setActiveFile(filename)
    setReloadKey(prev => prev + 1)
  }

  const handleSaveImage = async () => {
    if (!selectedImage || !iframeRef.current) return

    // 1. Update Iframe Visually
    iframeRef.current.contentWindow?.postMessage({
      type: 'UPDATE_IMAGE',
      oldSrc: selectedImage.src,
      newSrc: newImageUrl
    }, '*')

    // 2. Persist Changes
    setTimeout(async () => {
      if (!iframeRef.current?.contentDocument) return

      const updatedHtml = iframeRef.current.contentDocument.documentElement.outerHTML
      const cleanHtml = updatedHtml.replace(/<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, '')

      try {
        await fetch('/api/save-site', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ siteId, html: cleanHtml })
        })
      } catch (e) {
        console.error('Failed to save', e)
        alert('Failed to save changes')
      }
    }, 100)

    setIsEditorOpen(false)
  }

  // User must click save after this.

  const handleDeleteImage = () => {
    if (!confirm("Are you sure you want to remove this image?")) return;
    setNewImageUrl('https://placehold.co/1x1/transparent/png')
  }



  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col relative bg-muted/20">

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Image Editor Modal */}
      {isEditorOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold tracking-tight">{t?.preview?.editImage || "Edit Image"}</h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t?.preview?.imageUrl || "Image URL"}</label>
                <input
                  className="w-full bg-secondary/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2 pt-4 border-t border-border/50">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">AI Generation</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-secondary/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Describe your image..."
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isGeneratingImage) {
                        handleGenerateImage();
                      }
                    }}
                  />
                  <button
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                    className="px-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium shadow-md hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingImage ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground">Powered by DALL-E 3. High quality generation takes ~15s.</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleDeleteImage}
                className="flex-1 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 font-medium text-sm transition-colors"
              >
                {t?.preview?.deleteImage || "Delete"}
              </button>
              <button
                onClick={handleSaveImage}
                className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
              >
                {t?.preview?.save || "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar - Floating Island Style */}
      <div className="relative z-20 px-10 py-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 bg-background/80 backdrop-blur-md border border-border/40 rounded-full px-5 py-2.5 shadow-sm">
          <Link href="/projects" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
            <Image src="/vercel.svg" alt="Foundry Logo" width={20} height={20} className="invert-0" />
          </Link>
          <span className="text-muted-foreground/40">|</span>

          {isEditingName ? (
            <input
              autoFocus
              className="bg-transparent border-none text-sm font-medium focus:ring-0 w-32 px-0 py-0 h-auto"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSave()
                if (e.key === 'Escape') setIsEditingName(false)
              }}
            />
          ) : (
            <span
              className="font-mono text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
              onDoubleClick={() => {
                setTempName(projectName)
                setIsEditingName(true)
              }}
              title="Double click to rename"
            >
              {projectName}
            </span>
          )}
        </div>


        <div className="pointer-events-auto flex items-center gap-3">
          {/* Responsive Toggle */}
          <div className="flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border/40 rounded-full p-1 shadow-sm mr-2">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-full transition-all ${previewMode === 'mobile' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}
              title="Mobile"
            >
              <Smartphone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-full transition-all ${previewMode === 'tablet' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}
              title="Tablet"
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-full transition-all ${previewMode === 'desktop' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}
              title="Desktop"
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>

          {!isPaid ? (
            <>
              <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 backdrop-blur-md">
                <Lock className="h-3 w-3" />
                {t?.preview?.previewMode || "Preview Mode"}
              </div>
              <Link
                href={`/billing?site=${siteId}`}
                className="group relative inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                <span className="relative z-20 flex items-center gap-2">
                  {t?.preview?.unlock || "Unlock & Download"}
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border/40 rounded-full p-1 shadow-sm">
              <span className="hidden sm:inline-flex text-xs text-emerald-600 font-medium items-center px-3">
                {t?.preview?.paid || "Unlocked"}
              </span>

              {!publicUrl ? (
                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="p-2 rounded-full bg-background border border-border/40 shadow-sm transition-all hover:bg-muted"
                  title="One-Click Publish"
                >
                  <Rocket className="h-4 w-4 text-indigo-600" />
                </button>
              ) : (
                <button
                  onClick={() => {
                     // Check if we are in production or local
                     // For correct subdomain behavior: http://slug.domain.com
                     const rootDomain = window.location.host.replace('www.', '');
                     // If localhost, subdomains might not work without /etc/hosts, 
                     // but we try to construct it anyway as requested.
                     const protocol = window.location.protocol;
                     const targetUrl = `${protocol}//${publicUrl}.${rootDomain}`;
                     window.open(targetUrl, '_blank');
                  }}
                   className="p-2 rounded-full bg-emerald-100 ring-2 ring-emerald-500 shadow-sm transition-all hover:bg-emerald-200"
                   title={`View Live: ${publicUrl}.${typeof window !== 'undefined' ? window.location.host : ''}`}
                >
                    <Globe className="h-4 w-4 text-emerald-600" />
                </button>
              )}

              <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className="p-2 rounded-full bg-indigo-50 border border-indigo-200 shadow-sm transition-all hover:bg-indigo-100 text-indigo-600"
                title="Translate to Azerbaijani"
              >
                 {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
              </button>

              <a
                href={`/api/download/${siteId}`}
                className="inline-flex h-8 items-center justify-center rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                {t?.preview?.download || "Download"}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-8 space-y-6">
             <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Rocket className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Publish to the World</h3>
                <p className="text-sm text-muted-foreground mt-2">
                   Choose a unique subdomain for your site. It will be live instantly.
                </p>
             </div>

             <div className="space-y-4">
                <div>
                   <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Subdomain</label>
                   <div className="flex items-center mt-1.5">
                      <input 
                         className="flex-1 bg-secondary/50 border-0 rounded-l-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-mono text-right"
                         placeholder="my-startup"
                         value={publishSlug}
                         onChange={(e) => setPublishSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                         autoFocus
                      />
                      <div className="bg-muted border border-l-0 border-input rounded-r-xl px-4 py-3 text-sm text-muted-foreground font-mono">
                         .{typeof window !== 'undefined' ? window.location.host.replace('www.', '') : 'site.com'}
                      </div>
                   </div>
                   <p className="text-[10px] text-muted-foreground mt-2 ml-1">
                      Only lowercase letters, numbers, and dashes.
                   </p>
                </div>
             </div>

             <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsPublishModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublishSubmit}
                  disabled={isPublishing || !publishSlug.trim()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center"
                >
                  {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Now"}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Canvas Layout */}
      <div className="flex flex-1 overflow-hidden px-6 pb-6 gap-6 relative z-10">

        {/* Terminal / Assistant Panel (Left, consistent with Generate) */}
        <div className="w-[400px] shrink-0 flex flex-col gap-4">
          <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1e1e1e]">
            <FoundryAgent
              siteId={siteId}
              activeFile={activeFile}
              onUpdate={handleUpdate}
              className="h-full border-0 rounded-none shadow-none"
            />
          </div>
        </div>

        {/* Iframe Container - Main Canvas (Right) */}
        <div className="flex-1 flex flex-col relative min-w-0">
          <div className="flex-1 bg-white rounded-xl border border-white/10 shadow-2xl overflow-hidden relative group">
             {/* Unified Badge */}
             <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full z-50 font-medium border border-white/10 flex items-center gap-2 shadow-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_1.5s_infinite]" />
                LIVE PREVIEW
              </div>

               {/* Editor Controls */}
               <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-full p-1.5 shadow-xl transition-all duration-300">
                 {!isTextEditing ? (
                   <button
                      onClick={() => setIsTextEditing(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-gray-200 transition-colors shadow-sm"
                   >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit Content
                   </button>
                 ) : (
                   <>
                      <button 
                        onClick={() => setIsTextEditing(false)}
                        className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveText}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
                      >
                         <CheckCircle2 className="w-3.5 h-3.5" />
                         Save & Done
                      </button>
                   </>
                 )}
              </div>

            <div
              className={`bg-neutral-100 dark:bg-neutral-900 h-full w-full transition-all duration-500 ease-in-out mx-auto flex items-center justify-center ${previewMode === 'mobile' ? 'max-w-[375px] border-x border-black/10' :
                previewMode === 'tablet' ? 'max-w-[768px] border-x border-black/10' :
                  'w-full'
                }`}
            >
              <iframe
                ref={iframeRef}
                key={`${reloadKey}-${activeFile}`}
                src={`/api/preview/${siteId}?t=${reloadKey}&file=${activeFile}`}
                className="w-full h-full border-0 bg-white"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-modals"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Loader2, Check, X, ShieldAlert, CreditCard, Smartphone, RefreshCw, Layers } from 'lucide-react'
import { format } from 'date-fns'

interface PendingSite {
    id: string
    name: string
    created_at: string
    price: number
    payment_method: string
    payment_identifier: string
    payment_status: string
    user_id: string
}

export default function AdminPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sites, setSites] = useState<PendingSite[]>([])
    const [processingId, setProcessingId] = useState<string | null>(null)

    useEffect(() => {
        fetchPending()
    }, [])

    const fetchPending = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/pending')
            if (res.ok) {
                const data = await res.json()
                setSites(data.sites || [])
            } else {
                const err = await res.json()
                setError(err.error || 'Failed to load sites')
            }
        } catch (e) {
            console.error(e)
            setError('Connection error')
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (siteId: string, action: 'approve' | 'reject') => {
        setProcessingId(siteId)
        try {
            const res = await fetch('/api/admin/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ siteId, action })
            })

            if (res.ok) {
                setSites(prev => prev.filter(s => s.id !== siteId))
            }
        } catch (e) {
            alert('Failed to process')
        } finally {
            setProcessingId(null)
        }
    }

    if (loading && sites.length === 0) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary/80" />
                    <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading secure dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex h-[80vh] flex-col items-center justify-center gap-6 text-center px-4">
                <div className="rounded-full bg-destructive/10 p-4">
                    <ShieldAlert className="h-12 w-12 text-destructive" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Access Restricted</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Connection
                </button>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen pb-20 overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden pointer-events-none">
                <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
                <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            {/* Header Section */}
            <div className="relative pb-12 pt-16 border-b border-white/5 bg-white/5 backdrop-blur-md z-10">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                Secure Admin Grid
                            </h1>
                            <p className="text-lg text-muted-foreground flex items-center gap-2">
                                <ShieldAlert className="h-4 w-4" />
                                Verify and process incoming wire transfers.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl bg-background/50 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-sm ring-1 ring-white/5">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                                <span className="text-sm font-bold text-foreground/80">System Online</span>
                            </div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="text-sm font-medium">
                                <span className="text-primary font-bold">{sites.length}</span> Pending Requests
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 md:px-6 py-12 relative z-10">
                <div className="grid gap-6">
                    {sites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-20 text-center animate-in fade-in zoom-in-95 duration-700 shadow-2xl">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                <div className="relative h-20 w-20 bg-background/80 backdrop-blur-md rounded-2xl shadow-inner border border-white/10 flex items-center justify-center rotate-3 transition-transform hover:rotate-6">
                                    <Layers className="h-10 w-10 text-primary" />
                                </div>
                            </div>
                            <h3 className="font-bold text-3xl tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">Queue Empty</h3>
                            <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
                                All visible payments have been processed successfully. <br /> Listening for new transactions...
                            </p>
                        </div>
                    ) : (
                        sites.map((site) => (
                            <div
                                key={site.id}
                                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg transition-all hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/20"
                            >
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-start justify-between md:justify-start md:items-center gap-4">
                                        <h3 className="font-bold text-2xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                                            {site.name || 'Untitled Project'}
                                        </h3>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)] animate-pulse">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            Action Required
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Created At</p>
                                            <p className="font-mono text-foreground/90 font-medium">{format(new Date(site.created_at), 'MMM d, HH:mm')}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Method</p>
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-md ${site.payment_method === 'm10' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-pink-500/10 text-pink-400'}`}>
                                                    {site.payment_method === 'm10' ? <Smartphone className="h-3.5 w-3.5" /> : <CreditCard className="h-3.5 w-3.5" />}
                                                </div>
                                                <span className="font-medium capitalize">{site.payment_method || 'Wire'}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Amount</p>
                                            <p className="font-bold text-xl text-emerald-500 drop-shadow-sm">$49.99</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Reference ID</p>
                                            <div className="flex items-center gap-2 font-mono text-xs bg-black/20 px-2 py-1 rounded-md border border-white/5 w-fit select-all hover:bg-black/30 cursor-copy">
                                                {site.payment_identifier || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-t-0 mt-2 md:mt-0">
                                    <button
                                        onClick={() => handleAction(site.id, 'reject')}
                                        disabled={!!processingId}
                                        className="flex-1 md:flex-none h-11 px-5 inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/10 bg-white/5 text-sm font-bold transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        {processingId === site.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reject"}
                                    </button>
                                    <button
                                        onClick={() => handleAction(site.id, 'approve')}
                                        disabled={!!processingId}
                                        className="relative flex-1 md:flex-none h-11 px-8 inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        {processingId === site.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Check className="h-4 w-4" />
                                                <span>Approve Payment</span>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

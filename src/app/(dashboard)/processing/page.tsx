'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function ProcessingContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const siteId = searchParams.get('site')
    const { t } = useLanguage()

    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')

    useEffect(() => {
        if (!siteId) return router.push('/')

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/pricing/${siteId}?t=${Date.now()}`)
                if (res.ok) {
                    const data = await res.json()
                    if (data.payment_status === 'approved' || data.paid === true) {
                        setStatus('approved')
                    } else if (data.payment_status === 'rejected') {
                        setStatus('rejected')
                    }
                }
            } catch (error) {
                console.error("Polling error", error)
            }
        }

        // Check initially
        checkStatus()

        // Poll every 5 seconds (faster for better UX)
        const interval = setInterval(checkStatus, 5000)

        if (status === 'approved') clearInterval(interval)

        return () => clearInterval(interval)
    }, [siteId, router, status])

    if (status === 'approved') {
        return (
             <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 overflow-hidden bg-background">
                {/* Background Effects */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden pointer-events-none">
                    <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
                    <div className="absolute top-1/4 -left-4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                </div>

                <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="relative mx-auto h-32 w-32 flex items-center justify-center">
                        <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-full animate-ping opacity-20" />
                        <div className="relative h-28 w-28 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center shadow-lg border border-emerald-200 dark:border-emerald-800">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="56" 
                              height="56" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="3" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="animate-in zoom-in duration-300 delay-150"
                            >
                              <path d="M20 6 9 17l-5-5"/>
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-4xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-500">
                            Payment Approved!
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                            Your website is now fully unlocked and ready for you.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push(`/website/${siteId}`)}
                        className="w-full max-w-sm inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    if (status === 'rejected') {
        return (
             <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 overflow-hidden bg-background">
                {/* Background Effects */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden pointer-events-none">
                    <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
                    <div className="absolute top-1/4 -left-4 w-96 h-96 bg-red-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                </div>

                <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="relative mx-auto h-32 w-32 flex items-center justify-center">
                        <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-ping opacity-20" />
                        <div className="relative h-28 w-28 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center shadow-lg border border-red-200 dark:border-red-800">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="48" 
                              height="48" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="3" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="animate-in zoom-in duration-300 delay-150"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-4xl font-extrabold tracking-tight text-red-600 dark:text-red-500">
                            Payment Rejected
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                            The transaction could not be verified. Please check your details and try again.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 items-center w-full">
                        <button
                            onClick={() => router.push(`/billing?site=${siteId}`)}
                            className="w-full max-w-sm inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => window.open('mailto:support@foundry.com')}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden pointer-events-none">
                <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
                <div className="absolute top-1/4 -left-4 w-96 h-96 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-1/4 -right-4 w-96 h-96 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="relative mx-auto h-24 w-24 flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping opacity-75" />
                    <div className="relative h-20 w-20 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 rounded-full flex items-center justify-center border border-yellow-200/50 backdrop-blur-md">
                        <Loader2 className="h-10 w-10 animate-spin" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                        {t?.payment?.processing?.title || "Payment Processing"}
                    </h2>
                    <p className="text-muted-foreground font-medium">
                        {t?.payment?.processing?.thanks || "Thanks for your payment!"}
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl text-left space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-50 animate-pulse" />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {t?.payment?.processing?.desc}
                        <br /><br />
                        <strong className="text-foreground">{t?.payment?.processing?.wait}</strong>
                        <br />
                        {t?.payment?.processing?.WaitSub}
                    </p>
                </div>

                <button
                    onClick={() => router.push(`/website/${siteId}`)}
                    className="text-primary hover:text-foreground text-sm font-medium transition-colors"
                >
                    {t?.payment?.processing?.return || "Return to Dashboard"}
                </button>
            </div>
        </div>
    )
}

export default function ProcessingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProcessingContent />
        </Suspense>
    )
}

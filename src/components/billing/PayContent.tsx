'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, CreditCard, Smartphone, Check, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'

export function PayContent({ siteId }: { siteId: string }) {
  const router = useRouter()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [priceLoading, setPriceLoading] = useState(true)
  const [paymentIdentifier, setPaymentIdentifier] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'dodo' | 'm10' | 'bank'>('dodo')
  const [isApproved, setIsApproved] = useState(false)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(`/api/pricing/${siteId}`)
        if (res.ok) {
          const data = await res.json()
          // price removed
          // If already paid, redirect or show success immediately
          if (data.paid || data.payment_status === 'approved') {
            setIsApproved(true)
          }
        } else {
          const err = await res.json()
          console.error("Pricing fetch failed:", err)
        }
      } catch (e) {
        console.error("Failed to fetch price", e)
      } finally {
        setPriceLoading(false)
      }
    }
    if (siteId) fetchPrice()
  }, [siteId])


  const handlePaymentComplete = async () => {
    setLoading(true)
    try {
      if (paymentMethod === 'dodo') {
        const res = await fetch('/api/dodo/create-checkout', {
          method: 'POST',
          body: JSON.stringify({ siteId }),
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if (data.paymentLink) {
          window.location.href = data.paymentLink
          // Loading state will persist until redirect
          return
        } else {
          throw new Error(data.error || 'Failed to create checkout')
        }
      }

      // Manual handling for m10 and bank
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          paymentIdentifier,
          paymentMethod
        })
      })

      if (!res.ok) {
        throw new Error('Payment verification failed')
      }

      router.push(`/processing?site=${siteId}`)

    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (isApproved) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative mx-auto h-32 w-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-20" />
            <div className="relative h-28 w-28 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center shadow-lg boarder border-green-200 dark:border-green-800">
              <Check className="h-14 w-14" strokeWidth={3} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-green-600 dark:text-green-500">
              Payment Approved!
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
              Your website has been successfully unlocked. You now have full access to your project.
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

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center p-4 overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden">
        <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 -left-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/4 -right-4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 relative z-10">
        <div className="bg-gradient-to-br from-primary/10 to-transparent px-6 py-8 text-center relative border-b border-white/5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-6">{t?.payment?.title || "Unlock This Website"}</h1>

          <div className="space-y-3 mb-2 max-w-sm mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 shadow-inner">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{t?.payment?.breakdown?.website || "Static Website Price"}</span>
              <span className="font-mono">49.99 {t?.payment?.currency || "USD"}</span>
            </div>
            {/* Service fee removed/included */}
            <div className="h-px w-full bg-border/50 my-2" />
            <div className="flex justify-between text-base font-bold text-foreground">
              <span>{t?.payment?.breakdown?.total || "Total Payable"}</span>
              <div className="flex items-center gap-1">
                {priceLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="font-mono text-primary text-xl">49.99 {t?.payment?.currency || "USD"}</span>}
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground/60 max-w-xs mx-auto">
            {t?.payment?.desc || "Secure lifetime ownership. No monthly fees."}
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8 bg-gradient-to-b from-white/5 to-transparent">
          {/* Payment Method Toggle */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-white/5 relative isolate">
            <button
              onClick={() => setPaymentMethod('dodo')}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all duration-300",
                paymentMethod === 'dodo'
                  ? "text-primary bg-background shadow-md ring-1 ring-black/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <CreditCard className="w-4 h-4" />
              <span>Card</span>
            </button>
            <button
              onClick={() => setPaymentMethod('m10')}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all duration-300",
                paymentMethod === 'm10'
                  ? "text-primary bg-background shadow-md ring-1 ring-black/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <Smartphone className="w-4 h-4" />
              <span>m10</span>
            </button>
            <button
              onClick={() => setPaymentMethod('bank')}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all duration-300",
                paymentMethod === 'bank'
                  ? "text-primary bg-background shadow-md ring-1 ring-black/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <Building2 className="w-4 h-4" />
              <span>Bank</span>
            </button>
          </div>

          <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {paymentMethod === 'dodo' && (
              <div className="w-full text-center space-y-6">
                <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full flex items-center justify-center animate-pulse">
                  <CreditCard className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Secure Card Payment</h3>
                  <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                    Pay securely with your Credit or Debit card via Dodo Payments.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'm10' && (
              <>
                <div className="relative group perspective-1000">
                  <div className="bg-white p-4 rounded-2xl border border-white/20 shadow-xl transition-all duration-700 transform-gpu rotate-0 scale-100 opacity-100">
                    <img src="/qr-code.png" alt="Payment QR Code" className="w-48 h-48 object-cover mix-blend-multiply" />
                  </div>
                </div>
                <p className="text-sm text-center max-w-[240px] opacity-100 translate-y-0 transition-all duration-500">
                  <span className="text-muted-foreground">{t?.payment?.scanText} </span>
                  <span className="font-bold text-foreground bg-secondary/50 px-1.5 py-0.5 rounded text-xs">{t?.payment?.scanApp}</span>
                </p>
              </>
            )}

            {paymentMethod === 'bank' && (
              <div className="w-full bg-secondary/20 p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Building2 className="w-24 h-24 -rotate-12" />
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2 shadow-inner">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground tracking-tight">{t?.payment?.bankTransfer}</h4>
                  <p className="text-xs text-muted-foreground">{t?.payment?.sendTo}</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/5 font-mono text-sm tracking-widest shadow-sm select-all cursor-pointer hover:bg-background/80 transition-colors flex justify-between items-center group/copy"
                  onClick={() => navigator.clipboard.writeText("4169738838982290")}
                >
                  <span>4169 7388 3898 2290</span>
                  <span className="text-[10px] text-primary opacity-0 group-hover/copy:opacity-100 transition-opacity">COPY</span>
                </div>
                <p className="text-xs text-muted-foreground/60 font-medium px-1">{t?.payment?.name}</p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/5 space-y-6">
            {paymentMethod !== 'dodo' && (
              <div className="space-y-2.5">
                <label htmlFor="payment-id" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                  {t?.payment?.verificationLabel}
                </label>
                <div className="relative">
                  <input
                    id="payment-id"
                    type="text"
                    placeholder={paymentMethod === 'm10' ? t?.payment?.m10Placeholder : t?.payment?.cardPlaceholder}
                    className="flex h-12 w-full rounded-xl border border-input/50 bg-background/50 px-4 py-2 text-base shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus:border-primary transition-all"
                    value={paymentIdentifier}
                    onChange={(e) => setPaymentIdentifier(e.target.value)}
                  />
                  <div className="absolute right-3 top-3.5 text-xs text-muted-foreground/40 pointer-events-none">
                    ID
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground/60 px-1">
                  {t?.payment?.verifyHelp}
                </p>
              </div>
            )}

            <button
              onClick={handlePaymentComplete}
              disabled={loading || !siteId || (paymentMethod !== 'dodo' && !paymentIdentifier.trim())}
              className="group relative w-full inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{paymentMethod === 'dodo' ? "Redirecting..." : (t?.payment?.btnVerify || "Verifying...")}</span>
                  </>
                ) : (
                  <>
                    {paymentMethod === 'dodo' ? <CreditCard className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                    <span>{paymentMethod === 'dodo' ? "Pay Now" : (t?.payment?.btnSent || "Confirm Payment")}</span>
                  </>
                )}
              </div>
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground opacity-60">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Secure SSL</span>
              <span>•</span>
              <span>{paymentMethod === 'dodo' ? 'Encrypted Payment' : 'Official Bank Transfer'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

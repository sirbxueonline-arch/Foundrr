'use client'

import React from 'react'
import Link from 'next/link'
import { Check, X, Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { APP_CONFIG, getTotalPrice } from '@/lib/constants'

export function PricingCards() {
    const { t, lang } = useLanguage()

    return (
        <section className="pb-24">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 items-start">

                    {/* Free Plan */}
                    <div className="rounded-3xl border border-border p-8 bg-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="mb-8 text-center">
                            <h3 className="text-lg font-medium text-muted-foreground">{lang === 'az' ? 'Yaradıcılıq' : 'Creation'}</h3>
                            <div className="text-5xl font-bold mt-4 mb-2">0 <span className="text-2xl font-normal text-muted-foreground">USD</span></div>
                            <p className="text-sm text-muted-foreground">{lang === 'az' ? 'Sınaq üçün mükəmməldir' : 'Perfect for experimenting'}</p>
                        </div>
                        <ul className="space-y-4 mb-8 w-fit mx-auto text-left">
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                {lang === 'az' ? 'Limitsiz AI Generasiyası' : 'Unlimited AI Generation'}
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                {lang === 'az' ? 'Dizayn Redaktoru' : 'Visual Design Editor'}
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                {lang === 'az' ? 'İstənilən vaxt önizləmə' : 'Preview Anytime'}
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <X className="w-5 h-5 shrink-0" />
                                {lang === 'az' ? 'HTML Yükləmə yoxdur' : 'No HTML Download'}
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <X className="w-5 h-5 shrink-0" />
                                {lang === 'az' ? 'Xüsusi Domen yoxdur' : 'No Custom Domain Hosting'}
                            </li>
                        </ul>
                        <Link href="/login" className="block w-full py-3 rounded-xl border border-input bg-background hover:bg-muted text-center font-medium transition-colors">
                            {lang === 'az' ? 'Pulsuz Başla' : 'Start for Free'}
                        </Link>
                    </div>

                    {/* Pro Plan - UPDATED for Single Payment Options breakdown */}
                    <div className="rounded-3xl border border-primary/20 bg-background shadow-2xl relative overflow-hidden ring-1 ring-primary/20">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                        <div className="p-8">
                            <div className="mb-8 text-center">
                                <h3 className="text-lg font-bold text-primary tracking-tight">{lang === 'az' ? 'Tam Sahiblik' : 'Full Ownership'}</h3>

                                <div className="mt-6 mb-4 space-y-2 bg-muted/40 p-4 rounded-xl border border-border/50 text-sm">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>{lang === 'az' ? 'Saytın Qiyməti' : 'Website Price'}</span>
                                        <span>{APP_CONFIG.PRICING.WEBSITE_PRICE}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>{lang === 'az' ? 'Xidmət Haqqı' : 'Service Fee'}</span>
                                        <span>{APP_CONFIG.PRICING.SERVICE_FEE.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px w-full bg-border/50 my-1" />
                                    <div className="flex justify-between items-baseline font-bold text-lg text-foreground">
                                        <span>{lang === 'az' ? 'Cəmi' : 'Total'}</span>
                                        <span className="flex items-baseline gap-1">
                                            {getTotalPrice()} <span className="text-sm font-normal text-muted-foreground">{APP_CONFIG.PRICING.CURRENCY}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{lang === 'az' ? 'Birdəfəlik ödəniş. Abunəlik yoxdur.' : 'One-time payment. No subscriptions.'}</p>
                            <ul className="space-y-4 mb-8 w-fit mx-auto text-left">
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <div className="p-1 rounded-full bg-green-500/10 text-green-600 shrink-0"><Check className="w-3 h-3" /></div>
                                    {lang === 'az' ? 'HTML/CSS Koduna Tam Çıxış' : 'Full HTML/CSS Code Access'}
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <div className="p-1 rounded-full bg-green-500/10 text-green-600 shrink-0"><Check className="w-3 h-3" /></div>
                                    {lang === 'az' ? 'Dərhal Yükləmə (ZIP)' : 'Instant Download (ZIP)'}
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <div className="p-1 rounded-full bg-green-500/10 text-green-600 shrink-0"><Check className="w-3 h-3" /></div>
                                    {lang === 'az' ? 'Kommersiya İstifadə Hüququ' : 'Commercial Usage Rights'}
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <div className="p-1 rounded-full bg-green-500/10 text-green-600 shrink-0"><Check className="w-3 h-3" /></div>
                                    {lang === 'az' ? 'SEO üçün Hazır Kod' : 'SEO Optimized Code'}
                                </li>
                            </ul>
                            <Link href="/login" className="block w-full py-3 rounded-xl bg-primary text-primary-foreground text-center font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                                {lang === 'az' ? 'İndi Başla' : 'Get Started'}
                            </Link>
                        </div>
                        <div className="bg-muted/50 p-4 text-center text-xs text-muted-foreground border-t border-border/50">
                            {lang === 'az' ? '30 gün pulun geri qaytarılması zəmanəti' : '30-day money-back guarantee'}
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="rounded-3xl border border-border p-8 bg-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="mb-8 text-center">
                            <h3 className="text-lg font-medium text-muted-foreground">{lang === 'az' ? 'Agentlik' : 'Agency'}</h3>
                            <div className="text-3xl font-bold mt-4 mb-2">{lang === 'az' ? 'Razılaşma ilə' : 'Custom Quote'}</div>
                            <p className="text-sm text-muted-foreground">{lang === 'az' ? 'Mürəkkəb layihələr üçün xüsusi həllər' : 'For complex projects needing extra power'}</p>
                        </div>
                        <ul className="space-y-4 mb-8 w-fit mx-auto text-left">
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                {lang === 'az' ? 'İstifadəçi Girişi və Auth' : 'User Login & Authentication'}
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                {lang === 'az' ? 'Backend İnteqrasiyası' : 'Backend Database Integration'}
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                {lang === 'az' ? 'Çoxsəhifəli Dizayn' : 'Multi-page Custom Design'}
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                {lang === 'az' ? 'Ödəniş Sistemləri' : 'Payment Frameworks'}
                            </li>
                        </ul>
                        <a href={`mailto:${APP_CONFIG.COMPANY.EMAIL}`} className="block w-full py-3 rounded-xl border border-indigo-500/20 bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-center font-bold transition-colors">
                            {lang === 'az' ? 'Bizimlə Əlaqə' : 'Contact Us'}
                        </a>
                    </div>

                </div>
            </div>
        </section>
    )
}

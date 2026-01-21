'use client'

import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { Shield, Zap, Code2, Smartphone } from 'lucide-react'
import { PricingCards } from './PricingCards'

export default function PricingPage({ user }: { user: any }) {
    const { t, lang } = useLanguage()

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar user={user} />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-background">
                    <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-4">
                        {lang === 'az' ? 'Sadə və Şəffaf' : 'Simple & Transparent'}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
                        {lang === 'az' ? 'Sayt başına bir qiymət.' : 'One price per website.'} <br />
                        {lang === 'az' ? 'Abunəlik yoxdur.' : 'No subscriptions ever.'}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                        {lang === 'az'
                            ? 'Yalnız saytınız hazır olduqda ödəniş edin. Gizli aylıq ödəniş yoxdur. Ömürlük sahiblik.'
                            : 'Pay only when you\'re ready to launch. No hidden monthly fees. Lifetime ownership.'}
                    </p>
                </div>
                </section>

                {/* Pricing Cards */}
                <PricingCards />

                {/* FAQ Style Grid */}
                <section className="py-24 bg-muted/30 border-t border-border/40">
                    <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">{lang === 'az' ? 'Kod mənimdir?' : 'Is the code mine?'}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? 'Bəli. Ödəniş etdikdən sonra kodu yükləyə bilərsiniz. Heç bir asılılıq yoxdur, istənilən yerdə yerləşdirin.' : 'Yes. Once you pay, you own the code. You can download it and host it anywhere (Netlify, Vercel, FTP). No lock-in.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 shrink-0">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">{lang === 'az' ? 'Təhlükəsizlik?' : 'Is payment secure?'}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? 'Biz bank səviyyəsində təhlükəsizlikdən istifadə edirik. Məlumatlarınız şifrələnir və qorunur.' : 'We use bank-level SSL encryption. Your payment details are processed securely through trusted providers.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 shrink-0">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">{lang === 'az' ? 'Dəyişikliklər edə bilərəm?' : 'Can I edit later?'}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? 'Bəli. Ödənişsiz dəyişikliklər edə və yenidən yükləyə bilərsiniz.' : 'Yes. You can come back, use our AI to make edits, and re-download the updated code anytime for free.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 shrink-0">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">{lang === 'az' ? 'Saytlar mobildir?' : 'Are sites mobile ready?'}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? '100%. Bütün saytlar responsivdir və mobil cihazlar üçün optimallaşdırılıb.' : '100%. All generated websites are fully responsive and optimized for mobile, tablet, and desktop.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    )
}

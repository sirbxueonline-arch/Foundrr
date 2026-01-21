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
                <section className="relative pt-32 pb-24 overflow-hidden bg-background">
                    <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
                    <div className="container px-4 relative z-10 text-center max-w-4xl mx-auto space-y-8">
                        
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-secondary-foreground backdrop-blur-md shadow-sm">
                            <span className="relative flex h-2 w-2 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            {lang === 'az' ? 'Sadə və Şəffaf' : 'Simple, Transparent, Honest'}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance">
                            {lang === 'az' ? 'Sayt başına bir qiymət.' : 'One price per website.'} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                {lang === 'az' ? 'Abunəlik yoxdur.' : 'Own the code forever.'}
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed text-balance">
                            {lang === 'az'
                                ? 'Yalnız saytınız hazır olduqda ödəniş edin. Gizli aylıq ödəniş yoxdur. Ömürlük sahiblik.'
                                : 'Stop renting your website. Pay once, download the React/HTML code, and host it anywhere you want.'}
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <PricingCards />

                {/* Trust / FAQ Grid */}
                <section className="py-24 bg-secondary/20 border-t border-border/40">
                    <div className="container px-4 md:px-6 max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">{lang === 'az' ? 'Tez-tez verilən suallar' : 'Frequently Asked Questions'}</h2>
                            <p className="text-muted-foreground">{lang === 'az' ? 'Ən çox soruşulan suallar' : 'Everything you need to know about ownership and tech.'}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                    <Code2 className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">{lang === 'az' ? 'Kod mənimdir?' : 'Do I really own the code?'}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? 'Bəli. Ödəniş etdikdən sonra kodu yükləyə bilərsiniz. Heç bir asılılıq yoxdur, istənilən yerdə yerləşdirin.' : 'Yes. 100%. Once you pay, you receive a ZIP file with the React and HTML source code. You can host it on Vercel, Netlify, or your own server.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">{lang === 'az' ? 'Təhlükəsizlik?' : 'Is payment secure?'}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? 'Biz bank səviyyəsində təhlükəsizlikdən istifadə edirik. Məlumatlarınız şifrələnir və qorunur.' : 'We use Stripe and modern encryption standards. Your credit card data never touches our servers directly.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">{lang === 'az' ? 'Dəyişikliklər edə bilərəm?' : 'Can I edit the site later?'}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? 'Bəli. Ödənişsiz dəyişikliklər edə və yenidən yükləyə bilərsiniz.' : 'Yes. You can use our AI editor to specific changes, regenerate, and re-download the updated code anytime without paying again for the same project.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                                    <Smartphone className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">{lang === 'az' ? 'Saytlar mobildir?' : 'Is it mobile responsive?'}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {lang === 'az' ? '100%. Bütün saytlar responsivdir və mobil cihazlar üçün optimallaşdırılıb.' : 'Absolutely. Every site is built with Tailwind CSS mobile-first classes, ensuring perfect rendering on phones, tablets, and desktops.'}
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

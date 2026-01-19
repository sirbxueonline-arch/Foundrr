"use client";

import { Zap, Shield, Layout, Code, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from '@/contexts/LanguageContext'

export function Features() {
  const { t } = useLanguage()
  const featureList = [
    {
      title: t.features.items[0].title,
      description: t.features.items[0].description,
      icon: Zap,
      className: "md:col-span-2",
    },
    {
      title: t.features.items[1].title,
      description: t.features.items[1].description,
      icon: Code,
      className: "md:col-span-1",
    },
    {
      title: t.features.items[2].title,
      description: t.features.items[2].description,
      icon: Smartphone,
      className: "md:col-span-1",
    },
    {
      title: t.features.items[3].title,
      description: t.features.items[3].description,
      icon: Globe,
      className: "md:col-span-2",
    }
  ];

  return (
    <section id="features" className="py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
            {t.features.title} <br />
            {t.features.titleBr}
          </h2>
          <p className="text-muted-foreground text-lg text-balance">
            {t.features.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureList.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-zinc-900/30 p-8 hover:bg-zinc-900/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 ${feature.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-px bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

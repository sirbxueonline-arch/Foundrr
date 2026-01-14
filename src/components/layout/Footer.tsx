'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} foundrr. {t.footer.copyright}
          </p>
          <p className="text-center text-xs text-muted-foreground/60">
            Made by <a href="https://foundrr.online" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Foundrr Group</a>
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

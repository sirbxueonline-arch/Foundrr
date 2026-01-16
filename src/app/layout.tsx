import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "foundrr | Pay Once Website Builder | No Subscriptions",
  description: "Generate a complete, downloadable business website in seconds. You own the code forever. Production-ready HTML, SEO-optimized, and zero monthly fees.",
  icons: {
    icon: "/vercel.svg",
  },
};

import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className="antialiased">
      <body className={cn("min-h-screen bg-background font-sans text-foreground", inter.className)}>
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <Analytics />
        </LanguageProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17879734187"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17879734187');
          `}
        </Script>
      </body>
    </html>
  );
}

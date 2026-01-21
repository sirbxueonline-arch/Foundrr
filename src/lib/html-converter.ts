export function convertHtmlToReact(html: string): string {
    // 1. Basic cleaning
    let code = html
        .replace(/class=/g, 'className=')
        .replace(/<!--/g, '{/*')
        .replace(/-->/g, '*/}')
        .replace(/onclick/g, 'onClick')
        .replace(/tabindex/g, 'tabIndex')
        .replace(/autoplay/g, 'autoPlay')
        .replace(/frameborder/g, 'frameBorder')
        .replace(/allowfullscreen/g, 'allowFullScreen')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin')
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/aria-hidden/g, 'aria-hidden') // revert aria-hidden as it is valid in React
        
    // 2. Handle self-closing tags explicitly if needed (HTML5 is usually lenient, but JSX is strict)
    // Common tags: img, input, br, hr, link, meta
    // We add a slash if missing. Regex is tricky, but let's try a simple approach for common cases.
    code = code.replace(/<img([^>]*)>/g, '<img$1 />')
    code = code.replace(/<input([^>]*)>/g, '<input$1 />')
    code = code.replace(/<br>/g, '<br />')
    code = code.replace(/<hr>/g, '<hr />')
    code = code.replace(/<link([^>]*)>/g, '<link$1 />')
    code = code.replace(/<meta([^>]*)>/g, '<meta$1 />')

    // 3. Fix styles (style="...") -> style={{...}}
    // This is complex to regex. We might just comment out styles or use a placeholder if too hard.
    // For now, let's just warn: "Styles converted to string might fail". 
    // Actually, simple string styles crash React. We will strip style attributes for safety or try to parse.
    // Let's strip style attributes for now to avoid crashes, as Tailwind is primary.
    code = code.replace(/ style="[^"]*"/g, '')

    // 4. Handle standard event handlers with placeholders
    code = code.replace(/onClick="[^"]*"/g, 'onClick={() => {}}')
    
    // 5. Wrap in Component
    return `
'use client'

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function GeneratedPage() {
  return (
    <>
      <Head>
        <title>Generated Site</title>
      </Head>
      <div className="w-full min-h-screen bg-white text-slate-900">
        ${code}
      </div>
    </>
  )
}
`
}

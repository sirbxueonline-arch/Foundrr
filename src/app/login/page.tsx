'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Suspense, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')
    if (error || errorDescription) {
      setMessage(errorDescription || error)
    }
  }, [searchParams])

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setMessage('Check your email for the confirmation link.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/generate')
        router.refresh()
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      setMessage(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            {isSignUp ? t.login.createAccount : t.login.signIn}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignUp ? t.login.startBuilding : t.login.welcomeBack}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setMessage(null); }}
              className={cn(
                "w-1/2 rounded-l-md border py-2 text-sm font-medium focus:z-10 focus:ring-1 focus:ring-ring",
                !isSignUp ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-input hover:bg-muted/80"
              )}
            >
              {t.login.signIn}
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setMessage(null); }}
              className={cn(
                "w-1/2 rounded-r-md border py-2 text-sm font-medium focus:z-10 focus:ring-1 focus:ring-ring",
                isSignUp ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-input hover:bg-muted/80"
              )}
            >
              {t.login.signUp}
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleEmailAuth}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-foreground ring-1 ring-inset ring-ring placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-foreground ring-1 ring-inset ring-ring placeholder:text-muted-foreground focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                  placeholder="Password"
                />
              </div>
            </div>

            {message && (
              <div className={cn("text-sm text-center p-2 rounded", message.includes('Check') ? 'bg-secondary text-secondary-foreground' : 'bg-destructive/10 text-destructive')}>
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? t.login.signUp : t.login.signIn}
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">{t.login.orContinue}</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex w-full justify-center items-center rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Ensure keys exist to prevent crashes
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
     console.error('Middleware Error: Missing Supabase Environment Variables');
     return response; // Return cleanly instead of crashing
  }

  try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              })
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              )
            },
          },
        }
      )

      const { data: { user } } = await supabase.auth.getUser()
  } catch (e) {
      console.error('Middleware Supabase Error:', e);
      // Continue without user if auth fails
  }
  
  // Define user for scope (since try block scope is different)
  // Re-fetch user in try block is not accessible here easily without refactoring scopes.
  // Instead, let's just use empty user if failed.
  // Actually, simplified approach:
  let user = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
           const supabase = createServerClient(
             process.env.NEXT_PUBLIC_SUPABASE_URL,
             process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
             {
               cookies: {
                 getAll() {
                   return request.cookies.getAll()
                 },
                 setAll(cookiesToSet) {
                   cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                   response = NextResponse.next({
                     request: {
                       headers: request.headers,
                     },
                   })
                   cookiesToSet.forEach(({ name, value, options }) =>
                     response.cookies.set(name, value, options)
                   )
                 },
               },
             }
           )
           const { data } = await supabase.auth.getUser()
           user = data.user
      } catch (e) {
           console.error('Middleware Auth Error', e)
      }
  }

  // SUBDOMAIN HANDLING
  const hostname = request.headers.get('host') || ''
  
  // Define allowed domains (localhost for dev, actual domain for prod)
  // Adjust 'foundrr.site' to your actual domain if different.
  const currentHost = process.env.NODE_ENV === 'production' 
      ? 'foundrr.site' // CHANGE THIS to your production domain if different
      : 'localhost:3000'; // Port matters in dev often, but host header usually includes it.
                          // Actually, 'localhost:3000' might get complicated. 
                          // Better: Just check if subdomain exists.

  // Simplified Subdomain Logic:
  // If hostname is NOT exactly 'foundrr.site' (or www) AND NOT 'localhost:3000', treat as subdomain.
  
  // Clean hostname (remove port)
  const domain = hostname.split(':')[0];
  const isLocalhost = domain === 'localhost';
  const isVercelDomain = domain.endsWith('.vercel.app'); // Handle preview deployments? Maybe too complex for now.
  
  // We assume main domain is where the app lives. 
  // If subdomain is present, it will look like: "demo.foundrr.site"
  
  // Let's rely on determining if it IS a subdomain.
  // Strategy: If host includes '.', and it's not 'www', and it's not the main app domain.
  
  // For local dev with subdomains, users usually map 'test.localhost' in /etc/hosts.
  
  let subdomain = null;
  
  if (isLocalhost) {
      // Logic for test.localhost
      // But standard 'localhost' has no subdomain.
      // If user accesses 'test.localhost:3000', hostname is 'test.localhost:3000'.
      // domain is 'test.localhost'.
      const parts = domain.split('.');
      if (parts.length > 1 && parts[0] !== 'www') {
          subdomain = parts[0];
      }
  } else {
     // Production Logic
     // Host: demo.foundrr.site
     // Parts: ['demo', 'foundrr', 'site']
     // If main domain is 'foundrr.site', we look for anything before it.
     
     // IMPORTANT: You must configure this 'next_public_root_domain' env var.
     // Fallback to 'foundrr.site' if not set, but better to force env.
     const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN; 
     
     if (rootDomain && domain.endsWith(rootDomain) && domain !== rootDomain && domain !== `www.${rootDomain}`) {
         subdomain = domain.replace(`.${rootDomain}`, '');
     }
  }

  if (subdomain) {
      // Rewrite to internal route
      // We process the route internally as /site/[subdomain]
      // But we must preserve the path (e.g. /about) if we support multi-page in future.
      // Current path: request.nextUrl.pathname
      
      const path = request.nextUrl.pathname;

      // EXCLUDE API REQUESTS from rewrite
      // We want sub.domain.com/api/... to go to the main api handler, NOT /site/sub/api/...
      if (path.startsWith('/api')) {
         return response;
      }
      
      // Rewrite
      return NextResponse.rewrite(new URL(`/site/${subdomain}${path}`, request.url));
  }

  // STANDARD APP ROUTING (No subdomain)
  if (request.nextUrl.pathname.startsWith('/billing') && !user) {
     return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

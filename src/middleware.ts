import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
    '/billing(.*)',
    '/api/generate(.*)',
    '/api/save-site(.*)',
    // Add other protected API routes if needed, but strict matcher is safer
]);

export default clerkMiddleware(async (auth, req) => {
    // 1. Protect routes
    if (isProtectedRoute(req)) {
        await auth.protect();
    }

    // 2. Subdomain Logic (Adapted from proxy.ts)
    const hostname = req.headers.get("host") || "";

    // Clean hostname (remove port)
    const domain = hostname.split(':')[0];
    const isLocalhost = domain === 'localhost';

    let subdomain = null;

    if (isLocalhost) {
        // Logic for test.localhost
        const parts = domain.split('.');
        if (parts.length > 1 && parts[0] !== 'www') {
            subdomain = parts[0];
        }
    } else {
        // Production Logic
        const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
        if (rootDomain && domain.endsWith(rootDomain) && domain !== rootDomain && domain !== `www.${rootDomain}`) {
            subdomain = domain.replace(`.${rootDomain}`, '');
        }
    }

    if (subdomain) {
        const path = req.nextUrl.pathname;
        // Exclude API requests from rewrite
        if (path.startsWith('/api')) {
            return NextResponse.next();
        }

        // Rewrite to internal route
        return NextResponse.rewrite(new URL(`/site/${subdomain}${path}`, req.url));
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

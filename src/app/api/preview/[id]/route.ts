import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  // Extract ID from URL since context params might not work well in route.ts depending on folder structure
  // Actually in App Router, params are passed as 2nd arg.
  // Folder: src/app/api/preview/[id]/route.ts

  const { id } = await context.params

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch { }
        },
      },
    }
  )

  // 1. Get record to find path
  const { data: site, error } = await supabase
    .from('websites')
    .select('html_path, user_id')
    .eq('id', id)
    .single()

  if (error || !site) {
    return new NextResponse('Site not found', { status: 404 })
  }

  // Determine file to serve
  const url = new URL(request.url)
  const requestedFile = url.searchParams.get('file') || 'index.html'

  // Security: Prevent directory traversal
  if (requestedFile.includes('/') || requestedFile.includes('..')) {
    return new NextResponse('Invalid file path', { status: 400 })
  }

  // Construct path. Assuming standard structure: user_id/site_id/filename
  // OR derive from html_path which is likely user_id/site_id/index.html
  const pathParts = site.html_path.split('/')
  const directory = pathParts.slice(0, -1).join('/')
  const filePath = `${directory}/${requestedFile}`

  // 2. Download HTML
  const { data: fileData, error: downloadError } = await supabase.storage
    .from('websites')
    .download(filePath)

  if (downloadError || !fileData) {
    // If specific file not found (e.g. initial load of a new route that doesn't exist yet but was linked),
    // we might want to return 404.
    return new NextResponse('Content not found', { status: 404 })
  }

  // 3. Return raw HTML
  // We don't need to check ownership to VIEW the site? 
  // "Generate a complete, professional website... Preview it."
  // Usually previews are public or link-based.
  // The User Request says "Route: /website/[site_id] ... Render generated site as a real page"
  // It implies anyone with link can view? "Users can access only their own sites" under AUTHENTICATION.
  // BUT "Preview... If NOT paid... banner... If paid... no banner".
  // The requirements also say "Users can access only their own sites".
  // This implies strict ownership check for viewing? Or just managing?
  // "Preview page... Render generated site".
  // If I enforce ownership, I can't share the preview with others.
  // But strictly interpreting "Users can access only their own sites" under Authentication section likely refers to the Dashboard/Management/Download.
  // However, I will err on side of caution: If "Users can access only their own sites" is a security rule, I should enforce it.
  // BUT, usually previews are shareable.
  // Let's look at "SECURITY RULES": "All ownership checks server-side".
  // "Websites linked to user_id".
  // I will enforce ownership check for now, to be safe. If they want shareable, they can request it.
  // Wait, if I enforce ownership, I need to be logged in to view `/website/[id]`.
  // Middleware handles basic auth protection if I configured it for `/website/`.
  // Let's check middleware.ts. I only protected `/pay` and `/dashboard` (conceptually).
  // I should check if user is logged in and owns the site in `page.tsx` or here.

  // Actually, for the Preview API, if `page.tsx` (the shell) does the check, the iframe content might still be accessible if guessed?
  // Secure approach: Check ownership here too.

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    // If not logged in, maybe allow if it's just a raw preview? 
    // But "Users can access only their own sites" is strong language.
    // I'll return 401.
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { data: ownership } = await supabase
    .from('websites')
    .select('user_id')
    .eq('id', id)
    .single()

  if (ownership?.user_id !== user.id) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // 4. INJECT EDITOR SCRIPT (For interactive editing)
  // This script allows the parent window to know when an image is clicked.

  const editorScript = `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        // Analytics
        fetch('/api/track?siteId=' + '${id}');

        // Intercept Links
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.getAttribute('href')?.endsWith('.html')) {
                e.preventDefault();
                e.stopPropagation();
                const href = link.getAttribute('href');
                window.parent.postMessage({
                    type: 'NAVIGATION',
                    path: href
                }, '*');
                return;
            }

            if (e.target.tagName === 'IMG') {
             // Only if NOT in visual edit mode (which handles its own clicks)
             if (!document.body.classList.contains('visual-editor-active')) {
                e.preventDefault();
                e.stopPropagation();
                window.parent.postMessage({
                  type: 'IMAGE_SELECTED',
                  src: e.target.src,
                  id: e.target.id || 'img-' + Math.random().toString(36).substr(2, 9),
                }, '*');
             }
            }
        }, true);

        // Listen for updates from Parent
        window.addEventListener('message', (event) => {
          if (event.data.type === 'UPDATE_IMAGE') {
             // ... existing image update logic
             const { oldSrc, newSrc } = event.data;
             const images = document.querySelectorAll('img');
             images.forEach(img => {
               if (img.src === oldSrc) {
                 img.src = newSrc;
               }
             });
          }
        });
      });
    </script>
  `;
  
  const { visualEditorScript } = require('@/lib/visual-editor-script'); 
  // Note: Using require or import above. Since this is a route handler file, 
  // let's stick to the import we added in the previous step but fix the usage.
  
  const combinedScript = editorScript + (visualEditorScript || '');

  // Inject before closing body tag
  const htmlContent = await fileData.text();
  const htmlWithScript = htmlContent.replace('</body>', `${combinedScript}</body>`);

  return new NextResponse(htmlWithScript, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  })
}

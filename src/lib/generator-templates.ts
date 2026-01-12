
export const TEMPLATES = {
  NAVBAR: `
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="container mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2">
           <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white"><i class="fas fa-layer-group"></i></div>
           <span class="text-xl font-bold tracking-tight text-gray-900">BRAND_NAME</span>
        </div>
        <div class="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#features" class="hover:text-black transition-colors">Features</a>
          <a href="#how-it-works" class="hover:text-black transition-colors">How it works</a>
          <a href="#testimonials" class="hover:text-black transition-colors">Testimonials</a>
          <a href="#pricing" class="hover:text-black transition-colors">Pricing</a>
        </div>
        <div class="flex items-center gap-4">
            <a href="/login" class="hidden md:block text-sm font-medium hover:text-black">Log in</a>
            <button class="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">Get Started</button>
        </div>
      </div>
    </nav>
  `,

  HERO_MODERN: `
    <section class="relative pt-32 pb-20 overflow-hidden bg-white">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-8 animate-fade-in-up">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            New Version 2.0 Released
          </div>
          <h1 class="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
            Build faster with <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600">Intelligence.</span>
          </h1>
          <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The platform that empowers teams to ship cleaner code in record time. 
            Automated workflows, AI-driven insights, and seamless deployment.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button class="w-full sm:w-auto px-8 py-4 rounded-xl bg-black text-white font-semibold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">Start Building Free</button>
             <button class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <i class="fab fa-github"></i> Star on GitHub
             </button>
          </div>
        </div>
        
        <div class="relative max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden group">
           <div class="absolute top-0 w-full h-11 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
           </div>
           <img src="/api/images/proxy?query=dashboard app ui analytics" alt="App Dashboard" class="w-full h-auto mt-11 opacity-90 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>
  `,

  HERO_DARK: `
    <section class="relative pt-32 pb-20 overflow-hidden bg-zinc-950 text-white">
      <div class="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-8">
                <h1 class="text-5xl md:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    Master your <br/> digital workflow.
                </h1>
                <p class="text-xl text-zinc-400 leading-relaxed max-w-lg">
                    A complete toolkit for modern creators. Design, prototype, and ship your next masterpiece without leaving the browser.
                </p>
                <div class="flex items-center gap-4">
                    <button class="px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors">Get Started</button>
                    <button class="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-lg font-bold hover:bg-white/20 transition-colors">Documentation</button>
                </div>
                <div class="flex items-center gap-4 pt-4 text-sm text-zinc-500">
                    <div class="flex -space-x-2">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" class="w-8 h-8 rounded-full border-2 border-zinc-950"/>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" class="w-8 h-8 rounded-full border-2 border-zinc-950"/>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" class="w-8 h-8 rounded-full border-2 border-zinc-950"/>
                    </div>
                    <p>Trusted by 10,000+ creators</p>
                </div>
            </div>
            <div class="relative">
                <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                <div class="relative bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl">
                    <img src="/api/images/proxy?query=dark mode interface dashboard code" class="rounded-xl w-full h-auto" />
                </div>
            </div>
        </div>
      </div>
    </section>
  `,

  BENTO_GRID: `
    <section id="features" class="py-24 bg-gray-50">
       <div class="container mx-auto px-6">
           <div class="text-center max-w-2xl mx-auto mb-16">
               <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-4">Everything you need to scale</h2>
               <p class="text-gray-600 text-lg">Powerful features wrapped in a beautiful interface. Designed for speed and built for performance.</p>
           </div>
           
           <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
               <!-- Large Card -->
               <div class="col-span-1 md:col-span-2 row-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow group overflow-hidden relative">
                   <div class="relative z-10">
                       <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                           <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                       </div>
                       <h3 class="text-2xl font-bold text-gray-900 mb-3">Real-time Analytics</h3>
                       <p class="text-gray-600">Monitor your performance metrics in real-time with our advanced dashboard. Identify trends before they happen.</p>
                   </div>
                   <img src="/api/images/proxy?query=analytics graph chart" class="absolute bottom-0 right-0 w-3/4 translate-y-10 translate-x-10 group-hover:translate-x-5 transition-transform opacity-80" />
               </div>

               <!-- Tall Card -->
               <div class="col-span-1 md:col-span-1 row-span-2 bg-zinc-900 rounded-3xl p-8 shadow-sm flex flex-col justify-between overflow-hidden relative group">
                   <div class="relative z-10">
                       <h3 class="text-xl font-bold text-white mb-2">Dark Mode</h3>
                       <p class="text-zinc-400 text-sm">Easy on the eyes, perfect for night owls.</p>
                   </div>
                   <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                   <img src="/api/images/proxy?query=abstract dark neon" class="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-110 transition-transform duration-700" />
               </div>

               <!-- Wide Small Card -->
               <div class="col-span-1 md:col-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
                   <i class="fas fa-shield-alt text-2xl text-violet-600 mb-4"></i>
                   <h3 class="font-bold text-gray-900">Bank-grade Security</h3>
               </div>

               <!-- Wide Small Card -->
               <div class="col-span-1 md:col-span-1 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-purple-200">
                   <i class="fas fa-bolt text-2xl mb-4"></i>
                   <h3 class="font-bold">Lightning Fast</h3>
               </div>
           </div>
       </div>
    </section>
  `,

  FOOTER: `
    <footer class="bg-white border-t border-gray-100 pt-16 pb-8">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                <div class="col-span-2">
                    <span class="text-xl font-bold tracking-tight text-gray-900 mb-4 block">BRAND_NAME</span>
                    <p class="text-gray-500 text-sm max-w-xs">Making the world more productive, one pixel at a time. Designed with love in San Francisco.</p>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Product</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><a href="#" class="hover:text-black">Features</a></li>
                        <li><a href="#" class="hover:text-black">Pricing</a></li>
                        <li><a href="#" class="hover:text-black">API</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Company</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><a href="/about" class="hover:text-black">About</a></li>
                        <li><a href="#" class="hover:text-black">Careers</a></li>
                        <li><a href="/contact" class="hover:text-black">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><a href="#" class="hover:text-black">Privacy</a></li>
                        <li><a href="#" class="hover:text-black">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>&copy; 2024 Brand Inc. All rights reserved.</p>
                <div class="flex gap-4 mt-4 md:mt-0">
                    <i class="fab fa-twitter hover:text-black cursor-pointer"></i>
                    <i class="fab fa-github hover:text-black cursor-pointer"></i>
                    <i class="fab fa-linkedin hover:text-black cursor-pointer"></i>
                </div>
            </div>
        </div>
    </footer>
  `
}

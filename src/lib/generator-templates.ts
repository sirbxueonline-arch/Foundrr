
export const TEMPLATES = {
    NAVBAR: `
    <nav class="fixed top-0 w-full z-50 glass transition-all duration-300" id="navbar">
      <div class="container mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" onclick="navigateTo('home')">
           <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"><i class="fas fa-layer-group"></i></div>
           <span class="text-xl font-bold tracking-tight text-slate-900">BRAND_NAME</span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <button onclick="navigateTo('home')" class="hover:text-indigo-600 transition-colors">Home</button>
          <button onclick="navigateTo('features')" class="hover:text-indigo-600 transition-colors">Features</button>
          <button onclick="navigateTo('about')" class="hover:text-indigo-600 transition-colors">About</button>
          <button onclick="navigateTo('pricing')" class="hover:text-indigo-600 transition-colors">Pricing</button>
          <button onclick="navigateTo('contact')" class="hover:text-indigo-600 transition-colors">Contact</button>
        </div>
        
        <div class="flex items-center gap-4">
            <button onclick="navigateTo('login')" class="hidden md:block text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors">Log in</button>
            <button onclick="navigateTo('signup')" class="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-white">Get Started</button>
            
            <!-- Mobile Menu Button -->
            <button class="md:hidden text-2xl text-slate-900 focus:outline-none" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </div>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div id="mobile-menu" class="hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 flex flex-col gap-4 shadow-2xl md:hidden transition-all duration-300 origin-top transform">
          <button onclick="navigateTo('home'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600">Home</button>
          <button onclick="navigateTo('features'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600">Features</button>
          <button onclick="navigateTo('about'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600">About</button>
          <button onclick="navigateTo('pricing'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600">Pricing</button>
          <button onclick="navigateTo('contact'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600">Contact</button>
          <div class="h-px bg-gray-100 my-2"></div>
          <button onclick="navigateTo('login'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600">Log in</button>
          <button onclick="navigateTo('signup'); toggleMobileMenu()" class="text-center font-bold py-3 px-4 rounded-lg bg-slate-900 text-white shadow-md">Get Started</button>
      </div>
    </nav>
  `,

    // ... (Keep HERO sections as is or assume they are picked up from previous context if not replacing full file) ...
    // Note: I am replacing chunks, but this tool call assumes I replace the WHOLE file if I don't check offsets.
    // The previous view_file allowed me to see lines. I'll use multi_replace or specific ranges if I can.
    // But here I'm replacing lines 3-40 (Navbar) and 472-534 (Login/Signup) and 580-630 (Router).
    // The tool `replace_file_content` says "SINGLE CONTIGUOUS block". I should use `multi_replace_file_content`.

    // Wait, I will use multi_replace_file_content to do it all at once.


    HERO_MODERN: `
    <section id="home" class="page-section relative pt-32 pb-20 overflow-hidden bg-white min-h-screen flex flex-col justify-center">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-16" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-8 hover:bg-gray-200 transition-colors cursor-pointer">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            New Version 2.0 Released
          </div>
          <h1 class="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 mb-8 leading-[1.1]">
            Build faster with <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 animate-gradient">Intelligence.</span>
          </h1>
          <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            The platform that empowers teams to ship cleaner code in record time. 
            Automated workflows, AI-driven insights, and seamless deployment.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
             <button onclick="navigateTo('signup')" class="group w-full sm:w-auto px-8 py-4 rounded-xl bg-black text-white font-semibold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20">
                Start Building Free 
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
             </button>
             <button onclick="window.open('https://github.com', '_blank')" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <i class="fab fa-github"></i> Star on GitHub
             </button>
          </div>
        </div>
        
        <div class="relative max-w-6xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden group perspective-1000" data-aos="fade-up" data-aos-delay="300">
           <div class="absolute top-0 w-full h-11 bg-gray-50/80 backdrop-blur border-b border-gray-200 flex items-center px-4 gap-2 z-20">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
           </div>
           <img src="/api/images/proxy?query=dashboard app ui analytics" alt="App Dashboard" class="w-full h-auto mt-11 transform transition-transform duration-700 group-hover:scale-[1.01]" />
           
           <!-- Floating Elements -->
           <div class="absolute -right-12 top-1/3 p-4 bg-white rounded-xl shadow-xl border border-gray-100 animate-float hidden md:block">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><i class="fas fa-arrow-up"></i></div>
                 <div>
                    <div class="text-xs text-gray-500">Revenue</div>
                    <div class="font-bold text-gray-900">+124%</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  `,

    HERO_DARK: `
    <section id="home" class="page-section relative pt-32 pb-20 overflow-hidden bg-zinc-950 text-white min-h-screen flex flex-col justify-center">
      <div class="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-8" data-aos="fade-right">
                <h1 class="text-6xl md:text-8xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    Master your <br/> digital workflow.
                </h1>
                <p class="text-xl text-zinc-400 leading-relaxed max-w-lg">
                    A complete toolkit for modern creators. Design, prototype, and ship your next masterpiece without leaving the browser.
                </p>
                <div class="flex items-center gap-4">
                    <button onclick="navigateTo('signup')" class="px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors hover:scale-105 transform duration-200">Get Started</button>
                    <button onclick="navigateTo('features')" class="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-lg font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">Explore Features</button>
                </div>
                <div class="flex items-center gap-4 pt-4 text-sm text-zinc-500">
                    <div class="flex -space-x-4">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" class="w-10 h-10 rounded-full border-2 border-zinc-950"/>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" class="w-10 h-10 rounded-full border-2 border-zinc-950"/>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" class="w-10 h-10 rounded-full border-2 border-zinc-950"/>
                    </div>
                    <div class="pl-2">
                        <div class="text-white font-bold">10,000+</div>
                        <div class="text-xs">Trusted Creators</div>
                    </div>
                </div>
            </div>
            <div class="relative" data-aos="fade-left">
                <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                <div class="relative bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 z-10"></div>
                    <img src="/api/images/proxy?query=dark mode interface dashboard code" class="rounded-xl w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                </div>
            </div>
        </div>
      </div>
    </section>
  `,

    HERO_NEOBRUTAL: `
    <section id="home" class="page-section relative pt-32 pb-20 bg-[#FFFDF5] min-h-screen flex items-center border-b-4 border-black">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
            <div class="inline-block bg-[#FF6B6B] border-4 border-black px-6 py-2 transform -rotate-2 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default">
                <span class="font-black text-white uppercase tracking-wider">Early Access</span>
            </div>
            <h1 class="text-6xl md:text-8xl font-black text-black mb-8 leading-none uppercase" data-aos="fade-up">
                Build <span class="bg-[#4ECDC4] border-4 border-black px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white inline-block transform rotate-1">LOUD</span> and <br/>
                <span class="bg-[#FFE66D] border-4 border-black px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-1">Proud.</span>
            </h1>
            <p class="text-2xl font-bold text-black border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10 max-w-2xl mx-auto transform rotate-1" data-aos="fade-up" data-aos-delay="100">
                Stop being subtle. Make an impact with bold borders, high contrast, and zero compromises.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center" data-aos="fade-up" data-aos-delay="200">
                 <button onclick="navigateTo('signup')" class="px-8 py-4 bg-[#FF6B6B] border-4 border-black font-black text-xl text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all">
                    START NOW
                 </button>
                 <button onclick="navigateTo('features')" class="px-8 py-4 bg-white border-4 border-black font-black text-xl text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all">
                    LEARN MORE
                 </button>
            </div>
        </div>
      </div>
    </section>
  `,

    HERO_RETRO: `
    <section id="home" class="page-section relative pt-32 pb-20 bg-[#000080] min-h-screen flex items-center justify-center font-mono">
      <div class="container mx-auto px-6 text-center text-white">
         <div class="border-2 border-white bg-[#C0C0C0] text-black w-full max-w-3xl mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" data-aos="zoom-in">
            <div class="bg-[#000080] text-white px-2 py-1 flex justify-between items-center bg-gradient-to-r from-[#000080] to-[#1084d0]">
                <span class="font-bold">Welcome.exe</span>
                <div class="flex gap-1">
                    <button class="w-4 h-4 bg-[#C0C0C0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center text-black leading-none">_</button>
                    <button class="w-4 h-4 bg-[#C0C0C0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center text-black leading-none">□</button>
                    <button class="w-4 h-4 bg-[#C0C0C0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center text-black leading-none">x</button>
                </div>
            </div>
            <div class="p-8 text-center bg-[#C0C0C0]">
                <h1 class="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight" style="text-shadow: 2px 2px 0 #fff;">
                    THE FUTURE <br/> IS PIXELATED
                </h1>
                <p class="text-lg text-black mb-8 leading-relaxed font-bold">
                    EST. 1999 // LOADING ASSETS... <span class="animate-pulse">|</span>
                </p>
                <div class="flex justify-center gap-4">
                    <button onclick="navigateTo('signup')" class="px-6 py-2 bg-[#C0C0C0] border-2 border-white border-b-black border-r-black text-black font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white active:bg-gray-400">
                        CLICK_ME
                    </button>
                     <button onclick="navigateTo('features')" class="px-6 py-2 bg-[#C0C0C0] border-2 border-white border-b-black border-r-black text-black font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white active:bg-gray-400">
                        READ_DOCS
                    </button>
                </div>
            </div>
         </div>
      </div>
    </section>
  `,

    HERO_CREATIVE: `
    <section id="home" class="page-section relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-50">
      <div class="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div class="container mx-auto px-6 relative z-10 text-center">
         <span class="inline-block py-1 px-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest mb-6" data-aos="fade-down">Portfolio 2024</span>
         <h1 class="text-7xl md:text-[10rem] font-black text-black mb-8 leading-none tracking-tighter mix-blend-multiply" data-aos="zoom-in">
            CREATE <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">IMPACT.</span>
         </h1>
         <p class="text-xl md:text-3xl text-gray-600 max-w-2xl mx-auto mb-12 font-light" data-aos="fade-up" data-aos-delay="100">
            Award-winning digital designer crafting brands that refuse to be ignored.
         </p>
         <div class="flex justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
            <button onclick="navigateTo('work')" class="group relative px-10 py-5 bg-black text-white text-xl font-bold rounded-full overflow-hidden hover:scale-105 transition-transform">
                <span class="relative z-10">View Work</span>
                <div class="absolute inset-0 bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
         </div>
      </div>
    </section>
  `,

    HERO_SAAS: `
    <section id="home" class="page-section py-32 bg-white min-h-screen flex items-center">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center gap-20">
                <div class="flex-1 space-y-8" data-aos="fade-right">
                    <h1 class="text-6xl font-bold text-slate-900 leading-tight">
                        Turn your traffic into <br/>
                        <span class="text-blue-600 underline decoration-blue-200 underline-offset-8">Revenue</span> instantly.
                    </h1>
                    <p class="text-xl text-slate-600 leading-relaxed">
                        The #1 platform for marketers who want to ship landing pages without waiting for engineering. Built for speed, optimized for conversion.
                    </p>
                    
                    <form class="flex gap-4 max-w-md p-2 bg-white border border-slate-200 rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-blue-100 transition-all" onsubmit="event.preventDefault(); navigateTo('signup')">
                        <input type="email" placeholder="Enter your work email" class="flex-1 px-4 py-3 rounded-lg outline-none text-slate-900 placeholder:text-slate-400" />
                        <button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">Start Trial</button>
                    </form>
                    
                    <div class="flex items-center gap-6 text-sm text-slate-500 font-medium">
                        <span class="flex items-center gap-2"><div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600"><i class="fas fa-check text-xs"></i></div> No credit card</span>
                        <span class="flex items-center gap-2"><div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600"><i class="fas fa-check text-xs"></i></div> 14-day free trial</span>
                    </div>
                </div>
                <div class="flex-1 relative" data-aos="fade-left">
                    <div class="absolute top-10 -right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                    <div class="absolute -bottom-10 -left-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                    <div class="relative bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 rotate-1 hover:rotate-0 transition-transform duration-500">
                        <img src="/api/images/proxy?query=saas dashboard analytics white" class="rounded-xl w-full border border-slate-50" />
                        
                         <!-- Floating Badge -->
                        <div class="absolute -left-6 bottom-12 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                            <div class="flex -space-x-3">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" class="w-8 h-8 rounded-full border-2 border-white"/>
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" class="w-8 h-8 rounded-full border-2 border-white"/>
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3" class="w-8 h-8 rounded-full border-2 border-white"/>
                            </div>
                            <div class="text-sm font-bold text-slate-700">1k+ Signups</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </section>
  `,

    HERO_LUXURY: `
    <section id="home" class="page-section relative pt-32 pb-20 bg-black text-white min-h-screen flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
        <div class="container mx-auto px-6 relative z-10 text-center">
             <div class="w-px h-24 bg-gradient-to-b from-transparent to-yellow-600 mx-auto mb-8" data-aos="fade-down"></div>
             <h2 class="text-sm font-serif tracking-[0.3em] text-yellow-500 uppercase mb-6" data-aos="fade-up">Est. 2024</h2>
             <h1 class="text-6xl md:text-8xl font-serif font-thin text-white mb-8 leading-tight tracking-wide" data-aos="fade-up" data-aos-delay="100">
                ELEGANCE <br/>
                <span class="italic font-light text-white/80">REDEFINED</span>
             </h1>
             <p class="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-12 font-serif leading-relaxed italic" data-aos="fade-up" data-aos-delay="200">
                "Simplicity is the ultimate sophistication." <br/> — Leonardo da Vinci
             </p>
             <div class="flex flex-col items-center gap-6" data-aos="fade-up" data-aos-delay="300">
                <button onclick="navigateTo('work')" class="px-12 py-4 border border-yellow-600/50 text-yellow-500 font-serif hover:bg-yellow-600/10 transition-colors uppercase tracking-widest text-sm">
                    Discover Collection
                </button>
             </div>
        </div>
    </section>
  `,

    BENTO_GRID: `
    <section id="features" class="page-section py-24 bg-gray-50">
       <div class="container mx-auto px-6">
           <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
               <h2 class="text-4xl font-bold tracking-tight text-gray-900 mb-4">Everything you need to scale</h2>
               <p class="text-gray-600 text-lg">Powerful features wrapped in a beautiful interface. Designed for speed and built for performance.</p>
           </div>
           
           <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
               <!-- Large Card -->
               <div class="col-span-1 md:col-span-2 row-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative cursor-default" data-aos="fade-up" data-aos-delay="100">
                   <div class="relative z-10">
                       <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                           <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                       </div>
                       <h3 class="text-2xl font-bold text-gray-900 mb-3">Real-time Analytics</h3>
                       <p class="text-gray-600 leading-relaxed mb-6">Monitor your performance metrics in real-time with our advanced dashboard. Identify trends before they happen.</p>
                       <button onclick="navigateTo('features')" class="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">Learn more <i class="fas fa-arrow-right ml-2 text-xs"></i></button>
                   </div>
                   <img src="/api/images/proxy?query=analytics graph chart" class="absolute bottom-0 right-0 w-3/4 translate-y-10 translate-x-10 group-hover:translate-x-5 transition-transform opacity-80" />
               </div>

               <!-- Tall Card -->
               <div class="col-span-1 md:col-span-1 row-span-2 bg-zinc-900 rounded-3xl p-8 shadow-lg flex flex-col justify-between overflow-hidden relative group" data-aos="fade-up" data-aos-delay="200">
                   <div class="relative z-10">
                       <h3 class="text-xl font-bold text-white mb-2">Dark Mode</h3>
                       <p class="text-zinc-400 text-sm">Easy on the eyes, perfect for night owls.</p>
                   </div>
                   <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                   <img src="/api/images/proxy?query=abstract dark neon" class="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-110 transition-transform duration-700 opacity-60" />
                   <div class="relative z-10">
                        <div class="w-full bg-white/10 backdrop-blur border border-white/10 rounded-lg p-3">
                            <div class="flex items-center gap-2 mb-2">
                                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                <div class="h-2 w-16 bg-white/20 rounded-full"></div>
                            </div>
                            <div class="space-y-1">
                                <div class="h-1 w-full bg-white/10 rounded-full"></div>
                                <div class="h-1 w-2/3 bg-white/10 rounded-full"></div>
                            </div>
                        </div>
                   </div>
               </div>

               <!-- Wide Small Card -->
               <div class="col-span-1 md:col-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="300">
                   <i class="fas fa-shield-alt text-3xl text-violet-600 mb-4"></i>
                   <h3 class="font-bold text-gray-900 text-lg mb-2">Bank-grade Security</h3>
                   <p class="text-sm text-gray-500">AES-256 encryption standard.</p>
               </div>

               <!-- Wide Small Card -->
               <div class="col-span-1 md:col-span-1 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow" data-aos="fade-up" data-aos-delay="400">
                   <i class="fas fa-bolt text-3xl mb-4 text-yellow-300"></i>
                   <h3 class="font-bold text-lg mb-2">Lightning Fast</h3>
                    <p class="text-sm text-purple-100">Global CDN deployment.</p>
               </div>
           </div>
       </div>
    </section>
  `,

    GALLERY: `
    <section id="work" class="page-section py-24 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold mb-12" data-aos="fade-right">Selected Work</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" data-aos="fade-up">
                    <img src="/api/images/proxy?query=minimal architecture building" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                        <span class="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project Alpha</span>
                        <span class="text-gray-300 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Architecture / Design</span>
                    </div>
                </div>
                <div class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                    <img src="/api/images/proxy?query=modern interior design" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                         <span class="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project Beta</span>
                        <span class="text-gray-300 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Interior / Living</span>
                    </div>
                </div>
                <div class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                    <img src="/api/images/proxy?query=abstract art 3d render" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                         <span class="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project Gamma</span>
                        <span class="text-gray-300 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Art / 3D</span>
                    </div>
                </div>
                <div class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" data-aos="fade-up">
                    <img src="/api/images/proxy?query=product photography camera" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                         <span class="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project Delta</span>
                        <span class="text-gray-300 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Product / Tech</span>
                    </div>
                </div>
                <div class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                    <img src="/api/images/proxy?query=fashion model editorial" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                         <span class="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project Epsilon</span>
                        <span class="text-gray-300 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Fashion / Style</span>
                    </div>
                </div>
                <div class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                    <img src="/api/images/proxy?query=graphic design poster" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
                         <span class="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project Zeta</span>
                        <span class="text-gray-300 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Print / Media</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `,

    TESTIMONIALS: `
    <section id="testimonials" class="page-section py-24 bg-zinc-50">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-16" data-aos="fade-up">Trusted by the best</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="0">
                    <div class="flex gap-1 text-yellow-400 mb-4">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="text-gray-600 mb-6 leading-relaxed">"This platform completely transformed how we handle our workflow. The efficiency gains are unmatched."</p>
                    <div class="flex items-center gap-4">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=k" class="w-10 h-10 rounded-full bg-gray-50" />
                        <div>
                            <h4 class="font-bold text-sm">Sarah Johnson</h4>
                            <p class="text-xs text-gray-500">CTO at TechFlow</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex gap-1 text-yellow-400 mb-4">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="text-gray-600 mb-6 leading-relaxed">"The best investment we've made this year. The support team is incredible and the features are top-notch."</p>
                    <div class="flex items-center gap-4">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=m" class="w-10 h-10 rounded-full bg-gray-50" />
                        <div>
                            <h4 class="font-bold text-sm">Michael Chen</h4>
                            <p class="text-xs text-gray-500">Product Manager</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex gap-1 text-yellow-400 mb-4">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="text-gray-600 mb-6 leading-relaxed">"Simple, intuitive, and powerful. It does exactly what it says on the tin, and does it well."</p>
                    <div class="flex items-center gap-4">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=j" class="w-10 h-10 rounded-full bg-gray-50" />
                        <div>
                            <h4 class="font-bold text-sm">Jessica Williams</h4>
                            <p class="text-xs text-gray-500">Freelancer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `,

    PRICING: `
    <section id="pricing" class="page-section py-24 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
                 <h2 class="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
                 <p class="text-gray-500 text-lg">No hidden fees. Cancel anytime.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <!-- Basic -->
                <div class="p-8 rounded-3xl border border-gray-200 hover:border-blue-500 transition-colors bg-white hover:shadow-lg" data-aos="fade-up" data-aos-delay="0">
                    <h3 class="font-bold text-lg mb-2">Basic</h3>
                    <div class="text-4xl font-bold mb-6">$19<span class="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-600">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> 1 User</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> 5 Projects</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> Basic Analytics</li>
                    </ul>
                    <button onclick="navigateTo('signup')" class="w-full py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition-colors">Get Started</button>
                </div>
                
                <!-- Pro -->
                <div class="p-8 rounded-3xl bg-zinc-900 text-white relative shadow-2xl transform md:-translate-y-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>
                    <h3 class="font-bold text-lg mb-2">Pro</h3>
                    <div class="text-4xl font-bold mb-6">$49<span class="text-lg text-gray-400 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-300">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> 5 Users</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> Unlimited Projects</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> Advanced Analytics</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> Priority Support</li>
                    </ul>
                    <button onclick="navigateTo('signup')" class="w-full py-3 rounded-xl bg-blue-600 font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 hover:scale-[1.02]">Get Started</button>
                </div>

                <!-- Enterprise -->
                <div class="p-8 rounded-3xl border border-gray-200 hover:border-blue-500 transition-colors bg-white hover:shadow-lg" data-aos="fade-up" data-aos-delay="200">
                    <h3 class="font-bold text-lg mb-2">Enterprise</h3>
                    <div class="text-4xl font-bold mb-6">$99<span class="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-600">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> Unlimited Users</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> SSO & Security</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> Custom Integration</li>
                    </ul>
                    <button onclick="navigateTo('contact')" class="w-full py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition-colors">Contact Sales</button>
                </div>
            </div>
        </div>
    </section>
  `,

    CONTACT: `
    <section id="contact" class="page-section py-24 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100" data-aos="fade-up">
                <h2 class="text-3xl font-bold mb-6 text-center">Get in touch</h2>
                <form class="space-y-6" onsubmit="event.preventDefault(); alert('Message sent!');">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-gray-700">First Name</label>
                            <input type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 outline-none transition-all" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-gray-700">Last Name</label>
                            <input type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 outline-none transition-all" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-semibold text-gray-700">Email</label>
                        <input type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 outline-none transition-all" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-semibold text-gray-700">Message</label>
                        <textarea rows="4" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 outline-none transition-all"></textarea>
                    </div>
                    <button class="w-full py-4 bg-black text-white font-bold rounded-xl hover:opacity-90 transition-opacity">Send Message</button>
                </form>
            </div>
        </div>
    </section>
  `,

    FAQ: `
    <section id="faq" class="page-section py-24 bg-white">
        <div class="container mx-auto px-6 max-w-3xl">
            <h2 class="text-3xl font-bold text-center mb-12" data-aos="fade-up">Frequently Asked Questions</h2>
            <div class="space-y-4">
                <div class="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer bg-gray-50 hover:bg-white" data-aos="fade-up" onclick="this.classList.toggle('active')">
                    <div class="flex justify-between items-center">
                        <h3 class="font-bold text-lg text-gray-900">How does the free trial work?</h3>
                        <i class="fas fa-chevron-down transform transition-transform group-[.active]:rotate-180 text-gray-400"></i>
                    </div>
                    <p class="hidden group-[.active]:block mt-3 text-gray-600 leading-relaxed animate-fade-in">
                        You get full access to all features for 14 days. No credit card required. At the end of the trial, you can choose to upgrade or remain on the free tier.
                    </p>
                </div>
                <div class="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer bg-gray-50 hover:bg-white" data-aos="fade-up" data-aos-delay="100" onclick="this.classList.toggle('active')">
                     <div class="flex justify-between items-center">
                        <h3 class="font-bold text-lg text-gray-900">Can I cancel anytime?</h3>
                        <i class="fas fa-chevron-down transform transition-transform group-[.active]:rotate-180 text-gray-400"></i>
                    </div>
                    <p class="hidden group-[.active]:block mt-3 text-gray-600 leading-relaxed animate-fade-in">
                        Yes, absolutely. There are no lock-in contracts. You can cancel your subscription at any time from your dashboard settings.
                    </p>
                </div>
                <div class="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer bg-gray-50 hover:bg-white" data-aos="fade-up" data-aos-delay="200" onclick="this.classList.toggle('active')">
                     <div class="flex justify-between items-center">
                        <h3 class="font-bold text-lg text-gray-900">Do you offer refunds?</h3>
                        <i class="fas fa-chevron-down transform transition-transform group-[.active]:rotate-180 text-gray-400"></i>
                    </div>
                    <p class="hidden group-[.active]:block mt-3 text-gray-600 leading-relaxed animate-fade-in">
                        We offer a 30-day money-back guarantee. If you're not satisfied properly, just reach out to our support team.
                    </p>
                </div>
            </div>
        </div>
    </section>
  `,

    TEAM: `
    <section id="team" class="page-section py-24 bg-zinc-50">
        <div class="container mx-auto px-6">
            <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
                 <h2 class="text-3xl font-bold mb-4">Meet the Team</h2>
                 <p class="text-gray-500 text-lg">The brilliant minds behind our innovation.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="bg-white p-6 rounded-2xl shadow-sm text-center group hover:-translate-y-2 transition-transform" data-aos="fade-up">
                    <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=ceo" class="w-full h-full" />
                    </div>
                    <h3 class="font-bold text-lg">Alex Morgan</h3>
                    <p class="text-blue-600 text-sm font-medium mb-4">CEO & Founder</p>
                    <div class="flex justify-center gap-3 text-gray-400">
                        <i class="fab fa-twitter hover:text-blue-400 cursor-pointer"></i>
                        <i class="fab fa-linkedin hover:text-blue-700 cursor-pointer"></i>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-2xl shadow-sm text-center group hover:-translate-y-2 transition-transform" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=cto" class="w-full h-full" />
                    </div>
                    <h3 class="font-bold text-lg">Sarah Chen</h3>
                    <p class="text-blue-600 text-sm font-medium mb-4">CTO</p>
                    <div class="flex justify-center gap-3 text-gray-400">
                        <i class="fab fa-twitter hover:text-blue-400 cursor-pointer"></i>
                        <i class="fab fa-linkedin hover:text-blue-700 cursor-pointer"></i>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-2xl shadow-sm text-center group hover:-translate-y-2 transition-transform" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=des" class="w-full h-full" />
                    </div>
                    <h3 class="font-bold text-lg">Marcus Weil</h3>
                    <p class="text-blue-600 text-sm font-medium mb-4">Head of Design</p>
                    <div class="flex justify-center gap-3 text-gray-400">
                         <i class="fab fa-dribbble hover:text-pink-500 cursor-pointer"></i>
                        <i class="fab fa-linkedin hover:text-blue-700 cursor-pointer"></i>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-2xl shadow-sm text-center group hover:-translate-y-2 transition-transform" data-aos="fade-up" data-aos-delay="300">
                    <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=mkt" class="w-full h-full" />
                    </div>
                    <h3 class="font-bold text-lg">Elena Rodriguez</h3>
                    <p class="text-blue-600 text-sm font-medium mb-4">Marketing Lead</p>
                    <div class="flex justify-center gap-3 text-gray-400">
                        <i class="fab fa-twitter hover:text-blue-400 cursor-pointer"></i>
                        <i class="fab fa-instagram hover:text-pink-600 cursor-pointer"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `,

    // --- NEW PAGES (Hidden by default, shown via JS Router) ---

    PAGE_ABOUT: `
    <section id="about" class="page-section hidden pt-32 pb-20 bg-white min-h-screen">
       <div class="container mx-auto px-6 max-w-4xl text-center">
            <h1 class="text-5xl font-bold mb-8">About Us</h1>
            <p class="text-xl text-gray-600 mb-12 leading-relaxed">
                We are a team of passionate creators building the future of digital experiences. 
                Our mission is to empower everyone to build beautiful software.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                <div>
                    <h3 class="text-2xl font-bold mb-4">Our Story</h3>
                    <p class="text-gray-600 mb-4">Founded in 2024, we started with a simple idea: make web development accessible to everyone. Today, we help thousands of creators ship their projects faster.</p>
                </div>
                <div>
                     <h3 class="text-2xl font-bold mb-4">Our Values</h3>
                     <ul class="space-y-3 text-gray-600">
                        <li class="flex items-center gap-3"><div class="w-2 h-2 bg-blue-500 rounded-full"></div>Simplicity first</li>
                        <li class="flex items-center gap-3"><div class="w-2 h-2 bg-blue-500 rounded-full"></div>Empower creativity</li>
                        <li class="flex items-center gap-3"><div class="w-2 h-2 bg-blue-500 rounded-full"></div>Build for the long term</li>
                     </ul>
                </div>
            </div>
       </div>
    </section>
  `,

    PAGE_LOGIN: `
    <section id="login" class="page-section hidden pt-32 pb-20 bg-gray-50/50 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div class="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-white relative z-10" data-aos="zoom-in">
             <div class="text-center mb-10">
                <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-xl shadow-slate-900/20">
                    <i class="fas fa-user-circle"></i>
                </div>
                <h2 class="text-3xl font-bold text-slate-900">Welcome back</h2>
                <p class="text-slate-500 mt-3 font-medium">Please enter your details to sign in.</p>
             </div>
             
             <div class="space-y-5">
                 <button class="w-full py-4 rounded-xl border border-gray-200 font-bold text-slate-700 hover:bg-gray-50 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 bg-white">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6" />
                    Sign in with Google
                 </button>
                 <div class="relative flex py-2 items-center">
                    <div class="flex-grow border-t border-gray-200"></div>
                    <span class="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Or continue with</span>
                    <div class="flex-grow border-t border-gray-200"></div>
                 </div>
                 <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <input type="email" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all bg-gray-50/50 focus:bg-white" placeholder="name@example.com" />
                 </div>
                 <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 ml-1">Password</label>
                    <input type="password" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all bg-gray-50/50 focus:bg-white" placeholder="••••••••" />
                 </div>
                 <button class="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/30 hover:-translate-y-1 active:translate-y-0" onclick="alert('Demo Login Successful!')">Sign in</button>
                 <p class="text-center text-sm text-slate-500 font-medium">
                    Don't have an account? <span class="text-slate-900 font-bold cursor-pointer hover:underline" onclick="navigateTo('signup')">Sign up for free</span>
                 </p>
             </div>
        </div>
    </section>
  `,

    PAGE_SIGNUP: `
    <section id="signup" class="page-section hidden pt-32 pb-20 bg-gray-50/50 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div class="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-white relative z-10" data-aos="zoom-in">
             <div class="text-center mb-10">
                <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-xl shadow-slate-900/20">
                    <i class="fas fa-rocket"></i>
                </div>
                <h2 class="text-3xl font-bold text-slate-900">Create account</h2>
                <p class="text-slate-500 mt-3 font-medium">Start your 14-day free trial today.</p>
             </div>
             <div class="space-y-5">
                 <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input type="text" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all bg-gray-50/50 focus:bg-white" placeholder="John Doe" />
                 </div>
                 <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <input type="email" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all bg-gray-50/50 focus:bg-white" placeholder="name@example.com" />
                 </div>
                 <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 ml-1">Password</label>
                    <input type="password" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all bg-gray-50/50 focus:bg-white" placeholder="••••••••" />
                 </div>
                 <button class="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/30 hover:-translate-y-1 active:translate-y-0" onclick="alert('Demo Signup Successful!')">Create Account</button>
                 <p class="text-center text-sm text-slate-500 font-medium">
                    Already have an account? <span class="text-slate-900 font-bold cursor-pointer hover:underline" onclick="navigateTo('login')">Log in</span>
                 </p>
             </div>
        </div>
    </section>
  `,

    FOOTER: `
    <footer class="bg-white border-t border-gray-100 pt-16 pb-8 page-section">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                <div class="col-span-2">
                    <span class="text-xl font-bold tracking-tight text-gray-900 mb-4 block">BRAND_NAME</span>
                    <p class="text-gray-500 text-sm max-w-xs">Making the world more productive, one pixel at a time. Designed with love in San Francisco.</p>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Product</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><button onclick="navigateTo('features')" class="hover:text-black">Features</button></li>
                        <li><button onclick="navigateTo('pricing')" class="hover:text-black">Pricing</button></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Company</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><button onclick="navigateTo('about')" class="hover:text-black">About</button></li>
                        <li><button onclick="alert('We are hiring!')" class="hover:text-black">Careers</button></li>
                        <li><button onclick="navigateTo('contact')" class="hover:text-black">Contact</button></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><button onclick="alert('Privacy Policy Demo')" class="hover:text-black">Privacy</button></li>
                        <li><button onclick="alert('Terms of Service Demo')" class="hover:text-black">Terms</button></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <div class="text-center md:text-left">
                    <p>&copy; 2026 Brand Inc. All rights reserved.</p>
                    <p class="text-xs mt-1">Made by <a href="https://foundrr.online" target="_blank" rel="noopener noreferrer" class="hover:text-gray-900 transition-colors">Foundrr Group</a></p>
                </div>
                <div class="flex gap-4 mt-4 md:mt-0">
                    <i class="fab fa-twitter hover:text-black cursor-pointer"></i>
                    <i class="fab fa-github hover:text-black cursor-pointer"></i>
                    <i class="fab fa-linkedin hover:text-black cursor-pointer"></i>
                </div>
            </div>
        </div>
    </footer>
  `,

    JS_ROUTER: `
    <script>
        // Simple Single Page Router
        function navigateTo(pageId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            const sections = document.querySelectorAll('.page-section');
            const mobileMenu = document.getElementById('mobile-menu');
            const standalonePages = ['about', 'login', 'signup'];
            
            // Check if target is a standalone page
            if (standalonePages.includes(pageId)) {
                sections.forEach(sec => {
                    if (sec.id === pageId || sec.tagName === 'NAVBAR') {
                        sec.classList.remove('hidden');
                    } else {
                        sec.classList.add('hidden');
                    }
                });
            } else {
                // It's a section on the main Home page (or Home itself)
                sections.forEach(sec => {
                    // Hide standalone pages
                    if (standalonePages.includes(sec.id)) {
                        sec.classList.add('hidden');
                    } else {
                        // Show all home sections (Hero, Features, Footer, etc)
                        sec.classList.remove('hidden');
                    }
                });
                
                // Scroll to specific section if not just 'home'
                if (pageId !== 'home') {
                    // Slight delay to allow DOM to unhide
                    setTimeout(() => {
                         const target = document.getElementById(pageId);
                         if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
            
            // Close mobile menu
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }
    </script>
  `
}

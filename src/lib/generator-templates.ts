
export const TEMPLATES = {
    NAVBAR: `
    <nav class="fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent" id="navbar">
      <div class="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md -z-10"></div>
      <div class="container mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer group" onclick="navigateTo('home')">
           <div class="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 shadow-xl group-hover:scale-105 transition-transform duration-300">
               <i class="fas fa-cube text-lg"></i>
           </div>
           <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity">BRAND_NAME</span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          <button onclick="navigateTo('home')" class="px-5 py-2 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white hover:shadow-sm transition-all">Home</button>
          {{NAV_LINKS}}
        </div>
        
        <div class="flex items-center gap-4">
            <button onclick="navigateTo('login')" class="hidden md:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Log in</button>
            <button onclick="navigateTo('signup')" class="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">Get Started</button>
            
            <!-- Mobile Menu Button -->
            <button class="md:hidden text-2xl text-slate-900 dark:text-white focus:outline-none" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </div>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div id="mobile-menu" class="hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-2xl md:hidden transition-all duration-300 origin-top transform animate-fade-in-down">
          <button onclick="navigateTo('home'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">Home</button>
          {{MOBILE_NAV_LINKS}}
          <div class="h-px bg-gray-100 dark:bg-slate-800 my-2"></div>
          <button onclick="navigateTo('login'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">Log in</button>
          <button onclick="navigateTo('signup'); toggleMobileMenu()" class="text-center font-bold py-3 px-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md">Get Started</button>
      </div>
    </nav>
  `,

    NAVBAR_MINIMAL: `
    <nav class="fixed top-0 w-full z-50 transition-all duration-300 border-b border-stone-200 dark:border-zinc-800" id="navbar">
      <div class="absolute inset-0 bg-stone-50/90 dark:bg-zinc-950/90 backdrop-blur-md -z-10"></div>
      <div class="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer group" onclick="navigateTo('home')">
           <span class="text-xl font-serif font-bold tracking-tight text-stone-900 dark:text-white uppercase">BRAND_NAME</span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600 dark:text-stone-400">
           <button onclick="navigateTo('home')" class="hover:text-stone-900 dark:hover:text-white transition-colors">Home</button>
          {{NAV_LINKS}}
        </div>
        
        <div class="flex items-center gap-4">
            <button onclick="navigateTo('contact')" class="px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-stone-700 dark:hover:bg-stone-200 transition-colors">
                Inquire
            </button>
            
            <!-- Mobile Menu Button -->
            <button class="md:hidden text-2xl text-stone-900 dark:text-white focus:outline-none" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </div>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div id="mobile-menu" class="hidden absolute top-full left-0 w-full bg-stone-50 dark:bg-zinc-950 border-b border-stone-200 dark:border-zinc-800 p-6 flex flex-col gap-4 shadow-xl md:hidden transition-all duration-300 origin-top transform animate-fade-in-down">
          <button onclick="navigateTo('home'); toggleMobileMenu()" class="text-left font-serif font-medium py-3 px-4 text-stone-900 dark:text-white">Home</button>
          {{MOBILE_NAV_LINKS}}
          <div class="h-px bg-stone-200 dark:bg-zinc-800 my-2"></div>
          <button onclick="navigateTo('contact'); toggleMobileMenu()" class="text-center font-bold py-3 px-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 uppercase tracking-widest text-xs">Inquire</button>
      </div>
    </nav>
    `,

    HERO_MODERN: `
    <section id="home" class="page-section relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
       <!-- Dynamic Background -->
       <div class="absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-80"></div>
       <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-normal dark:bg-indigo-500/10"></div>
       
       <div class="container mx-auto px-6 relative z-10 text-center">
         
         <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-colors shadow-sm backdrop-blur-sm" data-aos="fade-down">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">New Feature Released</span>
         </div>

         <h1 class="text-6xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.95] drop-shadow-sm" data-aos="fade-up" data-aos-delay="100">
           Build <span class="hidden md:inline">Faster.</span> <br/>
           <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 animate-gradient bg-300%">Scale Smarter.</span>
         </h1>

         <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
           The ultimate platform for modern teams. Transform your workflow with AI-driven insights and automated scaling.
         </p>

         <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20" data-aos="fade-up" data-aos-delay="300">
            <button onclick="navigateTo('signup')" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-95 duration-200">
               Start Free Trial
            </button>
            <button onclick="navigateTo('features')" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:border-slate-300 active:scale-95 duration-200 flex items-center justify-center gap-2">
               <i class="fas fa-play text-xs"></i> Watch Demo
            </button>
         </div>

         <!-- Social Proof Strip -->
         <div class="border-y border-slate-100 dark:border-white/5 py-8 mb-20 backdrop-blur-sm bg-white/30 dark:bg-white/5" data-aos="fade-up" data-aos-delay="400">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by 10,000+ teams</p>
            <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <i class="fab fa-aws text-3xl"></i>
                <i class="fab fa-google text-2xl"></i>
                <i class="fab fa-stripe text-4xl"></i>
                <i class="fab fa-spotify text-3xl"></i>
                <i class="fab fa-airbnb text-3xl"></i>
            </div>
         </div>
         
         <!-- Hero Image/Dashboard Preview -->
         <div class="relative max-w-6xl mx-auto rounded-2xl bg-slate-900/5 dark:bg-white/5 p-2 lg:p-4 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" data-aos="fade-up" data-aos-delay="500">
             <div class="rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative group aspect-[16/10]">
                <div class="absolute top-0 w-full h-10 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 z-20 backdrop-blur-md">
                    <div class="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div class="w-3 h-3 rounded-full bg-green-400/80"></div>
                    <div class="ml-4 w-64 h-5 bg-slate-200 dark:bg-slate-700/50 rounded-full"></div>
                </div>
                <img src="/api/images/proxy?query=saas dashboard analytics ui dark mode&width=1600&height=1000" alt="App UI" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]" />
                
                <!-- Floating Element -->
                <div class="absolute bottom-8 right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex items-center gap-4 animate-float hidden md:flex">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <i class="fas fa-check"></i>
                    </div>
                    <div>
                        <p class="font-bold text-sm text-slate-900 dark:text-white">Optimization Complete</p>
                        <p class="text-xs text-slate-500">Saved 12.4s load time</p>
                    </div>
                </div>
             </div>
         </div>
       </div>
    </section>
  `,

    HERO_ARCHITECT: `
    <section id="home" class="page-section relative h-screen flex flex-col justify-center bg-stone-50 dark:bg-zinc-950 border-b border-stone-200 dark:border-zinc-800 overflow-hidden">
       <!-- Subtle texture -->
       <div class="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>
       
       <div class="container mx-auto px-6 md:px-12 relative z-10">
         <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
             <div class="lg:col-span-8">
                 <h1 class="text-6xl md:text-8xl lg:text-[7rem] font-serif leading-[0.9] text-stone-900 dark:text-stone-100 mb-8 tracking-tight" data-aos="fade-up">
                    Structure <br/>
                    <span class="italic text-stone-500">& Serenity.</span>
                 </h1>
                 <div class="h-px w-24 bg-stone-900 dark:bg-stone-100 mb-8" data-aos="fade-right" data-aos-delay="200"></div>
                 <p class="text-xl md:text-2xl text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="300">
                    We design spaces that breathe. Merging sustainable innovation with timeless aesthetic principles.
                 </p>
             </div>
             <div class="lg:col-span-4 flex flex-col items-start lg:items-end justify-end pb-2 gap-6" data-aos="fade-up" data-aos-delay="500">
                <button onclick="navigateTo('projects')" class="group flex items-center gap-4 text-lg font-medium text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors">
                    Explore Our Work
                    <span class="w-12 h-px bg-current transition-all group-hover:w-20"></span>
                </button>
                <button onclick="navigateTo('contact')" class="group flex items-center gap-4 text-lg font-medium text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors">
                    Get in Touch
                    <span class="w-12 h-px bg-current transition-all group-hover:w-20"></span>
                </button>
             </div>
         </div>
       </div>
       
       <!-- Hero Image Strip -->
       <div class="absolute bottom-0 right-0 w-full lg:w-2/3 h-1/3 lg:h-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-zinc-800 -z-0 opacity-20 lg:opacity-100">
           <img src="/api/images/proxy?query=architectural detail concrete glass minimalist" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
       </div>
    </section>
    `,

    STATS_MINIMAL: `
    <section class="page-section py-20 bg-white dark:bg-zinc-900 border-b border-stone-100 dark:border-zinc-800">
        <div class="container mx-auto px-6 md:px-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                <div data-aos="fade-up" data-aos-delay="0">
                    <div class="text-4xl md:text-6xl font-serif text-stone-900 dark:text-white mb-2">150+</div>
                    <div class="text-xs font-bold tracking-widest uppercase text-stone-500">Projects Completed</div>
                </div>
                <div data-aos="fade-up" data-aos-delay="100">
                    <div class="text-4xl md:text-6xl font-serif text-stone-900 dark:text-white mb-2">12</div>
                    <div class="text-xs font-bold tracking-widest uppercase text-stone-500">Design Awards</div>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                    <div class="text-4xl md:text-6xl font-serif text-stone-900 dark:text-white mb-2">24</div>
                    <div class="text-xs font-bold tracking-widest uppercase text-stone-500">Years Experience</div>
                </div>
                <div data-aos="fade-up" data-aos-delay="300">
                    <div class="text-4xl md:text-6xl font-serif text-stone-900 dark:text-white mb-2">100%</div>
                    <div class="text-xs font-bold tracking-widest uppercase text-stone-500">Sustainable</div>
                </div>
            </div>
        </div>
    </section>
    `,

    SERVICES_MINIMAL: `
    <section id="services" class="page-section py-32 bg-stone-50 dark:bg-black">
        <div class="container mx-auto px-6 md:px-12">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-stone-200 dark:border-zinc-800 pb-8">
                <div class="max-w-xl">
                    <h2 class="text-sm font-bold tracking-widest uppercase text-stone-500 mb-4" data-aos="fade-up">Our Expertise</h2>
                    <h3 class="text-3xl md:text-5xl font-serif text-stone-900 dark:text-white leading-tight" data-aos="fade-up" data-aos-delay="100">Comprehensive design services for modern living.</h3>
                </div>
                <div class="hidden md:block mb-2" data-aos="fade-left">
                    <i class="fas fa-asterisk text-4xl text-stone-300 dark:text-zinc-700 animate-spin-slow"></i>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Service 1 -->
                <div class="group p-8 border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-stone-900 dark:hover:border-stone-100 transition-colors duration-500" data-aos="fade-up" data-aos-delay="0">
                    <div class="w-12 h-12 bg-stone-100 dark:bg-zinc-800 mb-8 flex items-center justify-center text-stone-900 dark:text-white">
                        <i class="fas fa-ruler-combined text-xl"></i>
                    </div>
                    <h4 class="text-2xl font-serif text-stone-900 dark:text-white mb-4">Urban Planning</h4>
                    <p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">Strategic development of community spaces that prioritize walkability, green zones, and social interaction.</p>
                    <a href="#" class="text-sm font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:border-stone-900 transition-all">Learn More</a>
                </div>

                <!-- Service 2 -->
                <div class="group p-8 border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-stone-900 dark:hover:border-stone-100 transition-colors duration-500" data-aos="fade-up" data-aos-delay="100">
                   <div class="w-12 h-12 bg-stone-100 dark:bg-zinc-800 mb-8 flex items-center justify-center text-stone-900 dark:text-white">
                        <i class="fas fa-leaf text-xl"></i>
                    </div>
                    <h4 class="text-2xl font-serif text-stone-900 dark:text-white mb-4">Sustainable Design</h4>
                    <p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">Eco-forward blueprints utilizing passive solar, recycled materials, and energy-efficient systems.</p>
                    <a href="#" class="text-sm font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:border-stone-900 transition-all">Learn More</a>
                </div>

                <!-- Service 3 -->
                <div class="group p-8 border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-stone-900 dark:hover:border-stone-100 transition-colors duration-500" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-12 h-12 bg-stone-100 dark:bg-zinc-800 mb-8 flex items-center justify-center text-stone-900 dark:text-white">
                        <i class="fas fa-layer-group text-xl"></i>
                    </div>
                    <h4 class="text-2xl font-serif text-stone-900 dark:text-white mb-4">Interior Architecture</h4>
                    <p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">Seamless integration of exterior structure and interior flow for unified, functional living environments.</p>
                    <a href="#" class="text-sm font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:border-stone-900 transition-all">Learn More</a>
                </div>
            </div>
        </div>
    </section>
    `,

    PROJECTS_GALLERY_MINIMAL: `
    <section id="work" class="page-section py-32 bg-stone-900 dark:bg-black text-white">
        <div class="container mx-auto px-6 md:px-12">
            <div class="flex justify-between items-baseline mb-20">
                <h2 class="text-4xl md:text-6xl font-serif" data-aos="fade-up">Selected Works</h2>
                <a href="#" class="hidden md:inline-block text-stone-400 hover:text-white transition-colors border-b border-stone-700 pb-1">View Full Archive</a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <!-- Item 1 -->
                <div class="group cursor-pointer" data-aos="fade-up" onclick="alert('Viewing Project')">
                    <div class="aspect-[4/3] overflow-hidden bg-stone-800 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src="/api/images/proxy?query=modern concrete house forest" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div class="flex justify-between items-start border-t border-stone-700 pt-6">
                        <div>
                            <h3 class="text-2xl font-serif mb-1 group-hover:text-stone-300 transition-colors">The Highland Lofts</h3>
                            <p class="text-stone-500 text-sm">Residential Complex</p>
                        </div>
                        <span class="text-stone-500 group-hover:translate-x-2 transition-transform">2024</span>
                    </div>
                </div>

                <!-- Item 2 -->
                <div class="group cursor-pointer md:mt-16" data-aos="fade-up" data-aos-delay="100" onclick="alert('Viewing Project')">
                    <div class="aspect-[4/3] overflow-hidden bg-stone-800 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src="/api/images/proxy?query=public library architecture glass" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div class="flex justify-between items-start border-t border-stone-700 pt-6">
                        <div>
                            <h3 class="text-2xl font-serif mb-1 group-hover:text-stone-300 transition-colors">Meridian Library</h3>
                            <p class="text-stone-500 text-sm">Civic Institution</p>
                        </div>
                        <span class="text-stone-500 group-hover:translate-x-2 transition-transform">2023</span>
                    </div>
                </div>

                <!-- Item 3 -->
                <div class="group cursor-pointer" data-aos="fade-up" onclick="alert('Viewing Project')">
                    <div class="aspect-[4/3] overflow-hidden bg-stone-800 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src="/api/images/proxy?query=modern office skyscraper" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div class="flex justify-between items-start border-t border-stone-700 pt-6">
                        <div>
                            <h3 class="text-2xl font-serif mb-1 group-hover:text-stone-300 transition-colors">Axis Tower</h3>
                            <p class="text-stone-500 text-sm">Commercial Office</p>
                        </div>
                         <span class="text-stone-500 group-hover:translate-x-2 transition-transform">2023</span>
                    </div>
                </div>

                <!-- Item 4 -->
                 <div class="group cursor-pointer md:mt-16" data-aos="fade-up" data-aos-delay="100" onclick="alert('Viewing Project')">
                    <div class="aspect-[4/3] overflow-hidden bg-stone-800 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src="/api/images/proxy?query=park pavilion wood architecture" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div class="flex justify-between items-start border-t border-stone-700 pt-6">
                        <div>
                            <h3 class="text-2xl font-serif mb-1 group-hover:text-stone-300 transition-colors">Greenway Pavilion</h3>
                            <p class="text-stone-500 text-sm">Public Park Structure</p>
                        </div>
                         <span class="text-stone-500 group-hover:translate-x-2 transition-transform">2022</span>
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
                    <button class="w-4 h-4 bg-[#C0C0C0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center text-black leading-none">в–Ў</button>
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
    <section id="home" class="page-section pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen flex items-center overflow-hidden">
        <div class="container mx-auto px-6">
            <div class="flex flex-col lg:flex-row items-center gap-20">
                <div class="flex-1 space-y-10" data-aos="fade-right">
                    
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-wide uppercase">
                        <i class="fas fa-star text-xs"></i> #1 Product of the Week
                    </div>

                    <h1 class="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                        Power your <br/>
                        <span class="text-blue-600 relative whitespace-nowrap">
                            Business
                            <svg class="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5 L 100 0 Q 50 5 0 0 Z" fill="currentColor"/></svg>
                        </span>
                        <span>scale.</span>
                    </h1>
                    
                    <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                        Accelerate your team's productivity with our all-in-one suite. 
                        Join 10,000+ companies already shipping faster.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4">
                        <form class="flex-1 flex gap-2" onsubmit="event.preventDefault(); navigateTo('signup')">
                            <input type="email" placeholder="Enter work email" class="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                            <button class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 whitespace-nowrap">
                                Get Started
                            </button>
                        </form>
                    </div>
                    
                    <div class="flex items-center gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div class="space-y-1">
                            <div class="flex text-yellow-500 text-sm">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-sm font-semibold text-slate-900 dark:text-white">4.9/5 Rating</p>
                        </div>
                        <div class="space-y-1">
                            <h4 class="font-bold text-slate-900 dark:text-white">2M+</h4>
                            <p class="text-sm text-slate-500">Active Users</p>
                        </div>
                        <div class="space-y-1">
                            <h4 class="font-bold text-slate-900 dark:text-white">99.9%</h4>
                            <p class="text-sm text-slate-500">Uptime</p>
                        </div>
                    </div>
                </div>
                
                <div class="flex-1 relative w-full" data-aos="fade-left">
                    <!-- Decorative blobs -->
                    <div class="absolute -top-20 -right-20 w-[30rem] h-[30rem] bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply animate-pulse-slow"></div>
                    <div class="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply animate-pulse-slow" style="animation-delay: 2s"></div>
                    
                    <div class="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-900/10 border border-slate-200/60 dark:border-slate-800 p-2 overflow-hidden">
                        <img src="/api/images/proxy?query=saas platform interface white" class="w-full h-auto rounded-xl" />
                        
                        <!-- Floating Card -->
                        <div class="absolute bottom-8 left-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-float">
                            <div class="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <i class="fas fa-bell text-xl"></i>
                            </div>
                            <div>
                                <p class="font-bold text-slate-900 dark:text-white">New Sale!</p>
                                <p class="text-xs text-slate-500">Just now</p>
                            </div>
                            <div class="text-green-500 font-bold ml-2">+$75.99</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                "Simplicity is the ultimate sophistication." <br/> вЂ” Leonardo da Vinci
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
    <section id="features" class="page-section py-32 bg-slate-50 dark:bg-slate-900/50">
       <div class="container mx-auto px-6">
           <div class="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
               <div class="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-4">Features</div>
               <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Everything you need, nothing you don't.</h2>
               <p class="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">Powerful features wrapped in a beautiful interface. Designed for speed, built for scale.</p>
           </div>
           
           <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-6 h-auto md:h-[900px]">
               
               <!-- Major Feature -->
               <div class="col-span-1 md:col-span-2 row-span-2 bg-white dark:bg-slate-950 rounded-[2rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group overflow-hidden relative cursor-default" data-aos="fade-up">
                   <div class="relative z-10 h-full flex flex-col">
                       <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                           <i class="fas fa-chart-pie text-white text-2xl"></i>
                       </div>
                       <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">Advanced Analytics</h3>
                       <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 max-w-sm">Deep dive into your data with our real-time dashboard. Track every metric that matters to your business.</p>
                       <div class="mt-auto">
                           <button onclick="navigateTo('login')" class="text-blue-600 font-bold group-hover:translate-x-2 transition-transform inline-flex items-center">Explore Dashboard <i class="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all"></i></button>
                       </div>
                   </div>
                   <div class="absolute right-0 bottom-0 w-3/5 h-4/5 translate-x-12 translate-y-12 rounded-tl-[2rem] overflow-hidden border-t border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-2xl transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8 group-hover:scale-105">
                        <img src="/api/images/proxy?query=analytics graph chart white" class="w-full h-full object-cover" />
                   </div>
               </div>

               <!-- Tall Dark Feature -->
               <div class="col-span-1 md:col-span-1 row-span-2 bg-slate-900 dark:bg-black rounded-[2rem] p-8 shadow-xl flex flex-col relative group overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                   <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                   <div class="relative z-10">
                       <i class="fas fa-moon text-white text-3xl mb-6"></i>
                       <h3 class="text-2xl font-bold text-white mb-3">Dark Mode</h3>
                       <p class="text-slate-400 leading-relaxed">Easy on the eyes, perfect for night owls. Automatically syncs with system.</p>
                   </div>
                   <img src="/api/images/proxy?query=abstract dark neon texture" class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110" />
               </div>

               <!-- Compact Feature 1 -->
               <div class="col-span-1 md:col-span-1 row-span-1 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden group" data-aos="fade-up" data-aos-delay="200">
                   <div class="absolute top-0 right-0 p-4 opacity-10 text-9xl leading-none font-black select-none pointer-events-none group-hover:scale-110 transition-transform">вљЎ</div>
                   <div class="relative z-10">
                       <i class="fas fa-bolt text-3xl mb-4 text-yellow-300"></i>
                       <h3 class="font-bold text-xl mb-2">Lightning Fast</h3>
                       <p class="text-indigo-100 text-sm">Global CDN serving content in < 50ms.</p>
                   </div>
               </div>
               
               <!-- Compact Feature 2 -->
               <div class="col-span-1 md:col-span-1 row-span-1 bg-white dark:bg-slate-950 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
                   <i class="fas fa-shield-alt text-3xl text-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300 inline-block"></i>
                   <h3 class="font-bold text-xl text-slate-900 dark:text-white mb-2">Secure</h3>
                   <p class="text-slate-500 text-sm">Enterprise-grade encryption for all your data.</p>
               </div>

               <!-- Wide Bottom Feature -->
               <div class="col-span-1 md:col-span-4 row-span-1 bg-white dark:bg-slate-950 rounded-[2rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center gap-10 overflow-hidden group" data-aos="fade-up" data-aos-delay="100">
                   <div class="flex-1">
                       <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">Integration Ready</h3>
                       <p class="text-slate-600 dark:text-slate-400 text-lg mb-8">Connect with your favorite tools in one click. Slack, Discord, Linear, and more.</p>
                       <div class="flex gap-4">
                           <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all cursor-pointer hover:scale-110"><i class="fab fa-slack text-[#E01E5A]"></i></div>
                           <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all cursor-pointer hover:scale-110"><i class="fab fa-discord text-[#5865F2]"></i></div>
                           <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all cursor-pointer hover:scale-110"><i class="fab fa-github text-[#333]"></i></div>
                       </div>
                   </div>
                   <div class="flex-1 w-full relative">
                        <!-- Code snippet mock -->
                        <div class="bg-slate-900 rounded-xl p-4 shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500 border border-slate-800 font-mono text-xs text-slate-300">
                            <div class="flex gap-2 mb-4">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <p><span class="text-purple-400">const</span> app = initialize({</p>
                            <p class="pl-4">apiKey: <span class="text-green-400">'sk_live_...'</span>,</p>
                            <p class="pl-4">webhooks: <span class="text-blue-400">true</span></p>
                            <p>});</p>
                        </div>
                   </div>
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
                <div class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer" data-aos="fade-up" onclick="alert('Project details view')">
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
                <div class="p-8 rounded-3xl border border-gray-200 hover:border-blue-500 transition-all duration-300 bg-white hover:shadow-xl hover:-translate-y-2 cursor-default group" data-aos="fade-up" data-aos-delay="0">
                    <h3 class="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">Basic</h3>
                    <div class="text-4xl font-bold mb-6 text-gray-900">$19<span class="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-600">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> 1 User</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> 5 Projects</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> Basic Analytics</li>
                    </ul>
                    <button onclick="navigateTo('signup')" class="w-full py-3 rounded-xl border border-gray-200 font-semibold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300">Get Started</button>
                </div>
                
                <!-- Pro -->
                <div class="p-8 rounded-3xl bg-zinc-900 text-white relative shadow-2xl transform md:-translate-y-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl shadow-lg">POPULAR</div>
                    <h3 class="font-bold text-lg mb-2">Pro</h3>
                    <div class="text-4xl font-bold mb-6">$49<span class="text-lg text-gray-400 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-300">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> 5 Users</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> Unlimited Projects</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> Advanced Analytics</li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-blue-400"></i> Priority Support</li>
                    </ul>
                    <button onclick="navigateTo('signup')" class="w-full py-3 rounded-xl bg-blue-600 font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 hover:scale-105 hover:shadow-blue-500/30">Get Started</button>
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
                        <i class="fab fa-twitter hover:text-blue-400 cursor-pointer" onclick="window.open('https://twitter.com', '_blank')"></i>
                        <i class="fab fa-linkedin hover:text-blue-700 cursor-pointer" onclick="window.open('https://linkedin.com', '_blank')"></i>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-2xl shadow-sm text-center group hover:-translate-y-2 transition-transform" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=cto" class="w-full h-full" />
                    </div>
                    <h3 class="font-bold text-lg">Sarah Chen</h3>
                    <p class="text-blue-600 text-sm font-medium mb-4">CTO</p>
                    <div class="flex justify-center gap-3 text-gray-400">
                        <i class="fab fa-twitter hover:text-blue-400 cursor-pointer" onclick="window.open('https://twitter.com', '_blank')"></i>
                        <i class="fab fa-linkedin hover:text-blue-700 cursor-pointer" onclick="window.open('https://linkedin.com', '_blank')"></i>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-2xl shadow-sm text-center group hover:-translate-y-2 transition-transform" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=des" class="w-full h-full" />
                    </div>
                    <h3 class="font-bold text-lg">Marcus Weil</h3>
                    <p class="text-blue-600 text-sm font-medium mb-4">Head of Design</p>
                    <div class="flex justify-center gap-3 text-gray-400">
                         <i class="fab fa-dribbble hover:text-pink-500 cursor-pointer" onclick="window.open('https://dribbble.com', '_blank')"></i>
                        <i class="fab fa-linkedin hover:text-blue-700 cursor-pointer" onclick="window.open('https://linkedin.com', '_blank')"></i>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-2xl shadow-sm text-center group hover:-translate-y-2 transition-transform" data-aos="fade-up" data-aos-delay="300">
                    <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=mkt" class="w-full h-full" />
                    </div>
                    <h3 class="font-bold text-lg">Elena Rodriguez</h3>
                    <p class="text-blue-600 text-sm font-medium mb-4">Marketing Lead</p>
                    <div class="flex justify-center gap-3 text-gray-400">
                        <i class="fab fa-twitter hover:text-blue-400 cursor-pointer" onclick="window.open('https://twitter.com', '_blank')"></i>
                        <i class="fab fa-instagram hover:text-pink-600 cursor-pointer" onclick="window.open('https://instagram.com', '_blank')"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `,

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
                    <input type="password" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all bg-gray-50/50 focus:bg-white" placeholder="вЂўвЂўвЂўвЂўвЂўвЂўвЂўвЂў" />
                 </div>
                 <button class="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/30 hover:-translate-y-1 active:translate-y-0" onclick="alert('Demo Login Successful!')">Sign in</button>
                 <p class="text-center text-sm text-slate-500 font-medium">
                    Don't have an account? <span class="text-slate-900 font-bold cursor-pointer hover:underline" onclick="navigateTo('signup')">Sign up for free</span>
                 </p>
             </div>
        </div>
    </section>
  `,

    PAGE_BLOG: `
    <section id="blog" class="page-section hidden pt-32 pb-20 bg-white dark:bg-slate-950 min-h-screen">
       <div class="container mx-auto px-6">
            <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
                 <h2 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Latest Thoughts</h2>
                 <p class="text-gray-500 text-lg">Insights, updates, and stories from our team.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Blog Post 1 -->
                <article class="group cursor-pointer flex flex-col items-start" data-aos="fade-up" data-aos-delay="0" onclick="alert('Read full article (Demo)')">
                    <div class="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-900 relative">
                        <img src="/api/images/proxy?query=technology workspace minimal" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div class="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Product</div>
                    </div>
                    <div class="text-sm text-slate-500 mb-2">Mar 15, 2024 • 5 min read</div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">The Future of Digital Design</h3>
                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                        Exploring the upcoming trends that will shape how we interact with digital products in the next decade. From spatial computing to AI-driven interfaces.
                    </p>
                    <span class="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">Read Article <i class="fas fa-arrow-right ml-2"></i></span>
                </article>

                <!-- Blog Post 2 -->
                <article class="group cursor-pointer flex flex-col items-start" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-900 relative">
                        <img src="/api/images/proxy?query=team collaboration office meeting" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div class="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Culture</div>
                    </div>
                    <div class="text-sm text-slate-500 mb-2">Mar 10, 2024 вЂў 3 min read</div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Building Remote-First Teams</h3>
                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                        How we scale our engineering culture across 12 different time zones while maintaining velocity and cohesion.
                    </p>
                    <span class="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">Read Article <i class="fas fa-arrow-right ml-2"></i></span>
                </article>

                <!-- Blog Post 3 -->
                <article class="group cursor-pointer flex flex-col items-start" data-aos="fade-up" data-aos-delay="200">
                     <div class="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-900 relative">
                        <img src="/api/images/proxy?query=coding abstract software" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div class="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Engineering</div>
                    </div>
                    <div class="text-sm text-slate-500 mb-2">Feb 28, 2024 вЂў 8 min read</div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">Optimizing React Performance</h3>
                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                        A deep dive into advanced techniques for reducing bundle size and improving interaction time in large-scale applications.
                    </p>
                    <span class="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">Read Article <i class="fas fa-arrow-right ml-2"></i></span>
                </article>
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
                    <input type="password" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all bg-gray-50/50 focus:bg-white" placeholder="вЂўвЂўвЂўвЂўвЂўвЂўвЂўвЂў" />
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
                        {{FOOTER_PRODUCT_LINKS}}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">Company</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        {{FOOTER_COMPANY_LINKS}}
                        <li><button onclick="alert('Careers page coming soon!')" class="hover:text-black">Careers</button></li>
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
        function navigateTo(targetId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            const target = document.getElementById(targetId);
            const sections = document.querySelectorAll('.page-section');
            const standalonePages = ['about', 'blog', 'login', 'signup', 'pricing-page'];
            
            if (standalonePages.includes(targetId)) {
                // Standalone Page Logic
                if (target) {
                    sections.forEach(sec => sec.classList.add('hidden'));
                    target.classList.remove('hidden');
                    document.getElementById('navbar')?.classList.remove('hidden');
                } else {
                    console.warn('Page not found:', targetId);
                    // Fallback if page doesn't exist (e.g. user didn't request blog)
                    navigateTo('home');
                    return;
                }
            } else {
                // Home Section Logic (Hero, Features, Contact, etc)
                sections.forEach(sec => {
                    if (standalonePages.includes(sec.id)) {
                        sec.classList.add('hidden');
                    } else {
                        sec.classList.remove('hidden');
                    }
                });
                
                if (targetId !== 'home' && target) {
                    setTimeout(() => {
                         target.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }
    </script>
  `,

    REACT_SHELL: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Site</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        border: "hsl(var(--border))",
                        input: "hsl(var(--input))",
                        ring: "hsl(var(--ring))",
                        background: "hsl(var(--background))",
                        foreground: "hsl(var(--foreground))",
                        primary: {
                            DEFAULT: "hsl(var(--primary))",
                            foreground: "hsl(var(--primary-foreground))",
                        },
                        secondary: {
                            DEFAULT: "hsl(var(--secondary))",
                            foreground: "hsl(var(--secondary-foreground))",
                        },
                        destructive: {
                            DEFAULT: "hsl(var(--destructive))",
                            foreground: "hsl(var(--destructive-foreground))",
                        },
                        muted: {
                            DEFAULT: "hsl(var(--muted))",
                            foreground: "hsl(var(--muted-foreground))",
                        },
                        accent: {
                            DEFAULT: "hsl(var(--accent))",
                            foreground: "hsl(var(--accent-foreground))",
                        },
                        popover: {
                            DEFAULT: "hsl(var(--popover))",
                            foreground: "hsl(var(--popover-foreground))",
                        },
                        card: {
                            DEFAULT: "hsl(var(--card))",
                            foreground: "hsl(var(--card-foreground))",
                        },
                    },
                    borderRadius: {
                        lg: "var(--radius)",
                        md: "calc(var(--radius) - 2px)",
                        sm: "calc(var(--radius) - 4px)",
                    },
                }
            }
        }
    </script>
    <style>
        :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 84% 4.9%;
            --primary: 222.2 47.4% 11.2%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96.1%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --accent: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --ring: 222.2 84% 4.9%;
            --radius: 0.5rem;
        }
        .dark {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --popover: 222.2 84% 4.9%;
            --popover-foreground: 210 40% 98%;
            --primary: 210 40% 98%;
            --primary-foreground: 222.2 47.4% 11.2%;
            --secondary: 217.2 32.6% 17.5%;
            --secondary-foreground: 210 40% 98%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
            --input: 217.2 32.6% 17.5%;
            --ring: 212.7 26.8% 83.9%;
        }
    </style>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <!-- React & Babel -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Lucide Icons (UMD Build strictly for browser) -->
    <script src="https://unpkg.com/lucide@0.263.1/dist/umd/lucide.js"></script>
</head>
<body class="font-sans antialiased">
    <div id="root"></div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({
            duration: 800,
            once: true,
        });
    </script>
    
    <script>
        window.onerror = function(message, source, lineno, colno, error) {
            document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: sans-serif;"><h1>Runtime Error</h1><p>' + message + '</p><pre>' + (error ? error.stack : '') + '</pre></div>';
        };
    </script>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;
        
        // Lucide icons are exposed globally as 'lucide' object in UMD build
        const { 
            Camera, Moon, Sun, Menu, X, ArrowRight, Check, Star, 
            ChevronRight, Play, Globe, Shield, Zap, Layout, 
            BarChart, Users, Mail, Phone, MapPin 
        } = lucide || {}; 

        // Error Boundary
        class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
          }
        
          static getDerivedStateFromError(error) {
            return { hasError: true, error };
          }
        
          render() {
            if (this.state.hasError) {
              return (
                <div className="p-8 text-center text-red-500">
                    <h2 className="text-xl font-bold">Something went wrong.</h2>
                    <pre className="mt-4 text-xs text-left bg-gray-100 p-4 rounded overflow-auto">
                        {this.state.error && this.state.error.toString()}
                    </pre>
                </div>
              );
            }
            return this.props.children;
          }
        }

        // --- GENERATED CODE START ---
        {{REACT_CODE}}
        // --- GENERATED CODE END ---

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        );
    </script>
</body>
</html>
`
}

export function generateNavbarHTML(links: string[], isArchitectural: boolean): string {
  const navLinksHtml = isArchitectural
    ? links
        .filter((l) => l !== 'Home')
        .map(
          (link) =>
            `<button onclick="navigateTo('${link.toLowerCase()}')" class="hover:text-stone-900 dark:hover:text-white transition-colors">${link}</button>`
        )
        .join('\n')
    : links
        .filter((l) => l !== 'Home')
        .map(
          (link) =>
            `<button onclick="navigateTo('${link.toLowerCase()}')" class="px-5 py-2 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white hover:shadow-sm transition-all">${link}</button>`
        )
        .join('\n')

  const mobileNavLinksHtml = links
    .filter((l) => l !== 'Home')
    .map(
      (link) =>
        `<button onclick="navigateTo('${link.toLowerCase()}'); toggleMobileMenu()" class="text-left font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 dark:text-white">${link}</button>`
    )
    .join('\n')

  return (isArchitectural ? TEMPLATES.NAVBAR_MINIMAL : TEMPLATES.NAVBAR)
    .replace('{{NAV_LINKS}}', navLinksHtml)
    .replace('{{MOBILE_NAV_LINKS}}', mobileNavLinksHtml)
}

export function generateFooterHTML(pages: string[]): string {
  const productFooterLinks = []
  if (pages.includes('Features')) productFooterLinks.push('Features')
  if (pages.includes('Pricing')) productFooterLinks.push('Pricing')

  const footerProductHtml = productFooterLinks
    .map(
      (link) =>
        `<li><button onclick="navigateTo('${link.toLowerCase()}')" class="hover:text-black">${link}</button></li>`
    )
    .join('\n')

  const companyFooterLinks = []
  if (pages.includes('About')) companyFooterLinks.push('About')
  if (pages.includes('Blog')) companyFooterLinks.push('Blog')
  if (pages.includes('Contact')) companyFooterLinks.push('Contact')

  const footerCompanyHtml = companyFooterLinks
    .map(
      (link) =>
        `<li><button onclick="navigateTo('${link.toLowerCase()}')" class="hover:text-black">${link}</button></li>`
    )
    .join('\n')

  return TEMPLATES.FOOTER.replace(
    '{{FOOTER_PRODUCT_LINKS}}',
    footerProductHtml
  ).replace('{{FOOTER_COMPANY_LINKS}}', footerCompanyHtml)
}

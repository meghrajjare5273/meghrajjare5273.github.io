import React from 'react';

export default function AmigoCaseStudyPage() {
  return (
    <main className="w-full min-h-screen pt-[120px] md:pt-[150px] pb-[100px] flex flex-col gap-12 md:gap-20 bg-[#eceae8] dark:bg-[#0e0e0e]  overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative w-full">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row pb-8 md:pb-16 items-start md:items-center md:justify-between">
          <h1 className="text-[36px] sm:text-[42px] md:text-[48px] lg:text-[60px] leading-[110%] font-light dark:text-[#eceae8] text-[#101010] w-full max-w-4xl">
            Designing a brand-new <br className="hidden sm:block" /> Telecom operator
          </h1>
          <div className="mt-8 md:mt-0 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards', animationDelay: '0.5s' }}>
            <div className="border border-white/20 px-4 py-2 rounded text-lg font-bold tracking-wider uppercase dark:text-[#eceae8] text-[#101010]">Amigo</div>
          </div>
        </div>
        <div className="w-full aspect-[375/348] md:aspect-[1440/800] overflow-hidden">
          <img 
            alt="hero" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2670&auto=format&fit=crop" 
          />
        </div>
      </section>

      {/* 2. Project Info Grid */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-y-6 gap-x-6 w-full pt-4 md:pt-8">
        <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-3">
          <p className="text-[17px] sm:text-[20px] font-medium dark:text-[#eceae8] text-[#101010] mb-2">Typology</p>
          <div className="flex flex-wrap gap-2">
            {['Web App', 'Mobile App', 'Website'].map((badge) => (
              <span key={badge} className="inline-flex items-center rounded border border-white/20 bg-white/5 px-2.5 py-0.5 text-xs font-semibold dark:text-[#eceae8] text-[#101010] transition-colors hover:bg-white/10">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 md:col-span-1  lg:col-span-3">
          <p className="text-[17px] sm:text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">Industry</p>
          <p className="text-[16px] sm:text-[18px] dark:text-[#eceae8] text-[#101010]">Telecommunications</p>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
          <p className="text-[17px] sm:text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">Year</p>
          <p className="text-[16px] sm:text-[18px] dark:text-[#eceae8] text-[#101010]">2021 — 2025</p>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
          <p className="text-[17px] sm:text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">Services</p>
          <p className="text-[16px] sm:text-[18px] dark:text-[#eceae8] text-[#101010]">Product Strategy, UX/UI Design</p>
        </div>
      </div>

      {/* 3. Text Block: Background */}
      <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4">
        <h3 className="text-[24px] leading-[130%] md:text-[35px] font-light dark:text-[#eceae8] text-[#101010] col-span-full md:col-span-4 xl:col-span-6">
          Background
        </h3>
        <p className="text-[17px] leading-[150%] md:text-[20px] font-normal dark:text-[#eceae8]/80 text-[#101010]/80 col-span-full md:col-span-8 xl:col-span-6">
          On the verge of entering the telecom market, amigo reached out to us with a clear mission: to help create and design a new product and user experience from the ground up.
        </p>
      </section>

      {/* 4. Video Showcase */}
      <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="relative w-full xl:w-10/12 xl:mx-auto rounded-2xl overflow-hidden aspect-video bg-gray-900 group cursor-pointer">
          <img 
             src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
             className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
             alt="Showcase"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-transform duration-300 hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="dark:text-[#eceae8] text-[#101010] ml-1">
                <path d="M6.32353 2.12203C6.64461 1.94674 7.03633 1.96133 7.34404 2.15914L21.344 11.1591C21.6301 11.3432 21.803 11.6598 21.803 12C21.803 12.3401 21.6301 12.6567 21.344 12.8408L7.34404 21.8408C7.03633 22.0386 6.64461 22.0532 6.32353 21.8779C6.00254 21.7026 5.80302 21.3657 5.80302 21V2.99996C5.80302 2.63421 6.00254 2.29734 6.32353 2.12203Z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Sticky Editorial 'Challenge' */}
      <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Sticky Title */}
        <div className="md:w-5/12 lg:w-4/12">
          <div className="md:sticky md:top-32">
             <div className="w-12 h-[1px] bg-white/50 mb-4"></div>
             <h3 className="text-[32px] md:text-[48px] lg:text-[60px] leading-[110%] font-light dark:text-[#eceae8] text-[#101010]">
                The Challenge
             </h3>
          </div>
        </div>

        {/* Scrollable Content - Reduced top spacing */}
        <div className="md:w-7/12 lg:w-8/12 flex flex-col gap-12 border-l border-white/10 pl-6 md:pl-12 py-2">
           <div className="flex flex-col gap-4">
              <span className="dark:text-[#eceae8]/40 text-[#101010]/40 font-mono text-sm tracking-widest">01 — OBJECTIVE</span>
              <p className="text-[20px] md:text-[24px] leading-[150%] font-light dark:text-[#eceae8]/90 text-[#101010]/90">
                The main focus was guaranteeing that amigo provided an intuitive user experience.
                <br /><br />
                We needed to ensure that whether a user was on a 4-inch mobile screen or a 27-inch monitor, the brand voice remained loud, clear, and consistent.
              </p>
           </div>
        </div>
      </section>

      {/* 6. Offset Gravity Images */}
      <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12">
        {/* Reduced gap from 12 to 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="flex flex-col gap-3">
              <div className="w-full aspect-[4/5] bg-gray-800 rounded-none overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="grid-1" />
              </div>
              <p className="text-sm dark:text-[#eceae8] text-[#101010] uppercase tracking-widest mt-1">Figure A. — Design System</p>
           </div>

           {/* Reduced offset padding from pt-32 to pt-16 to tighten vertical space */}
           <div className="flex flex-col gap-3 pt-0 md:pt-16">
              <div className="w-full aspect-[4/5] bg-gray-800 rounded-none overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="grid-2" />
              </div>
              <div className="md:text-right">
                <p className="text-[18px] dark:text-[#eceae8] text-[#101010] max-w-sm ml-auto">
                  "The collaboration with amigo was marked by cooperation and consistent communication."
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* 7. Huge Type Layout for Mobile Experience + Placeholder */}
      <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-8">
        <div className="border-t border-white/10 pt-8 relative overflow-hidden">
          
          {/* Background Text */}
          <h3 className="text-[13vw] leading-[0.8] font-light dark:text-[#eceae8] text-[#101010] tracking-tighter mix-blend-overlay opacity-50 select-none">
            MOBILE<br />EXP.
          </h3>
          
          {/* Content Container */}
          <div className="flex flex-col-reverse md:flex-row items-end justify-end mt-8 md:-mt-24 relative z-10 gap-6">
            
            {/* NEW PLACEHOLDER: Wireframe Phone */}
            {/* This adds a visual element to fill the "blank" space */}
            <div className="w-full md:w-[280px] h-[300px] md:h-[380px] border-2 border-dashed border-white/20 rounded-[2.5rem] p-4 flex flex-col justify-between backdrop-blur-sm">
                <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
                <div className="flex flex-col gap-3 opacity-30">
                   <div className="w-full h-32 bg-white/20 rounded-xl"></div>
                   <div className="w-3/4 h-4 bg-white/20 rounded"></div>
                   <div className="w-1/2 h-4 bg-white/20 rounded"></div>
                </div>
                <div className="w-full h-12 bg-white/10 rounded-full"></div>
            </div>

            {/* Text Card */}
            <div className="w-full md:w-[450px] bg-[#090909] border border-white/10 p-8 md:p-10 shadow-2xl">
               <h4 className="text-xl dark:text-[#eceae8] text-[#101010] mb-4">Shaping the experience</h4>
               <p className="text-[18px] leading-[160%] font-normal dark:text-[#eceae8] text-[#101010]">
                 Designed with a sharp focus on user needs, the app has an intuitive interface for navigating through its features. From seamless plan adjustments to hassle-free billing.
               </p>
            </div>

          </div>
        </div>
      </section>
      
      {/* 8. Stats Section */}
      <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
        <div className="col-span-full lg:col-span-4 flex flex-col gap-4">
          <h2 className="text-[36px] md:text-[60px] font-light dark:text-[#eceae8] text-[#101010] leading-[110%]">The result</h2>
          <p className="text-[17px] md:text-[20px] dark:text-[#eceae8] text-[#101010] leading-[150%]">
            From the intuitive web interface to the Mobile App, these digital solutions have enabled amigo to offer a seamless user journey.
          </p>
        </div>

        <div className="col-span-full lg:col-span-7 lg:col-start-6 flex flex-col">
          {/* Reduced padding from py-8 to py-6 */}
          {/* Stat 1 */}
          <div className="col-span-full border-t border-white/10 py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 lg:col-span-3 flex items-end">
              <span className="text-[36px] leading-[120%] md:text-[80px] md:leading-[110%] font-light dark:text-[#eceae8] text-[#101010]">82</span>
            </div>
            <div className="md:col-span-8 lg:col-span-9 flex items-center">
              <p className="text-[17px] md:text-[20px] dark:text-[#eceae8] text-[#101010]">NPS Score on overall user satisfaction on subscription flow.</p>
            </div>
          </div>
          
          {/* Stat 2 */}
          <div className="col-span-full border-t border-white/10 py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 lg:col-span-3 flex items-end">
              <span className="text-[36px] leading-[120%] md:text-[80px] md:leading-[110%] font-light dark:text-[#eceae8] text-[#101010]">
                71 <span className="text-[24px] md:text-[35px] align-top ml-1">%</span>
              </span>
            </div>
            <div className="md:col-span-8 lg:col-span-9 flex items-center">
              <p className="text-[17px] md:text-[20px] dark:text-[#eceae8] text-[#101010]">Of users praised the simplicity of the subscription process.</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="col-span-full border-t border-white/10 py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 lg:col-span-3 flex items-end">
              <span className="text-[36px] leading-[120%] md:text-[80px] md:leading-[110%] font-light dark:text-[#eceae8] text-[#101010]">81</span>
            </div>
            <div className="md:col-span-8 lg:col-span-9 flex items-center">
              <p className="text-[17px] md:text-[20px] dark:text-[#eceae8] text-[#101010]">NPS Score regarding the speed of the subscription process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer CTA */}
      <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 py-16 border-t border-white/10 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
               </div>
               <div>
                 <p className="dark:text-[#eceae8] text-[#101010] text-lg">Leonor Dias</p>
                 <p className="dark:text-[#eceae8] text-[#101010] text-sm">Brand Manager — Vodafone</p>
               </div>
            </div>
            <p className="text-[24px] md:text-[35px] font-light dark:text-[#eceae8] text-[#101010] italic leading-[130%]">
              “Pixelmatters is a strong partner to structure, design and deliver your digital touchpoints.”
            </p>
          </div>
          
          <div className="hidden lg:block lg:col-span-1 border-l border-white/10 h-full mx-auto"></div>

          <div className="lg:col-span-6 flex flex-col justify-center gap-6">
             <h3 className="text-[20px] font-medium dark:text-[#eceae8] text-[#101010]">Partner with us</h3>
             <p className="text-[18px] dark:text-[#eceae8] text-[#101010]">We can help you build your product from the ground up just like we did with amigo.</p>
             <a href="#" className="w-fit inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 dark:text-[#eceae8] text-[#101010] hover:bg-white/10 transition-colors">
               Let's get started
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M5 12h14M12 5l7 7-7 7" />
               </svg>
             </a>
          </div>
        </div>
      </section>
    </main>
  );
}
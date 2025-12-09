import React from 'react';
// import { useScrollReveal } from '../../hooks/useScrollReveal';

export const VideoShowcase: React.FC = () => {
  // const ref = useScrollReveal();

  return (
    <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12">
      <div className="relative w-full xl:w-10/12 xl:mx-auto rounded-2xl overflow-hidden aspect-video bg-gray-900 group cursor-pointer">
        
        {/* Mock Video Placeholder */}
        <img 
           src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
           className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
           alt="Showcase"
        />

        {/* Play Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-transform duration-300 hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
              <path d="M6.32353 2.12203C6.64461 1.94674 7.03633 1.96133 7.34404 2.15914L21.344 11.1591C21.6301 11.3432 21.803 11.6598 21.803 12C21.803 12.3401 21.6301 12.6567 21.344 12.8408L7.34404 21.8408C7.03633 22.0386 6.64461 22.0532 6.32353 21.8779C6.00254 21.7026 5.80302 21.3657 5.80302 21V2.99996C5.80302 2.63421 6.00254 2.29734 6.32353 2.12203Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
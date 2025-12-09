import React from 'react';
// import { useScrollReveal } from '../../hooks/useScrollReveal';

export const Hero: React.FC = () => {
  // const titleRef = useScrollReveal();
  // const imgRef = useScrollReveal(0.2);

  return (
    <section className="relative w-full">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row pb-12 md:pb-[100px] items-start md:items-center md:justify-between">
        <h1 
          // ref={titleRef}
          className="text-[36px] sm:text-[42px] md:text-[48px] lg:text-[60px] leading-[120%] font-light text-white w-full max-w-4xl"
        >
          Designing a brand-new <br className="hidden sm:block" /> Telecom operator
        </h1>
        {/* Placeholder for Logo */}
        <div className="mt-14 md:mt-0 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards', animationDelay: '0.5s' }}>
             <div className="border border-white/20 px-4 py-2 rounded text-lg font-bold tracking-wider uppercase">Amigo</div>
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
  );
};
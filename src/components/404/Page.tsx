import React from "react";
import Dude from "./Dude";

export default function ErrorPage() {
  return (
    // h-[100dvh] ensures it fits exactly on mobile screens (including Safari address bars)
    <div className="h-dvh w-full bg-[#eceae8] dark:bg-[#0e0e0e] text-foreground overflow-hidden relative font-space flex flex-col lg:flex-row">
      
      {/* BACKGROUND DECORATION: Giant Rotated Text */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.05] dark:opacity-[0.05]">
        <span className="text-[150vh] font-bold font-geo rotate-12 select-none whitespace-nowrap">
          404
        </span>
      </div>

      {/* TEXT SECTION 
         Mobile: Takes natural height but uses padding to space it out. 
         Desktop: Takes 50% width.
      */}
      <div className="relative z-10 w-full lg:w-1/2 shrink-0 flex flex-col justify-center items-start p-8 pt-12 lg:p-24 lg:h-full">
        
        <div className="space-y-6 animate-fade-in opacity-0 fill-mode-[forwards] [animation-delay:0.2s]">
          {/* Unconventional "Ticket" Style Header */}
          <div className="inline-flex items-center border-l-4 border-foreground pl-4">
             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.8]">
              WOAHH.
            </h1>
          </div>

          <div className="space-y-4 max-w-md">
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              The developer is either frantically coding this right now, 
           sleeping, or this page simply doesn't exist. 
              <span className="block mt-2 text-foreground/60 italic text-sm">
                (Honestly? Probably the sleeping part.)
              </span>
              </p>
          </div>

          <div className="pt-2">
            <a
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-none border-b-2 border-foreground bg-transparent px-0 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-b-4 hover:pb-1 focus:outline-none"
            >
              <span className="mr-2">Get me out of here</span>
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ANIMATION SECTION 
         Mobile: flex-1 combined with min-h-0 is the CRITICAL FIX. 
         It forces this container to take whatever vertical space is left, 
         preventing overflow/clipping.
      */}
      <div className="relative z-10 flex-1 min-h-0 w-full lg:w-1/2 lg:h-full">
        
        {/* Inner container to handle positioning within the flex space */}
        <div className="w-full h-full flex items-end justify-center lg:items-center pb-0 lg:pb-0">
          
          {/* Scaling Logic:
             Mobile: Scale 0.45 (small enough to fit) + origin-bottom (pins feet to bottom).
             Desktop: Scale 0.8 + origin-center.
          */}
          <div className="transform scale-[0.45] sm:scale-[0.6] lg:scale-[0.8] origin-bottom lg:origin-center transition-transform duration-500">
             <Dude />
          </div>
          
        </div>
      </div>

    </div>
  );
}
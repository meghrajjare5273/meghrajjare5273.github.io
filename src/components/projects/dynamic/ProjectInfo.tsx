import React from 'react';
import { Badge } from '@/components/ui/badge';
// import { useScrollReveal } from '../../hooks/useScrollReveal';

export const ProjectInfo: React.FC = () => {
//   const containerRef = useScrollReveal();

  return (
    <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-6 w-full pt-6 md:pt-12">
      
      {/* Col 1 */}
      <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-3">
        <p className="text-[17px] sm:text-[20px] font-medium text-white mb-2">Typology</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Web App</Badge>
          <Badge>Mobile App</Badge>
          <Badge>Website</Badge>
        </div>
      </div>

      {/* Col 2 */}
      <div className="flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
        <p className="text-[17px] sm:text-[20px] font-medium text-white">Industry</p>
        <p className="text-[16px] sm:text-[18px] text-px-white-80">Telecommunications</p>
      </div>

      {/* Col 3 */}
      <div className="flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
        <p className="text-[17px] sm:text-[20px] font-medium text-white">Year</p>
        <p className="text-[16px] sm:text-[18px] text-px-white-80">2021 — 2025</p>
      </div>

      {/* Col 4 */}
      <div className="flex flex-col gap-1 md:gap-2 md:col-span-1 lg:col-span-3">
        <p className="text-[17px] sm:text-[20px] font-medium text-white">Services</p>
        <p className="text-[16px] sm:text-[18px] text-px-white-80">Product Strategy, UX/UI Design</p>
      </div>

    </div>
  );
};
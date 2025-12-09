import React from 'react';
// import { useScrollReveal } from '../../hooks/useScrollReveal';

const StatItem = ({ value, label, suffix = '' }: { value: string, label: string, suffix?: string }) => (
  <div className="col-span-full border-t border-px-white-24 py-8 grid grid-cols-1 md:grid-cols-12 gap-4">
    <div className="md:col-span-4 lg:col-span-3 flex items-end">
        <span className="text-[36px] leading-[120%] md:text-[80px] md:leading-[110%] font-light text-white">
            {value}
            {suffix && <span className="text-[24px] md:text-[35px] align-top ml-1">{suffix}</span>}
        </span>
    </div>
    <div className="md:col-span-8 lg:col-span-9 flex items-center">
        <p className="text-[17px] md:text-[20px] text-px-white-80">{label}</p>
    </div>
  </div>
);

export const Stats: React.FC = () => {
//   const ref = useScrollReveal();

  return (
    <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20">
      
      {/* Heading */}
      <div className="col-span-full lg:col-span-4 flex flex-col gap-6">
        <h2 className="text-[36px] md:text-[60px] font-light text-white leading-[120%]">The result</h2>
        <p className="text-[17px] md:text-[20px] text-px-white-80 leading-[150%]">
          From the intuitive web interface to the Mobile App, these digital solutions have enabled amigo to offer a seamless user journey.
        </p>
      </div>

      {/* Stats List */}
      <div className="col-span-full lg:col-span-7 lg:col-start-6 flex flex-col">
        <StatItem value="82" label="NPS Score on overall user satisfaction on subscription flow." />
        <StatItem value="71" suffix="%" label="Of users praised the simplicity of the subscription process." />
        <StatItem value="81" label="NPS Score regarding the speed of the subscription process." />
      </div>

    </section>
  );
};
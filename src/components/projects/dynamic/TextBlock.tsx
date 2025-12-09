import React from 'react';
// import { useScrollReveal } from '../../hooks/useScrollReveal';

interface TextBlockProps {
  title: string;
  description: string;
  alignment?: 'left' | 'right';
}

export const TextBlock: React.FC<TextBlockProps> = ({ title, description, alignment = 'left' }) => {
  // const ref = useScrollReveal();

  return (
    <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4">
      <h3 className={`
        text-[24px] leading-[130%] md:text-[35px] font-light text-white 
        col-span-full md:col-span-4 xl:col-span-6 
        ${alignment === 'right' ? 'md:col-start-7' : ''}
      `}>
        {title}
      </h3>
      <p className={`
        text-[17px] leading-[150%] md:text-[20px] font-normal text-px-white-80 
        col-span-full md:col-span-8 xl:col-span-6 
        ${alignment === 'right' ? 'md:col-start-7' : ''}
      `}>
        {description}
      </p>
    </section>
  );
};
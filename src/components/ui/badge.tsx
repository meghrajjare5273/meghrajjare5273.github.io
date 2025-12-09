import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className="w-fit text-[14px] md:text-[18px] leading-[140%] font-normal text-px-white border border-px-white-24 rounded-2xl py-1.5 px-3 md:pt-[2px] md:pb-[3px] tracking-[-0.2px]">
      {children}
    </span>
  );
};
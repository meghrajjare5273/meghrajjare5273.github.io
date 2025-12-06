"use client";

import React from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Process", href: "/process" },
  { name: "Latest News", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export const MenuComponent: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <nav
      className={cn(
        // Changed items-center to items-start for left alignment
        "flex w-full flex-col items-start justify-center",
        className
      )}
    >
      <ul 
        // Changed items-center to items-start
        // Reduced gap from gap-4 to gap-1 md:gap-2 for better vertical fit
        className="flex flex-col items-start gap-1 md:gap-2 group/list"
        onMouseLeave={() => {
          // Optional: Reset logic if needed
        }}
      >
        {navigationItems.map((item, index) => (
          <li
            key={index}
            className="menu-link-item" 
          >
            <a
              href={item.href}
              className={cn(
                "block font-about text-foreground transition-all w-full duration-300 ease-out",
                // Reduced text sizes slightly: 
                // Mobile: 4xl (was 5xl)
                // Tablet: 6xl (was 7xl)
                // Desktop: 7xl (was 8xl)
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
                "leading-[0.9]", // Tighter line height
                // Base state
                "opacity-100",
                // Hover Logic
                "group-hover/list:opacity-40",
                "hover:opacity-100! hover:translate-x-2" // Added slight right nudge on hover
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuComponent;
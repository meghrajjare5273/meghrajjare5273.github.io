"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/#contact" },
  // { name: "Test", href: "/#xx" },

];

export const MenuComponent: React.FC<{ className?: string }> = ({ className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      className={cn(
        // CHANGED: "h-screen" -> "h-full". 
        // This allows it to fit inside the Navbar's flex container without overflowing.
        "flex max-h-screen w-full flex-col items-center justify-center", 
        className
      )}
    >
      <ul className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10">
        {navigationItems.map((item, index) => (
          <li
            key={index}
            className="group relative flex items-center justify-center p-2" // Added padding for hover targets
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={item.href}
              className={cn(
                "relative transition-all duration-500 ease-in-out",
                // Hover Logic: Blur non-active items
                hoveredIndex !== null && hoveredIndex !== index
                  ? "blur-[3px] scale-90 opacity-40"
                  : "scale-100 opacity-100"
              )}
            >
              <span
                className="block font-black uppercase tracking-tighter text-foreground transition-transform duration-300
                leading-[0.85] /* Tighter line height for better vertical fit */
                text-4xl       /* Mobile */
                sm:text-5xl    /* Large Phones */
                md:text-6xl    /* Tablets */
                lg:text-7xl    /* Laptops */
                xl:text-8xl    /* Large Desktop */
                group-hover:-skew-x-12"
              >
                {item.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuComponent;
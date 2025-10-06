"use client";
import { useState } from "react";
import {
  Navbar as NavbarContainer,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/navbar";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <NavbarContainer className="pt-4">
      {/* Desktop Navbar */}
      <NavBody>
        {/* Logo */}
        <a
          href="#home"
          className="relative z-20 flex items-center space-x-3 px-2 py-1"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300">
            <span className="text-lg font-bold text-white dark:text-black">
              M
            </span>
          </div>
          <span className="text-lg font-semibold text-black dark:text-white">
            Meghraj Jare
          </span>
        </a>

        {/* Nav Items */}
        <NavItems items={navItems} onItemClick={handleItemClick} />

        {/* CTA Button */}
        <div className="relative z-20 flex items-center gap-2">
          <NavbarButton
            as="a"
            href="#contact"
            variant="gradient"
            className="hidden md:inline-block"
          >
            Get in Touch
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 px-2 py-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300">
              <span className="text-lg font-bold text-white dark:text-black">
                M
              </span>
            </div>
            <span className="text-lg font-semibold text-black dark:text-white">
              Meghraj Jare
            </span>
          </a>

          {/* Toggle Button */}
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={handleItemClick}
              className="text-lg font-medium text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            as="a"
            href="#contact"
            variant="gradient"
            className="w-full"
            onClick={handleItemClick}
          >
            Get in Touch
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </NavbarContainer>
  );
};

// components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const menuItems = [
    { label: "HOME", href: "#", highlight: true },
    { label: "ABOUT", href: "#" },
    { label: "PROJECTS", href: "#" },
    { label: "EXPERIENCE", href: "#" },
    { label: "EDUCATION", href: "#" },
    { label: "WRITING", href: "#" },
    { label: "CONTACT", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Menu Button + Dropdown */}
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X
                className="w-8 h-8 transition-colors duration-300"
                strokeWidth={2}
              />
            ) : (
              <Menu
                className="w-8 h-8 transition-colors duration-300"
                strokeWidth={2}
              />
            )}
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
              style={{
                backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
              }}
            >
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                  style={{
                    color: item.highlight
                      ? "#C3E41D"
                      : isDark
                      ? "hsl(0 0% 100%)"
                      : "hsl(0 0% 10%)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C3E41D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = item.highlight
                      ? "#C3E41D"
                      : isDark
                      ? "hsl(0 0% 100%)"
                      : "hsl(0 0% 10%)";
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Signature */}
        <div
          className="text-4xl"
          style={{
            color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
            fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
          }}
        >
          Meghraj Jare
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)",
          }}
          aria-label="Toggle theme"
        >
          <div
            className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
            style={{
              backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
              transform: isDark ? "translateX(2rem)" : "translateX(0)",
            }}
          />
        </button>
      </nav>
    </header>
  );
}

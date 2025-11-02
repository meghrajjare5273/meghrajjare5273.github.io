import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { toggleTheme, initTheme } from "@/lib/theme";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initialize theme on mount
    const theme = initTheme();
    setIsDark(theme === "dark");

    // Listen for theme changes
    const handleThemeChange = (e: CustomEvent) => {
      setIsDark(e.detail === "dark");
    };

    window.addEventListener("theme-change", handleThemeChange as EventListener);

    return () => {
      window.removeEventListener(
        "theme-change",
        handleThemeChange as EventListener
      );
    };
  }, []);

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

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setIsDark(newTheme === "dark");
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
              className="absolute top-full left-0 w-[200px] md:w-60 border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-100 bg-background"
            >
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300 ${
                    item.highlight
                      ? "text-[#C3E41D]"
                      : "text-foreground hover:text-[#C3E41D]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="text-4xl text-foreground font-handwriting">
          Meghraj Jare
        </div>

        <button
          type="button"
          onClick={handleToggleTheme}
          className="relative w-16 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:opacity-80 transition-opacity"
          aria-label="Toggle theme"
        >
          <div
            className="absolute top-1 left-1 w-6 h-6 rounded-full bg-neutral-900 dark:bg-white transition-transform duration-300"
            style={{
              transform: isDark ? "translateX(2rem)" : "translateX(0)",
            }}
          />
        </button>
      </nav>
    </header>
  );
}

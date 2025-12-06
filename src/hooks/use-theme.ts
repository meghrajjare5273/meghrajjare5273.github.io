// src/hooks/use-theme.ts
import { useEffect, useState, useCallback } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const syncThemeAfterSwap = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as 'light' | 'dark');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }
    };

    document.addEventListener('astro:after-swap', syncThemeAfterSwap);
    
    return () => {
      document.removeEventListener('astro:after-swap', syncThemeAfterSwap);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new CustomEvent("theme-change", { detail: newTheme }));
  }, [theme]);

  return { theme, toggleTheme, mounted };
}

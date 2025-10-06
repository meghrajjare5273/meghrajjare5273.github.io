"use client";

import { AnimatedThemeToggler } from "./animated-theme-toggle";

const ThemeToggleButton = () => {
  return (
    <button
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-neutral-200/80 dark:bg-neutral-800/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border border-neutral-300/50 dark:border-neutral-700/50"
      aria-label="Toggle theme"
    >
      <AnimatedThemeToggler />
    </button>
  );
};

export default ThemeToggleButton;

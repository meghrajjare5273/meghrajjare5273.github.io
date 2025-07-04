import Font from "astro/components/Font.astro";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="text-[#03045e] text-4xl font-bitcount">
          Meghraj Jare
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-[#03045e] hover:opacity-70">
            Home
          </a>
          <a href="about" className="text-[#03045e] hover:opacity-70">
            About
          </a>
          <a href="#work" className="text-[#03045e] hover:opacity-70">
            Work
          </a>
        </nav>
        <div className="flex items-center space-x-3">
          <div className=""></div>
          <div className="w-6 h-6 bg-[#03045e] rounded-full"></div>
          <div className="w-6 h-6 bg-[#03045e] rounded-full"></div>
        </div>
      </header>
    </>
  );
};

export default Header;

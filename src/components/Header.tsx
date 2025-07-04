import React, { useState } from "react";
import { Sun, Moon, Briefcase, BookOpen, MessageCircle } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface PortfolioHeroProps {
  className?: string;
}

const PortfolioHero: React.FC<PortfolioHeroProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState<string>("hey");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const tabs: TabItem[] = [
    {
      id: "hey",
      label: "Hey",
      icon: <Sun className="w-4 h-4" />,
    },
    {
      id: "work",
      label: "Work",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "story",
      label: "Story",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "chat",
      label: "Chat",
      icon: <MessageCircle className="w-4 h-4" />,
    },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-50 text-gray-900"
      } ${className}`}
    >
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-sm font-medium opacity-60">
                danielsun.space
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-10 flex justify-center pt-8 pb-16">
        <div
          className={`flex items-center space-x-1 p-1 rounded-full transition-all duration-300 ${
            isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-black bg-opacity-80"
          } backdrop-blur-sm`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? isDarkMode
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-yellow-400 text-gray-900 shadow-lg"
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed max-w-4xl mx-auto">
              <span className="inline-block opacity-80 mb-2">
                Howdy! Meet your trusted design partner,
              </span>
              <br />
              <span className="inline-block opacity-80">
                crafting strong brands for SaaS and Web3.
              </span>
            </h1>
          </div>

          {/* Large Brand Name */}
          <div className="mt-16 lg:mt-24">
            <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tight">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                Daniel
              </span>
              <span className="inline-block ml-4 lg:ml-8 transform hover:scale-105 transition-transform duration-300">
                Sun
              </span>
            </h2>
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className={`absolute inset-0 opacity-30 ${
            isDarkMode
              ? "bg-gray-800"
              : "bg-gradient-to-br from-yellow-100 to-orange-100"
          }`}
        >
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-orange-300 to-red-300 opacity-20 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;

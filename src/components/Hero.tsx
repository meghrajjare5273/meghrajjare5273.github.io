import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 py-12 md:px-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Placeholder icon */}
              <div className="w-16 h-16 bg-[#474306] opacity-10 rounded-lg"></div>

              <div className="space-y-4">
                <p className="text-[#03045e] text-lg">Hello, I'm Meghraj,</p>
                <h1 className="text-[#03045e] text-5xl md:text-6xl font-bold leading-tight">
                  Software
                  <br />
                  Engineer
                </h1>
                <p className="text-[#03045e] text-lg">based in India.</p>
              </div>

              <Button className="bg-[#f5ee84] text-[#03045e] hover:bg-[#f7f197] px-8 py-2 rounded-md font-medium">
                Resume
              </Button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-[#474306] border-opacity-20">
                  <img
                    src="/profile-image.png"
                    alt="Meghraj Jare"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative lines */}
                <div className="absolute -bottom-4 -left-4 w-12 h-1 bg-[#03045e] transform rotate-45"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-1 bg-[#03045e] transform rotate-45"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-1 bg-[#03045e] transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

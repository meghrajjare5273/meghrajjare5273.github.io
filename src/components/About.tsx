import React from "react";

const About = () => {
  return (
    <>
      <section id="about" className="px-6 py-16 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#474306] text-6xl md:text-8xl font-bold mb-8 opacity-30">
            about.
          </h2>

          <p className="text-[#03045e] text-lg mb-12 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
            vulputate tristique quam felis. Id pharetra dui orci vulputate
            consequat nulla proin. Id sit scelerisque neque, proin bibendum
            diam.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#03045e] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-[#03045e] font-semibold text-lg mb-2">
                  2014-2018
                </h3>
                <p className="text-[#03045e]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                  vulputate tristique quam felis. Id pharetra dui orci vulputate
                  consequat nulla proin. Id sit scelerisque neque, proin
                  bibendum diam.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#03045e] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-[#03045e] font-semibold text-lg mb-2">
                  2018-2020
                </h3>
                <p className="text-[#03045e]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                  vulputate tristique quam felis. Id pharetra dui orci vulputate
                  consequat nulla proin. Id sit scelerisque neque, proin
                  bibendum diam.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#03045e] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-[#03045e] font-semibold text-lg mb-2">
                  2020 - Present
                </h3>
                <p className="text-[#03045e]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                  vulputate tristique quam felis. Id pharetra dui orci vulputate
                  consequat nulla proin. Id sit scelerisque neque, proin
                  bibendum diam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

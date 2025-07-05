import React from "react";
import { Card, CardContent } from "./ui/card";

const Work = () => {
  return (
    <>
      <section id="work" className="px-6 py-16 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#474306] text-6xl md:text-8xl font-bold mb-8 opacity-30">
            work.
          </h2>

          <p className="text-[#03045e] text-lg mb-12 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
            vulputate tristique quam felis. Id pharetra dui orci vulputate
            consequat nulla proin. Id sit scelerisque neque, proin bibendum
            diam.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Case Study 1"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[#03045e] text-sm mb-2">
                    December 24, 2022
                  </p>
                  <h3 className="text-[#03045e] font-semibold text-xl mb-3">
                    Some Case Study
                  </h3>
                  <p className="text-[#03045e] text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                    sed efficitur sollicitudin rhoncus morbi. Tincidunt quam sem
                    elit a convallis. Eget ipsum, velit vitae sit nunc,
                    consequat, ut.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Case Study 2"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[#03045e] text-sm mb-2">
                    December 24, 2022
                  </p>
                  <h3 className="text-[#03045e] font-semibold text-xl mb-3">
                    Some Case Study
                  </h3>
                  <p className="text-[#03045e] text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                    sed efficitur sollicitudin rhoncus morbi. Tincidunt quam sem
                    elit a convallis. Eget ipsum, velit vitae sit nunc,
                    consequat, ut.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Contact"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-[#03045e] text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                vulputate tristique quam felis. Id pharetra dui orci vulputate
                consequat nulla proin. Id sit scelerisque neque, proin bibendum
                diam.
              </p>
              <div className="space-y-2">
                <p className="text-[#03045e]">johndoe@gmail.com</p>
                <p className="text-[#03045e]">twitter.com/johndoe</p>
                <p className="text-[#03045e]">behance.com/johndoe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;

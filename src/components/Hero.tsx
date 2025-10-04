import SmoothScrollHero from "@/components/ui/smooth-scroll";

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      <SmoothScrollHero
        scrollHeight={1500}
        desktopImage="/image.jpeg"
        mobileImage="/image.jpeg"
        initialClipPercentage={25}
        finalClipPercentage={75}
        title="Meghraj Jare"
        subtitle="Full-Stack Developer & AI Engineer"
        description="Building intelligent applications and seamless user experiences with modern technologies"
      />
    </div>
  );
};

export { Hero };

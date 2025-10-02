import SmoothScrollHero from "@/components/ui/smooth-scroll";

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      <SmoothScrollHero
        scrollHeight={1500}
        desktopImage="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2418&auto=format&fit=crop&ixlib=rb-4.1.0"
        mobileImage="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0"
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

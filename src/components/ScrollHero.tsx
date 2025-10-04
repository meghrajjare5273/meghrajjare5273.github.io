import ScrollExpandMedia from "./ui/scroll-expand-media";

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string | null;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

const portfolioMediaContent: MediaContent = {
  src: "/image.jpeg",
  background: null,
  title: "Meghraj Jare | Full-Stack Developer & AI Engineer",
  date: "Portfolio 2025",
  scrollToExpand: "Scroll to explore my work",
  about: {
    overview:
      "Passionate software developer specializing in AI applications, machine learning, and modern web technologies. Building intelligent solutions with cutting-edge frameworks and tools.",
    conclusion:
      "Dedicated to creating impactful applications that bridge the gap between complex AI technologies and intuitive user experiences.",
  },
};

const MediaContent = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-foreground">About Me</h2>
      <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
        {portfolioMediaContent.about.overview}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Expertise
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• AI & Machine Learning</li>
            <li>• Full-Stack Development</li>
            <li>• React & Next.js</li>
            <li>• Python & FastAPI</li>
            <li>• Legal Technology</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Technologies
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• TypeScript & JavaScript</li>
            <li>• CUDA & GPU Computing</li>
            <li>• Astro & React</li>
            <li>• Tailwind CSS</li>
            <li>• Framer Motion</li>
          </ul>
        </div>
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed">
        {portfolioMediaContent.about.conclusion}
      </p>
    </div>
  );
};

const ScrollExpandHero = () => {
  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={portfolioMediaContent.src}
        bgImageSrc={portfolioMediaContent.background}
        // title={portfolioMediaContent.title}
        date={portfolioMediaContent.date}
        scrollToExpand={portfolioMediaContent.scrollToExpand}
        textBlend={true}
      >
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
};

export default ScrollExpandHero;

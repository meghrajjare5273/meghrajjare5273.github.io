export type AboutSkill = {
  category: string;
  count: string;
};

export type AboutLink = {
  label: string;
  href: string;
};

export const ABOUT_CONTENT = {
  lastUpdated: "November 29, 2025",
  sideDescription:
    "My expertise lies in building full-stack applications with modern frameworks like Next.js and FastAPI. I have been building projects for the past two years and have had fun doing it. I'm currently pursuing a B.Tech. in Artificial Intelligence and Data Science at AISSMS Institute of Information Technology, Pune (CGPA 8.18).",
  resumeLink: {
    label: "My Résumé ↗",
    href: "/Meghraj Jare.pdf",
    target: "_blank" as const,
    rel: "noreferrer",
  },
  skills: [
    {
      category: "AI & ML",
      count: "Scikit-Learn, Huggingface, NLTK, Pandas",
    },
    {
      category: "Web Development",
      count: "Next.js, React, Astro",
    },
    {
      category: "Backend & APIs",
      count: "FastAPI, Node.js, Express.js",
    },
    {
      category: "Data & Infra",
      count: "PostgreSQL, Redis, Pinecone, Prisma",
    },
    {
      category: "Programming Languages",
      count: "C, C++, Python, TypeScript",
    },
    {
      category: "Cloud & DevOps",
      count: "Microsoft Azure, Github Pages, Cloudlare DNS",
    },
  ] satisfies AboutSkill[],
  journeyLinks: [
    { label: "Projects ↗", href: "/projects" },
    { label: "Awards and Recognition ↗", href: "/awards" },
    { label: "Blogs ↗", href: "/blogs" },
  ] satisfies AboutLink[],
} as const;

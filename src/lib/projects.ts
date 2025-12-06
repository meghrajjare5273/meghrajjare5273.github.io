// src/data/projects.ts
export interface Project {
  id: string;
  title: string; // Used if no logo is available
  logo?: string; // URL to logo image (white)
  logoHover?: string; // URL to logo image (colored)
  description: string;
  tags: string[]; // e.g., "Website", "Web App"
  link: string;
  thumbnail: string; // The image that appears on hover
  year: string;
  featured?: boolean; // Highlight badge like "$7.2B valuation"
  featuredText?: string; 
}

export const projects: Project[] = [
  {
    id: "01",
    title: "AMIGO",
    description: "Partnered with Vodafone to design a new telco brand. With a bold branding, our role was to create a world-class digital experience across web and mobile.",
    tags: ["Website", "Web App", "Mobile App"],
    link: "/work/amigo",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    year: "2024",
    // logos can be added here if you have SVG assets, otherwise the Title text will be used
  },
  {
    id: "02",
    title: "RUBRIK",
    description: "Between 2016 and 2022, we were lucky to watch from the inside as Rubrik became a Cloud Data Management giant. Responsible for the full design and implementation.",
    tags: ["Website"],
    link: "https://rubrik.com",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    year: "2023",
    featured: true,
    featuredText: "$RBRK IPO"
  },
  {
    id: "03",
    title: "GLEAN",
    description: "Founded by one of Rubrik's founders, Glean is already one of the biggest AI companies in the world. We worked on their new website and brand consistency.",
    tags: ["Website", "Design System"],
    link: "https://glean.com",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    year: "2024",
    featured: true,
    featuredText: "$4.6B Val"
  },
  {
    id: "04",
    title: "SAVIYNT",
    description: "Tight-knit collaboration with the marketing team to showcase Saviynt's intelligent, cloud-first identity governance & access management solutions.",
    tags: ["Web App"],
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    year: "2023"
  }
];
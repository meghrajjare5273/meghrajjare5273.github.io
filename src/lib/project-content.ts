import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

export interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
  aspectRatio?: string;
}

// ✅ Full data shape used by the [slug].astro detail page
export interface ProjectDetailData {
  title: string;
  order: number;
  slug: string;
  year: number;
  link: string;
  githubLink?: string;
  tagline: string;
  description: string;
  techStack: string[]; // ✅ was: string
  highlights: string[]; // ✅ was: string
  media: MediaItem[]; // ✅ was: MediaItem
  published: boolean;
  svgTitle: string;
  thumbnail: string;
}

// ✅ NEW — leaner type used by ProjectsList / ProjectsRow
export interface ProjectCard {
  title: string;
  slug: string | undefined;
  order: number;
  year: number;
  link: string;
  githubLink?: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: string[];
  media: MediaItem[];
  thumbnail?: string; // ✅ NEW — for hover previews in ProjectsRow
  svgTitle?: string; // ✅ NEW — for SVG logo titles in ProjectsRow
  published: boolean;
}

export function toProjectDetailData(entry: ProjectEntry): ProjectDetailData {
  const { data } = entry;
  return {
    title: data.title,
    slug: data.slug ?? entry.id,
    order: data.order,
    year: data.year,
    link: data.link,
    githubLink: data.githubLink,
    tagline: data.tagline,
    description: data.description,
    techStack: data.techStack,
    highlights: data.highlights,
    media: data.media,
    published: data.published,
    svgTitle: data.svgTitle,
    thumbnail: data.thumbnail,
  };
}

function sortProjects(a: ProjectEntry, b: ProjectEntry) {
  const orderDiff = a.data.order - b.data.order;
  if (orderDiff !== 0) return orderDiff;
  return Number(b.data.year) - Number(a.data.year);
}

export async function getAllProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection(
    "projects",
    ({ data }: ProjectEntry) => data.published,
  );
  return projects.sort(sortProjects);
}

export async function getProjectCards(): Promise<ProjectCard[]> {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    title: project.data.title,
    slug: project.data.slug,
    order: project.data.order,
    year: project.data.year,
    link: project.data.link,
    githubLink: project.data.githubLink,
    tagline: project.data.tagline,
    description: project.data.description,
    techStack: project.data.techStack,
    highlights: project.data.highlights,
    media: project.data.media,
    thumbnail: project.data.thumbnail, // ✅ NEW
    svgTitle: project.data.svgTitle, // ✅ NEW
    published: project.data.published,
  }));
}

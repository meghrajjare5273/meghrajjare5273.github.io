import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

export interface ProjectFrontmatter {
  slug: string;
  date: Date;
    tags: string[];
     title: string,
        // slug is handled by the file name in Astro
        // date: z.date(),
        featured: boolean,
        summary: string, // 1-2 lines
        coverImage: string, // path to image
        ogImage?: string,
        // tags: z.array(z.string()),
        role: string, // e.g. "Full-stack"
        demoUrl?: string,
        repoUrl?:string,
        // Optional metrics
        impactMetrics?: string[]
        client ?: string
  // Add other properties from your project data here
}

/**
 * Fetches all projects, sorted by date (newest first).
 */
export async function getAllProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection('projects');
  return projects.sort((a: { data: { date: number; }; }, b: { data: { date: number; }; }) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Gets a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectEntry | undefined> {
  const projects = await getCollection('projects');
return projects.find((p: ProjectEntry) => p.slug === slug);
}

/**
 * Get unique tags from all projects for filtering.
 */
export async function getUniqueTags(): Promise<string[]> {
  const projects = await getAllProjects();
  const tags = new Set<string>();
projects.forEach((project: ProjectEntry) => 
    project.data.tags.forEach((tag: string) => tags.add(tag))
);
  return Array.from(tags).sort();
}
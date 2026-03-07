import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

function sortProjects(a: ProjectEntry, b: ProjectEntry) {
  const orderDiff = a.data.order - b.data.order;
  if (orderDiff !== 0) return orderDiff;

  return Number(b.data.metadata.year) - Number(a.data.metadata.year);
}

export async function getAllProjects() {
  const projects = await getCollection(
    "projects",
    ({ data }: ProjectEntry) => data.published,
  );
  return projects.sort(sortProjects);
}

export async function getProjectCards() {
  const projects = await getAllProjects();

  return projects.map((project: ProjectEntry) => ({
    id: project.data.slug ?? project.id,
    title: project.data.title,
    svgTitle: project.data.hero.svgIcon,
    description: project.data.description,
    tags: project.data.metadata.services,
    link: `/projects/${project.id}`,
    thumbnail: project.data.hero.image,
    year: project.data.metadata.year,
  }));
}

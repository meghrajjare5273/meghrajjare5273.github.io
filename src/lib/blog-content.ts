export interface BlogPost {
  id: string;
  title: string;
  date: string; // Format: YYYY.M.DD
  slug: string;
  excerpt?: string;
}

export interface BlogSectionProps {
  posts: BlogPost[];
  description?: string;
  title?: string;
}

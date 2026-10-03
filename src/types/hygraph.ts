export type HygraphProject = {
  id: string;
  title: string;
  description: string;
  year: string | null;
  slug: string;
  tags: string[];
  link: string | null;
  video: string | null;
  images: { id: string; url: string }[];
  createdAt?: string;
};

export type HygraphExperience = {
  id: string;
  title: string;
  position: string;
  work: string[];
  year: string;
  link: string | null;
  /** Hygraph system field — when the entry was created (use for newest-first order). */
  createdAt: string;
};

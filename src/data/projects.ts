import type { Project } from "@/types/portfolio";

/**
 * Offline fallback only — used when Hygraph is unreachable.
 * Live pages read projects exclusively from the CMS.
 */
export const projects: Project[] = [];

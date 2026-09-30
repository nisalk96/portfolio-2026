import type { SkillCategory } from "@/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    name: "Backend",
    skills: ["Node.js", "Express", "NestJS", "REST", "GraphQL"],
  },
  {
    id: "cloud",
    name: "Cloud / DevOps",
    skills: ["AWS", "Docker", "CloudFront", "GitHub Actions", "Nginx"],
  },
  {
    id: "databases",
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    id: "tools",
    name: "Tools",
    skills: ["Git", "Figma", "Linear", "Jest", "Playwright"],
  },
];

export type FeaturedSkillIcon =
  | "nextjs"
  | "react"
  | "typescript"
  | "tailwind"
  | "nodejs"
  | "graphql"
  | "aws"
  | "docker"
  | "postgres"
  | "figma";

export const featuredSkills: { name: string; icon: FeaturedSkillIcon }[] = [
  { name: "Next.js", icon: "nextjs" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Node.js", icon: "nodejs" },
  { name: "GraphQL", icon: "graphql" },
  { name: "AWS", icon: "aws" },
  { name: "Docker", icon: "docker" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "Figma", icon: "figma" },
];

export const frontendSkills =
  skillCategories.find((category) => category.id === "frontend")?.skills ?? [];

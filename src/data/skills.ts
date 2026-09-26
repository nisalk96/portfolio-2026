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

export const frontendSkills =
  skillCategories.find((category) => category.id === "frontend")?.skills ?? [];

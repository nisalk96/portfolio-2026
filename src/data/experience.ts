import type { Experience } from "@/types/portfolio";

export const experience: Experience[] = [
  {
    id: "senior-fullstack",
    company: "Product Engineering",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    location: "Remote",
    achievements: [
      "Owned frontend architecture for fintech and admin platforms with RBAC and complex workflows.",
      "Shipped production React/Next.js experiences with measurable performance and UX improvements.",
      "Partnered with design and backend teams to deliver AI-assisted product surfaces.",
    ],
    tech: ["React", "Next.js", "TypeScript", "AWS", "Node.js"],
  },
  {
    id: "fullstack",
    company: "Digital Products",
    role: "Full-Stack Developer",
    period: "2020 — 2023",
    location: "Sri Lanka / Remote",
    achievements: [
      "Built crypto, commerce and H5 products from Figma to production.",
      "Implemented reusable component systems and CI-friendly frontend tooling.",
      "Improved delivery speed through typed APIs, shared UI kits and clear domain models.",
    ],
    tech: ["React", "Vite", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "frontend",
    company: "Web Platforms",
    role: "Frontend Engineer",
    period: "2019 — 2020",
    location: "Sri Lanka",
    achievements: [
      "Delivered responsive web apps with strong accessibility and visual polish.",
      "Collaborated on design systems and established frontend quality practices.",
    ],
    tech: ["JavaScript", "React", "CSS", "REST"],
  },
];

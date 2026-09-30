export type ServiceIcon = "code" | "stack" | "dashboard" | "cloud";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description:
      "Fast, accessible interfaces in React and Next.js, built from Figma with care for detail.",
    icon: "code",
  },
  {
    id: "fullstack",
    title: "Full-Stack Apps",
    description:
      "End-to-end products with typed APIs, Node.js services and solid data models.",
    icon: "stack",
  },
  {
    id: "platforms",
    title: "Admin & Dashboard Platforms",
    description:
      "Role-based admin tools, complex workflows and data-heavy dashboards teams rely on.",
    icon: "dashboard",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "AWS deployments, Docker and CI pipelines that keep releases boring and reliable.",
    icon: "cloud",
  },
];

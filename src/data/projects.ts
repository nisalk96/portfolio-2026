import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "cardchat",
    slug: "cardchat",
    name: "CardChat",
    category: "Frontend Owner",
    description:
      "Admin platform with RBAC, order management, customer messaging, wallets, card pricing and team management.",
    longDescription:
      "Led frontend architecture for a fintech admin platform covering role-based access, order workflows, messaging, wallets and pricing tools.",
    tech: ["React", "Vite", "TypeScript", "Tailwind", "Ant Design"],
    year: "2025",
    imageGradient: "from-slate-800 via-slate-700 to-blue-900",
    featured: true,
  },
  {
    id: "lumiswap",
    slug: "lumiswap",
    name: "Lumiswap",
    category: "Crypto Platform",
    description:
      "Multi-chain crypto platform with crypto calculator and responsive H5 experience.",
    longDescription:
      "Built a multi-chain crypto experience focused on conversion tools, responsive H5 flows and performance on mobile networks.",
    tech: ["React", "TypeScript", "Crypto", "Multi-chain"],
    year: "2024",
    imageGradient: "from-indigo-900 via-slate-800 to-cyan-900",
    featured: true,
  },
  {
    id: "farahdeem",
    slug: "farahdeem",
    name: "Farahdeem",
    category: "H5 Product",
    description:
      "Production H5 application implemented from Figma with performance optimization.",
    longDescription:
      "Translated high-fidelity Figma designs into a production H5 app with careful performance budgeting and polish.",
    tech: ["React", "Tailwind", "Vite"],
    year: "2024",
    imageGradient: "from-rose-900 via-slate-800 to-slate-900",
    featured: true,
  },
  {
    id: "flixzen",
    slug: "flixzen",
    name: "Flixzen",
    category: "Mobile App",
    description:
      "Movie discovery application released on Google Play with search, watchlists, trailers and streaming-provider information.",
    longDescription:
      "Shipped a Flutter movie discovery app on Google Play with search, watchlists, trailers and provider availability.",
    tech: ["Flutter", "Firebase", "TMDB"],
    year: "2023",
    imageGradient: "from-violet-900 via-slate-800 to-fuchsia-900",
    featured: true,
  },
  {
    id: "admin-ops",
    slug: "admin-ops",
    name: "Ops Console",
    category: "Internal Tools",
    description:
      "Internal operations console for monitoring workflows, permissions and support tooling.",
    longDescription:
      "Designed a compact internal console for ops teams with audit-friendly UI patterns and fast filtering.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    year: "2025",
    imageGradient: "from-emerald-900 via-slate-800 to-slate-900",
  },
  {
    id: "commerce-kit",
    slug: "commerce-kit",
    name: "Commerce Kit",
    category: "E-commerce",
    description:
      "Storefront and merchant tooling for catalog, checkout and campaign management.",
    longDescription:
      "Implemented storefront surfaces and merchant tooling for catalogs, checkout and campaign operations.",
    tech: ["Next.js", "Node.js", "Stripe", "Redis"],
    year: "2023",
    imageGradient: "from-amber-900 via-slate-800 to-orange-950",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

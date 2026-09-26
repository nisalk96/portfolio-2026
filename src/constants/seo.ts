/**
 * Site-wide SEO defaults — tune titles, keywords and social here.
 */
export const seo = {
  siteUrl: "https://nisalk.dev",
  siteName: "nisalk.dev",
  locale: "en_LK",
  titleTemplate: "%s | NisalK",
  defaultTitle: "Nisal Keerthisinghe | Software Engineer in Sri Lanka",
  defaultDescription:
    "Meet Nisal Keerthisinghe, a software engineer in Sri Lanka with 6+ years building React, Next.js and Node.js apps. Explore projects, experience and contact Nisal.",
  ogImage: "/opengraph-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 600,
  twitterCard: "summary_large_image" as const,
  keywords: [
    "Nisal",
    "Nisal Keerthisinghe",
    "NisalK",
    "Software Engineer",
    "Software Engineer Sri Lanka",
    "Full-Stack Developer",
    "Fullstack Developer",
    "Full Stack Developer",
    "Web Developer",
    "Web Developer Sri Lanka",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "GraphQL Developer",
    "Web Developer Colombo",
    "Frontend Developer Sri Lanka",
    "Backend Developer Sri Lanka",
  ],
  person: {
    name: "Nisal Keerthisinghe",
    alternateName: ["Nisal", "NisalK"],
    jobTitle: "Software Engineer & Full-Stack Web Developer",
    sameAs: [
      "https://github.com/nisalk96",
      "https://www.linkedin.com/in/nisalk/",
      "https://x.com/nisalk96",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "GraphQL",
    ],
  },
} as const;

export type SeoConstants = typeof seo;

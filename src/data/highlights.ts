import { skillCategories } from "@/data/skills";

export type HighlightTint = "orange" | "violet" | "blue" | "teal";

export const yearsOfExperience = "6+";

export const technologiesCount = `${skillCategories.reduce(
  (total, category) => total + category.skills.length,
  0,
)}+`;

export const aboutHeading = {
  lineOne: "Engineering with Care",
  lineTwo: "Building with Purpose",
};

export const aboutBio = `I'm a senior software engineer with ${yearsOfExperience} years of experience turning complex product requirements into fast, reliable and maintainable web applications. I care about typed systems, reusable UI architecture and interfaces that feel intentional.`;

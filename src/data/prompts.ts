import type { AnswerKind, PromptChip, PromptId } from "@/types/portfolio";

export const initialPrompts: PromptChip[] = [
  {
    id: "projects",
    label: "What projects have you worked on?",
    emphasize: "projects",
    icon: "sparkles",
  },
  {
    id: "experience",
    label: "Tell me about your experience",
    emphasize: "experience",
    icon: "bolt",
  },
  {
    id: "stack",
    label: "What is your tech stack?",
    emphasize: "tech stack",
    icon: "code",
  },
  {
    id: "frontend",
    label: "What are your strongest frontend skills?",
    emphasize: "frontend skills",
    icon: "code",
  },
  {
    id: "recent",
    label: "Show me your recent work",
    emphasize: "recent work",
    icon: "search",
  },
  {
    id: "contact",
    label: "How can I contact you?",
    emphasize: "contact",
    icon: "arrow",
  },
];

export const followUps: Record<AnswerKind, PromptChip[]> = {
  welcome: initialPrompts,
  projects: [
    {
      id: "cardchat",
      label: "Tell me about CardChat",
      emphasize: "CardChat",
      icon: "sparkles",
    },
    {
      id: "frontend",
      label: "Show frontend projects",
      emphasize: "frontend",
      icon: "code",
    },
    {
      id: "stack",
      label: "View technical stack",
      emphasize: "stack",
      icon: "code",
    },
    {
      id: "contact",
      label: "Contact Nisal",
      emphasize: "Contact",
      icon: "mail",
    },
  ],
  experience: [
    {
      id: "projects",
      label: "Show projects",
      emphasize: "projects",
      icon: "sparkles",
    },
    {
      id: "stack",
      label: "What technologies does he use?",
      emphasize: "technologies",
      icon: "code",
    },
    {
      id: "resume",
      label: "Download resume",
      emphasize: "resume",
      icon: "briefcase",
    },
  ],
  stack: [
    {
      id: "frontend",
      label: "Strongest frontend skills?",
      emphasize: "frontend",
      icon: "code",
    },
    {
      id: "projects",
      label: "See projects using this stack",
      emphasize: "projects",
      icon: "sparkles",
    },
    {
      id: "contact",
      label: "Want to work together?",
      emphasize: "work together",
      icon: "mail",
    },
  ],
  frontend: [
    {
      id: "projects",
      label: "Show frontend projects",
      emphasize: "projects",
      icon: "sparkles",
    },
    {
      id: "stack",
      label: "Full tech stack",
      emphasize: "stack",
      icon: "code",
    },
    {
      id: "experience",
      label: "See experience",
      emphasize: "experience",
      icon: "briefcase",
    },
  ],
  recent: [
    {
      id: "cardchat",
      label: "Tell me about CardChat",
      emphasize: "CardChat",
      icon: "sparkles",
    },
    {
      id: "experience",
      label: "Tell me about experience",
      emphasize: "experience",
      icon: "bolt",
    },
    {
      id: "contact",
      label: "Contact Nisal",
      emphasize: "Contact",
      icon: "mail",
    },
  ],
  contact: [
    {
      id: "resume",
      label: "Download resume",
      emphasize: "resume",
      icon: "briefcase",
    },
    {
      id: "projects",
      label: "Browse projects first",
      emphasize: "projects",
      icon: "sparkles",
    },
    {
      id: "experience",
      label: "Review experience",
      emphasize: "experience",
      icon: "bolt",
    },
  ],
  cardchat: [
    {
      id: "projects",
      label: "Show more projects",
      emphasize: "projects",
      icon: "sparkles",
    },
    {
      id: "stack",
      label: "What stack was used?",
      emphasize: "stack",
      icon: "code",
    },
    {
      id: "contact",
      label: "Contact Nisal",
      emphasize: "Contact",
      icon: "mail",
    },
  ],
  resume: [
    {
      id: "contact",
      label: "Email Nisal",
      emphasize: "Email",
      icon: "mail",
    },
    {
      id: "experience",
      label: "See experience",
      emphasize: "experience",
      icon: "briefcase",
    },
    {
      id: "projects",
      label: "View projects",
      emphasize: "projects",
      icon: "sparkles",
    },
  ],
  text: initialPrompts.slice(0, 4),
};

export const promptToAnswerKind: Record<PromptId, AnswerKind> = {
  projects: "projects",
  experience: "experience",
  stack: "stack",
  frontend: "frontend",
  recent: "recent",
  contact: "contact",
  cardchat: "cardchat",
  resume: "resume",
};

export const thinkingStatuses: Record<AnswerKind, string[]> = {
  welcome: ["Thinking..."],
  projects: [
    "Thinking...",
    "Searching portfolio...",
    "Finding relevant projects...",
  ],
  experience: ["Thinking...", "Reading experience...", "Preparing timeline..."],
  stack: ["Thinking...", "Checking skills...", "Organizing tech stack..."],
  frontend: [
    "Thinking...",
    "Checking skills...",
    "Preparing frontend highlights...",
  ],
  recent: ["Thinking...", "Searching projects...", "Sorting recent work..."],
  contact: ["Thinking...", "Preparing contact options..."],
  cardchat: ["Thinking...", "Searching projects...", "Opening CardChat..."],
  resume: ["Thinking...", "Preparing resume details..."],
  text: ["Thinking...", "Preparing response..."],
};

export function resolvePromptFromInput(input: string): PromptId | null {
  const value = input.toLowerCase();

  if (value.includes("cardchat")) return "cardchat";
  if (value.includes("resume") || value.includes("cv")) return "resume";
  if (
    value.includes("contact") ||
    value.includes("email") ||
    value.includes("hire")
  )
    return "contact";
  if (
    value.includes("experience") ||
    value.includes("career") ||
    value.includes("work history")
  )
    return "experience";
  if (
    value.includes("frontend") ||
    value.includes("react") ||
    value.includes("ui")
  )
    return "frontend";
  if (
    value.includes("stack") ||
    value.includes("tech") ||
    value.includes("skills") ||
    value.includes("tools")
  )
    return "stack";
  if (value.includes("recent") || value.includes("latest")) return "recent";
  if (value.includes("project")) return "projects";

  return null;
}

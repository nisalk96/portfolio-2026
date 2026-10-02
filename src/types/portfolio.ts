export type PromptId =
  | "projects"
  | "experience"
  | "stack"
  | "frontend"
  | "recent"
  | "contact"
  | "cardchat"
  | "resume";

export type PromptIcon =
  "sparkles" | "bolt" | "code" | "arrow" | "briefcase" | "search" | "mail";

export interface PromptChip {
  id: PromptId;
  label: string;
  emphasize?: string;
  icon: PromptIcon;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  year: string;
  imageGradient: string;
  imageUrl?: string;
  href?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  tech: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ProfileMeta {
  name: string;
  shortName: string;
  title: string;
  location: string;
  experienceYears: string;
  focus: string;
  availability: string;
  intro: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export type ChatRole = "assistant" | "user";

export type AnswerKind =
  | "welcome"
  | "projects"
  | "experience"
  | "stack"
  | "frontend"
  | "recent"
  | "contact"
  | "cardchat"
  | "resume"
  | "text";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  kind: AnswerKind;
  text: string;
  isTyping?: boolean;
}

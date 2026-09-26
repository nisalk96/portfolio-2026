import type { AnswerKind, Project } from "@/types/portfolio";

export function getAnswerIntro(
  kind: AnswerKind,
  projects: Project[] = [],
): string {
  switch (kind) {
    case "projects":
      return "I've worked on several production products. Here are some highlights:";
    case "experience":
      return "Here's a quick overview of Nisal's professional experience.";
    case "stack":
      return "Nisal works across the full stack. Here's the current technical toolkit:";
    case "frontend":
      return "His strongest frontend skills center on modern React ecosystems and product-quality UI:";
    case "recent":
      return "Here is some of the more recent production work:";
    case "contact":
      return "Want to work together? Reach out through any of these channels.";
    case "cardchat": {
      const project = projects.find((item) =>
        /cardchat|card.?chat/i.test(`${item.id} ${item.name}`),
      );
      return (
        project?.longDescription ??
        "CardChat isn't in the live CMS list yet — ask about projects to see current production work."
      );
    }
    case "resume":
      return "You can download Nisal's resume, or jump into experience and projects first.";
    case "welcome":
      return "Hey 👋 I'm Nisal's portfolio assistant.\n\nYou can explore his projects, experience, technical stack and background below.";
    default:
      return "I can help with projects, experience, tech stack, or contact details. Try one of the prompts below.";
  }
}

export function getSectionId(kind: AnswerKind): string | null {
  switch (kind) {
    case "projects":
    case "recent":
    case "cardchat":
      return "projects";
    case "experience":
      return "experience";
    case "stack":
    case "frontend":
      return "stack";
    case "contact":
    case "resume":
      return "contact";
    default:
      return null;
  }
}

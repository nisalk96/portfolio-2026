"use client";

import {
  IconBriefcase,
  IconBrandGithub,
  IconCode,
  IconFileText,
  IconMail,
  IconSparkles,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { profile } from "@/data/profile";
import type { PromptId } from "@/types/portfolio";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAsk: (id: PromptId) => void;
}

const actions: Array<{
  id: PromptId | "github";
  label: string;
  hint: string;
  icon: typeof IconSparkles;
}> = [
  {
    id: "projects",
    label: "Projects",
    hint: "Ask about production work",
    icon: IconSparkles,
  },
  {
    id: "experience",
    label: "Experience",
    hint: "Explore career timeline",
    icon: IconBriefcase,
  },
  {
    id: "stack",
    label: "Tech Stack",
    hint: "Frontend, backend, cloud",
    icon: IconCode,
  },
  {
    id: "resume",
    label: "Resume",
    hint: "Download CV details",
    icon: IconFileText,
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Email and social links",
    icon: IconMail,
  },
  {
    id: "github",
    label: "GitHub",
    hint: "Open GitHub profile",
    icon: IconBrandGithub,
  },
];

export function CommandPalette({
  open,
  onOpenChange,
  onAsk,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  const handleOpenChange = (next: boolean) => {
    if (!next) setQuery("");
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="overflow-hidden p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Ask Nisal AI</DialogTitle>
          <DialogDescription>
            Jump to projects, experience, stack, resume or contact.
          </DialogDescription>
        </DialogHeader>
        <Command className="rounded-xl border-0">
          <CommandInput
            placeholder="Ask Nisal AI..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No matching actions.</CommandEmpty>
            <CommandGroup heading="Portfolio knowledge">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <CommandItem
                    key={action.id}
                    value={`${action.label} ${action.hint}`}
                    onSelect={() => {
                      handleOpenChange(false);
                      if (action.id === "github") {
                        window.open(profile.github, "_blank", "noreferrer");
                        return;
                      }
                      onAsk(action.id);
                      document.getElementById("assistant")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span>{action.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {action.hint}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

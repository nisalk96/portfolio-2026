import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  label: string;
  className?: string;
}

export function SkillBadge({ label, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-border/70 bg-background px-2.5 py-1 text-[12px] text-foreground/85 shadow-sm",
        className,
      )}
    >
      {label}
    </span>
  );
}

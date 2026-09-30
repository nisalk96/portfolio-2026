import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  label: string;
  className?: string;
}

export function SkillBadge({ label, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center rounded-full px-2.5 py-1 text-[12px] text-foreground/85",
        className,
      )}
    >
      {label}
    </span>
  );
}

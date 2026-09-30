import type { Icon } from "@tabler/icons-react";
import type { HighlightTint } from "@/data/highlights";
import { cn } from "@/lib/utils";

const tintClasses: Record<HighlightTint, string> = {
  orange: "bg-tint-orange/70 text-[#B7791F] dark:text-[#F6DBAE]",
  violet: "bg-tint-violet/60 text-[#5B50C9] dark:text-[#C9BEFA]",
  blue: "bg-tint-blue/60 text-[#3F5FC7] dark:text-[#BCCBFA]",
  teal: "bg-tint-teal/60 text-[#23798C] dark:text-[#B5E3EE]",
};

export const tintOrder: HighlightTint[] = ["orange", "violet", "blue", "teal"];

interface TintIconProps {
  icon: Icon;
  tint: HighlightTint;
  size?: "sm" | "md";
  className?: string;
}

export function TintIcon({ icon: IconComponent, tint, size = "md", className }: TintIconProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center shadow-[inset_0_1px_0_rgb(255_255_255/0.6)]",
        size === "md" ? "size-11 rounded-2xl" : "size-8 rounded-xl",
        tintClasses[tint],
        className,
      )}
    >
      <IconComponent className={size === "md" ? "size-5" : "size-4"} stroke={1.75} />
    </span>
  );
}

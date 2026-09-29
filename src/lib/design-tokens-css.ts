import { animation } from "@/constants/animation";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { variables } from "@/constants/variables";

function kebab(key: string) {
  return key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

function themeBlock(
  selector: string,
  theme: Record<string, string>,
) {
  const lines = Object.entries(theme).map(
    ([key, value]) => `  --${kebab(key)}: ${value};`,
  );

  return `${selector} {\n${lines.join("\n")}\n}`;
}

function radiusBlock() {
  const lines = [
    `  --ui-radius: ${radius.base};`,
    `  --radius: var(--ui-radius);`,
    ...Object.entries(radius.scale).map(
      ([key, value]) =>
        `  --ui-radius-${key}: calc(var(--ui-radius) * ${value});`,
    ),
  ];

  return `:root {\n${lines.join("\n")}\n}`;
}

function variablesBlock() {
  return `:root {
  --layout-max-width: ${variables.layout.maxWidth};
  --header-blur: ${variables.layout.headerBlurPx}px;
  --section-scroll-margin: ${variables.layout.sectionScrollMargin};
  --chat-height: ${variables.chat.height};
  --chat-min-height: ${variables.chat.minHeight};
  --duration-fast: ${variables.cssDuration.fast};
  --duration-normal: ${variables.cssDuration.normal};
  --duration-slow: ${variables.cssDuration.slow};
  --motion-instant: ${animation.instant}s;
  --motion-fast: ${animation.fast}s;
  --motion-normal: ${animation.normal}s;
  --motion-slow: ${animation.slow}s;
  --motion-ambient: ${animation.ambient}s;
  --motion-ease-out: cubic-bezier(${animation.ease.out.join(", ")});
  --reveal-distance: ${animation.reveal.distance}px;
  --reveal-blur: ${animation.reveal.blur}px;
  --reveal-stagger: ${animation.stagger.normal}s;
}`;
}

/** CSS custom properties generated from `src/constants/*` — edit those files to tune. */
export function buildDesignTokensCss() {
  return [
    "/* Generated from src/constants — do not hand-edit values here */",
    radiusBlock(),
    variablesBlock(),
    themeBlock(":root", colors.light),
    themeBlock(".dark", colors.dark),
  ].join("\n\n");
}

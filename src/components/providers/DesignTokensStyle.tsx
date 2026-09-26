import { buildDesignTokensCss } from "@/lib/design-tokens-css";

/** Injects tunable design tokens from `src/constants` as CSS variables. */
export function DesignTokensStyle() {
  return (
    <style
      id="design-tokens"
      dangerouslySetInnerHTML={{ __html: buildDesignTokensCss() }}
    />
  );
}

import { expect, test } from "@playwright/test";
import {
  gotoHome,
  inBetweenFrames,
  isReducedMotion,
  sampleFrames,
  startRecording,
  stopRecordingAt,
} from "./helpers";

test.describe("page motion", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("Lenis smooth scroll follows the motion preference", async ({ page }, testInfo) => {
    const html = page.locator("html");

    if (isReducedMotion(testInfo)) {
      await expect(html).not.toHaveClass(/\blenis\b/);
      return;
    }

    await expect(html).toHaveClass(/\blenis\b/);

    await page.mouse.move(200, 200);
    const before = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 400);
    const frames = await sampleFrames(page, "scrollY", 60);

    expect(frames.at(-1)! - before).toBeGreaterThan(300);
    // Native wheel scrolling jumps in one frame; Lenis eases across several.
    expect(inBetweenFrames([before, ...frames])).toBeGreaterThan(3);
  });

  test("above-the-fold content reveals on mount and settles visible", async ({ page }, testInfo) => {
    const mountReveals = page.locator(".reveal-css");
    expect(await mountReveals.count()).toBeGreaterThan(0);

    const animationNames = await mountReveals.first().evaluate((el) => getComputedStyle(el).animationName);
    expect(animationNames).toBe(isReducedMotion(testInfo) ? "reveal-fade" : "reveal-in");

    // `fill: both` keeps finished animations attached, so check their state instead.
    await expect
      .poll(() =>
        mountReveals.evaluateAll((els) =>
          els.every((el) =>
            el
              .getAnimations()
              .filter((a) => a instanceof CSSAnimation && a.animationName.startsWith("reveal"))
              .every((a) => a.playState === "finished"),
          ),
        ),
      )
      .toBe(true);
    const settled = await mountReveals.first().evaluate((el) => {
      const style = getComputedStyle(el);
      return { opacity: style.opacity, transform: style.transform };
    });
    expect(settled.opacity).toBe("1");
    expect(settled.transform).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  });

  test("scroll-triggered reveals animate in only when reduced motion is off", async ({ page }, testInfo) => {
    const target = page.locator("#experience .reveal-in-view").first();
    const opacity = () => target.evaluate((el) => Number(getComputedStyle(el).opacity));

    if (isReducedMotion(testInfo)) {
      expect(await opacity()).toBe(1);
      return;
    }

    expect(await opacity()).toBe(0);

    await startRecording(
      page,
      `Number(getComputedStyle(document.querySelector("#experience .reveal-in-view")).opacity)`,
    );
    await target.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const frames = await stopRecordingAt(page, 1, 0);
    expect(inBetweenFrames(frames)).toBeGreaterThan(2);
    await expect
      .poll(() => target.evaluate((el) => getComputedStyle(el).filter))
      .toMatch(/^(none|blur\(0px\))$/);
  });

  test("custom cursor eases toward the pointer", async ({ page }, testInfo) => {
    const html = page.locator("html");

    if (isReducedMotion(testInfo)) {
      await expect(html).not.toHaveClass(/\bhas-custom-cursor\b/);
      return;
    }

    await expect(html).toHaveClass(/\bhas-custom-cursor\b/);
    const ring = page.locator(".custom-cursor__ring");
    const ringCenter = async () => {
      const box = (await ring.boundingBox())!;
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    };

    await page.mouse.move(300, 300);
    await expect.poll(async () => Math.abs((await ringCenter()).x - 300)).toBeLessThan(4);

    await startRecording(
      page,
      `(() => { const r = document.querySelector(".custom-cursor__ring").getBoundingClientRect(); return r.x + r.width / 2; })()`,
    );
    await page.mouse.move(700, 400);
    const frames = await stopRecordingAt(page, 700, 3);

    // Ring trails the pointer across several frames instead of jumping to it.
    expect(inBetweenFrames([300, ...frames])).toBeGreaterThan(4);
    await expect.poll(async () => Math.abs((await ringCenter()).y - 400)).toBeLessThan(4);
  });
});

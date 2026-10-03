import { expect, test } from "@playwright/test";
import {
  gotoHome,
  hoverCenter,
  inBetweenFrames,
  isReducedMotion,
  projectsRail,
  sampleFrames,
  scrollLeftOf,
  startRecording,
  stopRecordingAt,
} from "./helpers";

const RAIL_SCROLL = `document.querySelector("[data-drag-scroll]").scrollLeft`;

test.describe("projects carousel motion", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
    const rail = projectsRail(page);
    await rail.evaluate((el) => {
      el.scrollIntoView({ block: "center" });
      el.scrollLeft = 0;
    });
    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains("lenis-scrolling"))).toBe(false);
  });

  test("never snaps", async ({ page }) => {
    const rail = projectsRail(page);
    expect(await rail.evaluate((el) => getComputedStyle(el).scrollSnapType)).toBe("none");

    const cardSnap = await rail
      .locator(":scope > *")
      .evaluateAll((cards) => cards.map((card) => getComputedStyle(card).scrollSnapAlign));
    expect(cardSnap.every((value) => value === "none")).toBe(true);

    await hoverCenter(page, rail);
    await page.mouse.wheel(0, 37);
    await page.waitForTimeout(800);
    // An odd offset must stay put rather than jump to a card edge.
    expect(await scrollLeftOf(rail)).toBeCloseTo(37, 0);
  });

  test("vertical wheel scrolls the rail sideways without moving the page", async ({ page }, testInfo) => {
    const rail = projectsRail(page);
    await hoverCenter(page, rail);
    const pageY = await page.evaluate(() => scrollY);

    await startRecording(page, RAIL_SCROLL);
    await page.mouse.wheel(0, 120);
    const frames = await stopRecordingAt(page, 120, 0.5);

    if (isReducedMotion(testInfo)) {
      expect(inBetweenFrames([0, ...frames])).toBe(0);
    } else {
      expect(inBetweenFrames([0, ...frames])).toBeGreaterThan(4);
    }

    await page.waitForTimeout(300);
    expect(await page.evaluate(() => scrollY)).toBe(pageY);
  });

  test("rapid wheel ticks accumulate into one continuous glide", async ({ page }, testInfo) => {
    test.skip(isReducedMotion(testInfo), "easing is disabled under reduced motion");
    const rail = projectsRail(page);
    await hoverCenter(page, rail);

    await startRecording(page, RAIL_SCROLL);
    for (let i = 0; i < 4; i++) await page.mouse.wheel(0, 100);
    const frames = await stopRecordingAt(page, 400, 0.5);

    for (let i = 1; i < frames.length; i++) {
      expect(frames[i]).toBeGreaterThanOrEqual(frames[i - 1]);
    }
  });

  test("wheel hands back to the page at either end", async ({ page }) => {
    const rail = projectsRail(page);
    await hoverCenter(page, rail);

    const before = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, -200);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(before - 100);
    expect(await scrollLeftOf(rail)).toBe(0);

    await rail.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await rail.evaluate((el) => (el.scrollLeft = el.scrollWidth));
    await hoverCenter(page, rail);
    const atEnd = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 200);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(atEnd + 100);
  });

  test("drag follows the pointer and flicks with momentum", async ({ page }, testInfo) => {
    const rail = projectsRail(page);
    const { x, y } = await hoverCenter(page, rail);
    const url = page.url();

    await page.mouse.down();
    await expect(rail).not.toHaveAttribute("data-dragging");
    await page.mouse.move(x - 40, y, { steps: 2 });
    await expect(rail).toHaveAttribute("data-dragging", "true");
    // Record the release position in-page: any pause before `up` makes the velocity stale.
    await rail.evaluate((el) => {
      window.addEventListener(
        "pointerup",
        () => (el.dataset.releasedAt = String(el.scrollLeft)),
        { capture: true, once: true },
      );
    });
    await page.mouse.move(x - 240, y, { steps: 6 });
    await page.mouse.up();
    const released = Number(await rail.getAttribute("data-released-at"));
    expect(released).toBeGreaterThan(200);

    await expect(rail).not.toHaveAttribute("data-dragging");
    const glide = await sampleFrames(page, RAIL_SCROLL, 40);

    if (isReducedMotion(testInfo)) {
      expect(glide.at(-1)).toBe(released);
    } else {
      expect(glide.at(-1)! - released).toBeGreaterThan(30);
      expect(inBetweenFrames([released, ...glide])).toBeGreaterThan(4);
    }

    // The click that ends a drag must not open the card underneath.
    await page.waitForTimeout(300);
    expect(page.url()).toBe(url);
  });

  test("a plain click still opens a project", async ({ page }) => {
    const firstCard = projectsRail(page).locator("a").first();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });
});

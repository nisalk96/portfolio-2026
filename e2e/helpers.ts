import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";

export const isReducedMotion = (testInfo: TestInfo) =>
  testInfo.project.name === "reduced-motion";

/** Loads the home page and waits for hydration plus the streamed project cards. */
export async function gotoHome(page: Page) {
  await page.goto("/");
  await expect(projectsRail(page).locator("a").nth(1)).toBeAttached({ timeout: 20_000 });
  await page.waitForLoadState("networkidle");
}

export const projectsRail = (page: Page) => page.locator("[data-drag-scroll]");

/** Reads the `read` expression in the page on each of the next `frames` animation frames. */
export function sampleFrames(page: Page, read: string, frames = 30) {
  return page.evaluate(
    async ({ read, frames }) => {
      const fn = new Function(`return (${read});`) as () => number;
      const values: number[] = [];
      for (let i = 0; i < frames; i++) {
        await new Promise(requestAnimationFrame);
        values.push(fn());
      }
      return values;
    },
    { read, frames },
  );
}

type RecorderWindow = Window & { __frames?: number[]; __recording?: boolean };

/**
 * Starts recording the `read` expression every frame in the background, so an
 * action driven from the test (mouse move, scroll) is captured from its first frame.
 */
export async function startRecording(page: Page, read: string, maxMs = 4000) {
  await page.evaluate(
    ({ read, maxMs }) => {
      const win = window as RecorderWindow;
      const fn = new Function(`return (${read});`) as () => number;
      const started = performance.now();
      win.__frames = [];
      win.__recording = true;
      const tick = () => {
        if (!win.__recording || performance.now() - started > maxMs) return;
        win.__frames!.push(fn());
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    { read, maxMs },
  );
}

/** Waits until the recorded value reaches `target` (± `tolerance`), then returns every frame. */
export async function stopRecordingAt(page: Page, target: number, tolerance: number, timeout = 4000) {
  await expect
    .poll(
      () =>
        page.evaluate(
          ({ target, tolerance }) => {
            const last = (window as RecorderWindow).__frames?.at(-1);
            return last !== undefined && Math.abs(last - target) <= tolerance;
          },
          { target, tolerance },
        ),
      { timeout },
    )
    .toBe(true);
  return page.evaluate(() => {
    const win = window as RecorderWindow;
    win.__recording = false;
    return win.__frames ?? [];
  });
}

/** Values strictly between the first and last sample, i.e. visible in-between frames. */
export const inBetweenFrames = (values: number[]) => {
  const start = values[0];
  const end = values.at(-1)!;
  const [low, high] = start < end ? [start, end] : [end, start];
  const margin = Math.max((high - low) * 0.01, 1e-3);
  return new Set(values.filter((v) => v > low + margin && v < high - margin)).size;
};

export async function hoverCenter(page: Page, target: Locator) {
  const box = await target.boundingBox();
  if (!box) throw new Error("target is not visible");
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  return { x, y, box };
}

export const scrollLeftOf = (rail: Locator) => rail.evaluate((el) => el.scrollLeft);

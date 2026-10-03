import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
/** Edge ships with Windows; set PLAYWRIGHT_CHANNEL=chromium (after `npx playwright install chromium`) elsewhere. */
const channel = process.env.PLAYWRIGHT_CHANNEL ?? "msedge";

export default defineConfig({
  testDir: "./e2e",
  // Frame-timing assertions (easing, momentum, velocity staleness) flake when browsers compete for CPU.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 45_000,
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "motion",
      use: {
        ...devices["Desktop Chrome"],
        channel,
        reducedMotion: "no-preference",
      },
    },
    {
      name: "reduced-motion",
      use: {
        ...devices["Desktop Chrome"],
        channel,
        reducedMotion: "reduce",
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 180_000,
  },
});

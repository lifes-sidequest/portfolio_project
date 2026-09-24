import { chromium, devices } from "@playwright/test";

const baseURL = process.env.PERF_BASE_URL ?? "http://localhost:3100";
const output = new URL("../public/images/projects/car-parts/", import.meta.url);
const browser = await chromium.launch({ headless: true });

for (const theme of ["light", "dark"]) {
  const context = await browser.newContext(devices["Desktop Chrome"]);
  await context.addInitScript((selectedTheme) => {
    window.localStorage.setItem("portfolio-theme", selectedTheme);
  }, theme);
  const page = await context.newPage();
  await page.goto(`${baseURL}/projects/car-parts`, { waitUntil: "load" });
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
  const video = page.locator(".car-parts-hero-video");
  await video.waitFor({ state: "visible" });
  await video.evaluate(async (element) => {
    if (!(element instanceof HTMLVideoElement)) return;
    if (element.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      await new Promise((resolve) => element.addEventListener("loadeddata", resolve, { once: true }));
    }
    element.pause();
    element.currentTime = 0;
    await new Promise((resolve) => element.addEventListener("seeked", resolve, { once: true }));
  });
  await video.screenshot({ path: new URL(`car-parts-poster-${theme}.png`, output).pathname });
  await context.close();
}

await browser.close();

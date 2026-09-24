import { chromium, devices } from "@playwright/test";

const baseURL = process.env.PERF_BASE_URL ?? "http://localhost:3100";
const routes = ["/projects/kaspi-home", "/projects/car-parts"];
const browser = await chromium.launch({ headless: true });

for (const [condition, options] of [["desktop", devices["Desktop Chrome"]], ["mobile", devices["Pixel 7"]]]) {
  for (const route of routes) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    await page.goto(`${baseURL}${route}`, { waitUntil: "load" });
    await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
    await page.waitForTimeout(1000);

    const result = await page.evaluate(() => {
      const images = performance.getEntriesByType("resource")
        .filter((entry) => entry.initiatorType === "img")
        .map((entry) => ({ name: entry.name, bytes: entry.transferSize }));
      return {
        imageElements: document.images.length,
        requestedImages: images.length,
        transferredBytes: images.reduce((sum, image) => sum + image.bytes, 0),
        largest: images.sort((a, b) => b.bytes - a.bytes).slice(0, 8),
      };
    });

    console.log(JSON.stringify({ condition, route, ...result }));
    await context.close();
  }
}

await browser.close();

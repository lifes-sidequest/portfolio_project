import { chromium, devices } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.PERF_BASE_URL ?? "http://localhost:3100";
const outputDir = new URL("../docs/performance/artifacts/", import.meta.url);
const conditions = [
  { name: "desktop", context: devices["Desktop Chrome"] },
  { name: "mobile", context: devices["Pixel 7"] },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const condition of conditions) {
  for (let run = 1; run <= 3; run += 1) {
    const context = await browser.newContext(condition.context);
    const page = await context.newPage();
    const startedAt = performance.now();
    await page.goto(baseURL, { waitUntil: "load" });
    const loadedAt = performance.now();
    await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
    const readyAt = performance.now();
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");
      const byType = {};
      for (const resource of resources) {
        const type = resource.initiatorType || "other";
        byType[type] = (byType[type] ?? 0) + resource.transferSize;
      }
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd,
        loadEvent: navigation.loadEventEnd,
        transferredBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
        transferredByType: byType,
        resourceCount: resources.length,
        largestResources: resources
          .map((resource) => ({ name: resource.name, type: resource.initiatorType, bytes: resource.transferSize }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 8),
      };
    });
    results.push({
      condition: condition.name,
      run,
      navigationMs: Math.round(loadedAt - startedAt),
      loaderMs: Math.round(readyAt - startedAt),
      ...metrics,
    });
    if (run === 1) {
      await page.screenshot({ path: new URL(`home-${condition.name}.png`, outputDir).pathname, fullPage: true });
    }
    await context.close();
  }
}

await browser.close();
await writeFile(new URL("baseline.json", outputDir), `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));

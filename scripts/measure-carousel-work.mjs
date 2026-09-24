import { chromium, devices } from "@playwright/test";

const baseURL = process.env.PERF_BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ headless: true });

for (const [condition, options] of [["desktop", devices["Desktop Chrome"]], ["mobile", devices["Pixel 7"]]]) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  await session.send("Performance.enable");
  await page.goto(`${baseURL}/projects/car-parts`, { waitUntil: "load" });
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });

  const carouselRequestsBeforeScroll = await page.evaluate(() => performance
    .getEntriesByType("resource")
    .filter((entry) => entry.name.includes("/car-parts/carousel/"))
    .length);

  const carousel = page.locator(".car-parts-fan-carousel");
  await carousel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);

  const readMetrics = async () => Object.fromEntries(
    (await session.send("Performance.getMetrics")).metrics.map(({ name, value }) => [name, value]),
  );
  const before = await readMetrics();
  await page.getByRole("button", { name: "Next image" }).click();
  await page.waitForTimeout(800);
  const after = await readMetrics();

  const resources = await page.evaluate(() => performance
    .getEntriesByType("resource")
    .filter((entry) => entry.name.includes("/car-parts/carousel/"))
    .map((entry) => ({ name: entry.name, bytes: entry.transferSize })));

  console.log(JSON.stringify({
    condition,
    carouselRequestsBeforeScroll,
    carouselRequestsAfterScroll: resources.length,
    carouselTransferBytes: resources.reduce((sum, resource) => sum + resource.bytes, 0),
    interactionTaskDurationMs: Math.round((after.TaskDuration - before.TaskDuration) * 1000),
    interactionScriptDurationMs: Math.round((after.ScriptDuration - before.ScriptDuration) * 1000),
    interactionLayoutCount: after.LayoutCount - before.LayoutCount,
    interactionStyleRecalcCount: after.RecalcStyleCount - before.RecalcStyleCount,
  }));

  await context.close();
}

await browser.close();

import { chromium, devices } from "@playwright/test";

const baseURL = process.env.PERF_BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ headless: true });

for (const [condition, options] of [["desktop", devices["Desktop Chrome"]], ["mobile", devices["Pixel 7"]]]) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  await session.send("Performance.enable");
  await page.goto(baseURL, { waitUntil: "load" });
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const readMetrics = async () => Object.fromEntries(
    (await session.send("Performance.getMetrics")).metrics.map(({ name, value }) => [name, value]),
  );
  const before = await readMetrics();
  const playingBefore = await page.locator("video").evaluateAll((videos) => videos.filter((video) => !video.paused).length);
  await page.waitForTimeout(5000);
  const after = await readMetrics();
  const playingAfter = await page.locator("video").evaluateAll((videos) => videos.filter((video) => !video.paused).length);

  console.log(JSON.stringify({
    condition,
    playingBefore,
    playingAfter,
    intervalSeconds: 5,
    taskDurationMs: Math.round((after.TaskDuration - before.TaskDuration) * 1000),
    scriptDurationMs: Math.round((after.ScriptDuration - before.ScriptDuration) * 1000),
    layoutCount: after.LayoutCount - before.LayoutCount,
  }));

  await context.close();
}

await browser.close();

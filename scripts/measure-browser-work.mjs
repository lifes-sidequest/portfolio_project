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

  const readMetrics = async () => Object.fromEntries(
    (await session.send("Performance.getMetrics")).metrics.map(({ name, value }) => [name, value]),
  );
  const before = await readMetrics();
  await page.waitForTimeout(10_000);
  const after = await readMetrics();

  console.log(JSON.stringify({
    condition,
    intervalSeconds: 10,
    taskDurationMs: Math.round((after.TaskDuration - before.TaskDuration) * 1000),
    scriptDurationMs: Math.round((after.ScriptDuration - before.ScriptDuration) * 1000),
    layoutDurationMs: Math.round((after.LayoutDuration - before.LayoutDuration) * 1000),
    recalcStyleDurationMs: Math.round((after.RecalcStyleDuration - before.RecalcStyleDuration) * 1000),
    jsHeapUsedMb: Number((after.JSHeapUsedSize / 1024 / 1024).toFixed(1)),
    layoutCount: after.LayoutCount - before.LayoutCount,
    recalcStyleCount: after.RecalcStyleCount - before.RecalcStyleCount,
  }));
  await context.close();
}

await browser.close();

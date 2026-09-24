import { chromium, devices } from "@playwright/test";

const baseURL = process.env.PERF_BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ headless: true });

for (const [condition, options] of [["desktop", devices["Desktop Chrome"]], ["mobile", devices["Pixel 7"]]]) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  await session.send("Performance.enable");

  const readMetrics = async () => Object.fromEntries(
    (await session.send("Performance.getMetrics")).metrics.map(({ name, value }) => [name, value]),
  );

  const startedAt = performance.now();
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  const loader = page.getByRole("status", { name: "Loading portfolio" });
  await loader.waitFor({ state: "visible" });
  const loaderVisibleAt = performance.now();
  const loaderStart = await readMetrics();
  await loader.waitFor({ state: "hidden" });
  const loaderHiddenAt = performance.now();
  const afterLoader = await readMetrics();

  await page.waitForTimeout(2000);
  const afterIdle = await readMetrics();

  console.log(JSON.stringify({
    condition,
    loaderVisibleMs: Math.round(loaderVisibleAt - startedAt),
    loaderDurationMs: Math.round(loaderHiddenAt - startedAt),
    loaderTaskDurationMs: Math.round((afterLoader.TaskDuration - loaderStart.TaskDuration) * 1000),
    loaderScriptDurationMs: Math.round((afterLoader.ScriptDuration - loaderStart.ScriptDuration) * 1000),
    loaderLayoutDurationMs: Math.round((afterLoader.LayoutDuration - loaderStart.LayoutDuration) * 1000),
    loaderLayoutCount: afterLoader.LayoutCount - loaderStart.LayoutCount,
    idleTaskDurationMs: Math.round((afterIdle.TaskDuration - afterLoader.TaskDuration) * 1000),
    idleLayoutCount: afterIdle.LayoutCount - afterLoader.LayoutCount,
  }));

  await context.close();
}

await browser.close();

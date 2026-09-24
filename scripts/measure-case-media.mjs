import { chromium, devices } from "@playwright/test";

const browser = await chromium.launch({ headless: true });
for (const route of ["/projects/kaspi-home", "/projects/car-parts"]) {
  const context = await browser.newContext(devices["Desktop Chrome"]);
  const page = await context.newPage();
  await page.goto(`http://localhost:3100${route}`, { waitUntil: "load" });
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
  await page.waitForTimeout(3_000);
  const result = await page.evaluate(() => {
    const media = performance.getEntriesByType("resource")
      .filter((resource) => /\.(mp4|webm)(?:$|\?)/.test(resource.name))
      .map((resource) => ({ name: resource.name, bytes: resource.transferSize }))
      .sort((a, b) => b.bytes - a.bytes);
    return {
      videoElements: document.querySelectorAll("video").length,
      playingVideos: [...document.querySelectorAll("video")].filter((video) => !video.paused).length,
      requestedMedia: media.length,
      transferredBytes: media.reduce((sum, resource) => sum + resource.bytes, 0),
      media,
    };
  });
  console.log(JSON.stringify({ route, ...result }));
  await context.close();
}
await browser.close();

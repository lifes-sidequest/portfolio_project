import { expect, test } from "@playwright/test";

test("home loads without critical browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Senior Product Designer/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Car Parts/i }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("project cards keep their posters visible when video playback is unavailable", async ({ page }) => {
  await page.route("**/*.mp4", (route) => route.abort());
  await page.route("**/*.webm", (route) => route.abort());
  await page.goto("/");

  const shells = page.locator(".projects .viewport-video-shell");
  await expect(shells).toHaveCount(2);
  await expect(shells.nth(0).locator(".viewport-video-poster")).toBeVisible();
  await expect(shells.nth(1).locator(".viewport-video-poster")).toBeVisible();
  await expect(shells.nth(0)).not.toHaveClass(/is-playing/);
  await expect(shells.nth(1)).not.toHaveClass(/is-playing/);
});

test("the loader stays dismissed during navigation and Links contact remains stable", async ({ page }) => {
  await page.goto("/");
  const loader = page.locator(".site-loader");
  await expect(loader).toBeHidden({ timeout: 5_000 });

  const menuButton = page.getByRole("button", { name: "Toggle menu" });
  if (await menuButton.isVisible()) await menuButton.click();
  await page.getByRole("link", { name: "Links" }).click();
  await expect(page).toHaveURL(/\/links$/);
  await expect(loader).toBeHidden();

  const contact = page.locator(".index-contact .contact-copy");
  await expect(contact).toBeVisible();
  await expect(contact).not.toHaveClass(/reveal-pending/);
  await page.waitForTimeout(1_000);
  await expect(contact).toBeVisible();
  await expect(contact).not.toHaveClass(/reveal-pending/);
});

test("project case studies render their key media", async ({ page }) => {
  await page.goto("/projects/car-parts");
  await expect(page.getByLabel("Car Parts vehicle-selection preview")).toBeVisible();
  const problemImage = page.locator(".car-parts-problem-media img");
  await expect(problemImage).not.toHaveAttribute("src", /.+/);
  await problemImage.scrollIntoViewIfNeeded();
  await expect(problemImage).toHaveAttribute("src", /old-stack-light-web\.webp/);
  await expect.poll(() => problemImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".car-parts-fan-carousel")).toBeVisible();
  const first = page.getByRole("button", { name: "Show image 4" }).last();
  await expect(first).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(page.getByRole("button", { name: "Show image 5" }).last()).toHaveAttribute("aria-current", "true");

  await page.goto("/projects/kaspi-home");
  await expect(page.getByLabel("Kaspi.kz Home interface preview")).toBeVisible();
});

test("header navigation and preferences persist", async ({ page }) => {
  await page.goto("/");
  if ((page.viewportSize()?.width ?? 0) <= 809) {
    await page.getByLabel("Toggle menu").click();
  }
  await page.getByRole("link", { name: "Links", exact: true }).click();
  await expect(page).toHaveURL(/\/links$/);

  await page.getByLabel("Switch to dark theme").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByLabel("Switch to German").click();
  await expect(page.getByRole("heading", { name: "Links" })).toBeVisible();
  await expect(page.getByText("Ressourcen", { exact: true })).toBeVisible();
});

test("scroll reveals settle without retaining compositor hints", async ({ page }) => {
  await page.goto("/projects/car-parts");
  const impact = page.locator(".case-impact");

  await expect(impact).toHaveClass(/reveal-pending/);
  await impact.scrollIntoViewIfNeeded();
  await expect(impact).not.toHaveClass(/reveal-pending/);
  await expect(impact).not.toHaveClass(/reveal-active/, { timeout: 2_000 });
  await expect.poll(() => impact.evaluate((element) => getComputedStyle(element).willChange)).toBe("auto");
});

test("offscreen case media loads only when it approaches the viewport", async ({ page }) => {
  await page.goto("/projects/kaspi-home");
  const bentoImage = page.locator(".case-solution-bento img").first();
  const nextVideo = page.locator(".case-next video");

  await expect(bentoImage).not.toHaveAttribute("src", /.+/);
  await expect(nextVideo).not.toHaveAttribute("src", /.+/);
  await bentoImage.scrollIntoViewIfNeeded();
  await expect(bentoImage).toHaveAttribute("src", /old-bento-light-web\.webp/);
  await expect.poll(() => bentoImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await page.locator(".case-ending").scrollIntoViewIfNeeded();
  await expect(nextVideo).toHaveAttribute("src", /car-parts-light\.webm/);
  await expect.poll(() => nextVideo.evaluate((video: HTMLVideoElement) => video.readyState)).toBeGreaterThanOrEqual(2);
  await expect.poll(() => nextVideo.evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
});

test("Inspiration stamp flips and remains usable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/inspiration");

  await expect(page.getByRole("heading", { name: "Shots & Inspiration is coming soon" })).toBeVisible();
  await expect(page.getByText("Click to flip", { exact: true })).toBeVisible();
  const stamp = page.locator(".inspiration-stamp-interaction");
  await expect(stamp).toHaveAttribute("aria-pressed", "false");
  await expect.poll(() => page.locator(".inspiration-stamp-flipper").evaluate((element) => getComputedStyle(element).transitionDuration)).toBe("0s");

  await stamp.click();
  await expect(stamp).toHaveAttribute("aria-pressed", "true");
  await expect(stamp).toHaveAttribute("aria-label", "Show the front of the Berlin stamp");
  await expect(page.locator(".inspiration-stamp-back-art")).toBeVisible();

  await page.getByLabel("Switch to German").click();
  await expect(page.getByText("Zum Wenden klicken", { exact: true })).toBeVisible();
});

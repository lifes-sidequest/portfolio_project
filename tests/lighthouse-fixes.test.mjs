import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("uses compact first-screen Car Parts artwork", async () => {
  const caseStudy = await readFile(new URL("app/projects/car-parts/car-parts-case.tsx", root), "utf8");
  const light = new URL("public/images/projects/car-parts/car-parts-stack-light.jpg", root);
  const dark = new URL("public/images/projects/car-parts/car-parts-stack-dark.jpg", root);
  const lightVideo = new URL("public/images/projects/car-parts/car-parts-light.webm", root);
  const darkVideo = new URL("public/images/projects/car-parts/car-parts-dark.webm", root);

  await Promise.all([access(light), access(dark), access(lightVideo), access(darkVideo)]);
  assert.ok((await stat(light)).size < 700_000);
  assert.ok((await stat(dark)).size < 700_000);
  assert.ok((await stat(lightVideo)).size > 0);
  assert.ok((await stat(darkVideo)).size > 0);
  assert.match(caseStudy, /car-parts-stack-dark\.jpg/);
  assert.match(caseStudy, /car-parts-stack-light\.jpg/);
  assert.match(caseStudy, /car-parts-poster-dark\.jpg/);
  assert.match(caseStudy, /car-parts-poster-light\.jpg/);
  assert.match(caseStudy, /car-parts-dark\.webm/);
  assert.match(caseStudy, /car-parts-light\.webm/);
  assert.match(caseStudy, /fetchPriority="high"/);
  assert.match(caseStudy, /import \{ ViewportImage \}/);
  assert.equal((caseStudy.match(/<ViewportImage/g) ?? []).length, 5);
});

test("uses compact WebP derivatives for deferred Car Parts case-study images", async () => {
  const caseStudy = await readFile(new URL("app/projects/car-parts/car-parts-case.tsx", root), "utf8");
  const explicitAssets = [
    "old-stack-light-web.webp", "old-stack-dark-web.webp",
    "old-car-parts-light-before-web.webp", "old-car-parts-dark-before-web.webp",
    "new-car-parts-light-after-web.webp", "new-car-parts-dark-after-web.webp",
    "trusted-left-light-web.webp", "trusted-left-dark-web.webp",
    "trusted-right-light-web.webp", "trusted-right-dark-web.webp",
    "modification-light-web.webp", "modification-dark-web.webp",
    "articul-light-web.webp", "articul-dark-web.webp",
  ];
  const variationAssets = [1, 2, 3].flatMap((index) => [
    `var${index}-light-web.webp`,
    `var${index}-dark-web.webp`,
  ]);

  for (const asset of [...explicitAssets, ...variationAssets]) {
    const file = new URL(`public/images/projects/car-parts/${asset}`, root);
    await access(file);
    assert.ok((await stat(file)).size < 900_000, `${asset} should stay below 900 KB`);
  }

  for (const asset of explicitAssets) {
    assert.match(caseStudy, new RegExp(asset.replace(".", "\\.")));
  }
  assert.match(caseStudy, /var\$\{index \+ 1\}-\$\{theme\}-web\.webp/);
});

test("defers heavy Kaspi case-study images below the first screen", async () => {
  const caseStudy = await readFile(new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root), "utf8");
  const component = await readFile(new URL("app/_components/viewport-image.tsx", root), "utf8");

  assert.match(component, /IntersectionObserver/);
  assert.match(component, /rootMargin: "400px 0px"/);
  assert.match(component, /image\.src = src/);
  assert.match(caseStudy, /import \{ ViewportImage \}/);
  assert.equal((caseStudy.match(/<ViewportImage/g) ?? []).length, 6);
});

test("uses compact WebP derivatives for deferred Kaspi case-study images", async () => {
  const caseStudy = await readFile(new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root), "utf8");
  const assets = [
    "old-bento-light-web.webp", "old-bento-dark-web.webp",
    "new-bento-light-web.webp", "new-bento-dark-web.webp",
    "variation-first-light-web.webp", "variation-first-dark-web.webp",
    "variation-second-light-web.webp", "variation-second-dark-web.webp",
    "variation-third-light-web.webp", "variation-third-dark-web.webp",
    "many-light-web.webp", "many-dark-web.webp",
  ];

  for (const asset of assets) {
    const file = new URL(`public/images/projects/kaspi-home/${asset}`, root);
    await access(file);
    assert.ok((await stat(file)).size < 700_000, `${asset} should stay below 700 KB`);
    assert.match(caseStudy, new RegExp(asset.replace(".", "\\.")));
  }
});

test("uses compact artwork for the interactive Inspiration stamp", async () => {
  const page = await readFile(new URL("app/inspiration/inspiration-page.tsx", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");
  const assets = ["brandenburg-stamp-web.webp", "stamp-back-web.webp"];

  for (const asset of assets) {
    const file = new URL(`public/images/inspiration/${asset}`, root);
    await access(file);
    assert.ok((await stat(file)).size < 500_000, `${asset} should stay below 500 KB`);
    assert.match(page, new RegExp(asset.replace(".", "\\.")));
  }

  assert.match(styles, /brandenburg-stamp-web\.webp/);
  assert.match(page, /<img\s+className="inspiration-stamp inspiration-stamp-front"[\s\S]*?fetchPriority="high"/);
  assert.doesNotMatch(page, /stamp-back\.svg/);
  assert.doesNotMatch(styles, /brandenburg-stamp\.png/);
});

test("uses a compact Caveat subset for the Inspiration flip hint", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");
  const subset = new URL("public/fonts/caveat-400-subset.woff2", root);

  await access(subset);
  assert.ok((await stat(subset)).size < 30_000, "Caveat subset should stay below 30 KB");
  assert.match(styles, /caveat-400-subset\.woff2/);
  assert.doesNotMatch(styles, /caveat-400\.ttf/);
});

test("keeps visible control text inside accessible names", async () => {
  const agentSwitch = await readFile(new URL("app/_components/agent-mode-switch.tsx", root), "utf8");
  const header = await readFile(new URL("app/_components/site-header.tsx", root), "utf8");
  const caseStudy = await readFile(new URL("app/projects/car-parts/car-parts-case.tsx", root), "utf8");

  assert.match(agentSwitch, /aria-label=\{`\$\{label\}:/);
  assert.match(header, /aria-pressed=\{language === "en"\}/);
  assert.match(header, /<EnglishFlag \/><span>EN<\/span>/);
  assert.match(header, /aria-pressed=\{language === "de"\}/);
  assert.match(header, /<GermanFlag \/><span>DE<\/span>/);
  assert.match(caseStudy, /role="img"\s+aria-label="Car Parts vehicle-selection preview"/);
});

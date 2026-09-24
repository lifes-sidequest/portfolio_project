import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("defers case-study videos until they approach the viewport", async () => {
  await access(new URL("app/_components/viewport-video.tsx", root));
  const component = await readFile(new URL("app/_components/viewport-video.tsx", root), "utf8");
  const kaspi = await readFile(new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root), "utf8");
  const carParts = await readFile(new URL("app/projects/car-parts/car-parts-case.tsx", root), "utf8");

  assert.match(component, /IntersectionObserver/);
  assert.match(component, /rootMargin: "400px 0px"/);
  assert.match(component, /video\.src = src/);
  assert.match(component, /video\.pause\(\)/);
  assert.equal((kaspi.match(/<ViewportVideo/g) ?? []).length, 7);
  assert.equal((carParts.match(/<ViewportVideo/g) ?? []).length, 2);
  assert.doesNotMatch(kaspi, /<video/);
  assert.doesNotMatch(carParts, /<video/);
});

test("defers portfolio card and adjacent-project videos until they approach the viewport", async () => {
  const home = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  const catalog = await readFile(new URL("app/projects/projects-catalog.tsx", root), "utf8");
  const caseEnding = await readFile(new URL("app/projects/_components/case-ending.tsx", root), "utf8");

  for (const source of [home, catalog, caseEnding]) {
    assert.match(source, /import \{ ViewportVideo \}/);
    assert.match(source, /<ViewportVideo/);
    assert.doesNotMatch(source, /<video/);
  }
});

test("project video cards show a theme-aware poster before the first frame is ready", async () => {
  const component = await readFile(new URL("app/_components/viewport-video.tsx", root), "utf8");
  const projects = await readFile(new URL("content/projects.ts", root), "utf8");
  const home = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  const catalog = await readFile(new URL("app/projects/projects-catalog.tsx", root), "utf8");

  assert.match(projects, /poster: string \| null/);
  assert.match(projects, /darkPoster: string \| null/);
  assert.match(projects, /kaspi-home-poster-light\.jpg/);
  assert.match(projects, /kaspi-home-poster-dark\.jpg/);
  assert.match(projects, /car-parts-poster-light\.jpg/);
  assert.match(projects, /car-parts-poster-dark\.jpg/);
  assert.match(home, /poster=\{posterSource/);
  assert.match(catalog, /poster=\{posterSource/);
  assert.match(component, /viewport-video-shell/);
  assert.match(component, /viewport-video-poster/);
  assert.match(component, /onPlaying/);
});

test("plays the original Car Parts WebM instead of replacing it with a static poster", async () => {
  const component = await readFile(new URL("app/_components/viewport-video.tsx", root), "utf8");
  const caseEnding = await readFile(new URL("app/projects/_components/case-ending.tsx", root), "utf8");

  assert.doesNotMatch(component, /useStaticPoster/);
  assert.match(component, /video\.src = src/);
  assert.match(caseEnding, /car-parts-poster-light\.jpg/);
  assert.match(caseEnding, /car-parts-poster-dark\.jpg/);
  assert.match(caseEnding, /poster=\{next\.poster\?\.\[theme\]\}/);
  assert.match(caseEnding, /car-parts-light\.webm/);
  assert.match(caseEnding, /car-parts-dark\.webm/);
});

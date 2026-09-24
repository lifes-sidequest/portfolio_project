import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const kaspiCase = new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root);
const projectContent = new URL("content/projects.ts", root);
const carPartsCase = new URL("app/projects/car-parts/car-parts-case.tsx", root);

const originalKaspiVideos = [
  "home-page.mp4",
  "home-page-dark.mp4",
  "main-white.mp4",
  "main-dark.mp4",
  "searchbar-light-2.webm",
  "searchbar-dark.webm",
  "carousel-light-square.webm",
  "carousel-dark-square.webm",
  "magnum-light-3.webm",
  "magnum-dark-1.webm",
  "all-page-light.webm",
  "all-page-dark.webm",
  "system-light-2.webm",
  "system-dark.webm",
];

test("Kaspi case and project cards use the original videos with their intended backgrounds", async () => {
  const [caseSource, projectSource] = await Promise.all([
    readFile(kaspiCase, "utf8"),
    readFile(projectContent, "utf8"),
  ]);
  const activeSource = `${caseSource}\n${projectSource}`;

  for (const file of originalKaspiVideos) {
    assert.match(activeSource, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced`);
    const asset = new URL(`public/images/projects/kaspi-home/${file}`, root);
    assert.ok((await stat(asset)).size > 0, `${file} should exist`);
  }

  assert.doesNotMatch(activeSource, /kaspi-home\/[^"']+-web\.mp4/);
});

test("Car Parts ecosystem demo uses the original videos", async () => {
  const source = await readFile(carPartsCase, "utf8");
  const originalVideos = ["demo-car-parts-light2.mp4", "demo-car-parts-dark.mp4"];

  for (const file of originalVideos) {
    assert.match(source, new RegExp(file.replaceAll(".", "\\.")), `${file} should be referenced`);
    const asset = new URL(`public/images/projects/car-parts/${file}`, root);
    assert.ok((await stat(asset)).size > 0, `${file} should exist`);
  }

  assert.doesNotMatch(source, /demo-car-parts-(?:light|dark)-web\.mp4/);
});

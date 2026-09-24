import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("uses compact hero assets while preserving the transparent dark artwork", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");
  const lightJpeg = new URL("public/images/home/berlin-city-light-new1.jpg", root);
  const lightPng = new URL("public/images/home/berlin-city-light-new1.png", root);
  const darkWebp = new URL("public/images/home/berlin-city-dark-new1.webp", root);
  const darkPng = new URL("public/images/home/berlin-city-dark-new1.png", root);
  await Promise.all([access(lightJpeg), access(darkWebp)]);
  assert.match(styles, /berlin-city-light-new1\.jpg/);
  assert.match(styles, /berlin-city-dark-new1\.webp/);
  assert.ok((await stat(lightJpeg)).size < (await stat(lightPng)).size * 0.35);
  assert.ok((await stat(darkWebp)).size < (await stat(darkPng)).size * 0.35);
});

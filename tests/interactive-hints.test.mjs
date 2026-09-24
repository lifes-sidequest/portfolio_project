import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps hover compositor hints scoped to interactive states", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(styles, /\.site-header \.nav-label-track>span\{[^}]*will-change:auto/);
  assert.match(styles, /\.site-header nav a:hover \.nav-label-track>span[^}]*\{will-change:transform,opacity,filter\}/);
  assert.match(styles, /\.folder-float\{[^}]*will-change:auto/);
  assert.match(styles, /\.folder-panel-shape\{[^}]*will-change:auto/);
  assert.match(styles, /\.folder-heading\{[^}]*will-change:auto/);
  assert.match(styles, /\.folder-arrow\{[^}]*will-change:auto/);
  assert.match(styles, /\.social-folder:hover \.folder-float[^}]*\{[^}]*will-change:transform/);
  assert.match(styles, /\.social-folder:hover \.folder-panel-shape[^}]*\{[^}]*will-change:transform,border-radius/);
  assert.match(styles, /\.about-resource-arrow\{[^}]*will-change:auto/);
});

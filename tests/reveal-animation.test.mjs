import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("releases character compositor hints after the reveal finishes", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");
  const controller = await readFile(new URL("app/_components/reveal-controller.tsx", root), "utf8");

  assert.match(styles, /\.reveal-character\.reveal-complete\{will-change:auto\}/);
  assert.match(styles, /\[data-language-changing="true"\] \.reveal-character\{[^}]*will-change:auto/);
  assert.match(styles, /\.hero-language-static \.reveal-character\{[^}]*will-change:auto/);
  assert.match(styles, /\.reveal-character\{opacity:1;filter:none;will-change:auto\}/);
  assert.match(controller, /event\.animationName !== "blur-reveal"/);
  assert.match(controller, /target\.classList\.add\("reveal-complete"\)/);
  assert.match(controller, /document\.addEventListener\("animationend", releaseRevealHint\)/);
  assert.match(controller, /document\.removeEventListener\("animationend", releaseRevealHint\)/);
});

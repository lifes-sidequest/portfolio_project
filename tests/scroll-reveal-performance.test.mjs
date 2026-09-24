import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("scopes scroll reveal compositor hints to the active transition", async () => {
  const [styles, controller] = await Promise.all([
    readFile(new URL("styles/site.css", root), "utf8"),
    readFile(new URL("app/_components/reveal-controller.tsx", root), "utf8"),
  ]);

  assert.match(styles, /\.scroll-reveal\{[^}]*will-change:auto/);
  assert.match(styles, /\.scroll-reveal\.reveal-active\{will-change:opacity,transform\}/);
  assert.match(controller, /target\.classList\.add\("reveal-active"\)/);
  assert.match(controller, /target\.classList\.remove\("reveal-pending"\)/);
  assert.match(controller, /event\.propertyName !== "transform"/);
  assert.match(controller, /target\.classList\.remove\("reveal-active"\)/);
  assert.match(controller, /window\.setTimeout\(\(\) => \{/);
  assert.match(controller, /\}, 900\)/);
  assert.match(controller, /revealTimers\.forEach\(\(timer\) => window\.clearTimeout\(timer\)\)/);
});

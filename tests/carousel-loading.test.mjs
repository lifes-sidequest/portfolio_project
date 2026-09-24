import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("defers carousel artwork until the carousel approaches the viewport", async () => {
  const carousel = await readFile(new URL("components/ui/card-fan-carousel.tsx", root), "utf8");

  assert.match(carousel, /new IntersectionObserver/);
  assert.match(carousel, /rootMargin: "400px 0px"/);
  assert.match(carousel, /src=\{assetsReady \? card\.imgUrl : undefined\}/);
  assert.match(carousel, /loading="lazy"/);
  assert.match(carousel, /decoding="async"/);
});

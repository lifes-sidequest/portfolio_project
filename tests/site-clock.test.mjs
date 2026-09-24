import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("updates the minute-only site clock no more than once per minute", async () => {
  const clock = await readFile(new URL("app/_components/site-clock.tsx", root), "utf8");
  assert.match(clock, /60_000/);
  assert.doesNotMatch(clock, /setInterval\(tick, 1000\)/);
});

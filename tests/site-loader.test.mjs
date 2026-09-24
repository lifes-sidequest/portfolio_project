import test from "node:test";
import assert from "node:assert/strict";

import { advanceGreetingFrame, createGreetingQueue, nextGreetingIndex, waitForIntroduction } from "../lib/site-loader.mjs";

test("the next greeting never repeats the current language", () => {
  assert.equal(nextGreetingIndex(0, 4, () => 0), 1);
  assert.equal(nextGreetingIndex(2, 4, () => 0.999), 3);
});

test("a new greeting keeps the previous one available for a crossfade", () => {
  assert.deepEqual(
    advanceGreetingFrame({ current: 2, previous: null }, 5, () => 0),
    { current: 0, previous: 2 },
  );
});

test("a greeting queue shows every other language once before repeating", () => {
  const queue = createGreetingQueue(2, 6, () => 0.5);

  assert.equal(queue.length, 5);
  assert.equal(new Set(queue).size, 5);
  assert.equal(queue.includes(2), false);
  assert.deepEqual([...queue].sort((a, b) => a - b), [0, 1, 3, 4, 5]);
});

test("the introduction stays up for its minimum duration after resources are ready", async () => {
  const started = performance.now();
  const reason = await waitForIntroduction(Promise.resolve(), 25, 200);

  assert.equal(reason, "ready");
  assert.ok(performance.now() - started >= 20);
});

test("the introduction releases the page if a resource never becomes ready", async () => {
  const started = performance.now();
  const reason = await waitForIntroduction(new Promise(() => {}), 10, 35);

  assert.equal(reason, "timeout");
  assert.ok(performance.now() - started < 180);
});

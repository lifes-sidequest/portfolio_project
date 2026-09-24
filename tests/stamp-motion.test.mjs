import test from "node:test";
import assert from "node:assert/strict";

import { getNextStampFace, getStampPointerTarget } from "../lib/stamp-motion.mjs";

test("centers the stamp when the pointer is at its midpoint", () => {
  assert.deepEqual(
    getStampPointerTarget({ left: 100, top: 50, width: 200, height: 100 }, 200, 100),
    { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 },
  );
});

test("tilts and shifts the stamp toward the pointer without exceeding its motion limits", () => {
  assert.deepEqual(
    getStampPointerTarget({ left: 100, top: 50, width: 200, height: 100 }, 300, 50),
    { rotateX: 7, rotateY: 9, translateX: 8, translateY: -6 },
  );
});

test("toggles between the front and back of the stamp", () => {
  assert.equal(getNextStampFace("front"), "back");
  assert.equal(getNextStampFace("back"), "front");
});

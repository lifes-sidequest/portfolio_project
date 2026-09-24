import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("does not ship the unused Tailwind runtime stylesheet", async () => {
  const globals = await readFile(new URL("app/globals.css", root), "utf8");

  assert.doesNotMatch(globals, /@import\s+["']tailwindcss["']/);
  assert.match(globals, /@import\s+["']\.\.\/styles\/site\.css["']/);
});

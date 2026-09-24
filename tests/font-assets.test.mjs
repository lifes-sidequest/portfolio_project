import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("uses compact Google Sans subsets while retaining the source fonts", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");
  for (const weight of [400, 500, 700]) {
    const source = new URL(`public/fonts/google-sans-${weight}.woff2`, root);
    const subset = new URL(`public/fonts/google-sans-${weight}-subset.woff2`, root);
    await Promise.all([access(source), access(subset)]);
    assert.match(styles, new RegExp(`google-sans-${weight}-subset\\.woff2`));
    assert.ok((await stat(subset)).size < (await stat(source)).size * 0.25);
  }
});

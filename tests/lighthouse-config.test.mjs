import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("defines reproducible Lighthouse CI checks for representative routes", async () => {
  const config = await readFile(new URL("lighthouserc.cjs", root), "utf8");
  const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

  assert.match(config, /http:\/\/127\.0\.0\.1:3100\//);
  assert.match(config, /http:\/\/127\.0\.0\.1:3100\/about/);
  assert.match(config, /http:\/\/127\.0\.0\.1:3100\/inspiration/);
  assert.match(config, /http:\/\/127\.0\.0\.1:3100\/projects\/car-parts/);
  assert.match(config, /python3 -u -m http\.server 3100 --directory out --bind 127\.0\.0\.1/);
  assert.doesNotMatch(config, /pnpm start/);
  assert.match(config, /chromeFlags: "--no-sandbox --headless --disable-dev-shm-usage"/);
  assert.match(config, /preset: "desktop"/);
  assert.match(config, /"categories:performance": \["error", \{ minScore: 0\.7 \}\]/);
  assert.match(config, /"categories:accessibility": \["error", \{ minScore: 1 \}\]/);
  assert.match(config, /"total-blocking-time": \["error", \{ maxNumericValue: 200 \}\]/);
  assert.match(config, /target: "filesystem"/);
  assert.equal(packageJson.scripts["perf:audit"], "lhci autorun");
});

test("keeps Lighthouse findings advisory instead of blocking deployment", async () => {
  const workflow = await readFile(new URL(".github/workflows/ci.yml", root), "utf8");

  assert.match(workflow, /name: Lighthouse audit[\s\S]*?continue-on-error: true[\s\S]*?run: pnpm perf:audit/);
});

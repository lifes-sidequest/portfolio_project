import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("exports the portfolio as a root GitHub Pages site", async () => {
  const config = await readFile(new URL("next.config.ts", root), "utf8");

  assert.match(config, /output:\s*"export"/);
  assert.match(config, /trailingSlash:\s*true/);
  assert.match(config, /images:\s*\{\s*unoptimized:\s*true\s*\}/s);
  assert.doesNotMatch(config, /redirects\s*\(/);
});

test("keeps agent markdown endpoints compatible with static export", async () => {
  for (const locale of ["en", "de"]) {
    const route = await readFile(new URL(`app/for-agents/${locale}.md/route.ts`, root), "utf8");
    assert.match(route, /export const dynamic = "force-static"/);
    assert.match(route, /https:\/\/lifes-sidequest\.github\.io\//);
    assert.doesNotMatch(route, /request:\s*Request/);
  }
});

test("deploys the static export with the official GitHub Pages actions", async () => {
  const workflowUrl = new URL(".github/workflows/deploy-pages.yml", root);
  await access(workflowUrl);
  const workflow = await readFile(workflowUrl, "utf8");

  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /path:\s*\.\/out/);
  assert.match(workflow, /pnpm build/);
});

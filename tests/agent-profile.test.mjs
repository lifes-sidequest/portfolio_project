import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});

test("agent profile presents the published experience, projects, results and certificate", async () => {
  const { getAgentProfile } = await import("../content/agent-profile.ts");
  const profile = getAgentProfile("en");

  assert.equal(profile.name, "Aziz Baratov");
  assert.equal(profile.experience.length, 4);
  assert.deepEqual(profile.projects.map(({ href }) => href), [
    "/projects/kaspi-home",
    "/projects/car-parts",
    "/projects/kaspi-courier",
  ]);
  assert.equal(profile.projects[2].status, "In development");
  assert.match(profile.outcomes.map(({ text }) => text).join(" "), /266%.*5x.*20%/);
  assert.ok(profile.outcomes.every(({ source }) => source === "/about#about-experience-title"));
  assert.equal(profile.certificate.credential, "Credential ID xhx9ggfs");
  assert.equal(profile.certificate.href, "https://gopractice.ru/course/pm/certificate/xhx9ggfs");
});

test("German profile keeps the same facts with localized labels", async () => {
  const { getAgentProfile } = await import("../content/agent-profile.ts");
  const profile = getAgentProfile("de");

  assert.equal(profile.experience.length, 4);
  assert.equal(profile.projects[2].status, "In Entwicklung");
  assert.equal(profile.certificate.credential, "Credential ID xhx9ggfs");
  assert.match(profile.summary.join(" "), /70/);
});

test("Markdown keeps the published facts and uses fetchable absolute links", async () => {
  const { getAgentProfile } = await import("../content/agent-profile.ts");
  const { renderAgentProfileMarkdown } = await import("../content/agent-profile-markdown.ts");
  const markdown = renderAgentProfileMarkdown(getAgentProfile("en"), "https://portfolio.example");

  assert.ok(markdown.startsWith("# Aziz Baratov\n"));
  for (const heading of ["## Competencies", "## Results", "## Experience", "## Projects", "## Certificate", "## Contact"]) {
    assert.ok(markdown.includes(heading), `Missing ${heading}`);
  }
  assert.match(markdown, /\+266%/);
  assert.match(markdown, /5x/);
  assert.match(markdown, /20%/);
  assert.match(markdown, /https:\/\/portfolio\.example\/projects\/car-parts/);
  assert.match(markdown, /https:\/\/portfolio\.example\/documents\/CV_Aziz_Baratov_Product_Designer\.pdf/);
  assert.match(markdown, /Credential ID xhx9ggfs/);
  assert.match(markdown, /https:\/\/gopractice\.ru\/course\/pm\/certificate\/xhx9ggfs/);
  assert.doesNotMatch(markdown, /<\/?[a-z][^>]*>/i);
});

test("direct Markdown routes return localized plain text", async () => {
  for (const locale of ["en", "de"]) {
    const { GET } = await import(`../app/for-agents/${locale}.md/route.ts`);
    const response = GET(new Request(`https://portfolio.example/for-agents/${locale}.md`));
    const body = await response.text();
    assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
    assert.match(body, /^# Aziz Baratov/m);
    assert.match(body, /Credential ID xhx9ggfs/);
    assert.match(body, /https:\/\/portfolio\.example\/projects\/kaspi-home/);
    if (locale === "de") assert.match(body, /## Kompetenzen/);
  }
});

test("agent mode returns only to a safe portfolio path", async () => {
  const { safeAgentReturnPath } = await import("../lib/agent-mode-return.mjs");
  assert.equal(safeAgentReturnPath("/projects/car-parts"), "/projects/car-parts");
  assert.equal(safeAgentReturnPath("/about"), "/about");
  for (const unsafe of [null, "", "//elsewhere.example", "/\\elsewhere.example", "https://elsewhere.example", "/for-agents"]) {
    assert.equal(safeAgentReturnPath(unsafe), "/");
  }
});

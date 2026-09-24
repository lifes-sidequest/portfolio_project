# For Agents Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a global switch to a concise bilingual AI-readable portfolio page with matching public Markdown resources.

**Architecture:** Build one localized profile model from existing portfolio data, then render it as HTML and Markdown. A fixed global switch navigates between the ordinary portfolio and `/for-agents`; two static `.md` routes expose the same facts without JavaScript. The new page has its own small stylesheet and preserves existing theme/language preferences.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-22-for-agents-profile-design.md`

## Global Constraints

- Show a fixed, compact `For agents` switch in the bottom-left corner on every public page.
- `/for-agents` follows the existing English/German language preference and light/dark theme.
- English and German `.md` resources are directly addressable without JavaScript or a session.
- Never introduce claims or metrics not already published in the portfolio.
- Include `Data-driven Product Management Simulator`, `GoPractice, Inc`, `Credential ID xhx9ggfs`, and its existing verification URL.
- Preserve unrelated dirty worktree changes; stage only task-owned files.

## File Map

- `content/agent-profile.ts`: localized, structured agent profile; imports published content from `about.ts`, `competencies.ts`, `projects.ts`, `social-links.ts` and exposes `getAgentProfile(locale)`.
- `content/agent-profile-markdown.ts`: pure `renderAgentProfileMarkdown(profile)` serialization; escaping and URL construction live here.
- `app/for-agents/page.tsx` and `app/for-agents/agent-profile-page.tsx`: route metadata and accessible HTML document view.
- `app/for-agents/en.md/route.ts`, `app/for-agents/de.md/route.ts`: public Markdown responses with `text/markdown; charset=utf-8`.
- `app/_components/agent-mode-switch.tsx`: fixed switch, localized labels, safe return path.
- `app/layout.tsx`: mount the switch inside `SitePreferencesProvider`.
- `app/for-agents/agent-profile.css`: isolated responsive appearance for the switch and document.
- `tests/agent-profile.test.mjs`: localized data, Markdown and structural checks.

## Review Focus

1. Missing or invalid saved language must resolve to English, never a blank agent page — Task 1 test.
2. Project statuses must remain accurate, especially `Kaspi courier` as in development — Task 1 test.
3. Markdown must retain valid absolute links and a literal credential ID — Task 2 test.
4. Direct `.md` requests must return text/markdown without JavaScript — Task 2 test and browser check.
5. Opening the switch from a nested project route must return there, not lose context — Task 3 test and browser check.

---

### Task 1: Structured, source-backed profile

**Files:**
- Create: `content/agent-profile.ts`
- Test: `tests/agent-profile.test.mjs`

**Interfaces:**
- Consumes: `aboutContent`, `aboutResource`, `featuredCompetencies`, `projects`, and existing published contact destinations.
- Produces: `type AgentLocale = "en" | "de"`; `type AgentProfile` with `name`, `summary`, `competencies`, `outcomes`, `experience`, `projects`, `certificate`, `contact`, `cvUrl`; `getAgentProfile(locale: AgentLocale): AgentProfile`.

- [ ] **Step 1: Write failing content tests.** Follow the repo's current source-inspection test style and assert the model references published content, both locales, four roles, three project routes, the current `Kaspi courier` status, the credential, and `+266%`, `5x`, `20%`. Add assertions against source data where values remain imported rather than copied. Example:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const model = readFileSync(new URL("../content/agent-profile.ts", import.meta.url), "utf8");
test("agent profile reuses published facts", () => {
  assert.match(model, /aboutContent/);
  assert.match(model, /featuredCompetencies/);
  assert.match(model, /projects/);
  assert.match(model, /aboutResource/);
});
```
- [ ] **Step 2: Run the focused test and confirm it fails because `getAgentProfile` does not yet exist.** Run `node --test tests/agent-profile.test.mjs`.
- [ ] **Step 3: Implement the model.** Reuse existing descriptions, periods, URLs, and names; write concise localized outcome labels while preserving source metrics. Company-level reach belongs in summary context only, not personal outcomes. Define the public contract as:

```ts
export type AgentLocale = "en" | "de";
export type AgentProfile = {
  name: string; summary: string[];
  competencies: { title: string; description: string }[];
  outcomes: { text: string; source: string }[];
  experience: { role: string; company: string; period: string }[];
  projects: { title: string; client: string; href: string; status: string }[];
  certificate: { title: string; provider: string; credential: string; href: string };
  contact: { label: string; href: string }[];
  cvUrl: string;
};
export function getAgentProfile(locale: AgentLocale): AgentProfile;
```
- [ ] **Step 4: Run `node --test tests/agent-profile.test.mjs` and confirm Task 1 assertions pass.**
- [ ] **Step 5: Commit only Task 1 files:** `git add content/agent-profile.ts tests/agent-profile.test.mjs` then `git commit -m "feat: define agent-readable portfolio profile"`.

### Task 2: Matching Markdown and HTML document

**Files:**
- Create: `content/agent-profile-markdown.ts`
- Create: `app/for-agents/page.tsx`
- Create: `app/for-agents/agent-profile-page.tsx`
- Create: `app/for-agents/agent-profile.css`
- Create: `app/for-agents/en.md/route.ts`
- Create: `app/for-agents/de.md/route.ts`
- Modify: `tests/agent-profile.test.mjs`

**Interfaces:**
- Consumes: `getAgentProfile(locale)` from Task 1 and `useSitePreferences()` for the selected language/theme.
- Produces: `renderAgentProfileMarkdown(profile: AgentProfile): string`, document UI at `/for-agents`, Markdown at `/for-agents/en.md` and `/for-agents/de.md`.

- [ ] **Step 1: Extend failing tests.** Assert Markdown starts with `# Aziz Baratov`, contains every required section, each selected outcome, all three project URLs, CV URL, verification URL and literal credential ID; verify no HTML tags. Assert route files return `text/markdown; charset=utf-8` and that the HTML page imports the shared model rather than duplicating copy. Follow the source-inspection test style:

```js
test("markdown routes expose text markdown", () => {
  for (const locale of ["en", "de"]) {
    const route = readFileSync(new URL(`../app/for-agents/${locale}.md/route.ts`, import.meta.url), "utf8");
    assert.match(route, /renderAgentProfileMarkdown/);
    assert.match(route, /text\/markdown; charset=utf-8/);
  }
});
```
- [ ] **Step 2: Run `node --test tests/agent-profile.test.mjs` and confirm the new tests fail.**
- [ ] **Step 3: Implement pure Markdown rendering and both route handlers.** Use stable headings, bullets, and absolute URLs; include a short source note that results come from published portfolio pages. Use `Response` with explicit content type. Keep route handlers independent of cookies and client state. Example route pattern:

```ts
export function GET() {
  const markdown = renderAgentProfileMarkdown(getAgentProfile("en"));
  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
```
- [ ] **Step 4: Implement HTML page.** Use semantic headings, `<main>`, lists, status labels, accessible links, and a visible link to the current locale's `.md` endpoint. Style a restrained monospaced document column; honour existing `data-theme`, protect long links from overflow, and reduce motion where appropriate. The view selects data with `const profile = getAgentProfile(language);` and links to `` `/for-agents/${language}.md` ``.
- [ ] **Step 5: Run focused tests, `pnpm exec tsc --noEmit`, and open both language variants and `.md` URLs locally.** Report pre-existing TypeScript errors separately if they persist.
- [ ] **Step 6: Commit only Task 2 files** with `git commit -m "feat: add bilingual agent profile and markdown"`.

### Task 3: Global switch and round-trip

**Files:**
- Create: `app/_components/agent-mode-switch.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/for-agents/agent-profile.css`
- Modify: `tests/agent-profile.test.mjs`

**Interfaces:**
- Consumes: `usePathname`, Next navigation, `useSitePreferences`, and `/for-agents` from Task 2.
- Produces: a visible, keyboard-accessible switch on all routes; entering agent mode stores the current pathname in `sessionStorage` under `portfolio-agent-return`, leaving returns to that safe same-origin route or `/`.

- [ ] **Step 1: Add failing structural tests** for one global mount inside `SitePreferencesProvider`, localized switch labels, same-origin return-path sanitization, and route-aware active state. For example:

```js
test("agent switch is mounted for every route", () => {
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /<SitePreferencesProvider>[\s\S]*<AgentModeSwitch\s*\/>/);
});
```
- [ ] **Step 2: Run the focused test and confirm failure.**
- [ ] **Step 3: Implement the switch.** Use an actual button or link with `aria-label` and visible text; avoid replacing the site header. Read/write only a pathname beginning with `/` and not `//`. On mobile, place the control above safe-area insets without covering key CTAs. Style both themes and visible focus state. Sanitize the saved return path before navigation:

```ts
const saved = sessionStorage.getItem("portfolio-agent-return");
const destination = saved?.startsWith("/") && !saved.startsWith("//")
  ? saved : "/";
router.push(destination);
```
- [ ] **Step 4: Verify round-trip from `/`, `/about`, and `/projects/car-parts`; test keyboard activation and both languages/themes at desktop/mobile widths.**
- [ ] **Step 5: Run `node --test tests/agent-profile.test.mjs`, `pnpm lint`, `git diff --check`, and `pnpm build`; distinguish pre-existing repository failures from this work.**
- [ ] **Step 6: Commit only Task 3 files** with `git commit -m "feat: add global for-agents switch"`.

# Portfolio Optimization Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a passing build, meaningful automated browser coverage, and reproducible performance baselines before changing the portfolio's media, animation, or design.

**Architecture:** Keep the Next.js App Router and current visual product intact. Repair one carousel lifecycle bug, reconcile stale Node tests with intended behavior, then add a Playwright suite in `e2e/` using a separately managed production server on port 3100. Store measured baseline results in a report; later optimization slices use those results rather than assumptions.

**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP 3, pnpm, Node test runner, Playwright Chromium.

**Spec:** `docs/superpowers/specs/2026-09-22-portfolio-optimization-foundation-design.md`

## Global Constraints

- Preserve the approved desktop/mobile layout, typography, themes, languages, and animation behavior.
- Do not delete or rewrite `.git`, `.next`, `node_modules`, or user media. Cleanup is deferred until the portfolio is finished.
- Preserve unrelated changes in the dirty working tree. Stage only files changed by a task; never reset the worktree.
- Test carousel click/tap, not swipe: the component currently has no swipe handler.
- Compare performance only under the same mode, route, viewport, theme, and cache condition; distinguish server CPU from browser work.

## Review Focus

- If a user opens a project page directly, its title and primary media must render without first visiting the home page; `e2e/routes.spec.ts` covers this.
- If the loader outlives a slow asset, browser tests wait for its observable removal rather than sleeping a fixed interval; `e2e/helpers.ts` covers this.
- If local storage starts in German/dark mode, controls and content must match that state after hydration; `e2e/preferences.spec.ts` covers this.
- If a carousel control is pressed while animation is active, it must settle on one selected card without duplicated tweens or a stuck lock; `e2e/carousel.spec.ts` covers this.
- If a video file fails, a case-study media test must fail on load/error state rather than pass because a `<video>` tag exists; `e2e/cases.spec.ts` covers this.

---

### Task 1: Restore a clean baseline build

**Files:**
- Modify: `components/ui/card-fan-carousel.tsx:87-228`
- Verify: `tests/project-structure.test.mjs`

**Interfaces:** The carousel's public `cards`/`className` props and user-visible behavior stay unchanged. React effect cleanup must return `void`.

- [ ] **Step 1: Confirm the existing red baseline.** Run `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`. Expected failures: React effect cleanup returns `Tween | undefined`, plus `prefer-const` on `zIndex`.
- [ ] **Step 2: Make the minimal lifecycle/type fix.** Change the cleanup from `return () => unlockRef.current?.kill();` to:

  ```tsx
  return () => {
    unlockRef.current?.kill();
  };
  ```

  Change `let zIndex = 10 - absoluteDistance;` to `const zIndex = 10 - absoluteDistance;` only after confirming it is not reassigned later in the effect.
- [ ] **Step 3: Verify.** Run `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`. If another failure appears, record the exact output and diagnose it before proceeding.
- [ ] **Step 4: Review the diff.** Confirm no change to easing, durations, selected-card math, visual styles, or media. Stage only `components/ui/card-fan-carousel.tsx` for an isolated commit if committing is safe in this dirty checkout.

### Task 2: Reconcile stale Node tests without changing the product

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Read: `content/projects.ts`, `app/projects/kaspi-home/kaspi-home-case.tsx`, `app/projects/car-parts/car-parts-case.tsx`, `app/inspiration/inspiration-page.tsx`

**Interfaces:** `pnpm test` continues to run the existing Node suite. Browser-visible behavior moves to Playwright in later tasks; tests should not demand retired JSX markup.

- [ ] **Step 1: Reproduce and classify each of the five failures.** Run `pnpm test`; list each failing name and determine whether the current product or the assertion is wrong. In particular, the third featured project is `in-production`, not `online`, and the stamp back now uses an SVG image rather than two text spans.
- [ ] **Step 2: Correct the project-data assertion.** Test the current invariant (two released project links and one development project) using the exported `projects` data, rather than counting the text `status: "online"` in a source file. For example:

  ```js
  const { projects } = await import("../content/projects.ts");
  assert.deepEqual(projects.slice(0, 3).map(({ href, status }) => [href, status]), [
    ["/projects/kaspi-home", "online"],
    ["/projects/car-parts", "online"],
    ["/projects/kaspi-courier", "in-production"],
  ]);
  ```

  If direct TS loading is unavailable in the current Node runtime, use the same `registerHooks` extension-resolution pattern already used by `tests/agent-profile.test.mjs`; do not add a production-only workaround.
- [ ] **Step 3: Replace obsolete markup assertions.** Preserve checks for valid asset paths and published copy. Remove exact matches to retired CSS class sequences or literal stamp-back text, and verify the replacement SVG asset path and actual current media structure. Do not modify source media or copy solely to make old regexes pass.
- [ ] **Step 4: Verify.** Run `pnpm test`, `node --test tests/agent-profile.test.mjs tests/site-loader.test.mjs tests/stamp-motion.test.mjs tests/about-kaspi-experience.test.mjs`, and `pnpm lint`. Expected: zero failures and no unused-variable warning.
- [ ] **Step 5: Review the test diff.** Each changed assertion must catch an actual broken user outcome or incorrect content. Stage only test changes for an isolated commit if safe.

### Task 3: Add an isolated desktop/mobile Playwright harness

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`, `.gitignore`
- Create: `playwright.config.ts`, `e2e/helpers.ts`

**Interfaces:** `pnpm test:e2e` runs browser tests against `http://127.0.0.1:3100`; `pnpm test:e2e:build` builds first. Port 3000 remains available for the user's dev server.

- [ ] **Step 1: Add the test dependency and browser runtime.** Run `pnpm add -D @playwright/test` and `pnpm exec playwright install chromium`. If network or filesystem restrictions prevent either command, request the required approval rather than substituting a different installer.
- [ ] **Step 2: Add package scripts.** Add `"test:e2e": "playwright test"` and `"test:e2e:build": "pnpm build && playwright test"`. Keep the existing `test` command intact.
- [ ] **Step 3: Add `playwright.config.ts`.** Use `defineConfig` and `devices` with `testDir: "./e2e"`, `baseURL: "http://127.0.0.1:3100"`, `projects` named `desktop-chromium` and `mobile-chromium` (`Desktop Chrome` and `Pixel 7` presets), `trace: "retain-on-failure"`, `screenshot: "only-on-failure"`, and a `webServer` command of `pnpm exec next start --port 3100 --hostname 127.0.0.1`. Set `reuseExistingServer: false` to prevent silently testing an unrelated process.
- [ ] **Step 4: Add a loader helper.** In `e2e/helpers.ts`, export a `waitForPortfolioReady(page: Page)` that waits for `page.getByRole("status", { name: "Loading portfolio" }).toBeHidden()` and then checks `page.locator("main").first()` is visible. Import `expect` and `Page` from `@playwright/test`.
- [ ] **Step 5: Ignore generated browser output.** Add `/playwright-report/`, `/test-results/`, and `/.lighthouseci/` to `.gitignore`; do not ignore the test source or screenshot baseline directory.
- [ ] **Step 6: Verify configuration.** Run `pnpm exec playwright test --list`. Expected: both browser projects and no test-discovery errors. A production server test requires a successful build from Task 1.

### Task 4: Add route, preference, carousel, and media E2E coverage

**Files:**
- Create: `e2e/routes.spec.ts`, `e2e/preferences.spec.ts`, `e2e/carousel.spec.ts`, `e2e/cases.spec.ts`
- Consume: `e2e/helpers.ts`

**Interfaces:** Each test opens a fresh browser context. Assertions use accessible labels/headings or stable component classes only when no accessible signal exists; no fixed sleeps for animation completion.

- [ ] **Step 1: Add route smoke tests.** Parameterize `/`, `/projects`, `/about`, `/index`, `/inspiration`, `/for-agents`, `/projects/kaspi-home`, and `/projects/car-parts`. For each route, navigate directly, wait for the loader helper, assert a visible `main`, collect `pageerror` and `console` events of type `error`, and fail if either list is nonempty. Use page headings/links to assert route identity rather than only HTTP 200.
- [ ] **Step 2: Add preference tests.** Click the header's `Switch to German` control, assert the page language and a translated navigation label; click the theme control, assert `html[data-theme="dark"]`; reload and verify both preferences persist. Run on desktop and mobile, opening the mobile menu before checking navigation links.
- [ ] **Step 3: Add carousel tests.** Open `/projects/car-parts`, scroll `.car-parts-fan-carousel` into view, click `Next image`, and assert its selected dot/card changes via `aria-current`. Click a different card and assert it becomes selected after animation. Repeat with `tap()` in the mobile project. Do not claim swipe support.
- [ ] **Step 4: Add case media tests.** Open each released case study, scroll its primary video into view, wait for a loaded event or `readyState >= HAVE_CURRENT_DATA`, assert `video.error === null`, and verify the expected image/video asset URL belongs to that case. Keep timeouts bounded and report an asset failure distinctly from a layout failure.
- [ ] **Step 5: Verify and fix only real regressions.** Run `pnpm test:e2e:build`. Inspect traces/screenshots for failures; if a flaky wait is the issue, replace it with an observable condition, not a longer arbitrary sleep.

### Task 5: Capture visual and performance baselines

**Files:**
- Create: `docs/performance/2026-09-22-baseline.md`
- Optionally create after visual review: `e2e/screenshots/` baseline PNGs generated by Playwright

**Interfaces:** The report supplies comparables for later optimization slices; it does not set unvalidated Lighthouse thresholds or claim CPU reduction.

- [ ] **Step 1: Record environment.** Document macOS/CPU, Node/pnpm/Next versions, browser version, route, viewport, selected theme/language, build mode, whether the cache is cold/warm, and whether other heavy apps are open.
- [ ] **Step 2: Measure development CPU.** With no other build running, sample the `next-server` process during startup, first page open, and two idle intervals (for example at 30 and 120 seconds) using `ps -p <validated-pid> -o pid,%cpu,%mem,etime,comm`. Never infer browser CPU from the server value.
- [ ] **Step 3: Measure production rendering.** Start the built app on port 3100, record navigation timing, first-screen transferred bytes by resource type, loader duration, and desktop/mobile screenshots for home and representative inner pages. Keep three runs per condition and report the median plus range, not one best sample.
- [ ] **Step 4: Review visual snapshots manually.** Compare light/dark and desktop/mobile screenshots to the existing site. Approve only matching baselines; do not use unconditional snapshot updates.
- [ ] **Step 5: Run final gates.** `pnpm lint`, `pnpm test`, remaining Node tests, `pnpm exec tsc --noEmit`, `pnpm build`, and `pnpm test:e2e`. Record pass/fail counts and any environmental blocker in the report.

## Plan self-review

- Every requirement in the foundation spec maps to Tasks 1–5; later media/CSS/Lighthouse optimization is intentionally out of this slice.
- The five review-focus conditions map to Task 4 tests and the loader helper in Task 3.
- No destructive cleanup is included. Commits, if made, must selectively stage task-owned files because the checkout is dirty.

# Portfolio optimization foundation — design

## Purpose

Reduce local development CPU load and visitor-facing cost without materially changing the approved visual design or interactions. This first, independently verifiable slice establishes a trustworthy baseline and browser regression suite. It does not yet optimize media, rewrite CSS, or clean project history.

## Current evidence (22 September 2026)

- `pnpm lint`: one error (`prefer-const` in `components/ui/card-fan-carousel.tsx:138`) and one warning in `tests/project-structure.test.mjs`.
- `pnpm test`: 29/34 pass. Five source-structure tests disagree with current project status/media/stamp markup; each discrepancy needs to be checked against the visible product before the assertion is replaced.
- `pnpm exec tsc --noEmit` and `pnpm build`: both fail because a GSAP tween is returned from the React effect cleanup in `components/ui/card-fan-carousel.tsx:87`; React expects a cleanup that returns `void`.
- The local Next.js development process was observed using roughly 530–600% CPU after startup. This is evidence of server-side load, not proof that GSAP causes it.
- The working directory is dirty with extensive existing user changes. Preserve all unrelated changes; do not reset or discard them.

## Scope of the foundation slice

1. Correct the carousel effect cleanup and the lint error without altering animation timing, positions, or behavior.
2. Reconcile the five failing tests with current intended UI. Keep useful behavioral assertions; replace obsolete source-pattern assertions with tests that check product behavior or structured data. Do not change product content merely to satisfy stale tests.
3. Add Playwright with `pnpm` scripts and a `playwright.config.ts` covering desktop Chromium and an emulated touch/mobile Chromium viewport. Use a managed local server, a stable base URL, and isolated tests. Run against a production build for performance-sensitive comparisons; development mode can be used for fast functional iteration.
4. Add browser tests for the home route, project catalog, About, Links, Inspiration, agent profile, and two released case studies. Check navigation, language, themes, critical console/page errors, carousel click/tap controls, and visible/loaded media. Do not assert swipe because the current carousel does not implement swipe. Avoid brittle waits for fixed animation durations; wait for observable states.
5. Capture a baseline report for cold/warm local startup, idle CPU and memory, first-screen network transfer, and production-mode page load. Record the environment, route, viewport, theme, and measurement method so later comparisons are meaningful. A single noisy sample is not an optimization claim.
6. Capture and approve desktop/mobile screenshots for key states before subsequent visual-preserving refactors. Screenshot changes require review rather than automatic blanket updates.

## Architecture and boundaries

- Retain the existing Next.js 16 App Router structure and content modules.
- Keep browser tests under `e2e/`; keep existing Node tests under `tests/`. E2E tests exercise browser-visible behavior rather than matching CSS/TSX source strings.
- Playwright config owns browser projects, base URL, server lifecycle, traces/screenshots on failure, and test timeouts. Tests own route-specific behavior. Do not make production code depend on the test runner.
- No user media, Git history, `node_modules`, or `.next` cleanup in this slice. The user requested cleanup only after finishing portfolio work.
- No new swipe gesture, design change, or animation simplification in this slice. Those need measured justification in later slices.

## Validation and acceptance

- `pnpm lint`, all repository tests, `pnpm exec tsc --noEmit`, and `pnpm build` pass, or any newly discovered unrelated failures are explicitly recorded rather than hidden.
- Desktop/mobile E2E runs pass without critical uncaught page errors. All required routes render; project links and carousel controls operate; key case-study media is present and loads.
- Light/dark and English/German states are checked at least once on representative routes, with screenshot baselines reviewed against the current site.
- Baseline report includes reproducible measurements and distinguishes development-server CPU from browser-rendering cost.

## Next slices after this foundation

Use the measured baseline to create separate, testable work packages: (a) persistent Next.js development CPU, (b) media transfer and playback, (c) animation/React work, (d) CSS/component structure, (e) Lighthouse CI budgets. Final disk cleanup remains deferred until the user finishes the portfolio and separately approves any destructive history operation.

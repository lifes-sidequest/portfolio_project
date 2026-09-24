# About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a localized, responsive `/about` page that closely follows the editorial structure of the approved reference while presenting Aziz Baratov's verified experience, process, GoPractice credential, and contact CTA.

**Architecture:** Add a server route wrapper and one client page component that consumes a typed bilingual content module and the existing global preference context. Extract the existing email copy control into a shared component, update header routing, and add page-scoped CSS so the home page remains unchanged.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-20-about-page-design.md`

## Global Constraints

- Keep the existing home-page About section unchanged.
- Exclude Designer, Illustrator and Photographer; Who I've designed for; Word on the street; Mentions; and colleague testimonials.
- Use only confirmed facts: 9+ years, 70+ products, B2B/B2C/C2B/C2C, e-commerce, enterprise systems, team leadership, and AI workflows.
- Use `#f2f2f2` for the intro media placeholder in light theme and `#262626` in dark theme.
- Keep company names, `Data-driven Product Management Simulator`, `GoPractice, Inc`, and `Credential ID xhx9ggfs` unchanged in German.
- Open the credential at `https://gopractice.ru/course/pm/certificate/xhx9ggfs` in a new tab with `rel="noopener noreferrer"`.
- Reuse the global theme/language preferences and the existing Copy button behavior.
- Automated tests, lint, and production builds run only after explicit user authorization.

## Review Focus

- Direct navigation to `/about` must render without relying on home-page state; Task 3's route-structure assertions cover this.
- Switching language must replace every translated heading and description without translating protected proper names; Task 2's content assertions cover this.
- Dark theme must change the placeholder and card surfaces without reducing text contrast; Task 5's CSS assertions and browser matrix cover this.
- Keyboard users must be able to focus the credential card and Copy button visibly; Tasks 3 and 5 cover link semantics and `:focus-visible` styling.
- Clipboard failure must reset cleanly without changing the visible `Copy` label; Task 1 preserves and tests the existing idle/done/error behavior.

---

### Task 1: Extract the reusable email copy control

**Files:**
- Create: `app/_components/copy-email-button.tsx`
- Modify: `app/_components/portfolio.tsx`
- Modify: `tests/project-structure.test.mjs`

**Interfaces:**
- Produces: `CopyEmailButton({ language }: { language: "en" | "de" })`
- Produces: `portfolioEmailAddress: "baratov.aziz.h@gmail.com"`
- Consumes: browser `navigator.clipboard.writeText`

- [ ] **Step 1: Add a failing structural test for the shared component**

Add a test that reads `app/_components/copy-email-button.tsx` and asserts it exports `CopyEmailButton` and `portfolioEmailAddress`, contains `navigator.clipboard.writeText(portfolioEmailAddress)`, preserves the visible idle label, exposes an aria-live status, and resets after 2000 ms. Assert `portfolio.tsx` imports both exports instead of defining local copies.

- [ ] **Step 2: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="shared email copy control" tests/project-structure.test.mjs`

Expected: FAIL because `copy-email-button.tsx` does not exist.

- [ ] **Step 3: Move the existing implementation into the shared component**

Create a client component containing the current `idle | done | error` state, cleanup effect, two-second reset timer, animated copy/check/error icons, localized status text, and unchanged visible `Copy`/`Kopieren` label. Export the email address constant and replace the local implementation in `portfolio.tsx` with:

```tsx
import { CopyEmailButton, portfolioEmailAddress } from "./copy-email-button";
```

Update the home CTA mail link to use `portfolioEmailAddress`.

- [ ] **Step 4: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="shared email copy control" tests/project-structure.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit only this task's files**

```bash
git add app/_components/copy-email-button.tsx app/_components/portfolio.tsx tests/project-structure.test.mjs
git commit -m "refactor: share portfolio email copy control"
```

### Task 2: Add typed bilingual About content

**Files:**
- Create: `content/about.ts`
- Modify: `tests/project-structure.test.mjs`

**Interfaces:**
- Produces: `aboutContent.en` and `aboutContent.de`
- Produces: typed `AboutLocaleContent`, `AboutExperience`, and `AboutProcessStep`
- Consumed by: `app/about/about-page.tsx`

- [ ] **Step 1: Add a failing content-contract test**

Assert the content module includes exactly four experience entries and five process steps; contains the confirmed facts `9+` and `70+`; contains all four company names; includes both English and German headings; contains the credential URL, title, company, and ID exactly once in shared resource data; and does not contain any excluded section heading.

- [ ] **Step 2: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="localized About content" tests/project-structure.test.mjs`

Expected: FAIL because `content/about.ts` does not exist.

- [ ] **Step 3: Implement the bilingual content module**

Use a typed object with these English section headings: `About`, `Work Experience`, `Process`, `Resources`, and `Ready to do great work`. Use German equivalents: `Über mich`, `Berufserfahrung`, `Prozess`, `Ressourcen`, and `Bereit für großartige Arbeit`.

The intro statement should be:

```text
I design and improve digital products that turn complex systems into clear, useful experiences.
```

The English biography should describe a Senior Product Designer with 9+ years of experience across 70+ B2B, B2C, C2B, and C2C products, end-to-end product design, design leadership, data-backed decisions, and custom AI workflows. The German copy must convey the same confirmed facts without adding claims.

Define the four roles and exact periods from the spec. Give each role a concise neutral responsibility description:

- Kaspi.kz: product discovery, interaction design, cross-functional alignment, and validation for large-scale consumer experiences.
- Adata.kz: design-team coordination, product direction, reusable patterns, and collaboration on enterprise platforms.
- APPLECityCorps: end-to-end flows, prototypes, interface systems, and delivery collaboration.
- THOUSAND IT GROUP: UX/UI foundations, user flows, interface concepts, and developer handoff.

Define Explore, Choose, Craft, Measure, and Evolve using the meanings in the spec. Store the credential as shared data with the exact title, provider, ID, and URL.

- [ ] **Step 4: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="localized About content" tests/project-structure.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit only this task's files**

```bash
git add content/about.ts tests/project-structure.test.mjs
git commit -m "feat: add localized about page content"
```

### Task 3: Build the About route and semantic page structure

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/about/about-page.tsx`
- Modify: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: `aboutContent` from `content/about.ts`
- Consumes: `SiteHeader`, `RevealCharacters`, `CopyEmailButton`, `portfolioEmailAddress`, `useSiteClock`, and `useSitePreferences`
- Produces: default route `/about` and named client component `AboutPage`

- [ ] **Step 1: Add failing route and markup tests**

Assert `app/about/page.tsx` exports metadata and renders `<AboutPage />`. Assert the client component renders one `h1`, section labels for Work Experience, Process, and Resources, maps all four roles and five process stages, renders the image placeholder with `aria-hidden="true"`, uses an anchor with `target="_blank"` and `rel="noopener noreferrer"` for the credential, renders the shared Copy button, and omits all excluded headings.

- [ ] **Step 2: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="About route" tests/project-structure.test.mjs`

Expected: FAIL because the route files do not exist.

- [ ] **Step 3: Create the server route wrapper**

Set metadata to:

```ts
export const metadata: Metadata = {
  title: "About — Aziz Baratov",
  description: "About Aziz Baratov, a Senior Product Designer in Berlin.",
};
```

Render `<AboutPage />` as the default export.

- [ ] **Step 4: Implement the client page component**

Use `<main className="case-page about-page">` and `<SiteHeader />`. Select `aboutContent[language]` from `useSitePreferences()`. Structure the page as:

```text
intro
  eyebrow + animated h1
  biography grid
  large neutral media placeholder
work experience
  section heading
  four article rows
process
  section heading + five numbered cards
resources
  section heading + one external credential link
contact
  existing email CTA + CopyEmailButton
footer
```

Use semantic `section`, `article`, `h2`, and `h3` elements. Add `aria-labelledby` relationships for major sections. Use the existing Berlin clock and bilingual footer wording already established on the Projects page.

- [ ] **Step 5: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="About route" tests/project-structure.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit only this task's files**

```bash
git add app/about/page.tsx app/about/about-page.tsx tests/project-structure.test.mjs
git commit -m "feat: build about page structure"
```

### Task 4: Route the header About item to the new page

**Files:**
- Modify: `app/_components/site-header.tsx`
- Modify: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: existing navigation item with `hash: "about"`
- Produces: `/about` navigation destination from home and internal routes

- [ ] **Step 1: Add a failing navigation test**

Assert the header's `href` helper returns `/projects` for `projects`, `/about` for `about`, and preserves existing hash behavior for Inspiration and Index.

- [ ] **Step 2: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="About header navigation" tests/project-structure.test.mjs`

Expected: FAIL because About still resolves to `#about` or `/#about`.

- [ ] **Step 3: Add the About route special case**

Update the helper to:

```ts
const href = (hash: string) => {
  if (hash === "projects") return "/projects";
  if (hash === "about") return "/about";
  return onHome ? `#${hash}` : `/#${hash}`;
};
```

- [ ] **Step 4: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="About header navigation" tests/project-structure.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit only this task's files**

```bash
git add app/_components/site-header.tsx tests/project-structure.test.mjs
git commit -m "feat: link header to about page"
```

### Task 5: Add reference-faithful responsive styling

**Files:**
- Modify: `styles/site.css`
- Modify: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: `.about-page`, `.about-intro`, `.about-experience`, `.about-process`, `.about-resources`, `.about-resource-card`, and `.about-contact` markup from Task 3
- Produces: desktop/mobile layouts plus light/dark and focus-visible states

- [ ] **Step 1: Add failing CSS contract tests**

Assert the stylesheet includes scoped About selectors, a two-column editorial layout on desktop, a one-column layout inside the existing `max-width:809px` breakpoint, placeholder colors `#f2f2f2` and `#262626`, credential-card hover and `:focus-visible` states, and dark-theme selectors for About surfaces and secondary text.

- [ ] **Step 2: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="About page styles" tests/project-structure.test.mjs`

Expected: FAIL because About styles do not exist.

- [ ] **Step 3: Implement desktop styling**

Append a scoped About section to `styles/site.css`. Match the reference with a maximum content width inherited from `.case-page`, generous 64–96px vertical sections, thin `var(--line)` dividers, a large responsive intro heading, a 32%/68% editorial grid where the reference calls for it, vertical experience rows, and five process cards that remain visually sequential. Keep transitions subtle and use existing timing/easing conventions.

Style the credential as a full-width link card with the title and provider on the left and `Credential ID xhx9ggfs` in a compact badge on the right. The badge must not use a status dot. Hover may shift surface color or border contrast but must not move the card vertically.

- [ ] **Step 4: Implement dark theme, keyboard focus, and mobile styling**

Add dark-theme surface and secondary-text rules. Add `:focus-visible` outlines for the resource card and Copy button. At `max-width:809px`, collapse all About grids to one column, reduce heading sizes proportionally, stack resource-card content, and preserve at least 44px interactive hit areas.

- [ ] **Step 5: Run the focused test after receiving explicit authorization**

Run: `node --test --test-name-pattern="About page styles" tests/project-structure.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit only this task's files**

```bash
git add styles/site.css tests/project-structure.test.mjs
git commit -m "style: add responsive about page layout"
```

### Task 6: Verify the completed page

**Files:**
- Modify only if verification reveals an About-specific defect: `app/about/about-page.tsx`, `content/about.ts`, `app/_components/site-header.tsx`, or `styles/site.css`

**Interfaces:**
- Consumes: completed `/about` route
- Produces: verified desktop/mobile, EN/DE, light/dark behavior

- [ ] **Step 1: Request authorization for automated verification**

Ask before running the repository's test, lint, or build commands, in accordance with the user's standing instruction.

- [ ] **Step 2: Run the structural test suite if authorized**

Run: `node --test tests/project-structure.test.mjs`

Expected: all tests PASS.

- [ ] **Step 3: Run lint and production build if authorized**

Run the exact scripts declared in `package.json` after checking their names. Expected: both exit successfully without About-page errors.

- [ ] **Step 4: Perform browser verification without automated test commands**

Open `http://localhost:3000/about` and inspect:

1. English light theme at desktop width.
2. English dark theme at desktop width.
3. German light theme at mobile width.
4. German dark theme at mobile width.

Confirm the header route, section order, four jobs, five process stages, placeholder containment, translated text, protected proper names, visible focus treatment, external credential destination, Copy icon/status behavior, and absence of excluded sections.

- [ ] **Step 5: Check the final diff**

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 6: Commit any verification fixes**

```bash
git add app/about app/_components/copy-email-button.tsx app/_components/portfolio.tsx app/_components/site-header.tsx content/about.ts styles/site.css tests/project-structure.test.mjs
git commit -m "fix: polish about page verification issues"
```


# Car Parts Case Study Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete `/projects/car-parts` case-study page that matches the Kaspi project page’s structure and behavior while using temporary English copy and gray placeholders instead of project media.

**Architecture:** Add a dedicated Car Parts client component and route, reuse the established shared header, footer hooks, character reveal, and case-study CSS, and keep all Car Parts-specific content local to the new route. Add a small route-local placeholder component with descriptive accessible labels, plus narrowly scoped CSS only for neutral results panels; do not restructure the finished Kaspi page.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, existing CSS in `styles/site.css`, Node’s built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-10-car-parts-case-page-design.md`

## Global Constraints

- Work locally only; do not publish or use ChatGPT Sites.
- Do not add images, video, GIF, SVG artwork, or decorative project assets for Car Parts.
- Keep temporary Car Parts case-study copy in English even when the global language is German.
- Continue localizing shared navigation, footer labels, and controls through the existing global language state.
- Do not invent research findings, percentages, revenue, or validated impact claims.
- Reuse the Kaspi project page’s grid, dimensions, spacing, radii, motion, theme behavior, and breakpoints.
- Do not refactor or visually alter the completed Kaspi project page beyond changing its Next project destination.
- Do not run tests, lint, build, or the full check command until the user explicitly approves testing.

---

### Task 1: Add route-level expectations for Car Parts

**Files:**
- Modify: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: filesystem paths rooted at `new URL("../", import.meta.url)` and Node `assert`/`fs/promises` already imported by the test file.
- Produces: static contract for `app/projects/car-parts/page.tsx`, `app/projects/car-parts/car-parts-case.tsx`, home-card routing, and project-to-project navigation.

- [ ] **Step 1: Extend the route inventory test**

Add the Car Parts route to the existing `Promise.all`:

```js
access(new URL("app/projects/car-parts/page.tsx", root)),
access(new URL("app/projects/car-parts/car-parts-case.tsx", root)),
```

- [ ] **Step 2: Add focused navigation and placeholder tests**

Append these tests:

```js
test("links the Car Parts card to its case study", async () => {
  const projects = await readFile(new URL("content/projects.ts", root), "utf8");
  assert.match(projects, /title:\s*"Car Parts"[\s\S]*?href:\s*"\/projects\/car-parts"/);
});

test("builds the Car Parts case study from accessible placeholders", async () => {
  const caseStudy = await readFile(
    new URL("app/projects/car-parts/car-parts-case.tsx", root),
    "utf8",
  );
  const placeholder = await readFile(
    new URL("app/projects/car-parts/_components/media-placeholder.tsx", root),
    "utf8",
  );

  assert.match(caseStudy, /Making automotive parts easier to discover and purchase/);
  assert.match(caseStudy, /In practice/);
  assert.match(caseStudy, /Across the ecosystem/);
  assert.match(caseStudy, /Variations/);
  assert.match(caseStudy, /Impact/);
  assert.match(caseStudy, /Apple Landing Page/);
  assert.doesNotMatch(caseStudy, /<(video|img)\b/);
  assert.match(placeholder, /aria-label=\{label\}/);
});

test("connects adjacent project pages", async () => {
  const kaspi = await readFile(
    new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root),
    "utf8",
  );
  const carParts = await readFile(
    new URL("app/projects/car-parts/car-parts-case.tsx", root),
    "utf8",
  );

  assert.match(kaspi, /className="case-next" href="\/projects\/car-parts"/);
  assert.match(carParts, /className="case-next" href="\/#projects"/);
});
```

- [ ] **Step 3: Defer the red test run**

Do not execute `npm test` yet. Record that the expected initial state is failure because the Car Parts route and component do not exist and its home-card link still targets `#contact`. Run the command only after the user explicitly authorizes tests.

- [ ] **Step 4: Commit the contract separately**

```bash
git add tests/project-structure.test.mjs
git commit -m "test: define Car Parts case study contract"
```

---

### Task 2: Create the accessible Car Parts placeholder component and route

**Files:**
- Create: `app/projects/car-parts/_components/media-placeholder.tsx`
- Create: `app/projects/car-parts/page.tsx`

**Interfaces:**
- Consumes: the global `.case-placeholder` and size modifier classes from `styles/site.css`.
- Produces: `MediaPlaceholder({ label, className? }): JSX.Element` and the `/projects/car-parts` route entry.

- [ ] **Step 1: Create the route-local placeholder component**

```tsx
type MediaPlaceholderProps = {
  label: string;
  className?: string;
};

export function MediaPlaceholder({
  label,
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`case-placeholder scroll-reveal ${className}`.trim()}
      aria-label={label}
    />
  );
}
```

- [ ] **Step 2: Create the App Router entry**

```tsx
import type { Metadata } from "next";
import { CarPartsCase } from "./car-parts-case";

export const metadata: Metadata = {
  title: "Car Parts — Aziz Baratov",
  description: "A product design case study about making automotive parts easier to discover and purchase.",
};

export default function CarPartsPage() {
  return <CarPartsCase />;
}
```

- [ ] **Step 3: Perform static inspection without running tests**

Run only read-only inspection:

```bash
sed -n '1,160p' app/projects/car-parts/_components/media-placeholder.tsx
sed -n '1,120p' app/projects/car-parts/page.tsx
```

Confirm that the placeholder requires a descriptive label and the route exports metadata and renders `CarPartsCase`.

- [ ] **Step 4: Commit the route foundation**

```bash
git add app/projects/car-parts/_components/media-placeholder.tsx app/projects/car-parts/page.tsx
git commit -m "feat: add Car Parts case study route"
```

---

### Task 3: Build the complete Car Parts case-study page

**Files:**
- Create: `app/projects/car-parts/car-parts-case.tsx`

**Interfaces:**
- Consumes: `SiteHeader`, `RevealCharacters`, `useSiteClock`, `useSitePreferences`, Next.js `Link`, the route-local `MediaPlaceholder`, and existing `.case-*` classes.
- Produces: `CarPartsCase(): JSX.Element`, a complete case-study page with no `img` or `video` elements.

- [ ] **Step 1: Define temporary, non-claim copy**

At module scope, define one English copy object used for both global language states:

```tsx
const caseCopy = {
  title: "Car Parts",
  subtitle: "Making automotive parts easier to discover and purchase",
  intro: "This case study explores a clearer shopping journey for automotive parts—helping customers find compatible products, compare options, and move toward purchase with greater confidence.",
  results: "Project focus",
  resultItems: [
    { value: "01", label: "Product discovery" },
    { value: "02", label: "Compatibility clarity" },
    { value: "03", label: "Purchase journey" },
  ],
  problem: "Problem",
  problemParagraphs: [
    "Finding the right automotive part can require customers to understand technical specifications, vehicle compatibility, and differences between similar products before they feel ready to buy.",
    "When categories, filters, and compatibility details are fragmented across the journey, customers spend more time verifying options and face a higher risk of choosing the wrong item. The design opportunity was to make discovery more structured, surface essential information earlier, and create a clearer path from search to purchase.",
  ],
  goals: [
    "Make relevant parts easier to find without disrupting the familiar marketplace experience.",
    "Increase confidence by presenting compatibility, specifications, and comparison cues at the right moments.",
  ],
  roleItems: [
    { title: "Discovery", text: "Mapped the shopping journey, reviewed category and compatibility patterns, framed the core experience problem, and aligned the product direction with the team." },
    { title: "Design and delivery", text: "Developed information architecture, user flows, interaction concepts, prototypes, and implementation-ready designs, then supported design review during delivery." },
  ],
  solutionIntro: "The proposed experience organizes the journey around a few focused improvements:",
  solutionItems: [
    "A clearer category structure that helps customers start with the type of part they need.",
    "Vehicle and compatibility cues surfaced earlier in search and product discovery.",
    "Focused filters that prioritize the attributes customers use to narrow down options.",
    "Consistent product information that makes similar parts easier to compare.",
    "A shorter, more predictable route from discovery to the purchase decision.",
  ],
  impactParagraphs: [
    "The intended outcome is a shopping experience that reduces uncertainty and helps customers move through complex product choices with greater confidence.",
    "Final research findings and product metrics will replace this qualitative summary when the full case-study material is prepared.",
  ],
};

const sharedCopy = {
  en: {
    copyright: "© Designed and coded by Aziz Baratov ♥️",
    work: "What I do",
  },
  de: {
    copyright: "© Entworfen und programmiert von Aziz Baratov ♥️",
    work: "Meine Arbeit",
  },
};
```

This wording is explicitly temporary and does not assert unverified client results.

- [ ] **Step 2: Implement shared state, clock, and page introduction**

Create the client component with these imports and setup:

```tsx
"use client";

import Link from "next/link";
import { RevealCharacters } from "../../_components/reveal-characters";
import { SiteHeader } from "../../_components/site-header";
import { useSiteClock } from "../../_components/site-clock";
import { useSitePreferences } from "../../_components/site-preferences";
import { MediaPlaceholder } from "./_components/media-placeholder";

export function CarPartsCase() {
  const now = useSiteClock();
  const { language, languageHasChanged } = useSitePreferences();
  const footerCopy = sharedCopy[language];
  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Berlin",
      }).format(now)
    : "";

  return (
    <main className="case-page car-parts-case">
      <SiteHeader />
      {/* case-study sections from the following steps */}
    </main>
  );
}
```

Inside `main`, build `.case-layout` with the same aside/article split as Kaspi. The aside must contain:

```tsx
<aside className={`case-intro${languageHasChanged ? " hero-language-static" : ""}`}>
  <p className="case-eyebrow"><RevealCharacters>Kaspi.kz, E-commerce</RevealCharacters></p>
  <h1><RevealCharacters>{caseCopy.title}</RevealCharacters></h1>
  <h2><RevealCharacters>{caseCopy.subtitle}</RevealCharacters></h2>
  <div className="case-intro-copy case-intro-reveal">
    <p>{caseCopy.intro}</p>
  </div>
  <div className="case-results case-intro-reveal case-intro-results car-parts-results" aria-label={caseCopy.results}>
    {caseCopy.resultItems.map((item) => (
      <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
    ))}
  </div>
</aside>
```

- [ ] **Step 3: Implement hero, overview placeholder, Problem, Goals, and role**

Build `.case-content` using these exact structural classes:

```tsx
<article className="case-content">
  <MediaPlaceholder label="Car Parts hero image placeholder" className="case-media-hero" />
  <MediaPlaceholder label="Car Parts project overview placeholder" className="case-media-wide" />

  <section className="case-text-section scroll-reveal">
    <h3>{caseCopy.problem}</h3>
    <div>{caseCopy.problemParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
  </section>

  <MediaPlaceholder label="Car Parts problem illustration placeholder" className="case-media-wide case-media-tall" />

  <section className="case-project-infographic case-media-wide" aria-label="Goals and product design role">
    <article>
      <h4>Goals</h4>
      <ul>{caseCopy.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
    </article>
    <article>
      <h4>My role as a product designer</h4>
      <ul>{caseCopy.roleItems.map((item) => <li key={item.title}><strong>{item.title}:</strong> {item.text}</li>)}</ul>
    </article>
  </section>
```

- [ ] **Step 4: Implement Solution and Before/After placeholders**

Continue inside `.case-content`:

```tsx
  <section className="case-text-section scroll-reveal">
    <h3>Solution</h3>
    <div className="case-solution-copy">
      <p>{caseCopy.solutionIntro}</p>
      <ul>{caseCopy.solutionItems.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  </section>
  <div className="case-media-pair">
    <article className="case-solution-bento car-parts-bento-placeholder">
      <h4>Before</h4>
    </article>
    <article className="case-solution-bento car-parts-bento-placeholder">
      <h4>After</h4>
    </article>
  </div>
</article>
```

- [ ] **Step 5: Implement gallery sections entirely from placeholders**

After `.case-layout`, add:

```tsx
<section className="case-gallery-section scroll-reveal">
  <h3>In practice</h3>
  <div className="case-gallery-grid">
    {["Search and filtering", "Compatibility", "Product comparison", "Purchase journey"].map((label) => (
      <MediaPlaceholder key={label} label={`Car Parts ${label} placeholder`} />
    ))}
  </div>
</section>

<section className="case-gallery-section scroll-reveal">
  <h3>Across the ecosystem</h3>
  <MediaPlaceholder label="Car Parts ecosystem placeholder" className="case-media-panorama" />
</section>

<section className="case-gallery-section scroll-reveal">
  <h3>Variations</h3>
  <div className="case-variation-grid">
    {["first", "second", "third"].map((position) => (
      <MediaPlaceholder key={position} label={`Car Parts ${position} design variation placeholder`} />
    ))}
  </div>
  <MediaPlaceholder label="Car Parts design explorations placeholder" className="case-media-wide case-variation-wide" />
</section>
```

- [ ] **Step 6: Implement qualitative Impact panels**

Add the Impact section without numeric client claims:

```tsx
<section className="case-text-section case-impact scroll-reveal">
  <h3>Impact</h3>
  <div className="case-impact-content">
    <div className="case-impact-story">
      <section>
        <h4>Intended outcome</h4>
        {caseCopy.impactParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
    </div>
    <div className="case-impact-primary car-parts-impact-primary">
      <strong>Focus</strong><span>Clearer automotive part discovery</span>
    </div>
    <div className="case-impact-metrics">
      {[
        ["01", "Findability"], ["02", "Compatibility"], ["03", "Comparison"],
        ["04", "Decision clarity"], ["05", "Navigation"], ["06", "Purchase confidence"],
      ].map(([value, label]) => (
        <div key={label}><strong>{value}</strong><span>{label}</span></div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 7: Implement the shared ending and footer pattern**

Add:

```tsx
<section className="case-ending scroll-reveal">
  <a className="case-deeper" href="mailto:baratov.aziz.h@gmail.com">
    <h2>Want to go deeper?</h2>
    <p>The full case study will cover the research process, design decisions, and final product outcomes.</p>
    <strong>baratov.aziz.h@gmail.com</strong>
  </a>
  <Link className="case-next" href="/#projects">
    <h2>Next project</h2>
    <MediaPlaceholder label="Apple Landing Page project preview placeholder" />
    <h4>Apple Landing Page</h4>
    <p>Concept, Technology</p>
  </Link>
</section>

<footer id="index" className="scroll-reveal">
  <p>{footerCopy.copyright}</p>
  <p>{time}, Berlin, DE</p>
  <Link href="/#projects">{footerCopy.work}</Link>
</footer>
```

- [ ] **Step 8: Inspect the component without executing it**

Run these read-only checks:

```bash
rg -n "<(video|img)\\b|Car Parts|In practice|Across the ecosystem|Variations|Impact|Apple Landing Page" app/projects/car-parts/car-parts-case.tsx
sed -n '1,420p' app/projects/car-parts/car-parts-case.tsx
```

Expected: every named section appears; `video` and `img` searches return no matches; the only next-project destination is `/#projects`.

- [ ] **Step 9: Commit the page implementation**

```bash
git add app/projects/car-parts/car-parts-case.tsx
git commit -m "feat: build Car Parts case study page"
```

---

### Task 4: Add narrowly scoped placeholder styling

**Files:**
- Modify: `styles/site.css`

**Interfaces:**
- Consumes: `.case-results`, `.case-solution-bento`, `.case-impact-primary`, and dark-theme surface tokens already defined in the stylesheet.
- Produces: `.car-parts-results`, `.car-parts-bento-placeholder`, and `.car-parts-impact-primary` visual overrides scoped to the Car Parts page.

- [ ] **Step 1: Add light-theme Car Parts styles after the case-study rules**

```css
.car-parts-results>div{padding:14px;border-radius:8px;background:#f3f3f3}
.car-parts-results strong{font-size:28px;letter-spacing:-.8px}
.car-parts-bento-placeholder{background:#f1f1f1}
.car-parts-impact-primary{background:#f1f1f1;color:#181818}
```

- [ ] **Step 2: Add dark-theme variants beside the existing dark case styles**

```css
[data-theme="dark"] .car-parts-results>div,
[data-theme="dark"] .car-parts-bento-placeholder,
[data-theme="dark"] .car-parts-impact-primary{background:#262626;color:#fafafa}
```

- [ ] **Step 3: Add mobile density adjustment inside the existing `max-width:809px` case block**

```css
.car-parts-results>div{padding:12px}
.car-parts-results strong{font-size:24px}
```

- [ ] **Step 4: Inspect CSS scope without running lint or build**

```bash
rg -n "car-parts-(results|bento-placeholder|impact-primary)" styles/site.css
git diff --check -- styles/site.css
```

Expected: every new selector is prefixed with `car-parts-`; `git diff --check` reports no whitespace errors.

- [ ] **Step 5: Commit the scoped styling**

```bash
git add styles/site.css
git commit -m "style: match Car Parts placeholders to case layout"
```

---

### Task 5: Connect home and case-study navigation

**Files:**
- Modify: `content/projects.ts`
- Modify: `app/projects/kaspi-home/kaspi-home-case.tsx`

**Interfaces:**
- Consumes: existing `projects` card data and Next.js `Link` components.
- Produces: home → Car Parts, Kaspi → Car Parts, and Car Parts → projects-list navigation chain.

- [ ] **Step 1: Update the Car Parts home-card destination**

Change only this field in the Car Parts project object:

```ts
href: "/projects/car-parts",
```

Keep its existing cover image, dark-image setting, title, German title, and client label unchanged.

- [ ] **Step 2: Update Kaspi’s Next project destination**

Change only the destination on the existing next-project link:

```tsx
<Link className="case-next" href="/projects/car-parts">
```

Keep all existing Kaspi next-card copy and placeholder content unchanged.

- [ ] **Step 3: Inspect the complete navigation chain**

```bash
rg -n 'title: "Car Parts"|href: "/projects/car-parts"' content/projects.ts
rg -n 'className="case-next" href=' app/projects/kaspi-home/kaspi-home-case.tsx app/projects/car-parts/car-parts-case.tsx
```

Expected:

- Home project data points Car Parts to `/projects/car-parts`.
- Kaspi next project points to `/projects/car-parts`.
- Car Parts next project points to `/#projects` and displays Apple Landing Page.

- [ ] **Step 4: Commit navigation updates**

```bash
git add content/projects.ts app/projects/kaspi-home/kaspi-home-case.tsx
git commit -m "feat: connect Car Parts project navigation"
```

---

### Task 6: Final static review and user-gated runtime verification

**Files:**
- Review: `app/projects/car-parts/page.tsx`
- Review: `app/projects/car-parts/car-parts-case.tsx`
- Review: `app/projects/car-parts/_components/media-placeholder.tsx`
- Review: `content/projects.ts`
- Review: `app/projects/kaspi-home/kaspi-home-case.tsx`
- Review: `styles/site.css`
- Review: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: all deliverables from Tasks 1–5.
- Produces: a statically reviewed implementation and a clearly deferred list of runtime checks awaiting user permission.

- [ ] **Step 1: Confirm scope and asset constraints**

```bash
find app/projects/car-parts -maxdepth 3 -type f -print | sort
find public/images/projects/car-parts -maxdepth 1 -type f -print | sort
rg -n "<(video|img)\\b" app/projects/car-parts
```

Expected: the route contains only the page, case component, and placeholder component; no new Car Parts project media were added; no `video` or `img` tags exist in the Car Parts route.

- [ ] **Step 2: Check changed-file integrity without executing the application**

```bash
git diff --check
git status --short
git diff -- content/projects.ts app/projects/kaspi-home/kaspi-home-case.tsx styles/site.css tests/project-structure.test.mjs
```

Expected: no whitespace errors; review confirms only the intended route, navigation, scoped style, and contract changes.

- [ ] **Step 3: Ask before running automated or browser tests**

Ask the user whether to run tests. Do not run any of the following before explicit approval:

```bash
npm test
npm run lint
npm run build
```

If approved, expected results are zero failing tests, zero lint errors, and a successful Next.js production build.

- [ ] **Step 4: Ask separately before browser visual verification if needed**

If the user wants local visual verification, ensure `npm run dev` is running, open `/projects/car-parts`, and inspect desktop, tablet, mobile, light theme, dark theme, scroll reveals, header behavior, and the browser back/forward path. This step does not replace the explicit approval required for automated tests.

- [ ] **Step 5: Report exactly what was and was not verified**

The completion message must list the new route and navigation chain, confirm that no Car Parts media assets were added, link the created files, and explicitly state whether tests, lint, build, and browser verification were run or deferred.

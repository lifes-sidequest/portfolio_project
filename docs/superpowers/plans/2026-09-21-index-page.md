# Index Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a localized, responsive `/index` page with CV and certification resources, the existing contact block, and working PDF links from both the page and header.

**Architecture:** Add a dedicated localized content module and an Index route/client component composed from existing shared portfolio components. Store the PDF as a public asset, route the header Index item explicitly, and reuse the About resource-card and Home contact patterns with Index-scoped layout styles.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-21-index-page-design.md`

## Global Constraints

- `/index` is the dedicated route for the header Index item.
- English, German, light theme, dark theme, and responsive behavior are required.
- Do not render a work-experience section.
- Both CV links open the supplied public PDF in a new tab.
- Contact matches the existing `Ready to do great work` block.
- Resource cards are two columns on desktop and one below `809px`.

## Review Focus

- Home and inner-page navigation must resolve Index to `/index`, never `/#index`.
- Both PDF links must use the public-root URL and safe new-tab attributes.
- German copy must be localized without translating proper names.
- The long certification title must not overflow on mobile.
- Reused email, social, clock, and footer behavior must stay accessible.

---

### Task 1: Public CV and Header Links

**Files:**
- Create: `public/documents/CV_Aziz_Baratov_Product_Designer.pdf`
- Modify: `app/_components/site-header.tsx`
- Test: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: `/Users/azekelele/Downloads/CV_Aziz_Baratov_Product_Designer.pdf`.
- Produces: `/documents/CV_Aziz_Baratov_Product_Designer.pdf`, header CV link, and `/index` navigation.

- [ ] **Step 1: Write the failing test**

```js
test("routes Index and opens the portfolio CV from the header", async () => {
  const header = await readFile(new URL("app/_components/site-header.tsx", root), "utf8");
  const cv = await readFile(new URL("public/documents/CV_Aziz_Baratov_Product_Designer.pdf", root));
  assert.match(header, /if \(hash === "index"\) return "\/index"/);
  assert.match(header, /href="\/documents\/CV_Aziz_Baratov_Product_Designer\.pdf"/);
  assert.match(header, /target="_blank"/);
  assert.match(header, /rel="noopener noreferrer"/);
  assert.ok(cv.length > 1000);
});
```

- [ ] **Step 2: Verify RED**

Run `node --test --test-name-pattern="routes Index and opens" tests/project-structure.test.mjs`.
Expected: FAIL because the public PDF and route branch are missing.

- [ ] **Step 3: Implement the asset and links**

Copy the PDF to the public path. Add `if (hash === "index") return "/index";`. Replace the disabled CV button with:

```tsx
<a className="cv-control" href="/documents/CV_Aziz_Baratov_Product_Designer.pdf"
  target="_blank" rel="noopener noreferrer"
  aria-label={language === "en" ? "Open CV" : "Lebenslauf öffnen"}>
  <span>CV</span>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path className="download-arrow" d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
    <path className="download-tray" d="M4.5 15.75v2.25A2.25 2.25 0 0 0 6.75 20.25h10.5A2.25 2.25 0 0 0 19.5 18v-2.25" />
  </svg>
</a>
```

- [ ] **Step 4: Verify GREEN**

Re-run the Task 1 test. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add public/documents/CV_Aziz_Baratov_Product_Designer.pdf app/_components/site-header.tsx tests/project-structure.test.mjs
git commit -m "feat: link index and portfolio cv"
```

### Task 2: Localized Index Content

**Files:**
- Create: `content/index.ts`
- Test: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: `aboutResource` from `content/about.ts`.
- Produces: `indexContent` and `indexResources`.

- [ ] **Step 1: Write the failing test**

```js
test("defines localized Index content and two resources", async () => {
  const content = await readFile(new URL("content/index.ts", root), "utf8");
  assert.match(content, /Resources/);
  assert.match(content, /Ressourcen/);
  assert.match(content, /Ready to do great work/);
  assert.match(content, /Bereit für großartige Arbeit/);
  assert.match(content, /title: "CV"/);
  assert.match(content, /aboutResource/);
});
```

- [ ] **Step 2: Verify RED**

Run `node --test --test-name-pattern="localized Index content" tests/project-structure.test.mjs`.
Expected: FAIL because `content/index.ts` is missing.

- [ ] **Step 3: Create the module**

```ts
import { aboutResource } from "./about";

export const indexResources = {
  cv: { title: "CV", href: "/documents/CV_Aziz_Baratov_Product_Designer.pdf" },
  certificate: aboutResource,
} as const;

export const indexContent = {
  en: {
    title: "Index", resources: "Resources",
    resourcesIntro: "Selected documents and credentials for a closer look at my experience and product practice.",
    cvDescription: "Product design experience, skills, and selected achievements.",
    ready: "Ready to do great work",
    looking: "Looking for a product design role where design drives the product, not just how it looks.",
    copyright: "© Designed and coded by Aziz Baratov ♥️", work: "What I do",
  },
  de: {
    title: "Index", resources: "Ressourcen",
    resourcesIntro: "Ausgewählte Dokumente und Nachweise für einen genaueren Einblick in meine Erfahrung und Produktarbeit.",
    cvDescription: "Product-Design-Erfahrung, Kompetenzen und ausgewählte Erfolge.",
    ready: "Bereit für großartige Arbeit",
    looking: "Ich suche eine Product-Design-Rolle, in der Design das Produkt prägt – nicht nur sein Aussehen.",
    copyright: "© Entworfen und programmiert von Aziz Baratov ♥️", work: "Meine Arbeit",
  },
} as const;
```

- [ ] **Step 4: Verify GREEN**

Re-run the Task 2 test. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add content/index.ts tests/project-structure.test.mjs
git commit -m "feat: add localized index content"
```

### Task 3: Index Route and Sections

**Files:**
- Create: `app/index/page.tsx`
- Create: `app/index/index-page.tsx`
- Test: `tests/project-structure.test.mjs`

**Interfaces:**
- Consumes: `indexContent`, `indexResources`, `SiteHeader`, `RevealCharacters`, `CopyEmailButton`, `useSiteClock`, `useSitePreferences`, `socialLinks`, and `SocialFolder`.
- Produces: the `/index` route with resources, contact, and footer.

- [ ] **Step 1: Write the failing test**

```js
test("builds the localized Index page without work experience", async () => {
  const route = await readFile(new URL("app/index/page.tsx", root), "utf8");
  const page = await readFile(new URL("app/index/index-page.tsx", root), "utf8");
  assert.match(route, /<IndexPage \/>/);
  assert.match(page, /indexResources\.cv/);
  assert.match(page, /indexResources\.certificate/);
  assert.equal((page.match(/className="index-resource-card/g) ?? []).length, 2);
  assert.match(page, /className="contact index-contact"/);
  assert.match(page, /socialLinks\.map/);
  assert.match(page, /<CopyEmailButton language=\{language\} \/>/);
  assert.doesNotMatch(page, /Work Experience|Berufserfahrung|experience\.map/);
});
```

- [ ] **Step 2: Verify RED**

Run `node --test --test-name-pattern="builds the localized Index page" tests/project-structure.test.mjs`.
Expected: FAIL because the route files are missing.

- [ ] **Step 3: Create the server route**

```tsx
import type { Metadata } from "next";
import { IndexPage } from "./index-page";
export const metadata: Metadata = { title: "Index — Aziz Baratov", description: "Resources, credentials, and contact information for Aziz Baratov." };
export default function IndexRoute() { return <IndexPage />; }
```

- [ ] **Step 4: Build the client page**

Use this semantic structure:

```tsx
<main className="case-page index-page">
  <SiteHeader />
  <section className="index-hero" aria-labelledby="index-title">
    <h1 id="index-title"><RevealCharacters>{copy.title}</RevealCharacters></h1>
  </section>
  <section className="index-resources" aria-labelledby="index-resources-title">
    <div className="index-section-heading">
      <h2 id="index-resources-title">{copy.resources}</h2>
      <p>{copy.resourcesIntro}</p>
    </div>
    <div className="index-resource-grid">
      <a className="index-resource-card" href={indexResources.cv.href} target="_blank" rel="noopener noreferrer">{indexResources.cv.title}</a>
      <a className="index-resource-card" href={indexResources.certificate.href} target="_blank" rel="noopener noreferrer">{indexResources.certificate.title}</a>
    </div>
  </section>
  <section className="contact index-contact" aria-labelledby="index-contact-title">
    <div className="contact-copy"><h3 id="index-contact-title">{copy.ready}</h3></div>
    <div className="social-links">{socialLinks.map((social) => <SocialFolder key={social.id} {...social} />)}</div>
  </section>
  <footer><p>{copy.copyright}</p><p>{time}, Berlin, DE</p><Link href="/#projects">{copy.work}</Link></footer>
</main>
```

Both resource cards use `target="_blank"`, `rel="noopener noreferrer"`, sequential numbers, the diagonal arrow SVG, and an accessible label. Reproduce the complete Home/About contact structure and localized footer.

- [ ] **Step 5: Verify GREEN**

Re-run the Task 3 test. Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/index/page.tsx app/index/index-page.tsx tests/project-structure.test.mjs
git commit -m "feat: build portfolio index page"
```

### Task 4: Responsive Styling and QA

**Files:**
- Modify: `styles/site.css`
- Test: `tests/project-structure.test.mjs`
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: Index class names and existing theme variables.
- Produces: responsive light/dark layouts and a passing design-QA report.

- [ ] **Step 1: Write the failing style test**

```js
test("styles Index resources responsively in both themes", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");
  assert.match(styles, /\.index-page/);
  assert.match(styles, /\.index-resource-grid\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(styles, /\.index-resource-card:hover \.about-resource-arrow/);
  assert.match(styles, /\[data-theme="dark"\] \.index-resource-card/);
  assert.match(styles, /@media\(max-width:809px\)[\s\S]*?\.index-resource-grid\{grid-template-columns:1fr\}/);
});
```

- [ ] **Step 2: Verify RED**

Run `node --test --test-name-pattern="styles Index resources" tests/project-structure.test.mjs`.
Expected: FAIL because Index styles are missing.

- [ ] **Step 3: Add Index styles**

```css
.index-page{padding-top:80px}
.index-hero{min-height:330px;padding:64px 0;border-bottom:1px solid var(--line)}
.index-hero h1{margin:0;font-size:clamp(52px,6.5vw,104px);font-weight:400;line-height:.98;letter-spacing:-.06em}
.index-resources{display:grid;grid-template-columns:32% 1fr;gap:24px;padding:64px 0;border-bottom:1px solid var(--line)}
.index-resource-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.index-resource-card{min-height:280px;padding:24px;border:1px solid var(--line);border-radius:8px;background:#fff;display:grid;grid-template-columns:44px 1fr 24px;gap:20px}
.index-resource-card:hover .about-resource-arrow,.index-resource-card:focus-visible .about-resource-arrow{transform:rotate(45deg)}
[data-theme="dark"] .index-resource-card{background:#181818;border-color:rgba(255,255,255,.14)}
@media(max-width:809px){
  .index-page{padding-top:72px}
  .index-hero{min-height:250px;padding:64px 0}
  .index-resources{grid-template-columns:1fr;gap:48px;padding:64px 0}
  .index-resource-grid{grid-template-columns:1fr}
}
```

- [ ] **Step 4: Verify GREEN**

Run `node --test --test-name-pattern="Index|portfolio CV" tests/project-structure.test.mjs`.
Expected: all matching tests PASS.

- [ ] **Step 5: Browser verification**

Open `http://localhost:3000/index`. Check desktop and `390 × 844` mobile widths in EN/DE and light/dark themes. Verify both PDF entry points, the GoPractice link, email copy control, social links, and absence of new console errors.

- [ ] **Step 6: Design QA**

Compare against `the approved Index-page reference`, record intentional portfolio-style deviations, fix every P0/P1/P2 issue, and update `design-qa.md` with `final result: passed`.

- [ ] **Step 7: Final checks**

```bash
node --test --test-name-pattern="Index|portfolio CV" tests/project-structure.test.mjs
git diff --check -- app/index app/_components/site-header.tsx content/index.ts styles/site.css tests/project-structure.test.mjs design-qa.md
```

Expected: all matching tests PASS and the diff check exits 0.

- [ ] **Step 8: Commit**

```bash
git add styles/site.css tests/project-structure.test.mjs design-qa.md
git commit -m "style: finish responsive index page"
```

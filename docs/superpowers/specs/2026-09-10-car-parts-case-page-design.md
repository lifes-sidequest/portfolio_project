# Car Parts Case Study Page — Design Specification

## Goal

Add a complete internal project page for **Car Parts** that follows the established structure, spacing, motion, theme behavior, and responsive layout of the existing **Kaspi.kz home page rework** case study. The new page must use neutral gray placeholders for all visual project material and temporary English copy until final content and media are supplied.

## Approved approach

Use a hybrid implementation:

- Create a dedicated Car Parts route and page implementation.
- Reuse the existing global header, footer patterns, reveal animations, theme/language state, clock, and case-study CSS.
- Keep the finished Kaspi page intact instead of restructuring it into a new generalized page system.
- Reuse small existing components where doing so does not couple Car Parts to Kaspi-specific content; otherwise keep the Car Parts markup local and straightforward.

This limits regression risk while ensuring both project pages remain visually consistent.

## Routes and navigation

- Add the route `/projects/car-parts`.
- Change the Car Parts card on the home page from `#contact` to `/projects/car-parts`.
- Change the Kaspi case-study **Next project** link from the home page to `/projects/car-parts`.
- The Car Parts closing **Next project** card displays **Apple Landing Page** and links to `/#projects`, because an Apple Landing Page case-study route does not exist yet.
- Browser back/forward navigation must continue to use normal Next.js links and preserve the existing site behavior.

## Page structure

The Car Parts page follows the same section order and layout rhythm as the Kaspi case study:

1. Shared site header
2. Intro column and hero area
3. Opening project overview
4. Secondary wide visual area, replacing the Kaspi ecosystem map
5. Problem
6. Goals and My role as a product designer
7. Solution
8. Before and After comparison
9. In practice gallery
10. Across the ecosystem
11. Variations
12. Impact
13. Want to go deeper?
14. Next project: Apple Landing Page
15. Shared footer layout

All sections use the existing case-study grid, widths, gaps, radii, typography, and responsive breakpoints.

## Content

Use concise, credible temporary English text written specifically for a car-parts shopping experience. Do not invent client performance claims, research results, percentages, revenue changes, or other facts.

Suggested temporary direction:

- Project label: `Kaspi.kz, E-commerce`
- Title: `Car Parts`
- Subtitle: `Making automotive parts easier to discover and purchase`
- Overview: Explain that the case study explores a clearer way to find compatible parts, compare options, and complete a purchase.
- Problem: Focus on difficult product discovery, compatibility uncertainty, and fragmented navigation.
- Goals: Improve findability and confidence while preserving the existing shopping experience.
- Role: Cover discovery, journey mapping, interaction design, prototyping, and design review in neutral terms.
- Solution: Describe a clearer category structure, compatibility cues, filters, comparison, and a shorter path to purchase.
- Impact: Describe intended outcomes qualitatively only; do not present them as validated results.

Temporary Car Parts copy remains English when the global site language is switched to German. The shared header, navigation, controls, footer labels, and clock continue to follow the selected global language. Full German case-study translation is intentionally out of scope for this iteration.

## Visual placeholders

Do not add project images, video, GIF, SVG artwork, or decorative icons to the Car Parts page.

- Every visual region is a neutral gray placeholder using the existing `.case-placeholder` appearance and case-study dimensions.
- The hero preserves the same 16:9 container as the Kaspi hero.
- The secondary wide visual preserves the ecosystem-map region’s footprint without rendering a map.
- Problem media, Before/After, the four In practice cells, Across the ecosystem, the three Variations cells, and the wide Variations cell all remain gray placeholders.
- The Impact presentation uses neutral placeholder panels and qualitative labels, not fabricated numeric metrics.
- Placeholders must remain gray in both light and dark themes, following the existing theme-specific neutral surface colors.
- Placeholder containers preserve the existing project-page radii and responsive behavior.

## Components and files

Create:

- `app/projects/car-parts/page.tsx` — route entry and page metadata.
- `app/projects/car-parts/car-parts-case.tsx` — Car Parts case-study content and layout.
- `app/projects/car-parts/_components/media-placeholder.tsx` only if importing the existing placeholder would create an undesirable Kaspi-specific dependency. Otherwise reuse the current component without moving or refactoring it.

Update:

- `content/projects.ts` — point the Car Parts card to the new route.
- `app/projects/kaspi-home/kaspi-home-case.tsx` — point its Next project card to Car Parts.
- `styles/site.css` only if a Car Parts-specific placeholder composition cannot be expressed with existing case-study classes. Any additions must be narrowly scoped and must not alter the finished Kaspi page.

## Motion and interaction

- Use the same page-entry and scroll-reveal behavior as the Kaspi project page.
- Preserve the shared header’s scroll-hide and hover animations.
- Preserve the global theme and language transition behavior.
- Placeholders themselves remain non-interactive.
- Respect the site’s existing reduced-motion behavior.

## Responsive behavior

- Desktop, tablet, and mobile layouts use the same breakpoint behavior as the Kaspi case study.
- Two-column sections collapse using the existing rules.
- Gallery and variation placeholders use the same mobile sizing and horizontal behavior already established by the project page.
- No new horizontal page overflow may be introduced.

## Accessibility and semantics

- Use semantic headings and section structure matching the existing case-study page.
- Placeholder elements receive descriptive accessible labels such as `Car Parts project image placeholder`; avoid generic labels when the visual purpose is known.
- Navigation remains keyboard accessible through ordinary links.
- Decorative placeholders are not focusable.

## Error and fallback behavior

The page has no external data or media dependencies in this iteration, so no loading or media-error state is required. If JavaScript is unavailable, the core temporary text and gray placeholder layout remain visible through server-rendered markup where supported by the current component structure.

## Verification boundaries

Implementation verification will be limited to targeted static inspection unless the user explicitly approves tests. Per the current project workflow, do not run build, lint, automated tests, or a full test pass before the portfolio is complete without asking first.

When implementation is ready, verify without running the test suite that:

- `/projects/car-parts` exists and is linked from the home page.
- Kaspi’s Next project link targets Car Parts.
- Car Parts contains the complete agreed section sequence.
- No project media assets were added for Car Parts.
- All visual regions render through placeholder markup.
- No existing Kaspi content or styling was unintentionally changed.

## Out of scope

- Final Car Parts copy
- German translation of Car Parts case-study content
- Car Parts images, videos, GIFs, diagrams, or icons
- An internal Apple Landing Page route
- Refactoring all project pages into a CMS or shared schema
- Admin tooling or content management
- Running the portfolio-wide test suite

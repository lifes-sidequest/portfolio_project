# Index Page Design

## Goal

Create a localized `/index` page inspired by the sparse structure of `the approved Index-page reference`, while using the portfolio's existing visual language and reusable components. The page should provide quick access to Aziz Baratov's CV, certification, and contact channels without duplicating the work-experience section.

## Navigation

- The `Index` header item routes to `/index` from every page.
- The existing CV control in the site header becomes an external-style link that opens the portfolio PDF in a new browser tab.
- The PDF is stored in the project's public assets and is shared by both the header control and the Index resource card.

## Page Structure

1. Persistent portfolio header.
2. Large animated `Index` page title using the existing reveal treatment.
3. `Resources` section (`Ressourcen` in German) with a short localized description.
4. Two resource cards in one desktop row and one mobile column:
   - `CV`, opening the local PDF in a new tab.
   - `Data-driven Product Management Simulator`, reusing the GoPractice certification data and destination already used on About.
5. The existing `Ready to do great work` contact block, matching the home page in content, email action, copy control, and social folders.
6. Standard localized portfolio footer.

The page intentionally does not include a work-experience section.

## Components and Reuse

- Reuse `SiteHeader`, site preferences, clock, email copy button, social links, and social folder components.
- Reuse the About certification-card interaction and arrow motion, while allowing a two-card grid on Index.
- Share the existing localized contact copy from the portfolio content rather than introducing a second version.
- Keep Index-specific layout and responsive styles namespaced under `index-page` classes.

## Content and Localization

- English and German variants are provided for the page heading, resource heading, supporting text, CV description, contact copy, and footer labels.
- Product and provider names remain untranslated where they are proper names.
- Both resource cards expose clear accessible labels.

## Responsive and Theme Behavior

- Desktop follows the reference's generous whitespace and left-label/right-content rhythm.
- Resource cards appear side-by-side on desktop and stack on screens below the existing mobile breakpoint.
- The page supports existing light and dark theme tokens.
- Focus-visible states are retained for keyboard navigation.

## PDF Behavior

- Source file: `CV_Aziz_Baratov_Product_Designer.pdf` supplied by the user.
- Project destination: `/public/documents/CV_Aziz_Baratov_Product_Designer.pdf`.
- Header and resource-card links both use the public URL and open it in a new tab with `rel="noopener noreferrer"`.

## Verification

- Add focused structural tests for `/index`, resource count/content, route behavior, localization, contact reuse, and PDF links.
- Verify the PDF opens from both entry points.
- Visually inspect desktop and mobile layouts in light and dark themes.
- Run focused tests and diff checks before handoff.

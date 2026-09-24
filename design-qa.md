# Design QA — Portfolio Index page

- Source visual truth: `the approved Index-page reference`
- Browser-rendered implementation: `http://localhost:3000/index`
- Source capture: Codex in-app browser, desktop layout
- Implementation viewports: desktop default and `390 × 844` CSS px
- Verified states: English/dark and German/light

## Full-view comparison evidence

The implementation preserves the reference's defining structure: a persistent header, oversized Index heading with generous whitespace, a left-label/right-content Resources section, and a calm linear page rhythm. The work-history list is intentionally omitted, as requested, and the existing portfolio contact block becomes the final major section.

## Focused comparison evidence

- Resources use two equal-width cards on desktop and one column on mobile.
- Card numbering, diagonal arrows, borders, spacing, and hover arrow motion match the existing About certification language while retaining the reference's side-by-side resource composition.
- The `390 × 844` capture confirms that the long German copy and certification content remain within the viewport without horizontal overflow.
- The desktop captures confirm balanced whitespace and alignment across the Index heading and Resources grid.

## Intentional deviations

- Existing portfolio typography, header controls, theme transition, cards, and social folders are retained instead of cloning the reference site's branding.
- The work-experience section from the reference is omitted by request.
- Contact uses the full `Ready to do great work` component from the portfolio rather than the reference's compact icon links.
- Resources contain CV and GoPractice certification, matching the requested content.

## Interaction and accessibility verification

- Both CV entry points resolve to `/documents/CV_Aziz_Baratov_Product_Designer.pdf` and use `target="_blank"`.
- The certification opens the existing GoPractice certificate destination in a new tab.
- English and German content were verified through the site language control.
- Light and dark themes were visually verified.
- Browser console verification returned no warnings or errors.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

None required for the approved scope.

final result: passed

---

# Design QA — Shots & Inspiration flip hint

- Source visual truth: `/var/folders/5z/2bbp19dd3hbc5gs8ftr7g64m0000gn/T/TemporaryItems/NSIRD_screencaptureui_aWrRTp/Снимок экрана — 2026-09-21 в 22.49.19.png` (1000 × 878 px)
- Implementation capture: `/private/tmp/inspiration-hint-qa.png` (1280 × 720 px, desktop CSS viewport 1280 × 720, density 1)
- Compared state: light theme, English label, front of stamp; reference is an isolated composition without site chrome, so typography and mark placement were compared relative to the stamp rather than pixel-for-pixel across the full frame.
- Full-view evidence: the live page keeps its header, empty-state copy, and action while adding the hand-written hint above the stamp.
- Focused evidence: Caveat label, outlined heart, and looping arrow sit above and left of the stamp; the arrow points toward the stamp without blocking clicks. Both source and implementation were opened in the same comparison input. No separate crop was needed because the marks are legible in the captures.
- Fonts and typography: Caveat is loaded locally for the hint only; the rest of the portfolio type system remains unchanged.
- Spacing and layout: the hint clears the desktop header and remains in-bounds at 390 × 844 px mobile viewport.
- Colors: charcoal in light mode, light marks in dark mode; both retain contrast.
- Image quality: the original Brandenburg stamp is unchanged; the arrow is a transparent generated bitmap, and the heart uses the existing icon library.
- Copy: “Click to flip” and its German translation are present; the original heading and description are unchanged.
- Interaction: the stamp still flips on click in mobile verification; the hint does not intercept pointer events.
- Findings: no actionable P0/P1/P2 issues. The handwritten marks are proportionally scaled for the smaller on-page stamp, an intentional deviation from the isolated reference.

final result: passed

---

# Design QA — Shots & Inspiration hint placement (21 Sep 2026)

- Source visual truth: `/var/folders/5z/2bbp19dd3hbc5gs8ftr7g64m0000gn/T/TemporaryItems/NSIRD_screencaptureui_hGbEe9/Снимок экрана — 2026-09-21 в 23.29.40.png` (reference composition, 1440 × 1080 px).
- Implementation: live in-app browser at `http://localhost:3000/inspiration`, desktop 1280 × 720 px and mobile 390 × 844 px, CSS density 1; light and dark screenshots inspected in the browser.
- Full-view comparison: on desktop and mobile the label/heart now sit above the stamp's left edge, and the arrow loops downward and ends just above that edge. The smaller stamp and site header are intentional existing-page differences from the isolated reference.
- Focused comparison: supplied `flip-arrow.svg` and `flip-heart.svg` retain their original shapes and color, with a CSS inversion only in dark mode. The group does not overlap the stamp, heading, or header.
- Fonts and typography: the hint remains Caveat, 26px, 400; site typography is unchanged.
- Spacing and layout: the hint is positioned relative to the stamp at both tested breakpoints; mobile has no clipping or overlap.
- Colors and imagery: contrast is clear in both themes; stamp image and interactions are unchanged.
- Copy and interaction: localized label is unchanged; the hint remains pointer-transparent and the stamp remains clickable.
- Comparison history: the initial desktop capture placed the label too close to the header; increasing the stamp group's top spacing resolved it in the second capture. Mobile and dark captures showed no further P0/P1/P2 issues.
- Findings: no actionable P0/P1/P2 issues remain.

final result: passed

---

# Design QA — case-study endings (22 Sep 2026)

- Source visual truth: `/var/folders/5z/2bbp19dd3hbc5gs8ftr7g64m0000gn/T/TemporaryItems/NSIRD_screencaptureui_2iSYp6/Снимок экрана — 2026-09-22 в 01.01.25.png` (1716 × 772 px).
- Implementation: in-app browser captures of `/projects/kaspi-home` at desktop 1280 × 720 and mobile 390 × 844 CSS pixels, light theme. The source is a cropped component view rather than a full page; proportions and hierarchy were compared within the ending section.
- Full-view comparison: two-column desktop layout has Want to go deeper? above Previous project on the left and the taller Next project on the right; mobile stacks them in that order.
- Focused comparison: Gmail icon and the shared Copy button sit below the email; Copy produced a “Copied” status in-browser. Previous shows project title and subtitle. Next shows its existing project-cover video and title/subtitle. Kaspi courier keeps a neutral placeholder because no cover asset exists yet.
- Fonts and typography: existing portfolio family and case-study heading scale retained; labels and project titles remain legible at mobile width.
- Spacing and colors: 8px card gaps and existing light/dark card tokens retained; no horizontal mobile overflow observed.
- Image quality: existing local cover media are reused without stretching; no new artwork was fabricated.
- Copy and interactions: English/German labels are defined in the shared component; all three previous/next destinations follow the approved cyclic order. Email link and copy action remain separate controls.
- Findings: no actionable P0/P1/P2 mismatch in the inspected light-theme desktop and mobile states. Dark visual state was not separately captured.

final result: passed

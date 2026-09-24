# About Page Design

## Goal

Create a dedicated `/about` page that presents Aziz Baratov's background, work history, design process, learning credential, and contact details. The page should follow the spacious editorial structure of the approved About-page reference while remaining fully integrated with the portfolio's existing typography, navigation, themes, language switcher, and interaction patterns.

## Scope

The page includes five sections:

1. Introductory career statement, biography, and a large image placeholder.
2. Work Experience with four roles.
3. Process with five stages: Explore, Choose, Craft, Measure, and Evolve.
4. Resources with one external credential card.
5. Final contact CTA using the portfolio's existing email and copy interaction.

The following reference sections are explicitly excluded:

- Designer, Illustrator and Photographer
- Who I've designed for
- Word on the street
- Mentions
- Colleague testimonial

The existing About content on the home page remains unchanged. The header's About item opens the new `/about` route.

## Visual Structure

The page should closely follow the composition of the approved About-page reference: generous vertical spacing, large editorial typography, clear section dividers, and a single-column narrative that expands into structured grids where appropriate.

The intro begins with a large statement based on confirmed facts: more than nine years of experience, more than 70 products, B2B/B2C/C2B/C2C work, e-commerce and enterprise systems, team leadership, and advanced AI workflows. Supporting biography copy expands those themes without inventing employers, achievements, metrics, or personal details.

A large neutral image placeholder accompanies the intro. Its surface is `#f2f2f2` in the light theme and `#262626` in the dark theme. It can later be replaced by a portrait without restructuring the section.

On mobile, every section collapses into one column while preserving the reading order and generous spacing.

## Work Experience

The section presents the following roles in reverse chronological order:

1. Senior Product Designer at Kaspi.kz — Mar 2024 - Present · Full-time · On-site
2. Design Team Lead at Adata.kz — July 2022 – February 2024 · 1 yr 8 mos · Full-time · On-site
3. Product Designer at APPLECityCorps — January 2019 – July 2022 · 3 yrs 7 mos · Full-time · On-site
4. UX/UI Designer at THOUSAND IT GROUP — June 2017 – January 2019 · 1 yr 8 mos · Full-time · On-site

Each entry contains the role, company, date and employment metadata, plus a short neutral description of responsibilities. The descriptions must avoid unconfirmed performance claims or invented numerical outcomes.

## Process

The Process section contains five sequential stages inspired by the reference structure but written specifically for this portfolio:

- **Explore:** understand users, business goals, constraints, data, and the existing product context.
- **Choose:** identify the most valuable problem and define a focused direction.
- **Craft:** turn the direction into flows, prototypes, interfaces, and scalable design decisions, using AI workflows where they improve speed or quality.
- **Measure:** validate usability and product impact through feedback, experiments, and relevant metrics.
- **Evolve:** iterate on evidence, systematize successful patterns, and improve the product over time.

The stages should read as one coherent workflow and adapt to a single-column sequence on narrow screens.

## Resources

Resources contains one large clickable card:

- Title: `Data-driven Product Management Simulator`
- Subtitle: `GoPractice, Inc`
- Badge: `Credential ID xhx9ggfs`
- URL: `https://gopractice.ru/course/pm/certificate/xhx9ggfs`

The entire card opens the credential in a new browser tab. It uses `target="_blank"` with `rel="noopener noreferrer"`, provides a visible keyboard focus state, and does not use the generic Coming Soon badge component.

## Contact CTA

The page ends with the existing `Ready to do great work` contact pattern. It displays `baratov.aziz.h@gmail.com` and reuses the current Copy button behavior, icon transition, and theme styling from the home page.

## Localization

All page copy is available in English and German and responds to the existing global language preference. Company names, `GoPractice, Inc`, the credential title, and `Credential ID xhx9ggfs` remain unchanged. Role titles, section headings, biography, process descriptions, employment metadata, and CTA copy are translated.

## Shared Behavior and Components

- Reuse the existing `SiteHeader` and global preference state.
- Reuse existing text reveal behavior where it supports the reference composition.
- Reuse or extract the existing email copy control instead of creating a visually inconsistent duplicate.
- Keep theme and language behavior consistent with the rest of the portfolio.
- The About navigation item resolves to `/about` from every route.

## Accessibility

- Preserve semantic heading order.
- Use a real link for the external credential card.
- Ensure keyboard-visible focus states for the credential card and Copy button.
- Provide meaningful accessible text for interactive controls.
- Keep contrast readable in both themes.
- Respect existing reduced-motion behavior.

## Verification

After implementation, verify the page in the browser at desktop and mobile widths in:

- English, light theme
- English, dark theme
- German, light theme
- German, dark theme

Also verify header navigation, the external credential link, the Copy interaction, responsive stacking, and that no excluded sections appear. Automated tests, lint, and production builds require separate user authorization.

# For Agents profile — design

## Intent

Give AI agents a concise, reliable way to understand Aziz Baratov's background without parsing the visual portfolio. Keep the normal portfolio unchanged for human visitors. The agent-facing content must include competencies, experience, published outcomes, projects, contacts, CV, and the GoPractice certificate. Do not introduce claims or metrics not already published in the portfolio.

## Entry and navigation

- Show a fixed, compact `For agents` switch in the bottom-left corner on every public page.
- Activating it opens `/for-agents` in the same tab.
- On `/for-agents`, the same control returns to the regular portfolio. Preserve the prior page when practical; otherwise return to `/`.
- Keep the control keyboard accessible, labelled in the active language, and clear in both themes. It must not obscure core content on mobile.

## Agent-facing page

- Present a narrow, readable document column inspired by a Markdown file or skill document, with restrained syntax accents and monospaced typography.
- Sections in order: identity and summary; navigation/resources; competencies; selected outcomes; experience; projects; certificate; contact.
- The summary is brief. Experience lists the four published roles and dates. Projects list the three existing project pages and their current public statuses. Outcomes use only existing portfolio claims, with links to relevant public pages when possible.
- The certificate section includes `Data-driven Product Management Simulator`, `GoPractice, Inc`, `Credential ID xhx9ggfs`, and the existing verification URL.
- The page follows the existing English/German language preference and light/dark theme. Content is not machine-translated on demand: use the site's published bilingual text or reviewed translations.

## Plain Markdown

- Provide directly addressable English and German `.md` resources. Their text mirrors the page's facts, headings, links, and status labels, without visual UI markup.
- Expose a discoverable link from the agent-facing page to its matching `.md` resource. Agents can fetch it without JavaScript or a session.
- Generate both HTML and Markdown from one small structured profile model that draws from or reuses existing portfolio content, so metrics, dates, project titles, certificate data, and contact links do not diverge.
- Keep Markdown endpoints static and publicly readable; no API key, cookie, or personalisation is required.

## Content integrity

- No invented results. Candidate published outcomes include Adata session duration from 2:16 to 8:19 (+266%), page depth from 1.42 to 2.41, fivefold design delivery speed, and a 20% reduction in customer-service response time at APPLECityCorps.
- Clearly distinguish personal outcomes from company-level context. For example, Kaspi.kz's monthly active users and THOUSAND IT GROUP's app downloads must not be phrased as Aziz's individual achievements.
- `Kaspi courier` remains marked as in development. Do not imply that any placeholder case study is a completed result.
- Contact and CV links reuse the existing published destinations.

## Verification

- Test both languages and themes, desktop and mobile placement, keyboard access, switch round-trip, and direct `.md` URLs.
- Check that HTML and Markdown show the same core facts and that all links resolve.
- Run focused tests and a production build where the existing repository baseline permits; report unrelated pre-existing failures separately.

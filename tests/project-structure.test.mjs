import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function collectTextFiles(directory, files = []) {
  const ignored = new Set([".git", ".lighthouseci", ".next", ".next-build", ".next-turbo", "node_modules", "playwright-report", "test-results"]);
  const textExtensions = new Set([".css", ".cjs", ".js", ".json", ".md", ".mjs", ".ts", ".tsx", ".yaml", ".yml"]);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    assert.doesNotMatch(entry.name.toLowerCase(), new RegExp(["pe", "go"].join("")));
    if (entry.isDirectory()) await collectTextFiles(url, files);
    else if (textExtensions.has(entry.name.slice(entry.name.lastIndexOf(".")))) files.push(url);
  }
  return files;
}

test("removes legacy reference naming from source and documentation", async () => {
  const forbidden = new RegExp(["pe", "go"].join(""), "i");
  const files = await collectTextFiles(root);
  for (const file of files) assert.doesNotMatch(await readFile(file, "utf8"), forbidden, file.pathname);
});

test("keeps the portfolio routes and structured content", async () => {
  await Promise.all([
    access(new URL("app/page.tsx", root)),
    access(new URL("app/projects/kaspi-home/page.tsx", root)),
    access(new URL("app/projects/car-parts/page.tsx", root)),
    access(new URL("app/projects/car-parts/car-parts-case.tsx", root)),
    access(new URL("content/projects.ts", root)),
    access(new URL("content/experience.ts", root)),
    access(new URL("content/social-links.ts", root)),
  ]);
});

test("links the Kaspi.kz Home card to its case study", async () => {
  const projects = await readFile(new URL("content/projects.ts", root), "utf8");
  assert.match(projects, /title:\s*"Kaspi\.kz home page rework"/);
  assert.match(projects, /titleDe:\s*"Überarbeitung der Kaspi\.kz-Startseite"/);
  assert.match(projects, /href:\s*"\/projects\/kaspi-home"/);
  assert.equal((projects.match(/status:\s*"online"/g) ?? []).length, 2);
  assert.equal((projects.match(/status:\s*"in-production"/g) ?? []).length, 1);
});

test("shows localized project status badges and disables coming-soon links", async () => {
  const portfolio = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  const badge = await readFile(new URL("app/_components/project-status-badge.tsx", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(badge, /online: \{ en: "Released", de: "Veröffentlicht" \}/);
  assert.match(badge, /offline: \{ en: "Offline", de: "Offline" \}/);
  assert.match(badge, /"coming-soon": \{ en: "Coming soon", de: "Demnächst" \}/);
  assert.match(badge, /"in-production": \{ en: "In development", de: "In Entwicklung" \}/);
  assert.match(portfolio, /project\.status === "coming-soon"/);
  assert.match(portfolio, /project-status-dot/);
  assert.match(styles, /\.project-status-online/);
  assert.match(styles, /\.project-status-offline/);
  assert.match(styles, /\.project-status-coming-soon/);
  assert.match(styles, /@keyframes project-status-pulse/);
});

test("renders the localized open-to-work copy as a green status badge", async () => {
  const portfolio = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(portfolio, /open: "Open to Work"/);
  assert.match(portfolio, /open: "Offen für neue Aufgaben"/);
  assert.match(portfolio, /availability-badge project-status-online/);
  assert.match(portfolio, /\{employmentDuration && \(/);
  assert.match(portfolio, /employmentText\.length \* 10 \+ 150/);
  assert.match(portfolio, /className="project-status-dot"/);
  assert.match(portfolio, /<span>\{copy\.open\}<\/span>/);
  assert.doesNotMatch(portfolio, /<span><RevealCharacters offset=\{employmentText\.length\}>\{copy\.open\}<\/RevealCharacters><\/span>/);
  assert.match(styles, /\.availability-badge\{[^}]*background:rgba\(39,174,96,\.14\)/);
  assert.match(styles, /\.availability-badge\{[^}]*white-space:nowrap/);
  assert.match(styles, /\.availability-badge\{[^}]*font-weight:500/);
  assert.match(styles, /\.hero p \.availability-badge\{font-weight:500\}/);
  assert.match(styles, /\.hero-counter\{display:inline-block;width:31ch;white-space:nowrap\}/);
  assert.match(styles, /@media\(max-width:809px\)\{\.hero-counter\{display:block;width:100%;white-space:normal\}\}/);
  assert.match(styles, /@keyframes availability-badge-reveal/);
});

test("places the online badge beside both case-study eyebrows", async () => {
  const kaspi = await readFile(new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root), "utf8");
  const carParts = await readFile(new URL("app/projects/car-parts/car-parts-case.tsx", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  for (const caseStudy of [kaspi, carParts]) {
    assert.match(caseStudy, /case-eyebrow-row/);
    assert.match(caseStudy, /ProjectStatusBadge status="online" language=\{language\} className="case-eyebrow-badge"/);
  }
  assert.match(styles, /\.case-eyebrow-badge\{[^}]*background:#f2f2f2/);
  assert.match(styles, /\[data-theme="dark"\] \.case-eyebrow-badge\{background:#262626\}/);
});

test("uses the Kaspi video on the home card and first case-study media", async () => {
  const projects = await readFile(new URL("content/projects.ts", root), "utf8");
  const caseStudy = await readFile(new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root), "utf8");

  await access(new URL("public/images/projects/kaspi-home/home-page.mp4", root));
  await access(new URL("public/images/projects/kaspi-home/home-page-dark.mp4", root));
  assert.match(projects, /image:\s*"\/images\/projects\/kaspi-home\/home-page\.mp4"/);
  assert.match(projects, /darkImage:\s*"\/images\/projects\/kaspi-home\/home-page-dark\.mp4"/);
  assert.match(caseStudy, /theme === "dark"/);
  assert.match(caseStudy, /\/images\/projects\/kaspi-home\/home-page-dark\.mp4/);
  assert.match(caseStudy, /\/images\/projects\/kaspi-home\/home-page\.mp4/);
  assert.match(caseStudy, /import \{ ViewportVideo \}/);
  assert.match(caseStudy, /<ViewportVideo/);
  assert.match(caseStudy, /className="case-media-hero case-project-image"/);
  assert.doesNotMatch(caseStudy, /<video/);
  assert.match(caseStudy, /before: "Vorher"/);
  assert.match(caseStudy, /after: "Nachher"/);
  assert.match(caseStudy, /<h4>\{copy\.before\}<\/h4>/);
  assert.match(caseStudy, /<h4>\{copy\.after\}<\/h4>/);
});

test("replaces the second Kaspi case placeholder with a localized ecosystem map", async () => {
  const caseStudy = await readFile(new URL("app/projects/kaspi-home/kaspi-home-case.tsx", root), "utf8");
  const map = await readFile(new URL("app/projects/kaspi-home/_components/kaspi-ecosystem-map.tsx", root), "utf8");

  await Promise.all([
    access(new URL("public/images/projects/kaspi-home/ecosystem/home-page.svg", root)),
    access(new URL("public/images/projects/kaspi-home/ecosystem/main.svg", root)),
    access(new URL("public/images/projects/kaspi-home/ecosystem/ecommerce.svg", root)),
    access(new URL("public/images/projects/kaspi-home/ecosystem/travel.svg", root)),
    access(new URL("public/images/projects/kaspi-home/ecosystem/grocery-delivery.svg", root)),
    access(new URL("public/images/projects/kaspi-home/ecosystem/government-services.svg", root)),
    access(new URL("public/images/projects/kaspi-home/ecosystem/fintech.svg", root)),
  ]);

  assert.match(caseStudy, /<KaspiEcosystemMap\s+language=\{language\}\s*\/>/);
  assert.match(map, /Home page/);
  assert.match(map, /Startseite/);
  assert.match(map, /Grocery delivery/);
  assert.match(map, /Lebensmittellieferung/);
  assert.match(map, /#0089D0/);
  assert.match(map, /#A3DB5A/);
  assert.match(map, /#F50F64/);
  assert.match(map, /#00ABC2/);
  assert.match(map, /#D5AE6C/);
  assert.match(map, /kaspi-map-line-trunk/);
  assert.match(map, /kaspi-map-line-branches/);
  assert.match(map, /kaspi-map-home/);
  assert.match(map, /kaspi-map-services/);
  assert.match(map, /Q604 82 625 82/);
  assert.match(map, /L650 82/);
  assert.match(map, /L44 207 Q36 213 36 225 L36 232/);
  assert.match(map, /M180 87 L180 232/);
  assert.match(map, /L316 207 Q324 213 324 225 L324 232/);
  assert.match(map, /home\/ecosystem\/main\.svg/);
  assert.match(map, /trunk="M245 280 L371 280"/);
  assert.match(map, /C392 280 399 275 411 269 L610 189 C616 187 620 181 632 181/);
  assert.match(map, /C392 280 399 285 411 291 L610 371 C616 373 620 379 632 379/);
});

test("uses organized local asset paths", async () => {
  const projects = await readFile(new URL("content/projects.ts", root), "utf8");
  const socialFolder = await readFile(new URL("app/_components/social-folder.tsx", root), "utf8");
  assert.match(projects, /\/images\/projects\/kaspi-home\/home-page\.mp4/);
  assert.match(socialFolder, /\/images\/social\/cards\//);
  assert.match(socialFolder, /\/icons\/folder-front\.svg/);
});

test("keeps the Kaspi map typography compact and consistent", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(styles, /\.kaspi-map-home span\{font-size:12px;font-weight:400\}/);
  assert.match(styles, /\.kaspi-map-item span\{font-size:12px;font-weight:400/);
  assert.match(styles, /\.kaspi-map-home img\{width:29px;height:29px\}/);
  assert.match(styles, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
});

test("links the Car Parts card to its case study", async () => {
  const projects = await readFile(new URL("content/projects.ts", root), "utf8");
  const portfolio = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  assert.match(projects, /title:\s*"Car Parts"[\s\S]*?href:\s*"\/projects\/car-parts"/);
  assert.match(projects, /image:\s*"\/images\/projects\/car-parts\/car-parts-light\.webm"/);
  assert.match(projects, /darkImage:\s*"\/images\/projects\/car-parts\/car-parts-dark\.webm"/);
  assert.match(portfolio, /mediaSource\?\.endsWith\("\.webm"\)/);
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

  await access(new URL("public/images/projects/car-parts/car-parts-light.webm", root));
  await access(new URL("public/images/projects/car-parts/car-parts-dark.webm", root));
  await access(new URL("public/images/projects/car-parts/car-parts-stack-light.jpg", root));
  await access(new URL("public/images/projects/car-parts/car-parts-stack-dark.jpg", root));

  assert.match(caseStudy, /Making compatible auto parts easier to find through vehicle-based selection/);
  assert.match(caseStudy, /In practice/);
  assert.match(caseStudy, /Across the ecosystem/);
  assert.match(caseStudy, /Variations/);
  assert.match(caseStudy, /Impact/);
  assert.match(caseStudy, /Apple Landing Page/);
  assert.match(caseStudy, /\+3%/);
  assert.match(caseStudy, /\+4%/);
  assert.match(caseStudy, /\+10\.5%/);
  assert.match(caseStudy, /\+17%/);
  assert.match(caseStudy, />50%/);
  assert.match(caseStudy, /40%/);
  assert.match(caseStudy, /Overall Kaspi Store GMV growth/);
  assert.match(caseStudy, /GMV generated through the parts-selection feature/);
  assert.match(caseStudy, /overall Kaspi Store GMV increased by 3%/);
  assert.match(caseStudy, /ARPPU among customers using the feature was more than 50% higher/);
  assert.match(caseStudy, /The feature was adopted by 40% of users/);
  assert.match(caseStudy, /title: "Autoteile"/);
  assert.match(caseStudy, /staatlichen Online-Diensten/);
  assert.match(caseStudy, /Gesamtes GMV-Wachstum im Kaspi Store/);
  assert.match(caseStudy, /\+10,5%/);
  assert.match(caseStudy, /Apple Landingpage/);
  assert.match(caseStudy, /const copy = language === "de" \? caseCopyDe : caseCopyEn/);
  assert.match(caseStudy, /66,800/);
  assert.match(caseStudy, /65%/);
  assert.match(caseStudy, /95%/);
  assert.match(caseStudy, /selecting its make and model or entering its VIN/);
  assert.match(caseStudy, /integration with Government Services/);
  assert.match(caseStudy, /listed as an insured driver/);
  assert.match(caseStudy, /className="case-impact-primary"/);
  assert.doesNotMatch(caseStudy, /car-parts-impact-primary/);
  assert.doesNotMatch(caseStudy, /This removed manual VIN entry/);
  assert.doesNotMatch(caseStudy, /VIN-based search/);
  assert.match(caseStudy, /\/images\/projects\/car-parts\/car-parts-light\.webm/);
  assert.match(caseStudy, /\/images\/projects\/car-parts\/car-parts-dark\.webm/);
  assert.match(caseStudy, /\/images\/projects\/car-parts\/car-parts-stack-light\.jpg/);
  assert.match(caseStudy, /\/images\/projects\/car-parts\/car-parts-stack-dark\.jpg/);
  assert.match(caseStudy, /theme === "dark"/);
  assert.match(caseStudy, /<img\b/);
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
  const courier = await readFile(
    new URL("app/projects/kaspi-courier/kaspi-courier-case.tsx", root),
    "utf8",
  );
  const ending = await readFile(
    new URL("app/projects/_components/case-ending.tsx", root),
    "utf8",
  );

  assert.match(kaspi, /<CaseEnding current="kaspi-home"/);
  assert.match(carParts, /<CaseEnding current="car-parts"/);
  assert.match(courier, /<CaseEnding current="kaspi-courier"/);
  assert.match(ending, /"kaspi-courier", "kaspi-home", "car-parts"/);
  assert.match(ending, /className="case-previous"/);
  assert.match(ending, /className="case-next"/);
});

test("restores the home scroll only after a document reload", async () => {
  const portfolio = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");

  assert.match(portfolio, /navigationEntry\?\.type === "reload"/);
  assert.match(portfolio, /addEventListener\("beforeunload", saveForReload\)/);
  assert.doesNotMatch(portfolio, /history\.scrollRestoration = "manual"/);
  assert.doesNotMatch(portfolio, /addEventListener\("scroll", savePosition/);
});

test("uses the Car Parts placeholder background without changing content cards", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(styles, /\[data-theme="light"\] \.car-parts-case \.case-placeholder\{background:#f2f2f2\}/);
  assert.match(styles, /\.car-parts-bento-placeholder\{background:#f2f2f2\}/);
  assert.match(styles, /\[data-theme="dark"\] \.case-placeholder\{background:#262626\}/);
});

test("shares the email copy control between portfolio pages", async () => {
  const copyButton = await readFile(new URL("app/_components/copy-email-button.tsx", root), "utf8");
  const portfolio = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");

  assert.match(copyButton, /export const portfolioEmailAddress = "baratov\.aziz\.h@gmail\.com"/);
  assert.match(copyButton, /export function CopyEmailButton/);
  assert.match(copyButton, /navigator\.clipboard\.writeText\(portfolioEmailAddress\)/);
  assert.match(copyButton, /idle: "Copy"/);
  assert.match(copyButton, /aria-live="polite"/);
  assert.match(copyButton, /setTimeout\(\(\) => setStatus\("idle"\), 2000\)/);
  assert.match(portfolio, /import \{ CopyEmailButton, portfolioEmailAddress \} from "\.\/copy-email-button"/);
  assert.doesNotMatch(portfolio, /const emailAddress =/);
  assert.doesNotMatch(portfolio, /function CopyEmailButton/);
});

test("shows localized competencies instead of company roles in Where I thrive", async () => {
  const portfolio = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  const competencies = await readFile(new URL("content/competencies.ts", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(portfolio, /import \{ featuredCompetencies \} from "\.\.\/\.\.\/content\/competencies"/);
  assert.match(portfolio, /featuredCompetencies\[language\]\.map/);
  assert.doesNotMatch(portfolio, /featuredExperience|germanRoles|germanPeriods/);
  assert.doesNotMatch(portfolio, /className="experience-logo"/);
  assert.doesNotMatch(portfolio, /team leadership and|Teamführung und/);
  assert.match(styles, /\.statement\{margin-bottom:48px/);
  for (const title of ["Product & Systems Design", "AI Tooling & Innovation", "Research & Analytics", "Leadership & Ops", "Produkt- & Systemdesign", "KI-Tools & Innovation", "Forschung & Analyse", "Führung & Prozesse"]) {
    assert.match(competencies, new RegExp(title.replace(/[&]/g, "\\&")));
  }
});

test("defines localized About content from confirmed portfolio facts", async () => {
  const about = await readFile(new URL("content/about.ts", root), "utf8");

  assert.match(about, /export type AboutExperience/);
  assert.match(about, /export type AboutProcessStep/);
  assert.match(about, /export const aboutContent/);
  assert.equal((about.match(/company: "(?:Kaspi\.kz|Adata\.kz|APPLECityCorps|THOUSAND IT GROUP)"/g) ?? []).length, 8);
  assert.equal((about.match(/\{ key: "(?:explore|choose|craft|measure|evolve)"/g) ?? []).length, 10);
  assert.match(about, /9\+/);
  assert.match(about, /70\+/);
  const { aboutContent } = await import("../content/about.ts");
  assert.doesNotMatch(aboutContent.en.biography.join(" "), /team leadership/i);
  assert.doesNotMatch(aboutContent.de.biography.join(" "), /Teamführung/i);
  for (const company of ["Kaspi.kz", "Adata.kz", "APPLECityCorps", "THOUSAND IT GROUP"]) {
    assert.match(about, new RegExp(company.replace(".", "\\.")));
  }
  assert.match(about, /workExperience: "Work Experience"/);
  assert.match(about, /workExperience: "Berufserfahrung"/);
  assert.equal((about.match(/Data-driven Product Management Simulator/g) ?? []).length, 1);
  assert.equal((about.match(/GoPractice, Inc/g) ?? []).length, 1);
  assert.equal((about.match(/Credential ID xhx9ggfs/g) ?? []).length, 1);
  assert.equal((about.match(/https:\/\/gopractice\.ru\/course\/pm\/certificate\/xhx9ggfs/g) ?? []).length, 1);
  assert.doesNotMatch(about, /Designer, Illustrator and Photographer|Who I've designed for|Word on the street|Mentions|colleague testimonial/i);
});

test("builds the localized About route with semantic sections", async () => {
  const route = await readFile(new URL("app/about/page.tsx", root), "utf8");
  const page = await readFile(new URL("app/about/about-page.tsx", root), "utf8");

  assert.match(route, /export const metadata/);
  assert.match(route, /<AboutPage \/>/);
  assert.equal((page.match(/<h1/g) ?? []).length, 1);
  assert.match(page, /copy\.workExperience/);
  assert.match(page, /copy\.process/);
  assert.match(page, /copy\.resources/);
  assert.match(page, /copy\.experience\.map/);
  assert.match(page, /copy\.processSteps\.map/);
  assert.doesNotMatch(page, /className="about-intro-media"/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noopener noreferrer"/);
  assert.match(page, /<CopyEmailButton language=\{language\} \/>/);
  assert.doesNotMatch(page, /Designer, Illustrator and Photographer|Who I've designed for|Word on the street|Mentions|colleague testimonial/i);
});

test("routes the header About item to the dedicated page", async () => {
  const header = await readFile(new URL("app/_components/site-header.tsx", root), "utf8");

  assert.match(header, /if \(hash === "projects"\) return "\/projects"/);
  assert.match(header, /if \(hash === "about"\) return "\/about"/);
  assert.match(header, /if \(hash === "inspiration"\) return "\/inspiration"/);
  assert.match(header, /return onHome \? `#\$\{hash\}` : `\/#\$\{hash\}`/);
  assert.match(header, /label: "Shots & Inspiration", hash: "inspiration"/);
  assert.match(header, /label: "Shots & Inspirationen", hash: "inspiration"/);
});

test("routes Links and opens the portfolio CV from the header", async () => {
  const header = await readFile(new URL("app/_components/site-header.tsx", root), "utf8");
  const route = await readFile(new URL("app/links/page.tsx", root), "utf8");
  const cv = await readFile(new URL("public/documents/CV_Aziz_Baratov_Product_Designer.pdf", root));

  assert.match(header, /if \(hash === "index"\) return "\/links"/);
  assert.equal((header.match(/label: "Links", hash: "index"/g) ?? []).length, 2);
  assert.doesNotMatch(header, /label: "Index", hash: "index"/);
  assert.match(route, /title: "Links — Aziz Baratov"/);
  assert.match(header, /href="\/documents\/CV_Aziz_Baratov_Product_Designer\.pdf"/);
  assert.match(header, /target="_blank"/);
  assert.match(header, /rel="noopener noreferrer"/);
  assert.ok(cv.length > 1000);
});

test("defines localized Links content and two resources", async () => {
  const content = await readFile(new URL("content/index.ts", root), "utf8");

  assert.match(content, /Resources/);
  assert.match(content, /Ressourcen/);
  assert.match(content, /Ready to do great work/);
  assert.match(content, /Bereit für großartige Arbeit/);
  assert.match(content, /title: "CV"/);
  assert.match(content, /Last update: 20\.09\.26/);
  assert.match(content, /aboutResource/);
  assert.equal((content.match(/title: "Links"/g) ?? []).length, 2);
});

test("builds the localized Links page without work experience", async () => {
  const route = await readFile(new URL("app/links/page.tsx", root), "utf8");
  const page = await readFile(new URL("app/links/index-page.tsx", root), "utf8");

  assert.match(route, /<IndexPage \/>/);
  assert.match(page, /indexResources\.cv/);
  assert.match(page, /indexResources\.certificate/);
  assert.equal((page.match(/className="about-resource-card resource-card-stacked scroll-reveal"/g) ?? []).length, 2);
  assert.equal((page.match(/className="resource-card-meta"/g) ?? []).length, 2);
  assert.match(page, /indexResources\.cv\.credential/);
  assert.match(page, /className="contact index-contact"/);
  assert.match(page, /socialLinks\.map/);
  assert.match(page, /<CopyEmailButton language=\{language\} \/>/);
  assert.doesNotMatch(page, /Work Experience|Berufserfahrung|experience\.map/);
});

test("styles Links resources responsively in both themes", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(styles, /\.index-page/);
  assert.match(styles, /\.index-resource-grid\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(styles, /\.about-resource-card\.resource-card-stacked\{[^}]*display:flex[^}]*flex-direction:column/);
  assert.match(styles, /\.resource-card-meta\{[^}]*grid-template-columns:44px minmax\(0,1fr\) 24px/);
  assert.match(styles, /\.resource-card-stacked \.about-resource-copy\{[^}]*width:100%/);
  assert.match(styles, /\.resource-card-title-line\{[^}]*display:block[^}]*white-space:nowrap/);
  assert.match(styles, /@media\(max-width:809px\)[\s\S]*?\.index-resource-grid\{grid-template-columns:1fr\}/);
});

test("uses the Links resource-card structure for the About certificate", async () => {
  const aboutPage = await readFile(new URL("app/about/about-page.tsx", root), "utf8");
  const aboutContent = await readFile(new URL("content/about.ts", root), "utf8");

  assert.match(aboutPage, /className="about-resource-card resource-card-stacked scroll-reveal"/);
  assert.match(aboutPage, /className="resource-card-meta"/);
  assert.match(aboutPage, /aboutResource\.titleLines\.map/);
  assert.match(aboutContent, /titleLines: \["Data-driven Product", "Management Simulator"\]/);
});

test("keeps the home contact heading on one natural line", async () => {
  const portfolio = await readFile(new URL("app/_components/portfolio.tsx", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(portfolio, /ready: "Ready to do great work"/);
  assert.match(portfolio, /ready: "Bereit für großartige Arbeit"/);
  assert.doesNotMatch(portfolio, /ready: <>[^<]*<br\s*\/>/);
  assert.match(styles, /\.contact\{[^}]*border-bottom:1px solid var\(--line\)/);
});

test("keeps the header CV label and download icon in one row", async () => {
  const [header, styles] = await Promise.all([
    readFile(new URL("app/_components/site-header.tsx", root), "utf8"),
    readFile(new URL("styles/site.css", root), "utf8"),
  ]);

  assert.match(styles, /\.header-controls \.cv-control\{[^}]*display:flex[^}]*align-items:center[^}]*gap:6px/);
  assert.match(header, /className={`language-pill-indicator\$\{language === "de" \? " is-de" : ""\}`}/);
  assert.equal((header.match(/aria-pressed=\{language === "en"\}/g) ?? []).length, 1);
  assert.equal((header.match(/aria-pressed=\{language === "de"\}/g) ?? []).length, 1);
  assert.match(header, /<HeaderControls className="header-controls-mobile"/);
  assert.match(styles, /\.cv-control\{[^}]*conic-gradient/s);
  assert.match(styles, /\.cv-control\{[^}]*box-shadow:none/s);
  assert.match(styles, /\.language-pill-indicator\{[^}]*transition:transform/s);
  assert.match(styles, /\.language-pill-indicator\{[^}]*box-shadow:none/s);
  assert.match(styles, /\.language-pill-indicator\.is-de\{[^}]*translateX\(100%\)/s);
  assert.doesNotMatch(header, /className="cv-control header-control-motion"/);
  assert.match(styles, /\.cv-control:hover\{[^}]*opacity:\.82/s);
  assert.match(styles, /\.cv-control:active\{transform:scale\(\.93\)\}/);
  assert.match(styles, /@media\(hover:hover\)\{[^}]*\.header-control-motion:hover\{transform:scale\(1\.02\)\}/s);
  assert.match(styles, /\.header-control-motion:active\{transform:scale\(\.93\)\}/);
});

test("uses a static cathedral postage stamp as the header brand and a simplified stamp favicon", async () => {
  const [header, styles, favicon] = await Promise.all([
    readFile(new URL("app/_components/site-header.tsx", root), "utf8"),
    readFile(new URL("styles/site.css", root), "utf8"),
    readFile(new URL("public/favicon.svg", root), "utf8"),
  ]);

  assert.match(header, /src="\/images\/brand\/berlin-cathedral-stamp\.webp"/);
  assert.match(header, /alt="Aziz Baratov"/);
  assert.doesNotMatch(header, /logo-cooking-the-design\.svg/);
  assert.match(styles, /\.brand-logo\{[^}]*width:96px[^}]*height:48px[^}]*transform:none/s);
  assert.match(styles, /@media\(max-width:809px\)[\s\S]*?\.brand-logo\{[^}]*width:80px[^}]*height:40px/s);
  assert.doesNotMatch(styles, /\.brand-logo:hover\{[^}]*(?:transform|animation)/s);
  assert.match(favicon, /<svg[^>]*viewBox="0 0 64 64"/);
  assert.match(favicon, /prefers-color-scheme:\s*dark/);
  assert.match(favicon, /\.stamp \{ fill: #181818; \}/);
  assert.match(favicon, /\.letter \{ fill: #fff; \}/);
  assert.match(favicon, /@media \(prefers-color-scheme: dark\) \{[\s\S]*?\.stamp \{ fill: #fff; \}[\s\S]*?\.letter \{ fill: #181818; \}[\s\S]*?\}/);
  assert.match(favicon, /class="letter"[^>]*>B<\/text>/);
  assert.doesNotMatch(favicon, /<image|href=/);
  await access(new URL("public/images/brand/berlin-cathedral-stamp.webp", root));
});

test("builds the localized Shots and Inspiration coming-soon page", async () => {
  const route = await readFile(new URL("app/inspiration/page.tsx", root), "utf8");
  const page = await readFile(new URL("app/inspiration/inspiration-page.tsx", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(route, /<InspirationPage \/>/);
  assert.doesNotMatch(page, /ArrowLeft|ImagesSquare/);
  assert.match(page, /src="\/images\/inspiration\/brandenburg-stamp-web\.webp"/);
  assert.match(page, /className="inspiration-stamp inspiration-stamp-front"/);
  assert.match(page, /className="inspiration-stamp inspiration-stamp-back"/);
  assert.match(page, /src="\/images\/inspiration\/stamp-back-web\.webp"/);
  await access(new URL("public/images/inspiration/stamp-back-web.webp", root));
  assert.match(page, /Shots & Inspiration is coming soon/);
  assert.match(page, /Shots & Inspiration kommt bald/);
  assert.match(page, /A sketchbook of visual experiments, references, and moments I’ve caught through the lens\./);
  assert.match(page, /Ein Skizzenbuch mit visuellen Experimenten, Referenzen und Momenten, die ich mit der Kamera eingefangen habe\./);
  assert.match(page, /href="\/"/);
  assert.doesNotMatch(page, /<ArrowLeft/);
  assert.match(styles, /\.inspiration-page/);
  assert.match(styles, /\.inspiration-stamp/);
  assert.match(styles, /\.inspiration-home-button:hover/);
  assert.match(styles, /\.inspiration-home-button:hover\{background:#303030\}/);
  assert.doesNotMatch(styles, /\.inspiration-home-button:hover\{[^}]*transform:/);
  assert.match(styles, /\[data-theme="dark"\] \.inspiration-page/);
});

test("styles the About page for responsive light and dark themes", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(styles, /\.about-page/);
  assert.match(styles, /\.about-intro-copy\{[^}]*grid-template-columns:32% 1fr/);
  assert.doesNotMatch(styles, /\.about-intro-media/);
  assert.match(styles, /\.about-resource-card:hover/);
  assert.match(styles, /\.about-resource-card:focus-visible/);
  assert.match(styles, /\[data-theme="dark"\] \.about-resource-card/);
  assert.match(styles, /@media\(max-width:809px\)[\s\S]*?\.about-intro-copy\{[^}]*grid-template-columns:1fr/);
});

test("uses consistent 64px vertical spacing across About sections", async () => {
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(styles, /\.about-intro\{[^}]*padding:64px 0/);
  assert.match(styles, /\.about-section\{[^}]*padding:64px 0/);
  assert.match(styles, /\.about-contact\{[^}]*padding:64px 0/);
  assert.match(styles, /@media\(max-width:809px\)[\s\S]*?\.about-intro\{padding:64px 0/);
  assert.match(styles, /\.about-intro-copy\{[^}]*margin-bottom:0/);
});

test("orders About sections as intro, process, resources, experience, contact", async () => {
  const page = await readFile(new URL("app/about/about-page.tsx", root), "utf8");
  const selectors = ["about-intro", "about-process", "about-resources", "about-experience", "about-contact"];
  const positions = selectors.map((selector) => page.indexOf(selector));

  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test("shows company logos beside the Work Experience roles on About", async () => {
  const content = await readFile(new URL("content/about.ts", root), "utf8");
  const page = await readFile(new URL("app/about/about-page.tsx", root), "utf8");

  for (const logo of ["kaspi.png", "adata.png", "apple-city.png", "thousand.png"]) {
    assert.match(content, new RegExp(`logo: "/images/experience/${logo.replace(".", "\\.")}"`));
  }
  assert.match(page, /className="[^"]*about-experience-logo[^"]*"/);
  assert.match(page, /src=\{job\.logo\}/);
});

test("reuses the complete home contact block on About", async () => {
  const page = await readFile(new URL("app/about/about-page.tsx", root), "utf8");

  assert.match(page, /import \{ socialLinks \} from "\.\.\/\.\.\/content\/social-links"/);
  assert.match(page, /import \{ SocialFolder \} from "\.\.\/_components\/social-folder"/);
  assert.match(page, /className="contact about-contact"/);
  assert.match(page, /className="contact-copy scroll-reveal"/);
  assert.match(page, /className="social-links"/);
  assert.match(page, /socialLinks\.map/);
  assert.match(page, /<SocialFolder/);
  assert.match(page, /<CopyEmailButton language=\{language\} \/>/);
});

test("polishes About typography and interaction details", async () => {
  const page = await readFile(new URL("app/about/about-page.tsx", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(page, /src="\/icons\/gmail\.svg"/);
  assert.match(page, /className="about-desktop-break"/);
  assert.match(page, /className="about-keep-together"/);
  assert.match(page, /data-backed/);
  assert.match(styles, /\.about-resource-card:hover \.about-resource-arrow/);
  assert.match(styles, /\.about-resource-card:focus-visible \.about-resource-arrow/);
  assert.match(styles, /\.about-resource-arrow\{[^}]*transition:transform/);
});

test("refines the Process copy and certifications section", async () => {
  const content = await readFile(new URL("content/about.ts", root), "utf8");
  const styles = await readFile(new URL("styles/site.css", root), "utf8");

  assert.match(content, /resources: "Licenses & certifications"/);
  assert.match(content, /resources: "Lizenzen & Zertifikate"/);
  assert.match(content, /Validate usability and product impact through customer feedback, focused experiments, and meaningful performance metrics\./);
  assert.match(content, /Usability und Produktwirkung durch Kundenfeedback, gezielte Experimente und aussagekräftige Leistungskennzahlen validieren\./);
  assert.match(styles, /\.about-process-item:last-child p\{[^}]*max-width:calc\(50% - 28px\)/);
  assert.match(styles, /@media\(max-width:809px\)[\s\S]*?\.about-process-item:last-child p\{max-width:none\}/);
});

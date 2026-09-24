"use client";

import Link from "next/link";
import { ProjectStatusBadge } from "../../_components/project-status-badge";
import { RevealCharacters } from "../../_components/reveal-characters";
import { SiteHeader } from "../../_components/site-header";
import { useSiteClock } from "../../_components/site-clock";
import { useSitePreferences } from "../../_components/site-preferences";
import { CaseEnding } from "../_components/case-ending";

const copy = {
  en: {
    eyebrow: "Kaspi.kz, Logistic app",
    title: "Kaspi courier",
    subtitle: "A logistics experience designed to make everyday delivery work clearer and more efficient",
    intro: "This case study is currently being prepared. It will document the product context, the design process, and the decisions made while shaping the Kaspi courier experience.",
    results: "Project status",
    resultItems: [
      { value: "Active", label: "Product development" },
      { value: "Private", label: "Project materials" },
      { value: "Soon", label: "Full case study" },
    ],
    problem: "Problem",
    problemText: "The detailed problem statement and supporting context are being prepared for the complete case study.",
    goalsTitle: "Goals",
    goals: ["Clarify the core product challenge and the outcomes the team set out to achieve.", "Create a consistent and efficient experience across the courier journey."],
    roleTitle: "My role as a product designer",
    roles: ["Research and product definition", "Experience design and delivery"],
    solution: "Solution",
    solutionText: "The solution overview will explain the selected direction, the key interaction decisions, and how the experience evolved during delivery.",
    before: "Before",
    after: "After",
    practice: "In practice",
    ecosystem: "Across the ecosystem",
    variations: "Variations",
    impact: "Impact",
    impactTitle: "Work in progress",
    impactText: "Validated outcomes and product learnings will be added after the project reaches the appropriate release stage.",
    deeper: "Want to go deeper?",
    deeperText: "The complete case study is in production. Get in touch if you would like to discuss the project and my role.",
    next: "Back to projects",
    nextProject: "Selected work",
    nextClient: "Product design case studies",
    copyright: "© Designed and coded by Aziz Baratov ♥️",
    work: "What I do",
  },
  de: {
    eyebrow: "Kaspi.kz, Logistik-App",
    title: "Kaspi Kurier",
    subtitle: "Ein Logistikerlebnis, das die tägliche Lieferarbeit klarer und effizienter macht",
    intro: "Diese Fallstudie wird derzeit vorbereitet. Sie wird den Produktkontext, den Designprozess und die Entscheidungen dokumentieren, die das Erlebnis von Kaspi Kurier geprägt haben.",
    results: "Projektstatus",
    resultItems: [
      { value: "Aktiv", label: "Produktentwicklung" },
      { value: "Privat", label: "Projektmaterialien" },
      { value: "Bald", label: "Vollständige Fallstudie" },
    ],
    problem: "Problem",
    problemText: "Die detaillierte Problemstellung und der zugehörige Kontext werden für die vollständige Fallstudie vorbereitet.",
    goalsTitle: "Ziele",
    goals: ["Die zentrale Produktherausforderung und die angestrebten Ergebnisse klar definieren.", "Ein konsistentes und effizientes Erlebnis entlang der gesamten Kurier-Journey schaffen."],
    roleTitle: "Meine Rolle als Product Designer",
    roles: ["Research und Produktdefinition", "Experience Design und Umsetzung"],
    solution: "Lösung",
    solutionText: "Die Lösungsübersicht wird die gewählte Richtung, zentrale Interaktionsentscheidungen und die Entwicklung des Erlebnisses während der Umsetzung erklären.",
    before: "Vorher",
    after: "Nachher",
    practice: "In der Praxis",
    ecosystem: "Im gesamten Ökosystem",
    variations: "Variationen",
    impact: "Wirkung",
    impactTitle: "In Arbeit",
    impactText: "Validierte Ergebnisse und Produkterkenntnisse werden ergänzt, sobald das Projekt die entsprechende Veröffentlichungsphase erreicht.",
    deeper: "Mehr erfahren?",
    deeperText: "Die vollständige Fallstudie befindet sich in Arbeit. Melden Sie sich gerne, wenn Sie das Projekt und meine Rolle besprechen möchten.",
    next: "Zurück zu den Projekten",
    nextProject: "Ausgewählte Arbeiten",
    nextClient: "Product-Design-Fallstudien",
    copyright: "© Entworfen und programmiert von Aziz Baratov ♥️",
    work: "Meine Arbeit",
  },
} as const;

function Placeholder({ className = "", label }: { className?: string; label: string }) {
  return <div className={`case-placeholder scroll-reveal ${className}`.trim()} aria-label={label} />;
}

export function KaspiCourierCase() {
  const now = useSiteClock();
  const { language, theme, languageHasChanged } = useSitePreferences();
  const text = copy[language];
  const time = now
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin" }).format(now)
    : "";

  return (
    <main className="case-page kaspi-courier-case">
      <SiteHeader />

      <div className="case-layout">
        <aside className={`case-intro${languageHasChanged ? " hero-language-static" : ""}`}>
          <div className="case-eyebrow-row">
            <p className="case-eyebrow"><RevealCharacters>{text.eyebrow}</RevealCharacters></p>
            <ProjectStatusBadge status="in-production" language={language} className="case-eyebrow-badge" />
          </div>
          <h1><RevealCharacters>{text.title}</RevealCharacters></h1>
          <h2><RevealCharacters>{text.subtitle}</RevealCharacters></h2>
          <div className="case-intro-copy case-intro-reveal"><p>{text.intro}</p></div>
          <div className="case-results case-intro-reveal case-intro-results" aria-label={text.results}>
            {text.resultItems.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>
        </aside>

        <article className="case-content">
          <Placeholder className="case-media-hero" label="Kaspi courier hero placeholder" />
          <Placeholder className="case-media-wide" label="Kaspi courier project overview placeholder" />

          <section className="case-text-section scroll-reveal">
            <h3>{text.problem}</h3>
            <div><p>{text.problemText}</p></div>
          </section>

          <Placeholder className="case-media-wide case-media-tall" label="Kaspi courier problem placeholder" />

          <section className="case-project-infographic case-media-wide" aria-label={`${text.goalsTitle} and ${text.roleTitle}`}>
            <article><h4>{text.goalsTitle}</h4><ul>{text.goals.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h4>{text.roleTitle}</h4><ul>{text.roles.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </section>

          <section className="case-text-section scroll-reveal">
            <h3>{text.solution}</h3>
            <div><p>{text.solutionText}</p></div>
          </section>

          <div className="case-media-pair">
            <article className="case-solution-bento scroll-reveal"><h4>{text.before}</h4></article>
            <article className="case-solution-bento scroll-reveal"><h4>{text.after}</h4></article>
          </div>
        </article>
      </div>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.practice}</h3>
        <div className="case-gallery-grid">{Array.from({ length: 4 }, (_, index) => <Placeholder key={index} label={`Kaspi courier practice placeholder ${index + 1}`} />)}</div>
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.ecosystem}</h3>
        <Placeholder className="case-media-panorama" label="Kaspi courier ecosystem placeholder" />
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{text.variations}</h3>
        <div className="case-variation-grid">{Array.from({ length: 3 }, (_, index) => <Placeholder key={index} label={`Kaspi courier variation placeholder ${index + 1}`} />)}</div>
        <Placeholder className="case-media-wide case-variation-wide" label="Kaspi courier wide variation placeholder" />
      </section>

      <section className="case-text-section case-impact scroll-reveal">
        <h3>{text.impact}</h3>
        <div className="case-impact-content">
          <div className="case-impact-story"><section><h4>{text.impactTitle}</h4><p>{text.impactText}</p></section></div>
          <Placeholder className="case-media-wide kaspi-courier-impact-placeholder" label="Kaspi courier impact placeholder" />
        </div>
      </section>

      <CaseEnding current="kaspi-courier" language={language} theme={theme} title={text.deeper} description={text.deeperText} />

      <footer id="index" className="scroll-reveal"><p>{text.copyright}</p><p>{time}, Berlin, DE</p><Link href="/#projects">{text.work}</Link></footer>
    </main>
  );
}

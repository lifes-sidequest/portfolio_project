"use client";

import Link from "next/link";
import { RevealCharacters } from "../../_components/reveal-characters";
import { ProjectStatusBadge } from "../../_components/project-status-badge";
import { SiteHeader } from "../../_components/site-header";
import { useSiteClock } from "../../_components/site-clock";
import { ViewportVideo } from "../../_components/viewport-video";
import { ViewportImage } from "../../_components/viewport-image";
import { CaseEnding } from "../_components/case-ending";
import { KaspiEcosystemMap } from "./_components/kaspi-ecosystem-map";
import { useSitePreferences } from "../../_components/site-preferences";

const caseCopy = {
  en: {
    title: "Kaspi.kz home page rework",
    subtitle: "Redesigning the main page of the largest fintech ecosystem in Kazakhstan",
    intro1: "Kaspi.kz is Kazakhstan’s #1 Super App, serving more than 14 million monthly active users.", intro2: "In 2020, the company went public on the London Stock Exchange and AIX, followed by a Nasdaq listing in 2024. Through continuous innovation, Kaspi.kz has become a driving force behind Kazakhstan’s digital transformation—building a success story now examined in a Harvard Business School case study.",
    results: "Results after release", metric1: "Overall homepage GMV growth", metric2: "Conversion from recommendation views", metric3: "Users initiating contact",
    problem: "Problem", problem1: "As the business expanded, investment in product development and marketing needed to grow with it. To support this growth, the company set a clear objective: increase product revenue.", problem2: "Through user research and interviews, I identified a recurring challenge across the ecosystem. To complete a purchase in Kaspi Store or Kaspi Travel, users had to navigate through multiple screens, creating friction that often led to drop-offs or switching to alternative services. Although products and travel offers could be accessed directly from the homepage, these entry points frequently appeared outside the initial viewport and went unnoticed. The opportunity was to optimize the homepage hierarchy, make purchase paths more visible, and give users faster access to key actions—ultimately increasing engagement, repeat visits, and GMV generated from the homepage.",
    goalsTitle: "Goals",
    goals: [
      "Create a convenient path to product discovery and purchase without disrupting the familiar homepage experience.",
      "Drive sustainable growth by increasing product revenue, engagement, and retention through more visible product entry points.",
    ],
    roleTitle: "My role as a product designer",
    roleItems: [
      { title: "Discovery", text: "Defined the problem and business objectives, aligned success metrics, formulated hypotheses, analyzed comparable solutions, and collaborated with the team on the experiment framework." },
      { title: "Delivery and validation", text: "Translated hypotheses into user flows, mockups, and prototypes; supported subsequent user validation; analyzed experiment results; refined the final designs for development; and conducted design reviews after implementation." },
    ],
    solution: "Solution",
    solutionIntro: "Based on the research findings, we introduced a series of focused improvements:",
    solutionItems: [
      "Added a Cart button next to the search bar, reducing the path to the cart from two taps to one.",
      "Optimized the top section of the homepage to create more space for relevant content above the fold.",
      "Refined the services menu by removing Kaspi QR, which was already accessible from the tab bar, and adding Magnum.",
      "Reduced the height of online offers so more content could remain visible within the initial viewport.",
      "Replaced the single advertising banner with a carousel, creating more opportunities for discovery and contributing to GMV growth from the homepage.",
      "Added recommendation tabs for Store, Magnum, and Hot Tours, making relevant offers easier to discover and further increasing homepage-driven GMV.",
    ],
    before: "Before", after: "After", practice: "In practice", ecosystem: "Across the ecosystem", variations: "Variations", impact: "Impact",
    impactSections: [
      {
        title: "Initial analysis",
        paragraphs: [
          "Our primary objective was to quickly validate whether the redesigned homepage could generate additional revenue. To accelerate learning, we launched the first version as a controlled A/B test in production without conducting preliminary UX research.",
          "Over the following month, we monitored product metrics in Amplitude and continuously collected user feedback. The first version generated 1.2 billion KZT in monthly homepage GMV, while also revealing two important opportunities: users frequently requested a Recently Viewed Products section, and engagement with the recommendation tabs remained low.",
        ],
      },
      {
        title: "Iteration and results",
        paragraphs: [
          "Working closely with the analytics team, we used these findings to shape the next iteration. We introduced a Recently Viewed Products section and increased the visibility of the recommendation tabs before relaunching the A/B test.",
          "One month later, homepage GMV had grown from 1.2 to 1.5 billion KZT per month—a 25% increase between iterations. The Recently Viewed Products section was used by 78% of the test group, related user requests disappeared, recommendation tab switching tripled, and homepage NPS increased by 5 points, from 83 to 88.",
        ],
      },
      {
        title: "Key takeaways",
        paragraphs: [
          "Two elements had the strongest overall impact: the Recommended Products section and the new Cart entry point. One in five users across total app traffic opened the cart from the homepage, while one in four engaged users interacted with product recommendations.",
          "Recently viewed products also became an important entry point for product discovery, helping users return directly to relevant product pages. Within the recommendation section, discounted products generated the strongest interest—the discount tab received almost twice as many clicks as the other tabs. Across both iterations, monthly homepage GMV grew from approximately 1.05 billion to 1.5 billion KZT—an overall increase of 43.3%, or around 453 million KZT per month. Together, these changes showed how focused improvements to navigation and product discovery could increase both engagement and commercial performance.",
        ],
      },
    ],
    impactPrimaryMetric: { value: "+43.3%", label: "Overall homepage GMV growth" },
    impactMetrics: [
      { value: "+14.6%", label: "Homepage GMV uplift in the A/B test" },
      { value: "+17%", label: "Conversion from recommendation views" },
      { value: "+12%", label: "Users initiating contact" },
      { value: "+5 pts", label: "Homepage NPS" },
      { value: "+2%", label: "Time spent on the homepage" },
      { value: "+6%", label: "Recommendation views per user" },
    ],
    deeper: "Want to go deeper?", deeperText: "The full case study covers the research process, key metrics, and the decisions behind the design.", next: "Next project", car: "Car Parts", copyright: "© Designed and coded by Aziz Baratov ♥️", work: "What I do",
  },
  de: {
    title: "Überarbeitung der Kaspi.kz-Startseite",
    subtitle: "Neugestaltung der Startseite des größten Fintech-Ökosystems Kasachstans",
    intro1: "Kaspi.kz ist Kasachstans führende Super-App mit mehr als 14 Millionen monatlich aktiven Nutzerinnen und Nutzern.", intro2: "Im Jahr 2020 ging das Unternehmen an der London Stock Exchange und der AIX an die Börse, gefolgt von einer Notierung an der Nasdaq im Jahr 2024. Durch kontinuierliche Innovation ist Kaspi.kz zu einer treibenden Kraft der digitalen Transformation Kasachstans geworden—eine Erfolgsgeschichte, die heute in einer Fallstudie der Harvard Business School untersucht wird.",
    results: "Ergebnisse nach dem Launch", metric1: "Gesamtes GMV-Wachstum der Startseite", metric2: "Conversion aus angesehenen Empfehlungen", metric3: "Nutzende, die Kontakt aufnehmen",
    problem: "Problem", problem1: "Mit der Expansion des Unternehmens mussten auch die Investitionen in Produktentwicklung und Marketing wachsen. Um dieses Wachstum zu unterstützen, setzte sich das Unternehmen ein klares Ziel: den Produktumsatz zu steigern.", problem2: "Durch Nutzerforschung und Interviews identifizierte ich eine wiederkehrende Herausforderung im gesamten Ökosystem. Um einen Kauf im Kaspi Store oder bei Kaspi Travel abzuschließen, mussten Nutzerinnen und Nutzer mehrere Seiten durchlaufen. Diese Reibung führte häufig zu Abbrüchen oder zum Wechsel zu alternativen Diensten. Obwohl Produkte und Reiseangebote direkt über die Startseite erreichbar waren, lagen diese Einstiegspunkte häufig außerhalb des unmittelbar sichtbaren Bereichs und wurden übersehen. Die Chance bestand darin, die Hierarchie der Startseite zu optimieren, Kaufwege sichtbarer zu machen und einen schnelleren Zugriff auf wichtige Aktionen zu ermöglichen—mit dem Ziel, Engagement, wiederholte Besuche und den direkt über die Startseite generierten GMV zu steigern.",
    goalsTitle: "Ziele",
    goals: [
      "Einen komfortablen Weg zur Produktentdeckung und zum Kauf schaffen, ohne das vertraute Nutzungserlebnis der Startseite zu beeinträchtigen.",
      "Nachhaltiges Wachstum fördern, indem Produktumsatz, Engagement und Bindung durch besser sichtbare Produkteinstiege gesteigert werden.",
    ],
    roleTitle: "Meine Rolle als Product Designer",
    roleItems: [
      { title: "Discovery", text: "Definierte das Problem und die Geschäftsziele, stimmte Erfolgsmetriken ab, formulierte Hypothesen, analysierte vergleichbare Lösungen und entwickelte gemeinsam mit dem Team den Versuchsrahmen." },
      { title: "Umsetzung und Validierung", text: "Überführte die Hypothesen in User Flows, Mockups und Prototypen, unterstützte die anschließende Nutzervalidierung, analysierte die Versuchsergebnisse, verfeinerte die finalen Designs für die Entwicklung und führte nach der Implementierung Design Reviews durch." },
    ],
    solution: "Lösung",
    solutionIntro: "Auf Grundlage der Forschungsergebnisse führten wir eine Reihe gezielter Verbesserungen ein:",
    solutionItems: [
      "Wir fügten neben der Suchleiste eine Warenkorb-Schaltfläche hinzu und verkürzten den Weg zum Warenkorb von zwei Berührungen auf eine.",
      "Wir optimierten den oberen Bereich der Startseite, um im unmittelbar sichtbaren Bereich mehr Platz für relevante Inhalte zu schaffen.",
      "Wir überarbeiteten das Servicemenü, entfernten Kaspi QR, das bereits über die Tab-Leiste erreichbar war, und ergänzten Magnum.",
      "Wir reduzierten die Höhe der Online-Angebote, damit mehr Inhalte im unmittelbar sichtbaren Bereich Platz finden.",
      "Wir ersetzten das einzelne Werbebanner durch ein Karussell, schufen damit mehr Möglichkeiten zur Entdeckung und trugen zum GMV-Wachstum über die Startseite bei.",
      "Wir ergänzten Empfehlungs-Tabs für Store, Magnum und Hot Tours, machten relevante Angebote leichter auffindbar und steigerten den über die Startseite generierten GMV zusätzlich.",
    ],
    before: "Vorher", after: "Nachher", practice: "In der Praxis", ecosystem: "Im gesamten Ökosystem", variations: "Varianten", impact: "Wirkung",
    impactSections: [
      {
        title: "Erste Analyse",
        paragraphs: [
          "Unser primäres Ziel war es, schnell zu überprüfen, ob die neu gestaltete Startseite zusätzlichen Umsatz generieren kann. Um schneller Erkenntnisse zu gewinnen, starteten wir die erste Version ohne vorherige UX-Forschung als kontrollierten A/B-Test in der Produktionsumgebung.",
          "Im darauffolgenden Monat beobachteten wir die Produktmetriken in Amplitude und sammelten kontinuierlich Nutzerfeedback. Die erste Version generierte monatlich 1,2 Milliarden KZT GMV über die Startseite. Gleichzeitig zeigten sich zwei wichtige Potenziale: Nutzerinnen und Nutzer wünschten sich häufig einen Bereich für zuletzt angesehene Produkte, während die Empfehlungs-Tabs nur selten gewechselt wurden.",
        ],
      },
      {
        title: "Iteration und Ergebnisse",
        paragraphs: [
          "Gemeinsam mit dem Analytics-Team nutzten wir diese Erkenntnisse für die nächste Iteration. Wir ergänzten einen Bereich für zuletzt angesehene Produkte und erhöhten die Sichtbarkeit der Empfehlungs-Tabs, bevor wir den A/B-Test erneut starteten.",
          "Einen Monat später war der monatlich über die Startseite generierte GMV von 1,2 auf 1,5 Milliarden KZT gestiegen—ein Plus von 25% zwischen den Iterationen. 78% der Testgruppe nutzten den Bereich für zuletzt angesehene Produkte, entsprechende Nutzeranfragen blieben aus, die Häufigkeit der Tab-Wechsel verdreifachte sich und der NPS der Startseite stieg um 5 Punkte von 83 auf 88.",
        ],
      },
      {
        title: "Wichtigste Erkenntnisse",
        paragraphs: [
          "Zwei Elemente erzielten insgesamt die stärkste Wirkung: der Bereich für empfohlene Produkte und der neue Warenkorb-Einstieg. Jede fünfte Person im gesamten App-Traffic öffnete den Warenkorb über die Startseite, während jede vierte aktive Person mit den Produktempfehlungen interagierte.",
          "Zuletzt angesehene Produkte entwickelten sich außerdem zu einem wichtigen Einstiegspunkt für die Produktentdeckung und ermöglichten eine schnelle Rückkehr zu relevanten Produktdetailseiten. Innerhalb der Empfehlungen stießen reduzierte Produkte auf das größte Interesse: Der Rabatt-Tab wurde fast doppelt so häufig angeklickt wie die übrigen Tabs. Über beide Iterationen hinweg stieg der monatlich über die Startseite generierte GMV von rund 1,05 auf 1,5 Milliarden KZT—ein Gesamtwachstum von 43,3% beziehungsweise rund 453 Millionen KZT pro Monat. Gemeinsam zeigten diese Änderungen, wie gezielte Verbesserungen an Navigation und Produktentdeckung sowohl das Engagement als auch die kommerzielle Performance steigern können.",
        ],
      },
    ],
    impactPrimaryMetric: { value: "+43,3%", label: "Gesamtes GMV-Wachstum der Startseite" },
    impactMetrics: [
      { value: "+14,6%", label: "GMV-Uplift der Startseite im A/B-Test" },
      { value: "+17%", label: "Conversion aus angesehenen Empfehlungen" },
      { value: "+12%", label: "Nutzende, die Kontakt aufnehmen" },
      { value: "+5 Pkt.", label: "NPS der Startseite" },
      { value: "+2%", label: "Verweildauer auf der Startseite" },
      { value: "+6%", label: "Empfehlungsaufrufe pro Person" },
    ],
    deeper: "Mehr erfahren?", deeperText: "Die vollständige Fallstudie zeigt den Research-Prozess, zentrale Kennzahlen und die Entscheidungen hinter dem Design.", next: "Nächstes Projekt", car: "Autoteile", copyright: "© Entworfen und programmiert von Aziz Baratov ♥️", work: "Meine Arbeit",
  },
};

export function KaspiHomeCase() {
  const now = useSiteClock();
  const { language, theme, languageHasChanged } = useSitePreferences();
  const copy = caseCopy[language];
  const time = now ? new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin",
  }).format(now) : "";

  return (
    <main className="case-page">
      <SiteHeader />

      <div className="case-layout">
        <aside className={`case-intro${languageHasChanged ? " hero-language-static" : ""}`}>
          <div className="case-eyebrow-row">
            <p className="case-eyebrow"><RevealCharacters>Kaspi.kz, Super-App</RevealCharacters></p>
            <ProjectStatusBadge status="online" language={language} className="case-eyebrow-badge" />
          </div>
          <h1><RevealCharacters>{copy.title}</RevealCharacters></h1>
          <h2><RevealCharacters>{copy.subtitle}</RevealCharacters></h2>
          <div className="case-intro-copy case-intro-reveal">
            <p>{copy.intro1} {copy.intro2}</p>
          </div>
          <div className="case-results case-intro-reveal case-intro-results" aria-label={copy.results}>
            <div><strong>{language === "de" ? "+43,3%" : "+43.3%"}</strong><span>{copy.metric1}</span></div><div><strong>+17%</strong><span>{copy.metric2}</span></div><div><strong>+12%</strong><span>{copy.metric3}</span></div>
          </div>
        </aside>

        <article className="case-content">
          <ViewportVideo
            key={theme}
            src={theme === "dark" ? "/images/projects/kaspi-home/home-page-dark.mp4" : "/images/projects/kaspi-home/home-page.mp4"}
            aria-label="Kaspi.kz Home interface preview"
            className="case-media-hero case-project-image"
          />
          <KaspiEcosystemMap language={language} />

          <section className="case-text-section scroll-reveal">
            <h3>{copy.problem}</h3>
            <div>
              <p>{copy.problem1}</p><p>{copy.problem2}</p>
            </div>
          </section>
          <ViewportVideo
            key={`problem-${theme}`}
            src={theme === "dark" ? "/images/projects/kaspi-home/main-dark.mp4" : "/images/projects/kaspi-home/main-white.mp4"}
            aria-label="Kaspi.kz homepage navigation before the redesign"
            className="case-media-wide case-media-tall case-project-image"
          />
          <section className="case-project-infographic case-media-wide" aria-label={copy.goalsTitle}>
            <article>
              <h4>{copy.goalsTitle}</h4>
              <ul>
                {copy.goals.map((goal) => <li key={goal}>{goal}</li>)}
              </ul>
            </article>
            <article>
              <h4>{copy.roleTitle}</h4>
              <ul>
                {copy.roleItems.map((item) => (
                  <li key={item.title}><strong>{item.title}:</strong> {item.text}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="case-text-section scroll-reveal">
            <h3>{copy.solution}</h3>
            <div className="case-solution-copy">
              <p>{copy.solutionIntro}</p>
              <ul>
                {copy.solutionItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
          <div className="case-media-pair">
            <article className="case-solution-bento">
              <h4>{copy.before}</h4>
              <ViewportImage
                key={`old-bento-${theme}`}
                src={theme === "dark" ? "/images/projects/kaspi-home/old-bento-dark-web.webp" : "/images/projects/kaspi-home/old-bento-light-web.webp"}
                alt="Kaspi.kz homepage elements before the redesign"
                className="case-solution-bento-image"
              />
            </article>
            <article className="case-solution-bento">
              <h4>{copy.after}</h4>
              <ViewportImage
                key={`new-bento-${theme}`}
                src={theme === "dark" ? "/images/projects/kaspi-home/new-bento-dark-web.webp" : "/images/projects/kaspi-home/new-bento-light-web.webp"}
                alt="Kaspi.kz homepage elements after the redesign"
                className="case-solution-bento-image"
              />
            </article>
          </div>
        </article>
      </div>

      <section className="case-gallery-section scroll-reveal">
        <h3>{copy.practice}</h3>
        <div className="case-gallery-grid">
          <div className="case-placeholder case-practice-video-frame">
            <ViewportVideo
              key={`practice-${theme}`}
              src={theme === "dark" ? "/images/projects/kaspi-home/searchbar-dark.webm" : "/images/projects/kaspi-home/searchbar-light-2.webm"}
              aria-label="Kaspi.kz homepage carousel in practice"
              className="case-practice-video case-practice-video-primary"
            />
          </div>
          <ViewportVideo
            key={`practice-carousel-${theme}`}
            src={theme === "dark" ? "/images/projects/kaspi-home/carousel-dark-square.webm" : "/images/projects/kaspi-home/carousel-light-square.webm"}
            aria-label="Kaspi.kz product carousel in practice"
            className="case-placeholder case-practice-video"
          />
          <ViewportVideo
            key={`practice-magnum-${theme}`}
            src={theme === "dark" ? "/images/projects/kaspi-home/magnum-dark-1.webm" : "/images/projects/kaspi-home/magnum-light-3.webm"}
            aria-label="Kaspi.kz Magnum experience in practice"
            className="case-placeholder case-practice-video case-practice-video-cover"
          />
          <ViewportVideo
            key={`practice-all-page-${theme}`}
            src={theme === "dark" ? "/images/projects/kaspi-home/all-page-dark.webm" : "/images/projects/kaspi-home/all-page-light.webm"}
            aria-label="Kaspi.kz full homepage experience in practice"
            className="case-placeholder case-practice-video case-practice-video-cover"
          />
        </div>
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{copy.ecosystem}</h3>
        <ViewportVideo
          key={`ecosystem-${theme}`}
          src={theme === "dark" ? "/images/projects/kaspi-home/system-dark.webm" : "/images/projects/kaspi-home/system-light-2.webm"}
          aria-label="Kaspi.kz ecosystem in practice"
          className="case-placeholder case-media-panorama case-practice-video"
        />
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{copy.variations}</h3>
        <div className="case-variation-grid">
          <ViewportImage
            key={`variation-one-${theme}`}
            src={theme === "dark" ? "/images/projects/kaspi-home/variation-first-dark-web.webp" : "/images/projects/kaspi-home/variation-first-light-web.webp"}
            alt="Kaspi.kz homepage design variation"
            className="case-placeholder case-variation-image"
          />
          <ViewportImage
            key={`variation-two-${theme}`}
            src={theme === "dark" ? "/images/projects/kaspi-home/variation-second-dark-web.webp" : "/images/projects/kaspi-home/variation-second-light-web.webp"}
            alt="Kaspi.kz homepage second design variation"
            className="case-placeholder case-variation-image"
          />
          <ViewportImage
            key={`variation-three-${theme}`}
            src={theme === "dark" ? "/images/projects/kaspi-home/variation-third-dark-web.webp" : "/images/projects/kaspi-home/variation-third-light-web.webp"}
            alt="Kaspi.kz homepage third design variation"
            className="case-placeholder case-variation-image"
          />
        </div>
        <ViewportImage
          key={`variation-wide-${theme}`}
          src={theme === "dark" ? "/images/projects/kaspi-home/many-dark-web.webp" : "/images/projects/kaspi-home/many-light-web.webp"}
          alt="Collection of Kaspi.kz homepage design explorations"
          className="case-placeholder case-media-wide case-variation-wide case-variation-image"
        />
      </section>

      <section className="case-text-section case-impact scroll-reveal">
        <h3>{copy.impact}</h3>
        <div className="case-impact-content">
          <div className="case-impact-story">
            {copy.impactSections.map((section) => (
              <section key={section.title}>
                <h4>{section.title}</h4>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div>

          <div className="case-impact-primary">
            <strong>{copy.impactPrimaryMetric.value}</strong>
            <span>{copy.impactPrimaryMetric.label}</span>
          </div>

          <div className="case-impact-metrics">
            {copy.impactMetrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseEnding current="kaspi-home" language={language} theme={theme} title={copy.deeper} description={copy.deeperText} />

      <footer id="index" className="scroll-reveal">
        <p>{copy.copyright}</p>
        <p>{time}, Berlin, DE</p>
        <Link href="/#projects">{copy.work}</Link>
      </footer>
    </main>
  );
}

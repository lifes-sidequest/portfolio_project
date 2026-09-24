"use client";

import Link from "next/link";
import CardFanCarousel from "@/components/ui/card-fan-carousel";
import { RevealCharacters } from "../../_components/reveal-characters";
import { ProjectStatusBadge } from "../../_components/project-status-badge";
import { SiteHeader } from "../../_components/site-header";
import { useSiteClock } from "../../_components/site-clock";
import { useSitePreferences } from "../../_components/site-preferences";
import { ViewportVideo } from "../../_components/viewport-video";
import { ViewportImage } from "../../_components/viewport-image";
import { MediaPlaceholder } from "./_components/media-placeholder";
import { CaseEnding } from "../_components/case-ending";

const caseCopyEn = {
  eyebrow: "Kaspi.kz, E-commerce",
  title: "Car Parts",
  subtitle: "Making compatible auto parts easier to find through vehicle-based selection",
  intro: "The vehicle-based selection tool helps customers find compatible auto parts quickly and with less risk of error. Customers can add a vehicle manually by selecting its make and model or entering its VIN. Alternatively, through integration with Government Services, they can automatically add vehicles registered in their name or vehicles for which they are listed as an insured driver. Once a vehicle is added, customers see compatible products while retaining the option to reset the filter and browse the full catalog.",
  results: "Results after release",
  resultItems: [
    { value: "+3%", label: "Overall Kaspi Store GMV growth" },
    { value: "+4%", label: "Orders in the Auto Parts category" },
    { value: "+10.5%", label: "Conversion from selection entry to purchase" },
  ],
  problem: "Problem",
  problemParagraphs: [
    "Customers struggled to identify parts compatible with their vehicles. Search was limited to make and model, while essential details such as vehicle series and engine type were missing from filters and product cards. To verify compatibility, customers often had to contact sellers and share their VIN after placing an order.",
    "This interruption slowed the purchase journey and frequently resulted in cancellations and repeat orders. The cancellation rate in the Auto Parts category had reached 25%, pushing customers toward offline stores and directly affecting revenue and retention. Users needed a faster, more reliable way to choose the correct parts without depending on seller consultations.",
  ],
  goals: [
    "Make buying auto parts online faster and more convenient with a simple, reliable compatibility tool.",
    "Reduce selection errors and encourage sellers to adopt Express Delivery for faster order fulfillment.",
  ],
  roleItems: [
    {
      title: "Discovery",
      text: "Led problem framing, success-metric definition, benchmark analysis, professional interviews, and field observation to establish the product direction with the team.",
    },
    {
      title: "Design and delivery",
      text: "Created user flows, mockups, and interactive prototypes; planned and analyzed UX research; refined the final designs for development; and completed post-implementation design reviews.",
    },
  ],
  solutionIntro: "Research and validation led to four focused improvements:",
  solutionItems: [
    "Introduced vehicle-based selection, allowing customers to add a car manually by choosing its make and model or entering its VIN, then see only compatible products.",
    "Added article-number search for customers who already know the exact part they need.",
    "Integrated with Government Services so customers can automatically add vehicles registered in their name or vehicles for which they are listed as an insured driver.",
    "Aligned the Auto Parts category with the visual patterns of the main Kaspi Store while preserving the option to reset vehicle filtering and browse the full catalog.",
  ],
  impactSections: [
    {
      title: "Research and validation",
      paragraphs: [
        "Discovery combined a review of more than 20 comparable services with interviews at 10 auto repair shops and three days of field observation. The B2B research revealed how professionals use internal matching systems and collaborate with parts manufacturers, giving the team a clearer view of both customer and industry workflows.",
        "We then tested interactive prototypes with 10 customers who had bought auto parts in the previous month. Participants understood how to add a vehicle manually, use vehicles already linked to their profile, and browse compatible parts, but still wanted reassurance that suggested products would fit. They also expected eligible vehicles to appear automatically and asked for the category to retain the familiar Kaspi Store visual language.",
      ],
    },
    {
      title: "A/B test and iteration",
      paragraphs: [
        "After incorporating the research findings, we launched an A/B test across all cities in Kazakhstan. The control and test groups each included 66,800 users. We measured conversion to purchase, GMV, ARPU, ARPPU, order volume, and average order value.",
        "The validated version let customers add a vehicle manually by make and model or VIN. Through integration with Government Services, it could also automatically add vehicles registered in the customer’s name or vehicles for which they were listed as an insured driver. The category interface was aligned with the main store to make the experience more familiar and easier to trust.",
      ],
    },
    {
      title: "Results",
      paragraphs: [
        "One month after launch, overall Kaspi Store GMV increased by 3%. The parts-selection feature generated a 17% increase in GMV, while ARPPU among customers using the feature was more than 50% higher. The feature was adopted by 40% of users. Orders in the Auto Parts category grew by 4%, from 72,203 to 75,081, while conversion from selection entry to purchase improved by 10.5%.",
        "After rollout to all users, the matching catalog covered 65% of vehicles in Kazakhstan, with a long-term target of 95%. With more than five million car owners in the country, the result also demonstrated substantial room for continued catalog and product growth.",
      ],
    },
  ],
  goalsTitle: "Goals",
  roleTitle: "My role as a product designer",
  solutionTitle: "Solution",
  before: "Before",
  after: "After",
  practice: "In practice",
  ecosystem: "Across the ecosystem",
  variations: "Variations",
  impact: "Impact",
  impactPrimary: "Overall Kaspi Store GMV growth",
  deeper: "Want to go deeper?",
  deeperText: "The full case study covers the research process, design decisions, and final product outcomes.",
  next: "Next project",
  nextProject: "Apple Landing Page",
  nextProjectClient: "Concept, Technology",
};

const caseCopyDe = {
  eyebrow: "Kaspi.kz, E-Commerce",
  title: "Autoteile",
  subtitle: "Kompatible Autoteile leichter finden – mit fahrzeugbasierter Auswahl",
  intro: "Die fahrzeugbasierte Auswahl hilft Kundinnen und Kunden, schnell und mit geringerem Fehlerrisiko kompatible Autoteile zu finden. Ein Fahrzeug kann manuell durch die Auswahl von Marke und Modell oder durch die Eingabe der VIN hinzugefügt werden. Alternativ lassen sich über die Integration mit staatlichen Online-Diensten automatisch Fahrzeuge hinzufügen, die auf sie zugelassen sind oder für die sie in einer Versicherungspolice eingetragen sind. Nach dem Hinzufügen eines Fahrzeugs werden passende Produkte angezeigt. Der Filter kann jederzeit zurückgesetzt werden, um den gesamten Katalog zu durchsuchen.",
  results: "Ergebnisse nach dem Launch",
  resultItems: [
    { value: "+3%", label: "Gesamtes GMV-Wachstum im Kaspi Store" },
    { value: "+4%", label: "Bestellungen in der Kategorie Autoteile" },
    { value: "+10,5%", label: "Conversion vom Einstieg in die Auswahl bis zum Kauf" },
  ],
  problem: "Problem",
  problemParagraphs: [
    "Kundinnen und Kunden hatten Schwierigkeiten, passende Teile für ihre Fahrzeuge zu finden. Die Suche war auf Marke und Modell beschränkt, während wichtige Angaben wie Baureihe und Motortyp in Filtern und Produktkarten fehlten. Um die Kompatibilität zu prüfen, mussten sie häufig nach der Bestellung den Verkäufer kontaktieren und ihre VIN übermitteln.",
    "Diese Unterbrechung verlangsamte den Kaufprozess und führte häufig zu Stornierungen und erneuten Bestellungen. Die Stornierungsquote in der Kategorie Autoteile lag bei 25%, wodurch Kundinnen und Kunden in den stationären Handel abwanderten und Umsatz sowie Bindung direkt beeinträchtigt wurden. Benötigt wurde eine schnellere und zuverlässigere Möglichkeit, passende Teile ohne Rücksprache mit dem Verkäufer auszuwählen.",
  ],
  goals: [
    "Den Onlinekauf von Autoteilen mit einem einfachen und zuverlässigen Kompatibilitätswerkzeug schneller und bequemer machen.",
    "Fehler bei der Auswahl reduzieren und Verkäufer zur Nutzung von Express Delivery motivieren, damit Bestellungen schneller erfüllt werden.",
  ],
  roleItems: [
    {
      title: "Discovery",
      text: "Leitete die Problemdefinition, die Festlegung von Erfolgsmetriken, die Benchmark-Analyse, Interviews mit Fachleuten und Feldbeobachtungen, um gemeinsam mit dem Team die Produktrichtung zu bestimmen.",
    },
    {
      title: "Design und Umsetzung",
      text: "Erstellte User Flows, Mockups und interaktive Prototypen, plante und analysierte UX Research, verfeinerte die finalen Designs für die Entwicklung und führte nach der Implementierung Design Reviews durch.",
    },
  ],
  solutionIntro: "Research und Validierung führten zu vier gezielten Verbesserungen:",
  solutionItems: [
    "Einführung einer fahrzeugbasierten Auswahl: Kundinnen und Kunden können ein Fahrzeug manuell über Marke und Modell oder durch Eingabe der VIN hinzufügen und anschließend nur kompatible Produkte sehen.",
    "Ergänzung einer Suche nach Artikelnummer für Personen, die bereits genau wissen, welches Teil sie benötigen.",
    "Integration mit staatlichen Online-Diensten, um automatisch Fahrzeuge hinzuzufügen, die auf die Kundin oder den Kunden zugelassen sind oder für die sie beziehungsweise er in einer Versicherungspolice eingetragen ist.",
    "Anpassung der Kategorie Autoteile an die visuellen Muster des Kaspi Store. Die Fahrzeugfilterung kann weiterhin zurückgesetzt werden, um den gesamten Katalog zu durchsuchen.",
  ],
  impactSections: [
    {
      title: "Research und Validierung",
      paragraphs: [
        "Die Discovery-Phase kombinierte die Analyse von mehr als 20 vergleichbaren Diensten mit Interviews in 10 Autowerkstätten und drei Tagen Feldbeobachtung. Die B2B-Forschung zeigte, wie Fachleute interne Zuordnungssysteme nutzen und mit Teileherstellern zusammenarbeiten. Dadurch erhielt das Team ein klareres Bild von den Abläufen auf Kunden- und Branchenseite.",
        "Anschließend testeten wir interaktive Prototypen mit 10 Personen, die im vorherigen Monat Autoteile gekauft hatten. Die Teilnehmenden verstanden, wie sie ein Fahrzeug manuell hinzufügen, bereits mit ihrem Profil verknüpfte Fahrzeuge verwenden und kompatible Teile durchsuchen konnten. Sie wünschten sich jedoch weiterhin eine Bestätigung, dass die vorgeschlagenen Produkte wirklich passen. Außerdem erwarteten sie, dass berechtigte Fahrzeuge automatisch erscheinen und die Kategorie die vertraute visuelle Sprache des Kaspi Store beibehält.",
      ],
    },
    {
      title: "A/B-Test und Iteration",
      paragraphs: [
        "Nach der Einarbeitung der Research-Ergebnisse starteten wir einen A/B-Test in allen Städten Kasachstans. Kontroll- und Testgruppe umfassten jeweils 66.800 Personen. Gemessen wurden Conversion zum Kauf, GMV, ARPU, ARPPU, Bestellvolumen und durchschnittlicher Bestellwert.",
        "In der validierten Version konnten Kundinnen und Kunden ein Fahrzeug manuell über Marke und Modell oder VIN hinzufügen. Über die Integration mit staatlichen Online-Diensten ließen sich außerdem automatisch Fahrzeuge ergänzen, die auf sie zugelassen waren oder für die sie in einer Versicherungspolice eingetragen waren. Die Benutzeroberfläche der Kategorie wurde an den Hauptshop angeglichen, um das Erlebnis vertrauter und vertrauenswürdiger zu machen.",
      ],
    },
    {
      title: "Ergebnisse",
      paragraphs: [
        "Einen Monat nach dem Launch stieg der gesamte GMV des Kaspi Store um 3%. Die Auswahlfunktion erzielte ein GMV-Wachstum von 17%, während der ARPPU unter den Nutzenden der Funktion mehr als 50% höher lag. 40% der Nutzerinnen und Nutzer verwendeten die Funktion. Die Bestellungen in der Kategorie Autoteile stiegen um 4% von 72.203 auf 75.081, während sich die Conversion vom Einstieg in die Auswahl bis zum Kauf um 10,5% verbesserte.",
        "Nach dem Rollout für alle Nutzerinnen und Nutzer deckte der Zuordnungskatalog 65% der Fahrzeuge in Kasachstan ab; langfristig werden 95% angestrebt. Bei mehr als fünf Millionen Fahrzeughalterinnen und -haltern im Land zeigte das Ergebnis außerdem erhebliches Potenzial für den weiteren Ausbau des Katalogs und Produkts.",
      ],
    },
  ],
  goalsTitle: "Ziele",
  roleTitle: "Meine Rolle als Product Designer",
  solutionTitle: "Lösung",
  before: "Vorher",
  after: "Nachher",
  practice: "In der Praxis",
  ecosystem: "Im gesamten Ökosystem",
  variations: "Varianten",
  impact: "Wirkung",
  impactPrimary: "Gesamtes GMV-Wachstum im Kaspi Store",
  deeper: "Mehr erfahren?",
  deeperText: "Die vollständige Fallstudie zeigt den Research-Prozess, die Designentscheidungen und die finalen Produktergebnisse.",
  next: "Nächstes Projekt",
  nextProject: "Apple Landingpage",
  nextProjectClient: "Konzept, Technologie",
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

const practicePlaceholders = {
  en: ["Search and filtering", "Compatibility", "Product comparison", "Purchase journey"],
  de: ["Suche und Filter", "Kompatibilität", "Produktvergleich", "Kaufprozess"],
};

const impactFocusEn = [
  ["+17%", "GMV generated through the parts-selection feature"],
  [">50%", "Higher ARPPU among VIN-selection users"],
  ["+4%", "Orders in the Auto Parts category"],
  ["40%", "Users who adopted VIN-based selection"],
  ["10.5%", "Conversion from selection entry to purchase"],
  ["65%", "Vehicles covered by VIN-based parts matching"],
];

const impactFocusDe = [
  ["+17%", "GMV durch die Auswahlfunktion"],
  [">50%", "Höherer ARPPU bei Nutzenden der VIN-Auswahl"],
  ["+4%", "Bestellungen in der Kategorie Autoteile"],
  ["40%", "Nutzende der VIN-basierten Auswahl"],
  ["10,5%", "Conversion vom Einstieg in die Auswahl bis zum Kauf"],
  ["65%", "Fahrzeugabdeckung durch VIN-basierte Teilezuordnung"],
];

export function CarPartsCase() {
  const now = useSiteClock();
  const { language, theme, languageHasChanged } = useSitePreferences();
  const copy = language === "de" ? caseCopyDe : caseCopyEn;
  const footerCopy = sharedCopy[language];
  const impactFocus = language === "de" ? impactFocusDe : impactFocusEn;
  const practiceLabels = practicePlaceholders[language];
  const carouselCards = Array.from({ length: 10 }, (_, index) => ({
    imgUrl: `/images/projects/car-parts/carousel/tes-carusel-${theme}${index + 1}.png`,
  }));
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

      <div className="case-layout">
        <aside className={`case-intro${languageHasChanged ? " hero-language-static" : ""}`}>
          <div className="case-eyebrow-row">
            <p className="case-eyebrow"><RevealCharacters>{copy.eyebrow}</RevealCharacters></p>
            <ProjectStatusBadge status="online" language={language} className="case-eyebrow-badge" />
          </div>
          <h1><RevealCharacters>{copy.title}</RevealCharacters></h1>
          <h2><RevealCharacters>{copy.subtitle}</RevealCharacters></h2>
          <div className="case-intro-copy case-intro-reveal">
            <p>{copy.intro}</p>
          </div>
          <div
            className="case-results case-intro-reveal case-intro-results"
            aria-label={copy.results}
          >
            {copy.resultItems.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        <article className="case-content">
          <div
            className="case-placeholder case-media-hero car-parts-hero-media scroll-reveal"
            role="img"
            aria-label="Car Parts vehicle-selection preview"
          >
          <ViewportVideo
            key={`car-parts-hero-${theme}`}
            src={
              theme === "dark"
                ? "/images/projects/car-parts/car-parts-dark.webm"
                : "/images/projects/car-parts/car-parts-light.webm"
            }
            poster={theme === "dark"
              ? "/images/projects/car-parts/car-parts-poster-dark.jpg"
              : "/images/projects/car-parts/car-parts-poster-light.jpg"}
            className="car-parts-hero-video"
          />
          </div>
          <div
            className="case-placeholder case-media-wide car-parts-stack-media scroll-reveal"
          >
            <img
              key={`car-parts-stack-${theme}`}
              src={
                theme === "dark"
                  ? "/images/projects/car-parts/car-parts-stack-dark.jpg"
                  : "/images/projects/car-parts/car-parts-stack-light.jpg"
              }
              alt="Car Parts interface stack"
              fetchPriority="high"
            />
          </div>

          <section className="case-text-section scroll-reveal">
            <h3>{copy.problem}</h3>
            <div>
              {copy.problemParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <div
            className="case-placeholder case-media-wide case-media-tall car-parts-problem-media scroll-reveal"
          >
            <ViewportImage
              src={theme === "dark"
                ? "/images/projects/car-parts/old-stack-dark-web.webp"
                : "/images/projects/car-parts/old-stack-light-web.webp"}
              alt="Previous Car Parts interface stack"
            />
          </div>

          <section className="case-project-infographic case-media-wide" aria-label="Goals and product design role">
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
            <h3>{copy.solutionTitle}</h3>
            <div className="case-solution-copy">
              <p>{copy.solutionIntro}</p>
              <ul>
                {copy.solutionItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <div className="case-media-pair">
            <article className="case-solution-bento car-parts-bento-placeholder scroll-reveal">
              <h4>{copy.before}</h4>
              <ViewportImage
                src={theme === "dark"
                  ? "/images/projects/car-parts/old-car-parts-dark-before-web.webp"
                  : "/images/projects/car-parts/old-car-parts-light-before-web.webp"}
                alt="Car Parts interface before the redesign"
                className="case-solution-bento-image"
              />
            </article>
            <article className="case-solution-bento car-parts-bento-placeholder scroll-reveal">
              <h4>{copy.after}</h4>
              <ViewportImage
                src={theme === "dark"
                  ? "/images/projects/car-parts/new-car-parts-dark-after-web.webp"
                  : "/images/projects/car-parts/new-car-parts-light-after-web.webp"}
                alt="Car Parts interface after the redesign"
                className="case-solution-bento-image"
              />
            </article>
          </div>
        </article>
      </div>

      <section className="case-gallery-section scroll-reveal">
        <h3>{copy.practice}</h3>
        <div className="case-gallery-grid">
          {practiceLabels.map((label, index) => (
            index < 4 ? (
              <div
                key={label}
                className="case-placeholder car-parts-practice-image scroll-reveal"
              >
                <ViewportImage
                  src={theme === "dark"
                    ? index === 0
                      ? "/images/projects/car-parts/trusted-left-dark-web.webp"
                      : index === 1
                        ? "/images/projects/car-parts/trusted-right-dark-web.webp"
                        : index === 2
                          ? "/images/projects/car-parts/modification-dark-web.webp"
                          : "/images/projects/car-parts/articul-dark-web.webp"
                    : index === 0
                      ? "/images/projects/car-parts/trusted-left-light-web.webp"
                      : index === 1
                        ? "/images/projects/car-parts/trusted-right-light-web.webp"
                        : index === 2
                          ? "/images/projects/car-parts/modification-light-web.webp"
                          : "/images/projects/car-parts/articul-light-web.webp"}
                  alt={index === 3 ? "Car Parts article selection" : index === 2 ? "Car Parts modifications" : "Car Parts trusted vehicle selection"}
                />
              </div>
            ) : (
              <MediaPlaceholder key={label} label={`Car Parts ${label} placeholder`} />
            )
          ))}
        </div>
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{copy.ecosystem}</h3>
        <ViewportVideo
          key={`car-parts-ecosystem-${theme}`}
          src={theme === "dark"
            ? "/images/projects/car-parts/demo-car-parts-dark.mp4"
            : "/images/projects/car-parts/demo-car-parts-light2.mp4"}
          aria-label="Car Parts ecosystem demo"
          className="case-placeholder case-media-panorama case-practice-video car-parts-practice-video scroll-reveal"
        />
      </section>

      <section className="case-gallery-section scroll-reveal">
        <h3>{copy.variations}</h3>
        <div className="case-variation-grid">
          {["first", "second", "third"].map((position, index) => (
            <ViewportImage
              key={position}
              src={`/images/projects/car-parts/var${index + 1}-${theme}-web.webp`}
              alt={`Car Parts ${position} design exploration`}
              className="case-placeholder case-variation-image scroll-reveal"
            />
          ))}
        </div>
        <CardFanCarousel
          key={`car-parts-carousel-${theme}`}
          cards={carouselCards}
          className="case-placeholder case-media-wide case-variation-wide scroll-reveal"
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
            <strong>+3%</strong>
            <span>{copy.impactPrimary}</span>
          </div>

          <div className="case-impact-metrics">
            {impactFocus.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseEnding current="car-parts" language={language} theme={theme} title={copy.deeper} description={copy.deeperText} />

      <footer id="index" className="scroll-reveal">
        <p>{footerCopy.copyright}</p>
        <p>{time}, Berlin, DE</p>
        <Link href="/#projects">{footerCopy.work}</Link>
      </footer>
    </main>
  );
}

export type AboutExperience = {
  role: string;
  company: string;
  logo: string;
  period: string;
  description: string;
  highlights?: { title: string; text: string }[];
};

export type AboutProcessStep = {
  key: "explore" | "choose" | "craft" | "measure" | "evolve";
  title: string;
  description: string;
};

export type AboutLocaleContent = {
  eyebrow: string;
  title: string;
  biography: string[];
  workExperience: string;
  experience: AboutExperience[];
  process: string;
  processIntro: string;
  processSteps: AboutProcessStep[];
  resources: string;
  resourcesIntro: string;
  ready: string;
  looking: string;
  copyright: string;
  work: string;
};

export const aboutResource = {
  title: "Data-driven Product Management Simulator",
  titleLines: ["Data-driven Product", "Management Simulator"],
  provider: "GoPractice, Inc",
  credential: "Credential ID xhx9ggfs",
  href: "https://gopractice.ru/course/pm/certificate/xhx9ggfs",
} as const;

export const aboutContent: Record<"en" | "de", AboutLocaleContent> = {
  en: {
    eyebrow: "About",
    title: "I design and improve digital products that turn complex systems into clear, useful experiences.",
    biography: [
      "I’m a Senior Product Designer with 9+ years of experience delivering 70+ B2B, B2C, C2B, and C2C products across e-commerce and enterprise ecosystems.",
      "My work combines end-to-end product design with data-backed product decisions and custom AI workflows that help teams explore, create, and deliver with greater focus.",
    ],
    workExperience: "Work Experience",
    experience: [
      {
        role: "Senior Product Designer",
        company: "Kaspi.kz",
        logo: "/images/experience/kaspi.png",
        period: "Mar 2024 - Present · Full-time · On-site",
        description: "Kaspi.kz is Kazakhstan’s #1 Super App, serving more than 16 million monthly active users. In 2020, the company went public on the London Stock Exchange and AIX, followed by a Nasdaq listing in 2024. A success story now examined at Harvard Business School.",
        highlights: [
          { title: "High-Scale Ecosystems", text: "Spearhead end-to-end design for Kaspi Store, Seller Portal, internal chat tools, and logistics applications, serving millions of end consumers, merchants, and operations staff." },
          { title: "AI Tooling & Efficiency", text: "Co-created an internal AI design tool that accelerated team production cycles; trained and integrated advanced AI workflows across the entire design department." },
          { title: "AI Feature Integration", text: "Designed and shipped native AI-powered capabilities within Kaspi Store products to simplify discovery and seller workflows." },
          { title: "Product Quality & Validation", text: "Utilize usability testing and product analytics to validate feature rollouts, refine UX copy and enforce design system continuity across web and mobile" },
        ],
      },
      {
        role: "Design Team Lead",
        company: "Adata.kz",
        logo: "/images/experience/adata.png",
        period: "July 2022 – February 2024 · 1 yr 8 mos · Full-time · On-site",
        description: "Adata.kz is a business platform with a broad toolkit that aggregates information from official registries and government systems. It lets you vet counterparties, analyze procurement, foreign trade activity, and penalties, and carry out compliance monitoring.",
        highlights: [
          { title: "Website Redesign & Engagement", text: "Spearheaded the total website redesign, boosting average session duration from 2:16 to 8:19 (+266%) and increasing average page depth from 1.42 to 2.41." },
          { title: "Design Systems & Scalability", text: "Architected and scaled the company’s unified Design System, accelerating overall design delivery speed 5x across parallel product streams." },
          { title: "Enterprise Compliance Platform", text: "Led end-to-end UX/UI for Samruk-Kazyna’s compliance platform and engineered a multi-tenant version that directly drove high-value enterprise sales with major commercial banks." },
          { title: "New Product Development", text: "Designed the core user flows, interaction models, and end-to-end UX/UI concept for a brand-new tender platform." },
          { title: "Team Leadership & Operations", text: "Managed a team of 5 designers and 3 university interns; drove resource allocation, regular 1-on-1 mentorship, and sprint planning alongside PMs and engineering leads." },
        ],
      },
      {
        role: "Product Designer",
        company: "APPLECityCorps",
        logo: "/images/experience/apple-city.png",
        period: "January 2019 – July 2022 · 3 yrs 7 mos · Full-time · On-site",
        description: "APPLECityCorps is the largest distributor of fast-moving consumer goods (FMCG) and provider of logistics services (3PL) in Central Asia. It is the distributor of products from P&G, JDE (Jacobs), Mondelez (Alpen Gold, Oreo), PepsiCo, and Nestlé in Kazakhstan.",
        highlights: [
          { title: "Workflow Optimization", text: "Reduced customer service response time by 20% by restructuring user scenarios and optimizing the enterprise invoice export engine." },
          { title: "User Research", text: "Designed enterprise web and mobile solutions validated through direct user interviews, task analysis, and iterative prototype testing." },
        ],
      },
      {
        role: "UX/UI Designer",
        company: "THOUSAND IT GROUP",
        logo: "/images/experience/thousand.png",
        period: "June 2017 – January 2019 · 1 yr 8 mos · Full-time · On-site",
        description: "THOUSAND IT GROUP is an IT studio specializing in the development of websites, CRM systems, and mobile applications for iOS and Android. Delivered products that achieved over 15 million downloads globally.",
        highlights: [
          { title: "Design System Architecture", text: "Built a scalable e-commerce design system from scratch, establishing reusable component libraries, style guides, and interaction patterns." },
          { title: "End-to-End Product Delivery", text: "Translated customer journey mapping and persona research into polished interactive prototypes for web and mobile products." },
        ],
      },
    ],
    process: "Process",
    processIntro: "A flexible product-design process that connects customer needs, business priorities, craft, and measurable learning.",
    processSteps: [
      { key: "explore", title: "Explore", description: "Understand users, business goals, constraints, data, and the existing product context before defining a direction." },
      { key: "choose", title: "Choose", description: "Identify the most valuable problem, align priorities, and turn uncertainty into a focused product direction." },
      { key: "craft", title: "Craft", description: "Translate the direction into flows, prototypes, interfaces, and scalable decisions, using AI workflows where they improve speed or quality." },
      { key: "measure", title: "Measure", description: "Validate usability and product impact through customer feedback, focused experiments, and meaningful performance metrics." },
      { key: "evolve", title: "Evolve", description: "Iterate from evidence, systematize successful patterns, and keep improving the product as its context changes." },
    ],
    resources: "Licenses & certifications",
    resourcesIntro: "Selected learning and professional credentials that support how I approach product work.",
    ready: "Ready to do great work",
    looking: "Looking for a product design role where design drives the product, not just how it looks.",
    copyright: "© Designed and coded by Aziz Baratov ♥️",
    work: "What I do",
  },
  de: {
    eyebrow: "Über mich",
    title: "Ich gestalte und verbessere digitale Produkte, die komplexe Systeme in klare, nützliche Erlebnisse verwandeln.",
    biography: [
      "Ich bin Senior Product Designer mit über 9 Jahren Erfahrung und mehr als 70 realisierten B2B-, B2C-, C2B- und C2C-Produkten in E-Commerce- und Enterprise-Ökosystemen.",
      "Meine Arbeit verbindet ganzheitliches Product Design mit datenbasierten Produktentscheidungen und individuellen KI-Workflows, die Teams dabei unterstützen, fokussierter zu erkunden, zu gestalten und umzusetzen.",
    ],
    workExperience: "Berufserfahrung",
    experience: [
      {
        role: "Senior Product Designer",
        company: "Kaspi.kz",
        logo: "/images/experience/kaspi.png",
        period: "März 2024 – heute · Vollzeit · Vor Ort",
        description: "Kaspi.kz ist Kasachstans führende Super-App mit mehr als 16 Millionen monatlich aktiven Nutzerinnen und Nutzern. Im Jahr 2020 ging das Unternehmen an der London Stock Exchange und der AIX an die Börse, gefolgt von einer Nasdaq-Notierung im Jahr 2024. Eine Erfolgsgeschichte, die heute an der Harvard Business School untersucht wird.",
        highlights: [
          { title: "Ökosysteme mit großer Reichweite", text: "Verantworte das End-to-End-Design für Kaspi Store, das Seller Portal, interne Chat-Tools und Logistikanwendungen, die Millionen von Endkundinnen und Endkunden, Händlern und Mitarbeitenden im operativen Bereich dienen." },
          { title: "KI-Tools & Effizienz", text: "Entwickelte gemeinsam mit anderen ein internes KI-Designtool, das die Produktionszyklen des Teams verkürzte; schulte die gesamte Designabteilung in fortgeschrittenen KI-Workflows und integrierte diese in die Arbeit." },
          { title: "Integration von KI-Funktionen", text: "Gestaltete und veröffentlichte native KI-gestützte Funktionen in Produkten des Kaspi Store, um die Produktsuche und Arbeitsabläufe von Händlern zu vereinfachen." },
          { title: "Produktqualität & Validierung", text: "Nutze Usability-Tests und Produktanalysen, um die Einführung von Funktionen zu validieren, UX-Texte zu verfeinern und die Konsistenz des Designsystems über Web und Mobile hinweg sicherzustellen." },
        ],
      },
      {
        role: "Leitung des Designteams",
        company: "Adata.kz",
        logo: "/images/experience/adata.png",
        period: "Juli 2022 – Februar 2024 · 1 J. 8 Mon. · Vollzeit · Vor Ort",
        description: "Adata.kz ist eine Business-Plattform mit einem breiten Werkzeugangebot, die Informationen aus offiziellen Registern und staatlichen Systemen bündelt. Damit lassen sich Geschäftspartner prüfen, Beschaffungen, Außenhandelsaktivitäten und Sanktionen analysieren sowie Compliance überwachen.",
        highlights: [
          { title: "Website-Relaunch & Engagement", text: "Leitete die vollständige Neugestaltung der Website und steigerte die durchschnittliche Sitzungsdauer von 2:16 auf 8:19 Minuten (+266 %) sowie die durchschnittliche Seitentiefe von 1,42 auf 2,41." },
          { title: "Designsystem & Skalierbarkeit", text: "Konzipierte und skalierte das einheitliche Designsystem des Unternehmens und beschleunigte die Designumsetzung über parallele Produktbereiche hinweg um das Fünffache." },
          { title: "Enterprise-Compliance-Plattform", text: "Verantwortete das End-to-End-UX/UI für die Compliance-Plattform von Samruk-Kazyna und entwickelte eine mandantenfähige Version, die hochwertige Enterprise-Verkäufe an große Geschäftsbanken ermöglichte." },
          { title: "Entwicklung neuer Produkte", text: "Gestaltete die zentralen User Flows, Interaktionsmodelle und das vollständige UX/UI-Konzept für eine neue Ausschreibungsplattform." },
          { title: "Teamführung & Organisation", text: "Führte ein Team aus 5 Designerinnen und Designern sowie 3 Hochschulpraktikantinnen und -praktikanten; verantwortete Ressourcenplanung, regelmäßiges 1:1-Mentoring und Sprintplanung gemeinsam mit Produktmanagement und Entwicklungsleitung." },
        ],
      },
      {
        role: "Product Designer",
        company: "APPLECityCorps",
        logo: "/images/experience/apple-city.png",
        period: "Januar 2019 – Juli 2022 · 3 J. 7 Mon. · Vollzeit · Vor Ort",
        description: "APPLECityCorps ist der größte Distributor von Konsumgütern des täglichen Bedarfs (FMCG) und Anbieter von Logistikdienstleistungen (3PL) in Zentralasien. In Kasachstan vertreibt das Unternehmen Produkte von P&G, JDE (Jacobs), Mondelez (Alpen Gold, Oreo), PepsiCo und Nestlé.",
        highlights: [
          { title: "Optimierung von Arbeitsabläufen", text: "Verkürzte die Reaktionszeit des Kundenservice um 20 %, indem ich Nutzerszenarien neu strukturierte und das Exportmodul für Unternehmensrechnungen optimierte." },
          { title: "Nutzerforschung", text: "Gestaltete Enterprise-Lösungen für Web und Mobile und validierte sie durch direkte Nutzerinterviews, Aufgabenanalysen und iterative Prototypentests." },
        ],
      },
      {
        role: "UX/UI Designer",
        company: "THOUSAND IT GROUP",
        logo: "/images/experience/thousand.png",
        period: "Juni 2017 – Januar 2019 · 1 J. 8 Mon. · Vollzeit · Vor Ort",
        description: "THOUSAND IT GROUP ist ein IT-Studio, das sich auf die Entwicklung von Websites, CRM-Systemen und mobilen Anwendungen für iOS und Android spezialisiert hat. Die entwickelten Produkte erreichten weltweit über 15 Millionen Downloads.",
        highlights: [
          { title: "Architektur des Designsystems", text: "Entwickelte ein skalierbares E-Commerce-Designsystem von Grund auf, einschließlich wiederverwendbarer Komponentenbibliotheken, Styleguides und Interaktionsmustern." },
          { title: "Ganzheitliche Produktentwicklung", text: "Übersetzte Customer-Journey-Mappings und Persona-Research in ausgereifte interaktive Prototypen für Web- und Mobile-Produkte." },
        ],
      },
    ],
    process: "Prozess",
    processIntro: "Ein flexibler Product-Design-Prozess, der Kundenbedürfnisse, Geschäftsziele, Gestaltung und messbares Lernen verbindet.",
    processSteps: [
      { key: "explore", title: "Erkunden", description: "Nutzende, Geschäftsziele, Rahmenbedingungen, Daten und den bestehenden Produktkontext verstehen, bevor eine Richtung definiert wird." },
      { key: "choose", title: "Auswählen", description: "Das wertvollste Problem identifizieren, Prioritäten abstimmen und Unsicherheit in eine fokussierte Produktrichtung überführen." },
      { key: "craft", title: "Gestalten", description: "Die Richtung in Abläufe, Prototypen, Interfaces und skalierbare Entscheidungen übersetzen und KI-Workflows dort einsetzen, wo sie Tempo oder Qualität verbessern." },
      { key: "measure", title: "Messen", description: "Usability und Produktwirkung durch Kundenfeedback, gezielte Experimente und aussagekräftige Leistungskennzahlen validieren." },
      { key: "evolve", title: "Weiterentwickeln", description: "Auf Basis von Erkenntnissen iterieren, erfolgreiche Muster systematisieren und das Produkt mit seinem Kontext weiterentwickeln." },
    ],
    resources: "Lizenzen & Zertifikate",
    resourcesIntro: "Ausgewählte Weiterbildungen und berufliche Nachweise, die meine Arbeit an digitalen Produkten unterstützen.",
    ready: "Bereit für großartige Arbeit",
    looking: "Ich suche eine Product-Design-Rolle, in der Design das Produkt prägt – nicht nur sein Aussehen.",
    copyright: "© Entworfen und programmiert von Aziz Baratov ♥️",
    work: "Meine Arbeit",
  },
};

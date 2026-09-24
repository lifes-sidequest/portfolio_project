import { aboutResource } from "./about";

export const indexResources = {
  cv: {
    title: "CV",
    href: "/documents/CV_Aziz_Baratov_Product_Designer.pdf",
    credential: "Last update: 20.09.26",
  },
  certificate: aboutResource,
} as const;

export const indexContent = {
  en: {
    title: "Links",
    resources: "Resources",
    resourcesIntro: "Selected documents and credentials for a closer look at my experience and product practice.",
    cvDescription: "Product design experience, skills, and selected achievements.",
    ready: "Ready to do great work",
    looking: "Looking for a product design role where design drives the product, not just how it looks.",
    copyright: "© Designed and coded by Aziz Baratov ♥️",
    work: "What I do",
  },
  de: {
    title: "Links",
    resources: "Ressourcen",
    resourcesIntro: "Ausgewählte Dokumente und Nachweise für einen genaueren Einblick in meine Erfahrung und Produktarbeit.",
    cvDescription: "Product-Design-Erfahrung, Kompetenzen und ausgewählte Erfolge.",
    ready: "Bereit für großartige Arbeit",
    looking: "Ich suche eine Product-Design-Rolle, in der Design das Produkt prägt – nicht nur sein Aussehen.",
    copyright: "© Entworfen und programmiert von Aziz Baratov ♥️",
    work: "Meine Arbeit",
  },
} as const;

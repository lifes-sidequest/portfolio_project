"use client";

import Link from "next/link";
import { CopyEmailButton, portfolioEmailAddress } from "../../_components/copy-email-button";
import { ViewportVideo } from "../../_components/viewport-video";

type CaseKey = "kaspi-courier" | "kaspi-home" | "car-parts";
type Language = "en" | "de";

const caseOrder: CaseKey[] = ["kaspi-courier", "kaspi-home", "car-parts"];

const caseProjects = {
  "kaspi-courier": {
    href: "/projects/kaspi-courier",
    title: { en: "Kaspi courier", de: "Kaspi Kurier" },
    subtitle: { en: "Kaspi.kz, Logistic app", de: "Kaspi.kz, Logistik-App" },
    media: { light: "/images/projects/kaspi-courier/kaspi-courier-light.mp4", dark: "/images/projects/kaspi-courier/kaspi-courier-dark.mp4" },
    poster: { light: "/images/projects/kaspi-courier/kaspi-courier-poster-light.jpg", dark: "/images/projects/kaspi-courier/kaspi-courier-poster-dark.jpg" },
  },
  "kaspi-home": {
    href: "/projects/kaspi-home",
    title: { en: "Kaspi.kz home page rework", de: "Überarbeitung der Kaspi.kz-Startseite" },
    subtitle: { en: "Kaspi.kz, Super-App", de: "Kaspi.kz, Super-App" },
    media: { light: "/images/projects/kaspi-home/home-page.mp4", dark: "/images/projects/kaspi-home/home-page-dark.mp4" },
    poster: { light: "/images/projects/kaspi-home/kaspi-home-poster-light.jpg", dark: "/images/projects/kaspi-home/kaspi-home-poster-dark.jpg" },
  },
  "car-parts": {
    href: "/projects/car-parts",
    title: { en: "Car Parts", de: "Autoteile" },
    subtitle: { en: "Kaspi.kz, E-commerce", de: "Kaspi.kz, E-Commerce" },
    media: { light: "/images/projects/car-parts/car-parts-light.webm", dark: "/images/projects/car-parts/car-parts-dark.webm" },
    poster: { light: "/images/projects/car-parts/car-parts-poster-light.jpg", dark: "/images/projects/car-parts/car-parts-poster-dark.jpg" },
  },
} as const;

const navigationCopy = {
  en: { previous: "Previous project", next: "Next project" },
  de: { previous: "Vorheriges Projekt", next: "Nächstes Projekt" },
} as const;

export function CaseEnding({
  current,
  language,
  theme,
  title,
  description,
}: {
  current: CaseKey;
  language: Language;
  theme: "light" | "dark";
  title: string;
  description: string;
}) {
  const index = caseOrder.indexOf(current);
  const previous = caseProjects[caseOrder[(index + caseOrder.length - 1) % caseOrder.length]];
  const next = caseProjects[caseOrder[(index + 1) % caseOrder.length]];
  const labels = navigationCopy[language];

  return (
    <section className="case-ending scroll-reveal">
      <div className="case-deeper">
        <h2>{title}</h2>
        <p>{description}</p>
        <a className="case-deeper-email" href={`mailto:${portfolioEmailAddress}`}>
          <span>{portfolioEmailAddress}</span>
          <img src="/icons/gmail.svg" alt="" aria-hidden="true" />
        </a>
        <CopyEmailButton language={language} />
      </div>

      <Link className="case-previous" href={previous.href}>
        <h2>{labels.previous}</h2>
        <div className="case-navigation-copy">
          <h3>{previous.title[language]}</h3>
          <p>{previous.subtitle[language]}</p>
        </div>
      </Link>

      <Link className="case-next" href={next.href}>
        <h2>{labels.next}</h2>
        <div className="case-next-media">
          {next.media ? (
            <ViewportVideo
              key={`${next.href}-${theme}`}
              src={next.media[theme]}
              poster={next.poster?.[theme]}
              className={next.href === "/projects/kaspi-courier" ? "project-media-contain" : undefined}
              aria-hidden="true"
            />
          ) : (
            <span className="case-next-media-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="case-navigation-copy">
          <h3>{next.title[language]}</h3>
          <p>{next.subtitle[language]}</p>
        </div>
      </Link>
    </section>
  );
}

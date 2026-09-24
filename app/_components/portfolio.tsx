"use client";

import { useEffect, type CSSProperties } from "react";
import Link from "next/link";
import { featuredCompetencies } from "../../content/competencies";
import { projects } from "../../content/projects";
import { socialLinks } from "../../content/social-links";
import { RevealCharacters } from "./reveal-characters";
import { ProjectStatusBadge } from "./project-status-badge";
import { SocialFolder } from "./social-folder";
import { SiteHeader } from "./site-header";
import { useSiteClock } from "./site-clock";
import { useSitePreferences } from "./site-preferences";
import { FavoriteToolsList } from "./favorite-tools-list";
import { CopyEmailButton, portfolioEmailAddress } from "./copy-email-button";
import { ViewportVideo } from "./viewport-video";

const employmentStart = Date.UTC(2024, 2, 1, 9, 0, 0);
const berlinDateTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hourCycle: "h23",
});

function getEmploymentDuration(now = new Date(), language: "en" | "de" = "en") {
  const parts = Object.fromEntries(
    berlinDateTime.formatToParts(now)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, Number(value)]),
  );
  const current = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  const cursor = new Date(employmentStart);

  let years = parts.year - 2024;
  cursor.setUTCFullYear(cursor.getUTCFullYear() + years);
  if (cursor.getTime() > current) {
    years -= 1;
    cursor.setUTCFullYear(cursor.getUTCFullYear() - 1);
  }

  let months = (parts.year - cursor.getUTCFullYear()) * 12 + parts.month - 1 - cursor.getUTCMonth();
  cursor.setUTCMonth(cursor.getUTCMonth() + months);
  if (cursor.getTime() > current) {
    months -= 1;
    cursor.setUTCMonth(cursor.getUTCMonth() - 1);
  }

  let remainder = Math.max(0, current - cursor.getTime());
  const days = Math.floor(remainder / 86_400_000);
  remainder %= 86_400_000;
  const hours = Math.floor(remainder / 3_600_000);
  remainder %= 3_600_000;
  const minutes = Math.floor(remainder / 60_000);
  const seconds = Math.floor((remainder % 60_000) / 1_000);

  return language === "de"
    ? `${years} J., ${months} Mon., ${days} Tage, ${hours} Std., ${minutes} Min., ${seconds} Sek.`
    : `${years} yrs, ${months} mos, ${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs.`;
}

const portfolioCopy = {
  en: {
    heroTitle: "Senior Product Designer from Berlin, DE", employmentPrefix: "Currently at Kaspi.kz for the last ", employmentFallback: "Currently at Kaspi.kz.", open: "Open to Work",
    customize: "customize", language: "Language", theme: "Dark theme", choose: <>Choose language<br />and theme</>,
    thrive: "Where I thrive", statement: <>Senior Product Designer with 9+ years of experience delivering 70+ B2B, B2C, C2B, and C2C products across e-commerce and enterprise ecosystems. Combines end-to-end product design with advanced AI workflows. Proven track record of cutting design production cycles through custom AI tooling, streamlining complex enterprise systems, and driving data-backed product decisions.</>,
    see: "See other", hide: "Hide other", favoriteTools: "My favorite tools", favoriteToolsDescription: "Discover the tools and resources I use and recommend for designing, collaborating, and working more efficiently",
    ready: "Ready to do great work", looking: <>Looking for a product design role where design drives the product, not just how<br/>it looks.</>, talk: "baratov.aziz.h@gmail.com", copyright: "© Designed and coded by Aziz Baratov ♥️", city: "Berlin, DE", work: "What I do",
  },
  de: {
    heroTitle: "Senior Product Designer aus Berlin, DE", employmentPrefix: "Seit ", employmentFallback: "Aktuell bei Kaspi.kz.", open: "Offen für neue Aufgaben",
    customize: "anpassen", language: "Sprache", theme: "Dunkles Design", choose: <>Sprache und Design<br />auswählen</>,
    thrive: "Wo ich aufblühe", statement: <>Senior Product Designer mit mehr als 9 Jahren Erfahrung und über 70 realisierten B2B-, B2C-, C2B- und C2C-Produkten in E-Commerce- und Enterprise-Ökosystemen. Verbindet ganzheitliches Product Design mit fortschrittlichen KI-Workflows. Nachweisliche Erfolge bei der Verkürzung von Design-Produktionszyklen durch individuelle KI-Tools, der Optimierung komplexer Enterprise-Systeme und der Steuerung datenbasierter Produktentscheidungen.</>,
    see: "Weitere anzeigen", hide: "Weniger anzeigen", favoriteTools: "Meine Lieblingswerkzeuge", favoriteToolsDescription: "Entdecke die Tools und Ressourcen, die ich für Design, Zusammenarbeit und effizienteres Arbeiten nutze und empfehle",
    ready: "Bereit für großartige Arbeit", looking: <>Ich suche eine Product-Design-Rolle, in der Design das Produkt prägt – nicht nur<br/>sein Aussehen.</>, talk: "baratov.aziz.h@gmail.com", copyright: "© Entworfen und programmiert von Aziz Baratov ♥️", city: "Berlin, DE", work: "Meine Arbeit",
  },
};

export function Portfolio() {
  const now = useSiteClock();
  const { language, theme, languageHasChanged } = useSitePreferences();
  const copy = portfolioCopy[language];

  useEffect(() => {
    const storageKey = "portfolio-scroll-position";
    const reloadPendingKey = "portfolio-scroll-reload-pending";
    const navigationEntry = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const savedPosition = Number(window.sessionStorage.getItem(storageKey));
    const shouldRestoreAfterReload = window.sessionStorage.getItem(reloadPendingKey) === "1";

    if (navigationEntry?.type === "reload" && shouldRestoreAfterReload && !window.location.hash) {
      if (Number.isFinite(savedPosition) && savedPosition > 0) {
        window.requestAnimationFrame(() => {
          const previousScrollBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo(0, savedPosition);
          window.requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = previousScrollBehavior;
          });
        });
      }
    }
    window.sessionStorage.removeItem(reloadPendingKey);

    const saveForReload = () => {
      window.sessionStorage.setItem(storageKey, String(window.scrollY));
      window.sessionStorage.setItem(reloadPendingKey, "1");
    };

    window.addEventListener("beforeunload", saveForReload);
    return () => {
      window.removeEventListener("beforeunload", saveForReload);
    };
  }, []);

  const employmentDuration = now ? getEmploymentDuration(now, language) : "";
  const time = now ? new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin",
  }).format(now) : "";
  const employmentPrefix = copy.employmentPrefix;
  const employmentSuffix = language === "de" ? " bei Kaspi.kz. " : " ";
  const employmentText = employmentDuration
    ? `${employmentPrefix}${employmentDuration}${employmentSuffix}`
    : copy.employmentFallback;

  return (
    <main className="portfolio-page">
      <SiteHeader onHome />

      <div className="intro-spacer" aria-hidden="true" />

      <section className={`hero${languageHasChanged ? " hero-language-static" : ""}`} id="top">
        <h1 aria-label={copy.heroTitle}><RevealCharacters>{copy.heroTitle}</RevealCharacters></h1>
        <p aria-label={`${employmentText}${copy.open}`}>
          {employmentDuration ? (
            <>
              <RevealCharacters>{employmentPrefix}</RevealCharacters>
              <span className="hero-counter">
                <RevealCharacters offset={employmentPrefix.length}>{employmentDuration}</RevealCharacters>
              </span>
              <RevealCharacters offset={employmentPrefix.length + employmentDuration.length}>{employmentSuffix}</RevealCharacters>
            </>
          ) : (
            <RevealCharacters>{employmentText}</RevealCharacters>
          )}
          {employmentDuration && (
            <span
              className="availability-badge project-status-online"
              style={{ "--badge-reveal-delay": `${employmentText.length * 10 + 150}ms` } as CSSProperties}
            >
              <i className="project-status-dot" aria-hidden="true" />
              <span>{copy.open}</span>
            </span>
          )}
        </p>
        {/* Customize panel is temporarily disabled. Keep this block for a later iteration.
        <div className="hero-tools" aria-label="Display preferences preview">
          <div className="hero-garment-tag" aria-hidden="true"><span>{copy.customize}</span></div>
          <div className="hero-tools-popover">
            <div className="hero-tools-preview">
              <label>
                <span>{copy.language}</span>
                <select disabled aria-label={copy.language}><option>{language.toUpperCase()}</option></select>
              </label>
              <label>
                <span>{copy.theme}</span>
                <input type="checkbox" disabled aria-label="Dark theme" />
              </label>
            </div>
            <p>{copy.choose}</p>
          </div>
        </div>
        */}
      </section>

      <section className="projects" id="projects">
        {projects.map((project) => {
          const mediaSource = theme === "dark" && project.darkImage ? project.darkImage : project.image;
          const posterSource = theme === "dark" && project.darkPoster ? project.darkPoster : project.poster ?? undefined;
          const isVideo = mediaSource?.endsWith(".mp4") || mediaSource?.endsWith(".webm");
          const cardContent = (
            <>
              <figure>
                {isVideo && mediaSource ? (
                  <ViewportVideo
                    key={`${project.title}-${theme}`}
                    src={mediaSource}
                    poster={posterSource}
                    aria-hidden="true"
                  />
                ) : mediaSource ? (
                  <img src={mediaSource} alt="" />
                ) : null}
                <ProjectStatusBadge status={project.status} language={language} />
              </figure>
              <h2>{language === "de" ? project.titleDe : project.title}</h2>
              <p>{language === "de" ? project.client.replace("Concept", "Konzept").replace("Technology", "Technologie").replace("Logistic app", "Logistik-App") : project.client}</p>
            </>
          );

          if (project.status === "coming-soon") {
            return (
              <article className="project-card project-card-disabled scroll-reveal" key={project.title}>
                {cardContent}
              </article>
            );
          }

          return (
            <Link
              className="project-card scroll-reveal"
              href={project.href}
              key={project.title}
            >
              {cardContent}
            </Link>
          );
        })}
      </section>

      <section className="thrive" id="about">
        <p className="section-kicker scroll-reveal">{copy.thrive}</p>
        <div className="thrive-content">
          <p className="statement scroll-reveal">{copy.statement}</p>
          <div className="capabilities">
            {featuredCompetencies[language].map((competency) => (
              <div className="competency-item scroll-reveal" key={competency.title}>
                <h3>{competency.title}</h3>
                <p>{competency.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="favorite-tools" id="inspiration">
        <div className="favorite-tools-heading scroll-reveal">
          <h2>{copy.favoriteTools}</h2>
          <p className="favorite-tools-description">{copy.favoriteToolsDescription}</p>
        </div>
        <FavoriteToolsList language={language} />
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy scroll-reveal">
          <h3>{copy.ready}</h3>
          <p>{copy.looking}</p>
          <a className="email-link" href={`mailto:${portfolioEmailAddress}`}>
            <span>{copy.talk}</span>
            <img src="/icons/gmail.svg" alt="" aria-hidden="true" />
          </a>
          <CopyEmailButton language={language} />
        </div>
        <div className="social-links">
          {socialLinks.map((social) => (
            <SocialFolder
              key={social.id}
              id={social.id}
              name={social.name}
              description={language === "de" ? ({linkedin:"Professionelles Profil",dribbble:"Fallstudien & Projekte",behance:"Ausgewählte Designarbeiten"}[social.key]) : social.description}
              category={language === "de" ? ({linkedin:"Erfahrung & Netzwerk",dribbble:"Projektarchiv",behance:"Visuelle Erkundungen"}[social.key]) : social.category}
              href={social.href}
              assetKey={social.key}
            />
          ))}
        </div>
      </section>

      <footer id="index" className="scroll-reveal">
        <p>{copy.copyright}</p>
        <p>{time}, {copy.city}</p>
        <a href="#projects">{copy.work}</a>
      </footer>
    </main>
  );
}

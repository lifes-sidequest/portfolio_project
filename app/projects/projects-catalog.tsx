"use client";

import Link from "next/link";
import { projects } from "../../content/projects";
import { ComingSoonBadge } from "../_components/coming-soon-badge";
import { ProjectStatusBadge } from "../_components/project-status-badge";
import { RevealCharacters } from "../_components/reveal-characters";
import { SiteHeader } from "../_components/site-header";
import { useSiteClock } from "../_components/site-clock";
import { useSitePreferences } from "../_components/site-preferences";
import { ViewportVideo } from "../_components/viewport-video";

type CatalogProject = {
  title: string;
  titleDe: string;
  client: string;
  clientDe: string;
};

const placeholderProjects: readonly CatalogProject[] = [
  { title: "Apple landing page", titleDe: "Apple Landingpage", client: "Kaspi.kz, E-commerce", clientDe: "Kaspi.kz, E-Commerce" },
  { title: "Messanger redesign", titleDe: "Messenger-Redesign", client: "Kaspi.kz, Messanger", clientDe: "Kaspi.kz, Messenger" },
  { title: "Seller performance metrics", titleDe: "Leistungskennzahlen für Verkäufer", client: "Kaspi Pay, Seller Center", clientDe: "Kaspi Pay, Händlerportal" },
  { title: "Trade-in", titleDe: "Inzahlungnahme", client: "Kaspi.kz, E-commerce", clientDe: "Kaspi.kz, E-Commerce" },
  { title: "Message grouping", titleDe: "Nachrichtengruppierung", client: "Kaspi.kz, Messanger", clientDe: "Kaspi.kz, Messenger" },
  { title: "Messenger calls", titleDe: "Messenger-Anrufe", client: "Kaspi.kz, Messanger", clientDe: "Kaspi.kz, Messenger" },
  { title: "Adata redesign", titleDe: "Adata-Redesign", client: "Adata.kz, Main Website", clientDe: "Adata.kz, Hauptwebsite" },
  { title: "A-Compliance", titleDe: "A-Compliance", client: "Adata.kz, Compliance Platform", clientDe: "Adata.kz, Compliance-Plattform" },
  { title: "Compliance platform logo", titleDe: "Logo der Compliance-Plattform", client: "Adata.kz, Illustration", clientDe: "Adata.kz, Illustration" },
  { title: "Thousand company logo", titleDe: "Unternehmenslogo von Thousand", client: "THOUSAND IT GROUP, Illustration", clientDe: "THOUSAND IT GROUP, Illustration" },
  { title: "JTI car management", titleDe: "JTI-Fuhrparkverwaltung", client: "THOUSAND IT GROUP, JTI Kazakhstan", clientDe: "THOUSAND IT GROUP, JTI Kasachstan" },
];

const pageCopy = {
  en: { featured: "Featured", side: "Side", currency: "Currency Converter", mobile: "Mobile App", copyright: "© Designed and coded by Aziz Baratov ♥️", work: "What I do" },
  de: { featured: "Ausgewählte Projekte", side: "Nebenprojekte", currency: "Währungsrechner", mobile: "Mobile-App", copyright: "© Entworfen und programmiert von Aziz Baratov ♥️", work: "Meine Arbeit" },
} as const;

function translateClient(client: string) {
  return client
    .replace("E-commerce", "E-Commerce")
    .replace("Logistic app", "Logistik-App");
}

export function ProjectsCatalog() {
  const now = useSiteClock();
  const { language, theme } = useSitePreferences();
  const copy = pageCopy[language];
  const time = now
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin" }).format(now)
    : "";

  return (
    <main className="case-page projects-catalog-page">
      <SiteHeader />

      <section className="projects-catalog-section" aria-labelledby="featured-projects-title">
        <h1 id="featured-projects-title" className="projects-catalog-title projects-catalog-featured-title" aria-label={copy.featured}>
          <RevealCharacters>{copy.featured}</RevealCharacters>
        </h1>
        <div className="projects-catalog-grid">
          {projects.map((project) => {
            const mediaSource = theme === "dark" && project.darkImage ? project.darkImage : project.image;
            const posterSource = theme === "dark" && project.darkPoster ? project.darkPoster : project.poster ?? undefined;
            const isVideo = mediaSource?.endsWith(".mp4") || mediaSource?.endsWith(".webm");
            return (
              <Link className="project-card catalog-project-card scroll-reveal" href={project.href} key={project.title}>
                <figure>
                  {isVideo && mediaSource ? (
                    <ViewportVideo key={`${project.title}-${theme}`} src={mediaSource} poster={posterSource} aria-hidden="true" />
                  ) : mediaSource ? (
                    <img src={mediaSource} alt="" />
                  ) : null}
                  <ProjectStatusBadge status={project.status} language={language} />
                </figure>
                <h2>{language === "de" ? project.titleDe : project.title}</h2>
                <p>{language === "de" ? translateClient(project.client) : project.client}</p>
              </Link>
            );
          })}

          {placeholderProjects.map((project) => (
            <article className="project-card catalog-project-card project-card-disabled scroll-reveal" key={project.title}>
              <figure><ComingSoonBadge language={language} /></figure>
              <h2>{language === "de" ? project.titleDe : project.title}</h2>
              <p>{language === "de" ? project.clientDe : project.client}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-catalog-section projects-catalog-side" aria-labelledby="side-projects-title">
        <h2 id="side-projects-title" className="projects-catalog-title projects-catalog-side-title scroll-reveal">{copy.side}</h2>
        <div className="projects-catalog-grid">
          <article className="project-card catalog-project-card project-card-disabled scroll-reveal">
            <figure><ComingSoonBadge language={language} /></figure>
            <h2>{copy.currency}</h2>
            <p>{copy.mobile}</p>
          </article>
        </div>
      </section>

      <footer id="index" className="scroll-reveal">
        <p>{copy.copyright}</p>
        <p>{time}, Berlin, DE</p>
        <Link href="/#projects">{copy.work}</Link>
      </footer>
    </main>
  );
}

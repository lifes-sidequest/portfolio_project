"use client";

import Link from "next/link";
import { indexContent, indexResources } from "../../content/index";
import { socialLinks } from "../../content/social-links";
import { CopyEmailButton, portfolioEmailAddress } from "../_components/copy-email-button";
import { RevealCharacters } from "../_components/reveal-characters";
import { SiteHeader } from "../_components/site-header";
import { useSiteClock } from "../_components/site-clock";
import { useSitePreferences } from "../_components/site-preferences";
import { SocialFolder } from "../_components/social-folder";

function ResourceArrow() {
  return (
    <svg className="about-resource-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IndexPage() {
  const now = useSiteClock();
  const { language } = useSitePreferences();
  const copy = indexContent[language];
  const lookingBreak = language === "de" ? "sein Aussehen." : "it looks.";
  const [lookingLead, lookingTail = ""] = copy.looking.split(lookingBreak);
  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Berlin",
      }).format(now)
    : "";

  return (
    <main className="case-page index-page">
      <SiteHeader />

      <section className="index-hero" aria-labelledby="index-title">
        <h1 id="index-title" aria-label={copy.title}>
          <RevealCharacters>{copy.title}</RevealCharacters>
        </h1>
      </section>

      <section className="index-resources" aria-labelledby="index-resources-title">
        <div className="index-section-heading scroll-reveal">
          <h2 id="index-resources-title">{copy.resources}</h2>
          <p>{copy.resourcesIntro}</p>
        </div>
        <div className="index-resource-grid">
          <a
            className="about-resource-card resource-card-stacked scroll-reveal"
            href={indexResources.cv.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`CV, ${copy.cvDescription}`}
          >
            <span className="resource-card-meta">
              <span className="about-resource-number" aria-hidden="true">01</span>
              <span className="about-resource-credential">{indexResources.cv.credential}</span>
              <ResourceArrow />
            </span>
            <span className="about-resource-copy">
              <strong>{indexResources.cv.title}</strong>
              <small>{copy.cvDescription}</small>
            </span>
          </a>
          <a
            className="about-resource-card resource-card-stacked scroll-reveal"
            href={indexResources.certificate.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${indexResources.certificate.title}, ${indexResources.certificate.provider}`}
          >
            <span className="resource-card-meta">
              <span className="about-resource-number" aria-hidden="true">02</span>
              <span className="about-resource-credential">{indexResources.certificate.credential}</span>
              <ResourceArrow />
            </span>
            <span className="about-resource-copy">
              <strong>
                {indexResources.certificate.titleLines.map((line) => (
                  <span className="resource-card-title-line" key={line}>{line}</span>
                ))}
              </strong>
              <small>{indexResources.certificate.provider}</small>
            </span>
          </a>
        </div>
      </section>

      <section className="contact index-contact" aria-labelledby="index-contact-title">
        <div className="contact-copy">
          <h3 id="index-contact-title">{copy.ready}</h3>
          <p>
            {lookingLead}<br className="about-desktop-break" />
            <span className="about-mobile-space"> </span>{lookingBreak}{lookingTail}
          </p>
          <a className="email-link" href={`mailto:${portfolioEmailAddress}`}>
            <span>{portfolioEmailAddress}</span>
            <img src="/icons/gmail.svg" alt="" aria-hidden="true" />
          </a>
          <CopyEmailButton language={language} />
        </div>
        <div className="social-links">
          {socialLinks.map((social) => (
            <SocialFolder
              key={social.id}
              id={`index-${social.id}`}
              name={social.name}
              description={language === "de" ? ({ linkedin: "Professionelles Profil", dribbble: "Fallstudien & Projekte", behance: "Ausgewählte Designarbeiten" }[social.key]) : social.description}
              category={language === "de" ? ({ linkedin: "Erfahrung & Netzwerk", dribbble: "Projektarchiv", behance: "Visuelle Erkundungen" }[social.key]) : social.category}
              href={social.href}
              assetKey={social.key}
              reveal={false}
            />
          ))}
        </div>
      </section>

      <footer className="scroll-reveal">
        <p>{copy.copyright}</p>
        <p>{time}, Berlin, DE</p>
        <Link href="/#projects">{copy.work}</Link>
      </footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import { aboutContent, aboutResource } from "../../content/about";
import { socialLinks } from "../../content/social-links";
import { CopyEmailButton, portfolioEmailAddress } from "../_components/copy-email-button";
import { RevealCharacters } from "../_components/reveal-characters";
import { SiteHeader } from "../_components/site-header";
import { useSiteClock } from "../_components/site-clock";
import { useSitePreferences } from "../_components/site-preferences";
import { SocialFolder } from "../_components/social-folder";

function formatBiography(paragraph: string) {
  const phrases = /(e-commerce|E-Commerce|data-backed|AI workflows|KI-Workflows)/g;
  const isPhrase = /^(e-commerce|E-Commerce|data-backed|AI workflows|KI-Workflows)$/;

  return paragraph.split(phrases).map((part, index) =>
    isPhrase.test(part)
      ? <span className="about-keep-together" key={`${part}-${index}`}>{part}</span>
      : part,
  );
}

export function AboutPage() {
  const now = useSiteClock();
  const { language } = useSitePreferences();
  const copy = aboutContent[language];
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
    <main className="case-page about-page">
      <SiteHeader />

      <section className="about-intro" aria-labelledby="about-title">
        <p className="about-eyebrow scroll-reveal">{copy.eyebrow}</p>
        <h1 id="about-title" aria-label={copy.title}>
          <RevealCharacters>{copy.title}</RevealCharacters>
        </h1>
        <div className="about-intro-copy">
          <p className="about-intro-label scroll-reveal">Aziz Baratov<br />Senior Product Designer<br />Berlin, DE</p>
          <div className="about-biography scroll-reveal">
            {copy.biography.map((paragraph) => <p key={paragraph}>{formatBiography(paragraph)}</p>)}
          </div>
        </div>
      </section>

      <section className="about-section about-process" aria-labelledby="about-process-title">
        <div className="about-section-heading scroll-reveal">
          <h2 id="about-process-title" className="about-section-title">{copy.process}</h2>
          <p>{copy.processIntro}</p>
        </div>
        <div className="about-process-list">
          {copy.processSteps.map((step, index) => (
            <article className="about-process-item scroll-reveal" key={step.key}>
              <span className="about-item-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-resources" aria-labelledby="about-resources-title">
        <div className="about-section-heading scroll-reveal">
          <h2 id="about-resources-title" className="about-section-title">{copy.resources}</h2>
          <p>{copy.resourcesIntro}</p>
        </div>
        <a
          className="about-resource-card resource-card-stacked scroll-reveal"
          href={aboutResource.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${aboutResource.title}, ${aboutResource.provider}`}
        >
          <span className="resource-card-meta">
            <span className="about-resource-number" aria-hidden="true">01</span>
            <span className="about-resource-credential">{aboutResource.credential}</span>
            <svg className="about-resource-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
          <span className="about-resource-copy">
            <strong>
              {aboutResource.titleLines.map((line) => (
                <span className="resource-card-title-line" key={line}>{line}</span>
              ))}
            </strong>
            <small>{aboutResource.provider}</small>
          </span>
        </a>
      </section>

      <section className="about-section about-experience" aria-labelledby="about-experience-title">
        <h2 id="about-experience-title" className="about-section-title scroll-reveal">{copy.workExperience}</h2>
        <div className="about-section-content">
          {copy.experience.map((job, index) => (
            <article className="about-experience-item scroll-reveal" key={`${job.company}-${job.role}`}>
              <span className="about-item-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="about-experience-heading">
                <img className="experience-logo about-experience-logo" src={job.logo} alt="" aria-hidden="true" />
                <div>
                  <h3>{job.role}</h3>
                  <p>{job.company}</p>
                </div>
              </div>
              <div className="about-experience-details">
                <p className="about-experience-period">{job.period}</p>
                <p>{job.description}</p>
                {job.highlights && (
                  <ul className="about-experience-highlights">
                    {job.highlights.map((highlight) => (
                      <li key={highlight.title}><strong>{highlight.title}:</strong> {highlight.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact about-contact" aria-labelledby="about-contact-title">
        <div className="contact-copy scroll-reveal">
          <h3 id="about-contact-title">{copy.ready}</h3>
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
              id={`about-${social.id}`}
              name={social.name}
              description={language === "de" ? ({ linkedin: "Professionelles Profil", dribbble: "Fallstudien & Projekte", behance: "Ausgewählte Designarbeiten" }[social.key]) : social.description}
              category={language === "de" ? ({ linkedin: "Erfahrung & Netzwerk", dribbble: "Projektarchiv", behance: "Visuelle Erkundungen" }[social.key]) : social.category}
              href={social.href}
              assetKey={social.key}
            />
          ))}
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

"use client";

import Link from "next/link";
import { getAgentProfile } from "../../content/agent-profile";
import { useSitePreferences } from "../_components/site-preferences";

const labels = {
  en: {
    markdown: "Raw Markdown",
    pages: "Pages", portfolio: "Visual portfolio", cv: "CV", competencies: "Competencies",
    results: "Results", source: "Source", experience: "Experience", projects: "Projects",
    certificate: "Certificate", contact: "Contact", note: "Only published portfolio facts and results are included.",
  },
  de: {
    markdown: "Reines Markdown",
    pages: "Seiten", portfolio: "Visuelles Portfolio", cv: "Lebenslauf", competencies: "Kompetenzen",
    results: "Ergebnisse", source: "Quelle", experience: "Berufserfahrung", projects: "Projekte",
    certificate: "Zertifikat", contact: "Kontakt", note: "Es werden nur veröffentlichte Fakten und Ergebnisse gezeigt.",
  },
} as const;

export function AgentProfilePage() {
  const { language } = useSitePreferences();
  const profile = getAgentProfile(language);
  const copy = labels[language];

  return (
    <main className="agent-profile-page">
      <div className="agent-profile-shell">
        <article className="agent-profile-document">
          <header className="agent-profile-intro">
            <span className="agent-profile-syntax" aria-hidden="true">#</span>
            <h1>{profile.name}</h1>
            {profile.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </header>

          <section aria-labelledby="agent-pages">
            <h2 id="agent-pages"><span aria-hidden="true">##</span> {copy.pages}</h2>
            <ul className="agent-profile-links">
              <li><Link href="/">{copy.portfolio}</Link><span aria-hidden="true">↗</span></li>
              <li><a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">{copy.cv}</a><span aria-hidden="true">↗</span></li>
              <li><a href={`/for-agents/${language}.md`} target="_blank" rel="noopener noreferrer">{copy.markdown}</a><span aria-hidden="true">↗</span></li>
            </ul>
          </section>

          <section aria-labelledby="agent-competencies">
            <h2 id="agent-competencies"><span aria-hidden="true">##</span> {copy.competencies}</h2>
            <ul className="agent-profile-list">
              {profile.competencies.map(({ title, description }) => (
                <li key={title}><strong>{title}</strong><span>{description}</span></li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="agent-results">
            <h2 id="agent-results"><span aria-hidden="true">##</span> {copy.results}</h2>
            <ul className="agent-profile-list">
              {profile.outcomes.map(({ text, source }) => (
                <li key={text}><span>{text} <Link className="agent-profile-source" href={source}>{copy.source} ↗</Link></span></li>
              ))}
            </ul>
            <p className="agent-profile-note">{copy.note}</p>
          </section>

          <section aria-labelledby="agent-experience">
            <h2 id="agent-experience"><span aria-hidden="true">##</span> {copy.experience}</h2>
            <ul className="agent-profile-list">
              {profile.experience.map(({ role, company, period }) => (
                <li key={`${role}-${company}`}><strong>{role} — {company}</strong><span>{period}</span></li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="agent-projects">
            <h2 id="agent-projects"><span aria-hidden="true">##</span> {copy.projects}</h2>
            <ul className="agent-profile-list">
              {profile.projects.map(({ title, client, href, status }) => (
                <li key={href}>
                  <strong><Link href={href}>{title}</Link> <span className="agent-profile-status">{status}</span></strong>
                  <span>{client}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="agent-certificate">
            <h2 id="agent-certificate"><span aria-hidden="true">##</span> {copy.certificate}</h2>
            <ul className="agent-profile-list">
              <li>
                <strong><a href={profile.certificate.href} target="_blank" rel="noopener noreferrer">{profile.certificate.title} ↗</a></strong>
                <span>{profile.certificate.provider} · {profile.certificate.credential}</span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="agent-contact">
            <h2 id="agent-contact"><span aria-hidden="true">##</span> {copy.contact}</h2>
            <ul className="agent-profile-links">
              {profile.contact.map(({ label, href }) => (
                <li key={label}><a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>{label}</a><span aria-hidden="true">↗</span></li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}

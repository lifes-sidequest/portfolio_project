import type { AgentProfile } from "./agent-profile";

const headings = {
  en: {
    pages: "Pages", competencies: "Competencies", results: "Results", experience: "Experience",
    projects: "Projects", certificate: "Certificate", contact: "Contact", source: "Source",
    portfolio: "Portfolio", cv: "CV", note: "Results are drawn from the published portfolio.",
  },
  de: {
    pages: "Seiten", competencies: "Kompetenzen", results: "Ergebnisse", experience: "Berufserfahrung",
    projects: "Projekte", certificate: "Zertifikat", contact: "Kontakt", source: "Quelle",
    portfolio: "Portfolio", cv: "Lebenslauf", note: "Die Ergebnisse stammen aus dem veröffentlichten Portfolio.",
  },
} as const;

export function renderAgentProfileMarkdown(profile: AgentProfile, origin: string): string {
  const labels = headings[profile.locale];
  const absolute = (href: string) => new URL(href, origin).href;
  const lines = [
    `# ${profile.name}`,
    "",
    ...profile.summary.flatMap((paragraph) => [paragraph, ""]),
    `## ${labels.pages}`,
    `- [${labels.portfolio}](${absolute("/")})`,
    `- [${labels.cv}](${absolute(profile.cvUrl)})`,
    "",
    `## ${labels.competencies}`,
    ...profile.competencies.map(({ title, description }) => `- **${title}:** ${description}`),
    "",
    `## ${labels.results}`,
    ...profile.outcomes.map(({ text, source }) => `- ${text} [${labels.source}](${absolute(source)})`),
    "",
    labels.note,
    "",
    `## ${labels.experience}`,
    ...profile.experience.map(({ role, company, period }) => `- **${role} — ${company}** · ${period}`),
    "",
    `## ${labels.projects}`,
    ...profile.projects.map(({ title, client, href, status }) => `- [${title}](${absolute(href)}) — ${client} · ${status}`),
    "",
    `## ${labels.certificate}`,
    `- [${profile.certificate.title}](${profile.certificate.href}) — ${profile.certificate.provider} · ${profile.certificate.credential}`,
    "",
    `## ${labels.contact}`,
    ...profile.contact.map(({ label, href }) => `- [${label}](${href})`),
    "",
  ];

  return lines.join("\n");
}

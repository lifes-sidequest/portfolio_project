import type { ProjectStatus } from "../../content/projects";
import type { SiteLanguage } from "./site-preferences";

const labels: Record<ProjectStatus, Record<SiteLanguage, string>> = {
  online: { en: "Released", de: "Veröffentlicht" },
  offline: { en: "Offline", de: "Offline" },
  "coming-soon": { en: "Coming soon", de: "Demnächst" },
  "in-production": { en: "In development", de: "In Entwicklung" },
};

export function ProjectStatusBadge({
  status,
  language,
  className = "",
}: {
  status: ProjectStatus;
  language: SiteLanguage;
  className?: string;
}) {
  return (
    <span className={`project-status project-status-${status} ${className}`.trim()}>
      <i className="project-status-dot" aria-hidden="true" />
      {labels[status][language]}
    </span>
  );
}

import type { SiteLanguage } from "./site-preferences";

export function ComingSoonBadge({ language }: { language: SiteLanguage }) {
  return (
    <span className="coming-soon-badge">
      {language === "de" ? "DEMNÄCHST" : "COMING SOON"}
    </span>
  );
}

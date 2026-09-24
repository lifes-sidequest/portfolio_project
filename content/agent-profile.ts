import { aboutContent, aboutResource } from "./about";
import { featuredCompetencies } from "./competencies";
import { projects } from "./projects";
import { socialLinks } from "./social-links";

export type AgentLocale = "en" | "de";

export type AgentProfile = {
  locale: AgentLocale;
  name: string;
  summary: string[];
  competencies: { title: string; description: string }[];
  outcomes: { text: string; source: string }[];
  experience: { role: string; company: string; period: string }[];
  projects: { title: string; client: string; href: string; status: string }[];
  certificate: { title: string; provider: string; credential: string; href: string };
  contact: { label: string; href: string }[];
  cvUrl: string;
};

const statusLabels = {
  en: { online: "Released", offline: "Offline", "coming-soon": "Coming soon", "in-production": "In development" },
  de: { online: "Veröffentlicht", offline: "Offline", "coming-soon": "Demnächst", "in-production": "In Entwicklung" },
} as const;

const projectClientsDe: Record<string, string> = {
  "/projects/kaspi-home": "Kaspi.kz, Super-App",
  "/projects/car-parts": "Kaspi.kz, E-Commerce",
  "/projects/kaspi-courier": "Kaspi.kz, Logistik-App",
};

export function getAgentProfile(locale: AgentLocale): AgentProfile {
  const language = locale === "de" ? "de" : "en";
  const about = aboutContent[language];
  const adata = about.experience[1];
  const appleCity = about.experience[2];

  return {
    locale: language,
    name: "Aziz Baratov",
    summary: about.biography,
    competencies: featuredCompetencies[language].map(({ title, description }) => ({ title, description })),
    outcomes: [
      { text: adata.highlights![0].text, source: "/about#about-experience-title" },
      { text: adata.highlights![1].text, source: "/about#about-experience-title" },
      { text: appleCity.highlights![0].text, source: "/about#about-experience-title" },
    ],
    experience: about.experience.map(({ role, company, period }) => ({ role, company, period })),
    projects: projects.map((project) => ({
      title: language === "de" ? project.titleDe : project.title,
      client: language === "de" ? projectClientsDe[project.href] ?? project.client : project.client,
      href: project.href,
      status: statusLabels[language][project.status],
    })),
    certificate: {
      title: aboutResource.title,
      provider: aboutResource.provider,
      credential: aboutResource.credential,
      href: aboutResource.href,
    },
    contact: [
      { label: "Email", href: "mailto:baratov.aziz.h@gmail.com" },
      ...socialLinks.map(({ name, href }) => ({ label: name, href })),
    ],
    cvUrl: "/documents/CV_Aziz_Baratov_Product_Designer.pdf",
  };
}

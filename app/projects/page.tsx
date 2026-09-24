import type { Metadata } from "next";
import { ProjectsCatalog } from "./projects-catalog";

export const metadata: Metadata = {
  title: "Projects — Aziz Baratov",
  description: "Selected product design projects by Aziz Baratov.",
};

export default function ProjectsPage() {
  return <ProjectsCatalog />;
}

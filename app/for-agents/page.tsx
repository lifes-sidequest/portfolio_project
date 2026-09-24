import type { Metadata } from "next";
import { AgentProfilePage } from "./agent-profile-page";
import "./agent-profile.css";

export const metadata: Metadata = {
  title: "For Agents — Aziz Baratov",
  description: "A concise, machine-readable profile of Aziz Baratov's work, outcomes, and contact information.",
};

export default function ForAgentsPage() {
  return <AgentProfilePage />;
}

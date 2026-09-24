import type { Metadata } from "next";
import { AboutPage } from "./about-page";

export const metadata: Metadata = {
  title: "About — Aziz Baratov",
  description: "About Aziz Baratov, a Senior Product Designer in Berlin.",
};

export default function AboutRoute() {
  return <AboutPage />;
}

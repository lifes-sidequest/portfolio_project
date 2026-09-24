import type { Metadata } from "next";
import { InspirationPage } from "./inspiration-page";

export const metadata: Metadata = {
  title: "Shots & Inspiration — Aziz Baratov",
  description: "A sketchbook of visual experiments, references, and moments caught through the lens.",
};

export default function InspirationRoute() {
  return <InspirationPage />;
}

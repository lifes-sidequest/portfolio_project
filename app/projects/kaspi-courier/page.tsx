import type { Metadata } from "next";
import { KaspiCourierCase } from "./kaspi-courier-case";

export const metadata: Metadata = {
  title: "Kaspi courier — Aziz Baratov",
  description: "A product design case study for the Kaspi courier logistics app.",
};

export default function KaspiCourierPage() {
  return <KaspiCourierCase />;
}

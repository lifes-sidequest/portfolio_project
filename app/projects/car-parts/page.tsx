import type { Metadata } from "next";
import { CarPartsCase } from "./car-parts-case";

export const metadata: Metadata = {
  title: "Car Parts — Aziz Baratov",
  description: "A product design case study about making automotive parts easier to discover and purchase.",
};

export default function CarPartsPage() {
  return <CarPartsCase />;
}

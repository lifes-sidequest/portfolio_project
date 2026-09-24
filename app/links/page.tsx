import type { Metadata } from "next";
import { IndexPage } from "./index-page";

export const metadata: Metadata = {
  title: "Links — Aziz Baratov",
  description: "Resources, credentials, and contact information for Aziz Baratov.",
};

export default function LinksRoute() {
  return <IndexPage />;
}

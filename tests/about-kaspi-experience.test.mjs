import assert from "node:assert/strict";
import test from "node:test";

import { aboutContent } from "../content/about.ts";

test("Kaspi experience includes the company introduction and four distinct contributions in both languages", () => {
  const english = aboutContent.en.experience.find((job) => job.company === "Kaspi.kz");
  const german = aboutContent.de.experience.find((job) => job.company === "Kaspi.kz");

  assert.ok(english);
  assert.ok(german);
  assert.match(english.description, /more than 16 million monthly active users/);
  assert.match(english.description, /Harvard Business School/);
  assert.deepEqual(english.highlights?.map(({ title }) => title), [
    "High-Scale Ecosystems",
    "AI Tooling & Efficiency",
    "AI Feature Integration",
    "Product Quality & Validation",
  ]);
  assert.equal(english.highlights?.every(({ text }) => text.length > 40), true);
  assert.equal(german.highlights?.length, 4);
  assert.match(german.description, /16 Millionen/);
});

test("remaining About roles show their company context and measurable contributions in both languages", () => {
  const cases = [
    { company: "Adata.kz", count: 5, details: [/2:16/, /8:19/, /266%/, /5x/, /5 designers and 3 university interns/] },
    { company: "APPLECityCorps", count: 2, details: [/FMCG/, /20%/, /P&G/, /Nestlé/] },
    { company: "THOUSAND IT GROUP", count: 2, details: [/15 million downloads/, /Design System Architecture/, /End-to-End Product Delivery/] },
  ];

  for (const { company, count, details } of cases) {
    const english = aboutContent.en.experience.find((job) => job.company === company);
    const german = aboutContent.de.experience.find((job) => job.company === company);
    assert.ok(english, `${company} English entry exists`);
    assert.ok(german, `${company} German entry exists`);
    assert.equal(english.highlights?.length, count, `${company} English contribution count`);
    assert.equal(german.highlights?.length, count, `${company} German contribution count`);
    const englishCopy = `${english.description} ${english.highlights?.map(({ title, text }) => `${title} ${text}`).join(" ")}`;
    for (const detail of details) assert.match(englishCopy, detail);
  }
});

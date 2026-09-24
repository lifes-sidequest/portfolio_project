import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteLanguage } from "../../../_components/site-preferences";

type EcosystemNode = {
  id: string;
  color: string;
  icon: string;
  label: Record<SiteLanguage, string>;
};

const nodes: EcosystemNode[] = [
  { id: "ecommerce", color: "#0089D0", icon: "/images/projects/kaspi-home/ecosystem/ecommerce.svg", label: { en: "E-commerce", de: "E-Commerce" } },
  { id: "travel", color: "#A3DB5A", icon: "/images/projects/kaspi-home/ecosystem/travel.svg", label: { en: "Travel", de: "Reisen" } },
  { id: "grocery", color: "#F50F64", icon: "/images/projects/kaspi-home/ecosystem/grocery-delivery.svg", label: { en: "Grocery delivery", de: "Lebensmittellieferung" } },
  { id: "government", color: "#00ABC2", icon: "/images/projects/kaspi-home/ecosystem/government-services.svg", label: { en: "Government services", de: "Behördendienste" } },
  { id: "fintech", color: "#D5AE6C", icon: "/images/projects/kaspi-home/ecosystem/fintech.svg", label: { en: "Fintech", de: "Fintech" } },
];

const desktopPaths = [
  "M371 280 C392 280 399 270 411 258 L590 98 Q604 82 625 82 L650 82",
  "M371 280 C392 280 399 275 411 269 L610 189 C616 187 620 181 632 181 L650 181",
  "M371 280 L650 280",
  "M371 280 C392 280 399 285 411 291 L610 371 C616 373 620 379 632 379 L650 379",
  "M371 280 C392 280 399 290 411 302 L590 462 Q604 478 625 478 L650 478",
];

const mobilePaths = [
  "M180 87 C180 103 172 111 160 123 L44 207 Q36 213 36 225 L36 232",
  "M180 87 C180 103 172 111 160 123 L112 215 C109 221 108 224 108 230 L108 232",
  "M180 87 L180 232",
  "M180 87 C180 103 188 111 200 123 L248 215 C251 221 252 224 252 230 L252 232",
  "M180 87 C180 103 188 111 200 123 L316 207 Q324 213 324 225 L324 232",
];

function Lines({ paths, trunk, className, gradientId }: { paths: string[]; trunk: string; className: string; gradientId: string }) {
  const mobile = className.includes("mobile");
  return (
    <svg className={className} viewBox={mobile ? "0 0 360 310" : "0 0 900 560"} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1={mobile ? "0" : "245"} y1={mobile ? "62" : "0"} x2={mobile ? "0" : "371"} y2={mobile ? "87" : "0"} gradientUnits="userSpaceOnUse">
          {nodes.map((node, index) => <stop key={node.id} offset={`${index * 25}%`} stopColor={node.color} />)}
        </linearGradient>
      </defs>
      <g className="kaspi-map-line-trunk">
        <path className="kaspi-map-line-base" d={trunk} />
        <path className="kaspi-map-line-flow kaspi-map-line-flow-trunk" d={trunk} pathLength="100" style={{ stroke: `url(#${gradientId})` }} />
      </g>
      <g className="kaspi-map-line-branches">
        {paths.map((path, index) => (
          <g key={path} style={{ "--line-index": index, "--line-color": nodes[index].color } as CSSProperties}>
          <path className="kaspi-map-line-base" d={path} />
          <path className="kaspi-map-line-flow" d={path} pathLength="100" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function KaspiEcosystemMap({ language }: { language: SiteLanguage }) {
  return (
    <section className="kaspi-map case-media-wide" aria-label={language === "de" ? "Kaspi.kz Ökosystem" : "Kaspi.kz ecosystem"}>
      <Lines paths={desktopPaths} trunk="M245 280 L371 280" className="kaspi-map-lines kaspi-map-lines-desktop" gradientId="kaspi-trunk-desktop" />
      <Lines paths={mobilePaths} trunk="M180 62 L180 87" className="kaspi-map-lines kaspi-map-lines-mobile" gradientId="kaspi-trunk-mobile" />

      <div className="kaspi-map-home kaspi-map-item" style={{ "--item-index": 0 } as CSSProperties}>
        <Image src="/images/projects/kaspi-home/ecosystem/main.svg" alt="" width={29} height={29} />
        <span>{language === "de" ? "Startseite" : "Home page"}</span>
      </div>

      <div className="kaspi-map-services">
        {nodes.map((node, index) => (
          <div
            className={`kaspi-map-service kaspi-map-service-${node.id} kaspi-map-item`}
            key={node.id}
            style={{ "--item-index": index + 1, "--node-color": node.color } as CSSProperties}
          >
            <Image src={node.icon} alt="" width={32} height={32} />
            <span>{node.label[language]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

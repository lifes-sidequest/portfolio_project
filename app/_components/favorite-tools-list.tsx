const toolCategories = [
  {
    key: "design",
    en: "Design",
    de: "Design",
    tools: [
      ["Figma", "/icons/tools/figma.svg", "#f24e1e"],
      ["Sketch", "/icons/tools/sketch.svg", "#f7b500"],
      ["Adobe Illustrator", "/icons/tools/adobeillustrator.svg", "#ff9a00"],
      ["Adobe Photoshop", "/icons/tools/adobephotoshop.svg", "#31a8ff"],
    ],
  },
  {
    key: "ai",
    en: "AI",
    de: "KI",
    tools: [
      ["Gemini", "/icons/tools/gemini.svg", "#8e75b2"],
      ["Claude Code", "/icons/tools/claude-code.svg", "#d97757"],
      ["Codex", "/icons/tools/codex.svg", "var(--tool-dark-logo)"],
      ["ChatGPT", "/icons/tools/chatgpt.svg", "var(--tool-dark-logo)"],
    ],
  },
  {
    key: "collaboration",
    en: "Collaboration",
    de: "Zusammenarbeit",
    tools: [
      ["Google Docs", "/icons/tools/googledocs.svg", "#4285f4"],
      ["Slack", "/icons/tools/slack.svg", "#4a154b"],
      ["Jira", "/icons/tools/jira.svg", "#0052cc"],
      ["Confluence", "/icons/tools/confluence.svg", "var(--tool-dark-logo)"],
      ["Notion", "/icons/tools/notion.svg", "var(--tool-dark-logo)"],
      ["Linear", "/icons/tools/linear.svg", "var(--tool-dark-logo)"],
    ],
  },
  {
    key: "development",
    en: "Development",
    de: "Entwicklung",
    tools: [
      ["Tailwind CSS", "/icons/tools/tailwindcss.svg", "#06b6d4"],
      ["shadcn/ui", "/icons/tools/shadcnui.svg", "var(--tool-dark-logo)"],
      ["GitHub", "/icons/tools/github.svg", "var(--tool-dark-logo)"],
      ["Vercel", "/icons/tools/vercel.svg", "var(--tool-dark-logo)"],
      ["HTML", "/icons/tools/html5.svg", "#e34f26"],
      ["CSS", "/icons/tools/css.svg", "#663399"],
    ],
  },
  {
    key: "productivity",
    en: "Productivity",
    de: "Produktivität",
    tools: [
      ["Dia", "/icons/tools/dia.svg", ""],
      ["Raycast", "/icons/tools/raycast.svg", "#ff6363"],
      ["Obsidian", "/icons/tools/obsidian.svg", "#7c3aed"],
    ],
  },
] as const;

const themeAdaptiveTools = new Set(["Sketch", "Codex", "ChatGPT", "Confluence", "Notion", "Linear", "shadcn/ui", "GitHub", "Vercel"]);

interface FavoriteToolsListProps {
  language: "en" | "de";
}

export function FavoriteToolsList({ language }: FavoriteToolsListProps) {
  return (
    <div className="tools-list scroll-reveal">
      {toolCategories.map((category) => (
        <div className="tools-category" key={category.key}>
          <p>{category[language]}</p>
          <ul aria-label={category[language]}>
            {category.tools.map(([name, icon, color]) => (
              <li key={name}>
                {themeAdaptiveTools.has(name) ? (
                  <span
                    className="tool-list-logo"
                    aria-hidden="true"
                    style={{ backgroundColor: color, WebkitMaskImage: `url(${icon})`, maskImage: `url(${icon})` }}
                  />
                ) : (
                  <img className={name === "Dia" ? "tool-logo-dia" : undefined} src={icon} alt="" aria-hidden="true" />
                )}
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

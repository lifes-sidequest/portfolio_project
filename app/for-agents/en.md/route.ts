import { getAgentProfile } from "../../../content/agent-profile";
import { renderAgentProfileMarkdown } from "../../../content/agent-profile-markdown";

export const dynamic = "force-static";

export function GET() {
  const markdown = renderAgentProfileMarkdown(getAgentProfile("en"), "https://lifes-sidequest.github.io/");
  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

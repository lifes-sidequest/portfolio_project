import { getAgentProfile } from "../../../content/agent-profile";
import { renderAgentProfileMarkdown } from "../../../content/agent-profile-markdown";

export function GET(request: Request) {
  const markdown = renderAgentProfileMarkdown(getAgentProfile("en"), request.url);
  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

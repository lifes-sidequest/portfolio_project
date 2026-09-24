"use client";

import { usePathname, useRouter } from "next/navigation";
import { safeAgentReturnPath } from "../../lib/agent-mode-return.mjs";
import { useSitePreferences } from "./site-preferences";

const returnKey = "portfolio-agent-return";

export function AgentModeSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useSitePreferences();
  const isAgentMode = pathname === "/for-agents";
  const label = isAgentMode
    ? language === "de" ? "ZUM PORTFOLIO" : "FOR HUMANS"
    : language === "de" ? "FÜR AGENTEN" : "FOR AGENTS";

  const toggle = () => {
    if (isAgentMode) {
      let destination = "/";
      try { destination = safeAgentReturnPath(window.sessionStorage.getItem(returnKey)); } catch { /* Storage may be unavailable. */ }
      router.push(destination);
      return;
    }
    try { window.sessionStorage.setItem(returnKey, pathname); } catch { /* Navigation still works without storage. */ }
    router.push("/for-agents");
  };

  return (
    <button
      type="button"
      className="agent-mode-switch"
      aria-label={`${label}: ${isAgentMode
        ? language === "de" ? "Zum visuellen Portfolio wechseln" : "Switch to visual portfolio"
        : language === "de" ? "Zur Ansicht für AI-Agenten wechseln" : "Switch to agent-readable portfolio"}`}
      aria-pressed={isAgentMode}
      onClick={toggle}
    >
      <span>{label}</span>
      <span className="agent-mode-track" aria-hidden="true"><span className="agent-mode-thumb" /></span>
    </button>
  );
}

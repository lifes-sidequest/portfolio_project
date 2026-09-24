"use client";

import { useEffect, useRef, useState } from "react";

export const portfolioEmailAddress = "baratov.aziz.h@gmail.com";

export function CopyEmailButton({ language }: { language: "en" | "de" }) {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const labels = language === "de"
    ? { idle: "Kopieren", done: "Kopiert", error: "Fehler" }
    : { idle: "Copy", done: "Copied", error: "Copy failed" };

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioEmailAddress);
      setStatus("done");
    } catch {
      setStatus("error");
    }

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <button className={`copy-email-button is-${status}`} type="button" onClick={copyEmail}>
      <span className="copy-email-icon" key={status} aria-hidden="true">
        {status === "done" ? (
          <svg viewBox="0 0 16 16"><path d="m3 8.2 3.1 3.1L13 4.7" /></svg>
        ) : status === "error" ? (
          <svg viewBox="0 0 16 16"><path d="m4 4 8 8M12 4l-8 8" /></svg>
        ) : (
          <svg viewBox="0 0 16 16"><rect x="5" y="5" width="8" height="8" rx="1.5" /><path d="M3 10V4.5C3 3.7 3.7 3 4.5 3H10" /></svg>
        )}
      </span>
      <span>{labels.idle}</span>
      <span className="copy-email-status" role="status" aria-live="polite">{status === "idle" ? "" : labels[status]}</span>
    </button>
  );
}

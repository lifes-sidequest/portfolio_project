"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type SiteLanguage = "en" | "de";
export type SiteTheme = "light" | "dark";

type SitePreferencesValue = {
  language: SiteLanguage;
  theme: SiteTheme;
  languageHasChanged: boolean;
  toggleLanguage: () => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const SitePreferencesContext = createContext<SitePreferencesValue | null>(null);

export function SitePreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [theme, setTheme] = useState<SiteTheme>("light");
  const [languageHasChanged, setLanguageHasChanged] = useState(false);
  const languageTimer = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedLanguage = window.localStorage.getItem("portfolio-language");
      const savedTheme = window.localStorage.getItem("portfolio-theme");
      const initialLanguage: SiteLanguage = savedLanguage === "de" ? "de" : "en";
      const initialTheme: SiteTheme = savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      setLanguage(initialLanguage);
      setTheme(initialTheme);
      document.documentElement.lang = initialLanguage;
      document.documentElement.dataset.theme = initialTheme;
    }, 0);
    return () => {
      window.clearTimeout(timer);
      if (languageTimer.current) window.clearTimeout(languageTimer.current);
    };
  }, []);

  const toggleLanguage = useCallback(() => {
    if (languageTimer.current) return;
    const root = document.documentElement;
    root.dataset.languageChanging = "true";
    root.dataset.languageTransition = "out";
    languageTimer.current = window.setTimeout(() => {
      setLanguage((current) => {
        const next = current === "en" ? "de" : "en";
        window.localStorage.setItem("portfolio-language", next);
        root.lang = next;
        return next;
      });
      setLanguageHasChanged(true);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        delete root.dataset.languageTransition;
      }));
      languageTimer.current = window.setTimeout(() => {
        delete root.dataset.languageChanging;
        languageTimer.current = null;
      }, 275);
    }, 275);
  }, []);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const applyTheme = () => setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      window.localStorage.setItem("portfolio-theme", next);
      document.documentElement.dataset.theme = next;
      return next;
    });
    const transitionDocument = document as Document & { startViewTransition?: (callback: () => void) => { finished: Promise<void> } };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !transitionDocument.startViewTransition) {
      applyTheme();
      return;
    }
    const root = document.documentElement;
    root.style.setProperty(
      "--theme-transition-origin",
      origin ? `${origin.x}px ${origin.y}px` : "50% 100%",
    );
    root.dataset.themeTransition = "circle-blur";
    const transition = transitionDocument.startViewTransition(applyTheme);
    transition.finished.finally(() => {
      delete root.dataset.themeTransition;
      root.style.removeProperty("--theme-transition-origin");
    });
  }, []);

  const value = useMemo<SitePreferencesValue>(() => ({
    language,
    theme,
    languageHasChanged,
    toggleLanguage,
    toggleTheme,
  }), [language, theme, languageHasChanged, toggleLanguage, toggleTheme]);

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);
  if (!context) throw new Error("useSitePreferences must be used inside SitePreferencesProvider");
  return context;
}

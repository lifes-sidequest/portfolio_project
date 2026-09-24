"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavLabel } from "./nav-label";
import { useSitePreferences } from "./site-preferences";

type HeaderControlsProps = {
  className: string;
  language: "en" | "de";
  theme: "light" | "dark";
  selectLanguage: (language: "en" | "de") => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

function EnglishFlag() {
  return <svg className="flag-icon" viewBox="0 0 60 36" aria-hidden="true"><rect width="60" height="36" fill="#012169"/><path d="M0 0 60 36M60 0 0 36" stroke="#fff" strokeWidth="8"/><path d="M0 0 60 36M60 0 0 36" stroke="#C8102E" strokeWidth="4"/><path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="12"/><path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="7"/></svg>;
}

function GermanFlag() {
  return <svg className="flag-icon" viewBox="0 0 60 36" aria-hidden="true"><path fill="#000" d="M0 0h60v12H0z"/><path fill="#D00" d="M0 12h60v12H0z"/><path fill="#FFCE00" d="M0 24h60v12H0z"/></svg>;
}

function HeaderControls({ className, language, theme, selectLanguage, toggleTheme }: HeaderControlsProps) {
  return (
    <div className={`header-controls ${className}`} aria-label="Portfolio controls">
      <a
        className="cv-control"
        href="/documents/CV_Aziz_Baratov_Product_Designer.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === "en" ? "Open CV" : "Lebenslauf öffnen"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className="download-arrow" d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
          <path className="download-tray" d="M4.5 15.75v2.25A2.25 2.25 0 0 0 6.75 20.25h10.5A2.25 2.25 0 0 0 19.5 18v-2.25" />
        </svg>
        <span>CV</span>
      </a>
      <div className="language-pill" role="group" aria-label={language === "en" ? "Language" : "Sprache"}>
        <span className={`language-pill-indicator${language === "de" ? " is-de" : ""}`} aria-hidden="true" />
        <button className="language-pill-option" type="button" onClick={() => selectLanguage("en")} aria-pressed={language === "en"}>
          <EnglishFlag /><span>EN</span>
        </button>
        <button className="language-pill-option" type="button" onClick={() => selectLanguage("de")} aria-pressed={language === "de"}>
          <GermanFlag /><span>DE</span>
        </button>
      </div>
      <button
        className="theme-control header-control-motion"
        type="button"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        }}
        aria-label={theme === "light" ? (language === "en" ? "Switch to dark theme" : "Zum dunklen Design wechseln") : (language === "en" ? "Switch to light theme" : "Zum hellen Design wechseln")}
      >
        <span className="theme-icons" aria-hidden="true">
          <svg className="sun-icon" viewBox="0 0 24 24"><path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>
          <svg className="moon-icon" viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/></svg>
        </span>
      </button>
    </div>
  );
}

const navigation = {
  en: [{ label: "Projects", hash: "projects" }, { label: "About", hash: "about" }, { label: "Shots & Inspiration", hash: "inspiration" }, { label: "Links", hash: "index" }],
  de: [{ label: "Projekte", hash: "projects" }, { label: "Über mich", hash: "about" }, { label: "Shots & Inspirationen", hash: "inspiration" }, { label: "Links", hash: "index" }],
};

export function SiteHeader({ onHome = false }: { onHome?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { language, theme, toggleLanguage, toggleTheme } = useSitePreferences();
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ready = false;
    const readyTimer = window.setTimeout(() => {
      lastScrollY.current = window.scrollY;
      ready = true;
    }, 400);
    const onScroll = () => {
      const current = window.scrollY;
      if (!ready) {
        setHidden(false);
        lastScrollY.current = current;
        return;
      }
      const delta = current - lastScrollY.current;
      if (menuOpen || current < 24 || delta < 0) setHidden(false);
      else if (delta > 0) setHidden(true);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  const href = (hash: string) => {
    if (hash === "projects") return "/projects";
    if (hash === "about") return "/about";
    if (hash === "inspiration") return "/inspiration";
    if (hash === "index") return "/links";
    return onHome ? `#${hash}` : `/#${hash}`;
  };

  const selectLanguage = (nextLanguage: "en" | "de") => {
    if (nextLanguage !== language) toggleLanguage();
  };

  return (
    <header className={`site-header${hidden ? " is-hidden" : ""}`}>
      <Link href={onHome ? "#top" : "/"} className="brand" scroll>
        <img className="brand-logo" src="/images/brand/berlin-cathedral-stamp.webp" alt="Aziz Baratov" />
      </Link>
      <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
        {navigation[language].map((item) => (
          <Link href={href(item.hash)} key={item.hash} onClick={() => setMenuOpen(false)} scroll>
            <NavLabel>{item.label}</NavLabel>
          </Link>
        ))}
        <HeaderControls className="header-controls-mobile" language={language} theme={theme} selectLanguage={selectLanguage} toggleTheme={toggleTheme} />
      </nav>
      <button
        className="menu-button"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <i /><i /><i />
      </button>
      <HeaderControls className="header-controls-desktop" language={language} theme={theme} selectLanguage={selectLanguage} toggleTheme={toggleTheme} />
    </header>
  );
}

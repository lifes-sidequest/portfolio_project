"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createGreetingQueue, waitForIntroduction } from "../../lib/site-loader.mjs";

const loaderSessionKey = "portfolio-loader-complete";

const greetings = [
  { text: "Hallo!", language: "de" },
  { text: "Hello", language: "en" },
  { text: "Bonjour", language: "fr" },
  { text: "Hola", language: "es" },
  { text: "Ciao", language: "it" },
  { text: "Olá", language: "pt" },
  { text: "こんにちは", language: "ja" },
  { text: "안녕하세요", language: "ko" },
  { text: "مرحبا", language: "ar" },
  { text: "你好", language: "zh" },
  { text: "नमस्ते", language: "hi" },
] as const;

function isOnFirstScreen(element: Element) {
  const bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0 && bounds.width > 0;
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete) return image.decode().catch(() => undefined);

  return new Promise<void>((resolve) => {
    image.addEventListener("load", () => {
      void image.decode().catch(() => undefined).then(() => resolve());
    }, { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

function waitForVideo(video: HTMLVideoElement) {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return Promise.resolve();

  return new Promise<void>((resolve) => {
    video.addEventListener("loadeddata", () => resolve(), { once: true });
    video.addEventListener("error", () => resolve(), { once: true });
  });
}

function waitForHeroArtwork() {
  const hero = document.querySelector(".hero");
  if (!hero || !isOnFirstScreen(hero)) return Promise.resolve();

  const background = getComputedStyle(hero, "::before").backgroundImage;
  const source = background.match(/url\(["']?(.+?)["']?\)/)?.[1];
  if (!source) return Promise.resolve();

  const image = new Image();
  image.src = source;
  return waitForImage(image);
}

async function waitForFirstScreen() {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"))
    .filter(isOnFirstScreen)
    .map(waitForImage);
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video"))
    .filter(isOnFirstScreen)
    .map(waitForVideo);

  await Promise.all([document.fonts.ready, waitForHeroArtwork(), ...images, ...videos]);
}

export function SiteLoader() {
  const [greetingFrame, setGreetingFrame] = useState({ current: 0, previous: null as number | null });
  const [isLeaving, setIsLeaving] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const greetingQueue = useRef<number[]>([]);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(loaderSessionKey) === "true") {
        document.documentElement.dataset.loaderComplete = "true";
        const finishFrame = window.requestAnimationFrame(() => setIsFinished(true));
        return () => window.cancelAnimationFrame(finishFrame);
      }
    } catch { /* The loader can still run when storage is unavailable. */ }

    let active = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let greetingTimer: number | null = null;

    const scheduleGreeting = () => {
      if (reducedMotion || document.hidden || greetingTimer !== null) return;
      greetingTimer = window.setTimeout(() => {
        greetingTimer = null;
        setGreetingFrame((frame) => {
          if (greetingQueue.current.length === 0) {
            greetingQueue.current = createGreetingQueue(frame.current, greetings.length);
          }
          const next = greetingQueue.current.shift() ?? frame.current;
          return { current: next, previous: frame.current };
        });
        scheduleGreeting();
      }, 520);
    };

    const pauseGreeting = () => {
      if (greetingTimer !== null) window.clearTimeout(greetingTimer);
      greetingTimer = null;
    };

    const onVisibilityChange = () => {
      if (document.hidden) pauseGreeting();
      else scheduleGreeting();
    };

    scheduleGreeting();
    document.addEventListener("visibilitychange", onVisibilityChange);

    void waitForIntroduction(waitForFirstScreen(), reducedMotion ? 0 : 1400, 3000).then(() => {
      if (!active) return;
      pauseGreeting();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      try { window.sessionStorage.setItem(loaderSessionKey, "true"); } catch { /* Ignore unavailable storage. */ }

      const root = document.documentElement;
      const finish = () => {
        root.dataset.loaderComplete = "true";
        flushSync(() => setIsFinished(true));
      };
      const transitionDocument = document as Document & {
        startViewTransition?: (callback: () => void) => { finished: Promise<void> };
      };

      if (reducedMotion || !transitionDocument.startViewTransition) {
        if (reducedMotion) finish();
        else setIsLeaving(true);
        return;
      }

      root.dataset.loaderTransition = "circle-reveal";
      const transition = transitionDocument.startViewTransition(finish);
      transition.finished.finally(() => {
        delete root.dataset.loaderTransition;
      });
    });

    return () => {
      active = false;
      pauseGreeting();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isLeaving) return;
    const finishTimer = window.setTimeout(() => {
      document.documentElement.dataset.loaderComplete = "true";
      setIsFinished(true);
    }, 700);
    return () => window.clearTimeout(finishTimer);
  }, [isLeaving]);

  if (isFinished) return null;

  const greeting = greetings[greetingFrame.current];
  const previousGreeting = greetingFrame.previous === null ? null : greetings[greetingFrame.previous];

  return (
    <div
      className={`site-loader${isLeaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <span className="site-loader-words" aria-hidden="true">
        {previousGreeting && (
          <span className="site-loader-word is-previous" key={`previous-${greetingFrame.previous}`} lang={previousGreeting.language}>
            {previousGreeting.text}
          </span>
        )}
        <span className="site-loader-word is-current" key={`current-${greetingFrame.current}`} lang={greeting.language}>
          {greeting.text}
        </span>
      </span>
    </div>
  );
}

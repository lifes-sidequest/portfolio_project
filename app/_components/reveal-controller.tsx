"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const revealFrames = new Set<number>();
    const revealTimers = new Set<number>();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const releaseRevealHint = (event: AnimationEvent) => {
      if (event.animationName !== "blur-reveal") return;
      const target = event.target;
      if (target instanceof HTMLElement && target.classList.contains("reveal-character")) {
        target.classList.add("reveal-complete");
      }
    };

    const finishScrollReveal = (event: TransitionEvent) => {
      if (event.propertyName !== "transform") return;
      const target = event.target;
      if (target instanceof HTMLElement && target.classList.contains("scroll-reveal")) {
        target.classList.remove("reveal-active");
      }
    };

    const reveal = (target: Element) => {
      if (!(target instanceof HTMLElement) || reducedMotion) {
        target.classList.remove("reveal-pending");
        return;
      }
      target.classList.add("reveal-active");
      const revealFrame = window.requestAnimationFrame(() => {
        revealFrames.delete(revealFrame);
        target.classList.remove("reveal-pending");
        const revealTimer = window.setTimeout(() => {
          revealTimers.delete(revealTimer);
          target.classList.remove("reveal-active");
        }, 900);
        revealTimers.add(revealTimer);
      });
      revealFrames.add(revealFrame);
    };

    const connect = () => {
      observer?.disconnect();
      const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          element.classList.remove("reveal-pending");
          element.classList.remove("reveal-active");
        } else if (rect.top >= window.innerHeight * 0.92) {
          element.classList.add("reveal-pending");
          observer?.observe(element);
        } else {
          element.classList.remove("reveal-pending");
          element.classList.remove("reveal-active");
        }
      });
    };

    const reconnect = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(connect);
      });
    };

    reconnect();
    document.addEventListener("animationend", releaseRevealHint);
    document.addEventListener("transitionend", finishScrollReveal);
    window.addEventListener("pageshow", reconnect);
    window.addEventListener("popstate", reconnect);

    return () => {
      window.cancelAnimationFrame(frame);
      revealFrames.forEach((revealFrame) => window.cancelAnimationFrame(revealFrame));
      revealTimers.forEach((timer) => window.clearTimeout(timer));
      observer?.disconnect();
      document.removeEventListener("animationend", releaseRevealHint);
      document.removeEventListener("transitionend", finishScrollReveal);
      window.removeEventListener("pageshow", reconnect);
      window.removeEventListener("popstate", reconnect);
    };
  }, [pathname]);

  return null;
}

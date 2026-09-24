"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { SiteHeader } from "../_components/site-header";
import { useSitePreferences } from "../_components/site-preferences";
import { getNextStampFace, getStampPointerTarget } from "../../lib/stamp-motion.mjs";

const inspirationCopy = {
  en: {
    title: "Shots & Inspiration is coming soon",
    description: "A sketchbook of visual experiments, references, and moments I’ve caught through the lens.",
    action: "Back to home",
    flipHint: "Click to flip",
  },
  de: {
    title: "Shots & Inspiration kommt bald",
    description: "Ein Skizzenbuch mit visuellen Experimenten, Referenzen und Momenten, die ich mit der Kamera eingefangen habe.",
    action: "Zurück zur Startseite",
    flipHint: "Zum Wenden klicken",
  },
} as const;

export function InspirationPage() {
  const { language } = useSitePreferences();
  const copy = inspirationCopy[language];
  const [stampFace, setStampFace] = useState<"front" | "back">("front");
  const stampRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
  const currentRef = useRef({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
  const velocityRef = useRef({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });

  const animateStamp = () => {
    const stamp = stampRef.current;
    if (!stamp) return;

    const current = currentRef.current;
    const velocity = velocityRef.current;
    const target = targetRef.current;
    let isMoving = false;

    for (const key of Object.keys(current) as Array<keyof typeof current>) {
      velocity[key] = (velocity[key] + (target[key] - current[key]) * 0.11) * 0.72;
      current[key] += velocity[key];
      if (Math.abs(target[key] - current[key]) > 0.01 || Math.abs(velocity[key]) > 0.01) isMoving = true;
    }

    stamp.style.transform = `translate3d(${current.translateX}px, ${current.translateY}px, 0) rotateX(${current.rotateX}deg) rotateY(${current.rotateY}deg)`;
    frameRef.current = isMoving ? requestAnimationFrame(animateStamp) : null;
  };

  const startAnimation = () => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animateStamp);
  };

  const canAnimateStamp = (event: ReactPointerEvent<HTMLButtonElement>) =>
    event.pointerType === "mouse" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleStampMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!canAnimateStamp(event)) return;
    targetRef.current = getStampPointerTarget(event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY);
    event.currentTarget.dataset.active = "true";
    startAnimation();
  };

  const handleStampLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    targetRef.current = { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 };
    event.currentTarget.dataset.active = "false";
    startAnimation();
  };

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <main className="inspiration-page">
      <SiteHeader />
      <section className="inspiration-empty-state" aria-labelledby="inspiration-title">
        <div className="inspiration-stamp-stage">
          <div className="inspiration-flip-hint" aria-hidden="true">
            <span className="inspiration-flip-label">
              {copy.flipHint}
              <Image className="inspiration-flip-heart" src="/images/inspiration/flip-heart.svg" alt="" width={19} height={17} />
            </span>
            <Image className="inspiration-flip-arrow" src="/images/inspiration/flip-arrow.svg" alt="" width={35} height={74} />
          </div>
          <button
            type="button"
            className="inspiration-stamp-interaction"
            data-active="false"
            aria-label={stampFace === "front" ? "Show the back of the Berlin stamp" : "Show the front of the Berlin stamp"}
            aria-pressed={stampFace === "back"}
            onClick={() => setStampFace((current) => getNextStampFace(current))}
            onPointerMove={handleStampMove}
            onPointerLeave={handleStampLeave}
          >
            <div ref={stampRef} className="inspiration-stamp-motion">
              <div className="inspiration-stamp-flipper" data-face={stampFace}>
                <img
                  className="inspiration-stamp inspiration-stamp-front"
                  src="/images/inspiration/brandenburg-stamp-web.webp"
                  alt=""
                  width={1536}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <span className="inspiration-stamp inspiration-stamp-back" aria-hidden="true">
                  <Image
                    className="inspiration-stamp-back-art"
                    src="/images/inspiration/stamp-back-web.webp"
                    alt=""
                    width={956}
                    height={500}
                  />
                </span>
              </div>
            </div>
          </button>
        </div>
        <h1 id="inspiration-title">{copy.title}</h1>
        <p>{copy.description}</p>
        <Link className="inspiration-home-button" href="/">
          <span>{copy.action}</span>
        </Link>
      </section>
    </main>
  );
}

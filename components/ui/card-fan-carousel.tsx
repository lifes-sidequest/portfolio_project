"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface CardFanItem {
  imgUrl: string;
}

interface CardFanCarouselProps {
  cards: CardFanItem[];
  className?: string;
}

const MAX_VISIBLE = 7;
const HALF = Math.floor(MAX_VISIBLE / 2);
const CARD_RATIO = 1113 / 2420;

function visibleSlots(total: number, center: number) {
  const slots = new Map<number, number>();
  const count = Math.min(total, MAX_VISIBLE);

  for (let slot = 0; slot < count; slot += 1) {
    const offset = slot - Math.floor(count / 2);
    slots.set((center + offset + total) % total, slot);
  }

  return slots;
}

export default function CardFanCarousel({ cards, className = "" }: CardFanCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previousVisibleRef = useRef<Set<number>>(new Set());
  const directionRef = useRef<"left" | "right">("right");
  const enteredRef = useRef(false);
  const lockedRef = useRef(false);
  const unlockRef = useRef<gsap.core.Tween | null>(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [centerIndex, setCenterIndex] = useState(Math.min(HALF, Math.max(0, cards.length - 1)));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [layoutVersion, setLayoutVersion] = useState(0);

  const cycle = useCallback((direction: "left" | "right") => {
    if (cards.length < 2 || lockedRef.current) return;
    lockedRef.current = true;
    directionRef.current = direction;
    setHoveredIndex(null);
    setCenterIndex((current) => direction === "right"
      ? (current + 1) % cards.length
      : (current - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const jumpTo = useCallback((index: number) => {
    if (index === centerIndex || lockedRef.current) return;
    const forward = (index - centerIndex + cards.length) % cards.length;
    const backward = (centerIndex - index + cards.length) % cards.length;
    directionRef.current = forward <= backward ? "right" : "left";
    lockedRef.current = true;
    setHoveredIndex(null);
    setCenterIndex(index);
  }, [cards.length, centerIndex]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAssetsReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px 0px" });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => setLayoutVersion((value) => value + 1));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !entered || cards.length === 0) return;

    const elements = Array.from(stage.querySelectorAll<HTMLElement>(".car-parts-fan-card"));
    const slots = visibleSlots(cards.length, centerIndex);
    const previousVisible = previousVisibleRef.current;
    const firstEntry = !enteredRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const cardHeight = Math.min(405, Math.max(185, height * 0.8));
    const cardWidth = cardHeight * CARD_RATIO;
    const visibleCount = Math.min(cards.length, MAX_VISIBLE);
    const centerSlot = Math.floor(visibleCount / 2);
    const availableWidth = Math.max(0, width - cardWidth - 32);
    const step = centerSlot > 0 ? Math.min(cardWidth * 0.72, availableWidth / (centerSlot * 2)) : 0;

    unlockRef.current?.kill();
    gsap.killTweensOf(elements);

    elements.forEach((element, cardIndex) => {
      const slot = slots.get(cardIndex);
      const wasVisible = previousVisible.has(cardIndex);

      if (slot === undefined) {
        if (wasVisible && !firstEntry) {
          const exitX = directionRef.current === "right" ? -width * 0.55 : width * 0.55;
          gsap.to(element, {
            x: exitX,
            opacity: 0,
            scale: 0.55,
            rotation: directionRef.current === "right" ? -24 : 24,
            duration: reducedMotion ? 0 : 0.38,
            ease: "power2.in",
            overwrite: true,
          });
        } else {
          gsap.set(element, { opacity: 0, pointerEvents: "none", zIndex: 0 });
        }
        return;
      }

      const distance = slot - centerSlot;
      const absoluteDistance = Math.abs(distance);
      const baseScale = 1 - 0.035 * absoluteDistance * absoluteDistance;
      const hoverDistance = hoveredIndex === null ? 0 : Math.abs(cardIndex - hoveredIndex);
      let targetX = distance * step;
      let targetY = Math.pow(absoluteDistance, 1.55) * Math.min(4, height * 0.008);
      let targetScale = baseScale;
      let targetRotation = distance * 6;
      const zIndex = 10 - absoluteDistance;

      if (hoveredIndex !== null) {
          if (cardIndex === hoveredIndex) {
            targetY -= Math.min(24, height * 0.05);
            targetScale *= 1.065;
          } else {
          const hoveredSlot = slots.get(hoveredIndex);
          if (hoveredSlot !== undefined) {
            const push = Math.max(4, 14 - hoverDistance * 2);
            targetX += slot < hoveredSlot ? -push : push;
            targetRotation += slot < hoveredSlot ? -1.5 : 1.5;
          }
        }
      }

      const target = {
        width: cardWidth,
        height: cardHeight,
        xPercent: -50,
        yPercent: -50,
        x: targetX,
        y: targetY,
        rotation: targetRotation,
        scale: targetScale,
        opacity: 1,
        zIndex,
        pointerEvents: "auto",
      };

      if (firstEntry) {
        gsap.set(element, {
          width: cardWidth,
          height: cardHeight,
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: height * 0.42,
          rotation: 0,
          scale: 0.55,
          opacity: 0,
        });
        gsap.to(element, {
          ...target,
          duration: reducedMotion ? 0 : 1.08,
          delay: reducedMotion ? 0 : 0.08 + slot * 0.055,
          ease: "elastic.out(1.03, 0.78)",
          overwrite: true,
        });
      } else if (!wasVisible) {
        gsap.set(element, {
          width: cardWidth,
          height: cardHeight,
          xPercent: -50,
          yPercent: -50,
          x: directionRef.current === "right" ? width * 0.55 : -width * 0.55,
          y: targetY,
          rotation: directionRef.current === "right" ? 24 : -24,
          scale: 0.55,
          opacity: 0,
        });
        gsap.to(element, {
          ...target,
          duration: reducedMotion ? 0 : 0.58,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        gsap.to(element, {
          ...target,
          duration: reducedMotion ? 0 : hoveredIndex === null ? 0.5 : 0.48,
          delay: reducedMotion ? 0 : hoveredIndex === null ? absoluteDistance * 0.015 : hoverDistance * 0.015,
          ease: hoveredIndex === null ? "power2.out" : "elastic.out(1, 0.78)",
          overwrite: true,
        });
      }
    });

    enteredRef.current = true;
    previousVisibleRef.current = new Set(slots.keys());
    unlockRef.current = gsap.to({}, {
      duration: reducedMotion ? 0 : firstEntry ? 1.5 : 0.65,
      onComplete: () => { lockedRef.current = false; },
    });

    return () => {
      unlockRef.current?.kill();
    };
  }, [cards.length, centerIndex, entered, hoveredIndex, layoutVersion]);

  useEffect(() => () => {
    unlockRef.current?.kill();
    if (stageRef.current) gsap.killTweensOf(stageRef.current.querySelectorAll(".car-parts-fan-card"));
  }, []);

  if (cards.length === 0) return null;

  return (
    <div ref={rootRef} className={`car-parts-fan-carousel ${className}`.trim()}>
      <div ref={stageRef} className="car-parts-fan-stage" onMouseLeave={() => setHoveredIndex(null)}>
        {cards.map((card, index) => (
          <div
            key={card.imgUrl}
            className="car-parts-fan-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => jumpTo(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                jumpTo(index);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === centerIndex ? "true" : undefined}
          >
            <img
              src={assetsReady ? card.imgUrl : undefined}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="car-parts-fan-controls">
        <button type="button" onClick={() => cycle("left")} aria-label="Previous image">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>

        <div className="car-parts-fan-dots" aria-label="Choose image">
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === centerIndex ? "is-active" : ""}
              onClick={() => jumpTo(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === centerIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button type="button" onClick={() => cycle("right")} aria-label="Next image">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

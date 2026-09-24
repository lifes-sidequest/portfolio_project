"use client";

import { useEffect, useRef } from "react";

const animalNames = [
  "tiny otter",
  "sleepy fox",
  "happy capybara",
  "cozy panda",
  "little axolotl",
  "brave penguin",
  "fluffy raccoon",
  "sunny quokka",
  "gentle bunny",
  "curious cat",
];

const cursorColors = [
  "#f0442e",
  "#7c3aed",
  "#0a66c2",
  "#ea4c89",
  "#16a34a",
  "#f59e0b",
  "#0891b2",
  "#dc2626",
];

function randomItem<T>(items: T[], previous?: T | null) {
  const choices = previous == null ? items : items.filter((item) => item !== previous);
  const value = new Uint32Array(1);
  window.crypto.getRandomValues(value);
  return choices[value[0] % choices.length];
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const previousName = window.sessionStorage.getItem("portfolio-cursor-name");
    const previousColor = window.sessionStorage.getItem("portfolio-cursor-color");
    const name = randomItem(animalNames, previousName);
    const color = randomItem(cursorColors, previousColor);
    window.sessionStorage.setItem("portfolio-cursor-name", name);
    window.sessionStorage.setItem("portfolio-cursor-color", color);

    const cursor = cursorRef.current;
    cursor?.style.setProperty("--cursor-accent", color);
    cursor?.classList.add("is-ready");
    if (labelRef.current) labelRef.current.textContent = name;
    document.documentElement.classList.add("has-custom-cursor");

    let labelPosition = { x: -100, y: -100 };
    let labelVelocity = { x: 0, y: 0 };
    let labelInitialized = false;

    const render = () => {
      const target = pointerRef.current;
      cursorRef.current?.style.setProperty("transform", `translate3d(${target.x}px, ${target.y}px, 0)`);

      if (!labelInitialized || reduceMotion) {
        labelPosition = { ...target };
        labelVelocity = { x: 0, y: 0 };
        labelInitialized = true;
      } else {
        labelVelocity.x = (labelVelocity.x + (target.x - labelPosition.x) * 0.045) * 0.748;
        labelVelocity.y = (labelVelocity.y + (target.y - labelPosition.y) * 0.045) * 0.748;
        labelPosition.x += labelVelocity.x;
        labelPosition.y += labelVelocity.y;
      }

      labelRef.current?.style.setProperty("--cursor-label-x", `${labelPosition.x - target.x}px`);
      labelRef.current?.style.setProperty("--cursor-label-y", `${labelPosition.y - target.y}px`);

      const isMoving =
        Math.abs(target.x - labelPosition.x) > 0.05 ||
        Math.abs(target.y - labelPosition.y) > 0.05 ||
        Math.abs(labelVelocity.x) > 0.05 ||
        Math.abs(labelVelocity.y) > 0.05;

      if (isMoving && !reduceMotion) {
        frameRef.current = window.requestAnimationFrame(render);
      } else {
        frameRef.current = 0;
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      cursorRef.current?.classList.add("is-visible");
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(render);
    };
    const onPointerLeave = () => cursorRef.current?.classList.remove("is-visible");
    const onPointerDown = () => cursorRef.current?.classList.add("is-pressed");
    const onPointerUp = () => cursorRef.current?.classList.remove("is-pressed");

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <span className="custom-cursor-pointer">
        <svg className="custom-cursor-icon" width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#portfolio-cursor-shadow)">
            <path d="M34.6309 29.1918C34.046 27.578 35.6321 26.0256 37.2329 26.645L66.6123 38.0126C68.4454 38.7219 68.2629 41.3731 66.3499 41.8244L53.8268 44.779C53.0989 44.9507 52.5276 45.5143 52.346 46.2398L49.2227 58.714C48.7433 60.6284 46.0748 60.7652 45.4023 58.9097L34.6309 29.1918Z" fill="currentColor" />
            <path d="M33.4561 29.6182C32.5056 26.9959 35.0823 24.4732 37.6836 25.4795L67.0635 36.8467C70.0423 37.9993 69.7454 42.3076 66.6367 43.041L54.1143 45.9951C53.8414 46.0595 53.6268 46.2711 53.5586 46.543L50.4355 59.0176C49.6566 62.1285 45.3206 62.3507 44.2275 59.3359L33.4561 29.6182Z" stroke="white" strokeWidth="2.5" />
          </g>
          <defs>
            <filter id="portfolio-cursor-shadow" x="0" y="0" width="102.391" height="102.729" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="12" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.176471 0 0 0 0 0.2 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="shadowOne" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlphaTwo" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlphaTwo" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend mode="normal" in2="shadowOne" result="shadowTwo" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlphaThree" />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="16" />
              <feComposite in2="hardAlphaThree" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.176471 0 0 0 0 0.2 0 0 0 0.1 0" />
              <feBlend mode="normal" in2="shadowTwo" result="shadowThree" />
              <feBlend mode="normal" in="SourceGraphic" in2="shadowThree" result="shape" />
            </filter>
          </defs>
        </svg>
      </span>
      <span ref={labelRef} className="custom-cursor-label" />
    </div>
  );
}

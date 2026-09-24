"use client";

import { useEffect, useRef, type ImgHTMLAttributes } from "react";

interface ViewportImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "loading" | "decoding"> {
  src: string;
  alt: string;
}

export function ViewportImage({ src, alt, ...props }: ViewportImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      image.src = src;
      observer.disconnect();
    }, { rootMargin: "400px 0px" });

    observer.observe(image);
    return () => observer.disconnect();
  }, [src]);

  return <img ref={imageRef} alt={alt} {...props} loading="lazy" decoding="async" />;
}

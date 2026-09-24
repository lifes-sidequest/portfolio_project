"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

interface ViewportVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> {
  src: string;
}

export function ViewportVideo({ src, className, poster, onPlaying, ...props }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      video.src = src;
      video.load();
    };

    const loadObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        load();
        loadObserver.disconnect();
      }
    }, { rootMargin: "400px 0px" });

    const playbackObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          load();
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      }
    }, { threshold: 0.05 });

    loadObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
      video.pause();
    };
  }, [src]);

  const video = (
    <video
      ref={videoRef}
      {...props}
      className={poster ? "viewport-video-media" : className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onPlaying={(event) => {
        setHasStarted(true);
        onPlaying?.(event);
      }}
    />
  );

  if (!poster) return video;

  return (
    <span className={`viewport-video-shell${className ? ` ${className}` : ""}${hasStarted ? " is-playing" : ""}`}>
      <img className="viewport-video-poster" src={poster} alt="" aria-hidden="true" />
      {video}
    </span>
  );
}

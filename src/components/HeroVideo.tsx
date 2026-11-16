"use client";

import { useEffect, useRef } from "react";

/**
 * Looping light-grid background for the landing hero.
 * Muted and inline so it autoplays on phones; holds on the poster frame
 * for visitors who prefer reduced motion.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) {
        video.pause();
      } else {
        video.play().catch(() => {
          /* Autoplay blocked: the poster frame stays visible. */
        });
      }
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      className="hero-media"
      poster="/hero/wyst-light-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/hero/wyst-light.mp4" type="video/mp4" />
    </video>
  );
}

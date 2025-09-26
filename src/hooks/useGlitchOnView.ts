"use client";

import { useEffect, useRef, useState } from "react";

export function useGlitchOnView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGlitching(true);
            const t = setTimeout(() => setGlitching(false), 700);
            return () => clearTimeout(t);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, glitching } as const;
}
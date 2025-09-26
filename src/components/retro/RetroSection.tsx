"use client";

import { PropsWithChildren } from "react";
import { useGlitchOnView } from "@/hooks/useGlitchOnView";

interface RetroSectionProps {
  id: string;
  title: string;
  className?: string;
}

export const RetroSection = ({ id, title, className, children }: PropsWithChildren<RetroSectionProps>) => {
  const { ref, glitching } = useGlitchOnView<HTMLDivElement>();
  return (
    <section id={id} ref={ref} className={("relative py-14 md:py-20 "+(className || ""))}>
      <div className={("transition " + (glitching ? "glitch flicker" : ""))}>
        <h2 className="pixel-mono text-xl md:text-2xl tracking-widest text-[var(--primary)] mb-6">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default RetroSection;
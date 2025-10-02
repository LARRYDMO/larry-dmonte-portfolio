"use client";
import { PropsWithChildren } from "react";

interface SectionProps { id: string; title: string; subtitle?: string; className?: string; }

export default function Section({ id, title, subtitle, className, children }: PropsWithChildren<SectionProps>) {
  return (
    <section id={id} className={`relative pt-6 pb-12 md:pt-8 md:pb-16 ${className || ""}`}>
      {title !== '' && (
        <div className="mb-6 md:mb-8 space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight ai-gradient-text">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400 max-w-prose">{subtitle}</p>}
          <div className="h-px w-24 bg-gradient-to-r from-sky-400/60 via-indigo-400/40 to-transparent" />
        </div>
      )}
      {children}
    </section>
  );
}
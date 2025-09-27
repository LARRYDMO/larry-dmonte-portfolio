"use client";

import { useState } from "react";
import RetroSection from "@/components/retro/RetroSection";
import { sfx } from "@/components/retro/Sfx";
import Link from "next/link";
import { projects, getProjectXp } from "@/lib/xp";

export default function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // projects and XP are imported from src/lib/xp

  return (
    <main className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] px-6">
      <div className="w-full max-w-6xl mx-auto py-10">
        <div className="mb-6">
          <Link className="pixel-mono text-xs underline" href="/" onClick={() => sfx.back()}>← MAIN MENU</Link>
        </div>
        <RetroSection id="projects" title="PROJECTS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group relative border border-[var(--border)] bg-[var(--card)]/40 p-4 cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--primary)]"
                onClick={() => { setExpandedProject((e) => e === p.id ? null : p.id); sfx.open(); }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="pixel-mono text-[15px] tracking-wider text-[var(--primary)]">{p.title}</h3>
                  <span className="pixel-mono text-xs opacity-80">{expandedProject === p.id ? "[-]" : "[+]"}</span>
                </div>
                <p className="pixel-mono text-xs opacity-80 mt-1">{p.stack} <span className="xp-badge">+{getProjectXp(p.id)} XP</span></p>
                {expandedProject === p.id && (
                  <div className="mt-3 animate-in fade-in-0 zoom-in-95">
                    <p className="text-sm opacity-90">{p.desc}</p>
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      {p.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                    <div className="mt-3 flex gap-4 text-sm">
                      {p.links?.github && <a className="underline" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                      {p.links?.demo && <a className="underline" href={p.links.demo} target="_blank" rel="noreferrer">Demo</a>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </RetroSection>
      </div>
    </main>
  );
}
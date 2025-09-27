"use client";

import { useState } from "react";
import RetroSection from "@/components/retro/RetroSection";
import Link from "next/link";
import { sfx } from "@/components/retro/Sfx";
import { experiences } from "@/lib/xp";

export default function ExperiencePage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] px-6">
      <div className="w-full max-w-6xl mx-auto py-10">
        <div className="mb-6">
          <Link className="pixel-mono text-xs underline" href="/" onClick={() => sfx.back()}>← MAIN MENU</Link>
        </div>

        <RetroSection id="experience" title="EXPERIENCE">
          <div className="overflow-x-auto">
            <div className="flex gap-4 w-max">
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  className="border border-[var(--border)] bg-[var(--card)]/40 px-4 py-6 min-w-[260px] text-left hover:shadow-[0_0_0_2px_var(--primary)]"
                  onClick={() => { setExpanded((v) => !v); sfx.open(); }}
                >
                  <div className="pixel-mono text-[13px] tracking-wider text-[var(--primary)]">{exp.title}</div>
                  <div className="pixel-mono text-xs opacity-80">{exp.timeframe}</div>
                  <div className="xp-badge">+{exp.xp ?? 0} XP</div>
                  {expanded && (
                    <div className="mt-3 text-sm">
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.bullets?.map((b) => <li key={b}>{b}</li>)}
                      </ul>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </RetroSection>
      </div>
    </main>
  );
}
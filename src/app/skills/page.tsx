"use client";

import RetroSection from "@/components/retro/RetroSection";
import Link from "next/link";
import { sfx } from "@/components/retro/Sfx";

const skills = {
  Languages: [
    { name: "C/C++", prof: "Advanced" },
    { name: "Java", prof: "Advanced" },
    { name: "Python", prof: "Expert" },
  ],
  Web: [
    { name: "HTML", prof: "Expert" },
    { name: "CSS", prof: "Advanced" },
    { name: "Bootstrap", prof: "Advanced" },
    { name: "PHP", prof: "Intermediate" },
    { name: "JavaScript", prof: "Advanced" },
    { name: "React.js", prof: "Advanced" },
  ],
  Databases: [
    { name: "MySQL", prof: "Advanced" },
    { name: "PostgreSQL", prof: "Intermediate" },
    { name: "MongoDB", prof: "Advanced" },
  ],
  Tools: [
    { name: "Git", prof: "Advanced" },
    { name: "VSCode", prof: "Advanced" },
    { name: "Flask", prof: "Advanced" },
    { name: "Pandas", prof: "Advanced" },
    { name: "NumPy", prof: "Advanced" },
  ],
} as const;

export default function SkillsPage() {
  return (
    <main className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] px-6">
      <div className="w-full max-w-6xl mx-auto py-10">
        <div className="mb-6">
          <Link className="pixel-mono text-xs underline" href="/" onClick={() => sfx.back()}>← MAIN MENU</Link>
        </div>
        <RetroSection id="skills" title="LANGUAGES & SKILLS">
          <div className="space-y-8">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <h4 className="pixel-mono text-sm tracking-widest text-[var(--secondary)] mb-3">{cat}</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {items.map((it) => (
                    <div key={it.name} className="group relative border border-[var(--border)] bg-[var(--card)]/40 p-4 text-center">
                      <div className="text-2xl select-none">🎮</div>
                      <div className="pixel-mono text-[11px] mt-2 truncate">{it.name}</div>
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-[var(--background)] border border-[var(--border)] px-2 py-1 text-[10px] pixel-mono">
                        {it.name} – {it.prof}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RetroSection>
      </div>
    </main>
  );
}
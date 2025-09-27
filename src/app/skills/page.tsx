"use client";

import RetroSection from "@/components/retro/RetroSection";
import Link from "next/link";
import { sfx } from "@/components/retro/Sfx";
import { skills, profToXp } from "@/lib/xp";

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
                      <div className="mt-2 text-[11px] pixel-mono opacity-90 xp-badge">+{profToXp(it.prof)} XP</div>
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
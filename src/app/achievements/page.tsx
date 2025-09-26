"use client";

import RetroSection from "@/components/retro/RetroSection";
import Link from "next/link";
import { sfx } from "@/components/retro/Sfx";

export default function AchievementsPage() {
  const achievements = [
    { name: "Finalist – GDA", detail: "Game Development Arena" },
    { name: "Finalist – SIH 2023", detail: "Smart India Hackathon" },
    { name: "Certified – OOP in Java", detail: "Certification" },
  ];

  return (
    <main className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] px-6">
      <div className="w-full max-w-6xl mx-auto py-10">
        <div className="mb-6">
          <Link className="pixel-mono text-xs underline" href="/" onClick={() => sfx.back()}>← MAIN MENU</Link>
        </div>

        <RetroSection id="achievements" title="ACHIEVEMENTS">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {achievements.map((a) => (
              <div key={a.name} className="group relative border border-[var(--border)] bg-[var(--card)]/40 p-6 text-center">
                <div className="text-3xl">🏆</div>
                <div className="pixel-mono text-xs mt-2">{a.name}</div>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-[var(--background)] border border-[var(--border)] px-2 py-1 text-[10px] pixel-mono">
                  {a.detail}
                </div>
              </div>
            ))}
          </div>
        </RetroSection>
      </div>
    </main>
  );
}
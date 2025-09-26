"use client";

import { useState } from "react";
import RetroSection from "@/components/retro/RetroSection";
import Link from "next/link";
import { sfx } from "@/components/retro/Sfx";

export default function EducationPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const nodes = [
    { id: "ssc", t: "SSC – Maharashtra State Board – 84.4%", d: "Secondary School Certificate with strong foundation in math and science." },
    { id: "hsc", t: "HSC – Maharashtra State Board – 87.83%", d: "Higher secondary with focus on PCM." },
    { id: "be", t: "B.E. Software Engineering – FRCRCE, Mumbai – GPA: 7.6/10", d: "Core CS, software engineering, projects and research." },
  ];

  return (
    <main className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] px-6">
      <div className="w-full max-w-6xl mx-auto py-10">
        <div className="mb-6">
          <Link className="pixel-mono text-xs underline" href="/" onClick={() => sfx.back()}>← MAIN MENU</Link>
        </div>

        <RetroSection id="education" title="EDUCATION">
          <div className="relative border-l border-[var(--border)] pl-6">
            {nodes.map((n) => (
              <div key={n.id} className="mb-6">
                <button
                  className="flex items-start gap-3"
                  onClick={() => { setOpenId((e) => e === n.id ? null : n.id); sfx.open(); }}
                >
                  <span className="mt-1 w-3 h-3 bg-[var(--primary)]" />
                  <span className="text-sm text-left">{n.t}</span>
                </button>
                {openId === n.id && (
                  <p className="ml-6 mt-2 text-sm opacity-90">{n.d}</p>
                )}
              </div>
            ))}
          </div>
        </RetroSection>
      </div>
    </main>
  );
}
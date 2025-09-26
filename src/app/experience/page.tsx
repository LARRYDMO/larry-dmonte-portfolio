"use client";

import { useState } from "react";
import RetroSection from "@/components/retro/RetroSection";
import Link from "next/link";
import { sfx } from "@/components/retro/Sfx";

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
              <button
                className="border border-[var(--border)] bg-[var(--card)]/40 px-4 py-6 min-w-[260px] text-left hover:shadow-[0_0_0_2px_var(--primary)]"
                onClick={() => { setExpanded((v) => !v); sfx.open(); }}
              >
                <div className="pixel-mono text-[13px] tracking-wider text-[var(--primary)]">AI Intern – Block Intelligence</div>
                <div className="pixel-mono text-xs opacity-80">Feb–May 2025</div>
                {expanded && (
                  <div className="mt-3 text-sm">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>AI-powered interior design platform (Stable Diffusion, Blender, SAM)</li>
                      <li>Inpainting + object-aware furniture editing</li>
                      <li>Modular Flask backend for AI workflows</li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          </div>
        </RetroSection>
      </div>
    </main>
  );
}
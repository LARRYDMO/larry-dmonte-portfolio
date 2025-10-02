"use client";

import Section from "@/components/Section";
import SubPageHeader from "@/components/SubPageHeader";
import { skills } from "@/lib/xp";

export default function SkillsPage() {
  return (
    <main className="ai-page min-h-screen w-full bg-slate-950 text-slate-100 px-6">
      <div className="ai-page-bg" />
      <div className="relative w-full max-w-7xl mx-auto py-10">
        <SubPageHeader title="Tech Stack" subtitle="Core languages, frameworks & tools I use to build scalable, intelligent systems." />
        <Section className="pt-2" id="skills" title="" subtitle="">
          <div className="space-y-12">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4">{cat}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {items.map(it => (
                    <div key={it.name} className="group relative glass-card p-4 flex flex-col items-start gap-2">
                      <span className="text-[13px] font-medium tracking-wide text-slate-200 group-hover:text-white">{it.name}</span>
                      <span className="text-[11px] uppercase tracking-wider text-sky-300/70">{it.prof}</span>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-tr from-sky-500/5 via-indigo-500/5 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
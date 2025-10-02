"use client";
import { useState, useMemo, useCallback } from "react";
import { experiences } from "@/lib/xp";
import Section from "@/components/Section";
import SubPageHeader from "@/components/SubPageHeader";
import { motion } from "framer-motion";
import { Modal } from "@/components/Modal";

export default function ExperiencePage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(() => experiences.find(e => e.id === openId) || null, [openId]);
  const close = useCallback(() => setOpenId(null), []);

  return (
    <main className="ai-page min-h-screen w-full bg-slate-950 text-slate-100 px-6">
      <div className="ai-page-bg" />
      <div className="relative w-full max-w-7xl mx-auto py-10">
        <SubPageHeader title="Experience" subtitle="Roles & impact – delivering AI-driven features and engineering excellence." />
        <Section className="pt-0" id="experience" title="" subtitle="">
          <div className="grid gap-6 md:grid-cols-2">
            {experiences.map(exp => (
              <motion.button
                key={exp.id}
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => setOpenId(exp.id)}
                aria-haspopup="dialog"
                aria-expanded={openId === exp.id}
                aria-controls={openId === exp.id ? `${exp.id}-exp-dialog` : undefined}
                className="text-left glass-card p-6 flex flex-col rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 hover:ring-1 hover:ring-sky-500/30 transition"
              >
                <h3 className="text-base font-semibold tracking-wide text-sky-300 group-hover:text-sky-200 transition">{exp.title}</h3>
                {exp.tech && (
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mt-1 truncate max-w-xs">{exp.tech.slice(0,5).join(', ')}</p>
                )}
                <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">{exp.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sky-300/80 group-hover:text-sky-200">View details<span aria-hidden>→</span></span>
              </motion.button>
            ))}
          </div>
        </Section>
      </div>

      <Modal open={!!active} onClose={close} title={active?.title} labelledById={active ? `${active.id}-exp-title` : undefined}>
        {active && (
          <div id={`${active.id}-exp-dialog`}>
            <p className="text-xs uppercase tracking-wider text-slate-500">{active.timeframe}</p>
            <p className="mt-3 leading-relaxed text-sm text-slate-300">{active.desc}</p>
            {active.responsibilities && (
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Contributions</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {active.responsibilities.map(r => <li key={r}>{r}</li>)}
                </ul>
              </div>
            )}
            {active.tech && (
              <div className="flex flex-wrap gap-2 pt-5">
                {active.tech.map(t => <span key={t} className="px-2.5 py-1 rounded-full bg-slate-800/70 border border-slate-700/60 text-[11px] tracking-wide text-slate-300">{t}</span>)}
              </div>
            )}
          </div>
        )}
      </Modal>
    </main>
  );
}


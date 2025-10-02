"use client";
import { useState, useCallback, useMemo } from "react";
import Section from "@/components/Section";
import SubPageHeader from "@/components/SubPageHeader";
import { motion } from "framer-motion";
import { projects } from "@/lib/xp";
import { Modal } from "@/components/Modal";

// Rewritten page: instead of in-place expanding panels + raw DOM fallbacks,
// we now open a dedicated accessible Modal for each project. This solves
// the 'pop up not showing' issue by using a single, simple state machine.

export default function ProjectsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const activeProject = useMemo(() => projects.find(p => p.id === openId) || null, [openId]);

  return (
    <main className="ai-page min-h-screen w-full bg-slate-950 text-slate-100 px-6">
      <div className="ai-page-bg" />
      <div className="relative w-full max-w-7xl mx-auto py-10">
        <SubPageHeader title="Projects" subtitle="Selected work spanning applied AI, data systems and full‑stack engineering." />
        <Section className="pt-0" id="projects" title="" subtitle="">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map(p => (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setOpenId(p.id)}
                whileHover={{ y: -4 }}
                className="text-left relative group glass-card p-6 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 rounded-xl transition ring-1 ring-transparent hover:ring-sky-500/30"
                aria-haspopup="dialog"
                aria-controls={openId === p.id ? `${p.id}-dialog` : undefined}
                aria-expanded={openId === p.id}
              >
                <h3 className="text-base font-semibold tracking-wide text-sky-300 group-hover:text-sky-200 transition">
                  {p.title}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 mt-1">{p.stack}</p>
                <p className="mt-3 text-sm line-clamp-3 text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sky-300/80 group-hover:text-sky-200">
                  View details<span aria-hidden>→</span>
                </span>
              </motion.button>
            ))}
          </div>
        </Section>
      </div>

      <Modal open={!!activeProject} onClose={close} title={activeProject?.title} labelledById={activeProject ? `${activeProject.id}-title` : undefined}>
        {activeProject && (
          <div id={`${activeProject.id}-dialog`}>
            <p className="text-xs uppercase tracking-wider text-slate-500">{activeProject.stack}</p>
            <p className="mt-3 leading-relaxed text-sm text-slate-300">{activeProject.desc}</p>
            {!!activeProject.features?.length && (
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {activeProject.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            )}
            {(activeProject.links?.github || activeProject.links?.demo) && (
              <div className="flex gap-6 text-sm pt-5">
                {activeProject.links?.github && <a className="ai-link" href={activeProject.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                {activeProject.links?.demo && <a className="ai-link" href={activeProject.links.demo} target="_blank" rel="noreferrer">Demo</a>}
              </div>
            )}
          </div>
        )}
      </Modal>
    </main>
  );
}

"use client";
import { useState } from "react";
import Section from "@/components/Section";
import SubPageHeader from "@/components/SubPageHeader";
import { motion } from "framer-motion";

export default function EducationPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const nodes = [
    { id: "ssc", t: "SSC – Maharashtra State Board – 84.4%", d: "Secondary School Certificate with strong foundation in math and science." },
    { id: "hsc", t: "HSC – Maharashtra State Board – 87.83%", d: "Higher secondary with focus on Physics, Chemistry & Mathematics." },
    { id: "be", t: "B.E. Software Engineering – FRCRCE, Mumbai – GPA: 7.6/10", d: "Core CS fundamentals, software engineering practices, AI/ML projects & applied research." },
  ];
  return (
    <main className="ai-page min-h-screen w-full bg-slate-950 text-slate-100 px-6">
      <div className="ai-page-bg" />
      <div className="relative w-full max-w-5xl mx-auto py-10">
        <SubPageHeader title="Education" subtitle="Academic path shaping my engineering & analytical foundation." />
        <Section className="pt-0" id="education" title="" subtitle="">
          <ol className="relative border-l border-slate-700/60 pl-6 ml-2">
            {nodes.map((n, idx) => {
              const open = openId === n.id;
              return (
                <motion.li
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4, ease: 'easeOut' }}
                  key={n.id} className="mb-10 last:mb-0">
                  <button onClick={() => setOpenId(o => o === n.id ? null : n.id)} className="flex items-start gap-3 text-left w-full group">
                    <span className="mt-1 h-3 w-3 rounded-full bg-gradient-to-b from-sky-400 to-indigo-500 shadow ring-2 ring-sky-500/30 group-hover:ring-indigo-500/30 transition" />
                    <span className="text-sm font-medium tracking-wide text-slate-200 group-hover:text-sky-300 transition">{n.t}</span>
                  </button>
                  {open && <p className="ml-6 mt-3 text-sm text-slate-400 leading-relaxed glass-card px-4 py-3">{n.d}</p>}
                </motion.li>
              );
            })}
          </ol>
        </Section>
      </div>
    </main>
  );
}
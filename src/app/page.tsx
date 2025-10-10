"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Stagger, FadeUp } from "@/components/anim/Stagger";
import DataStructureNav from "@/components/DataStructureNav";

export default function Home() {
  const quick = useMemo(() => [
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Achievements", href: "/achievements" },
    { label: "Education", href: "/education" },
    { label: "Resume", href: "/resume/larry_resume.pdf" },
  ], []);
  const domains = [
    { label: 'Machine Learning & Model Integration', color: 'from-sky-400 to-cyan-300' },
    { label: 'Full‑stack Engineering (API + Frontend)', color: 'from-fuchsia-400 to-pink-300' },
    { label: '.NET / ASP.NET Core', color: 'from-emerald-400 to-green-300' },
    { label: 'Observability & Performance', color: 'from-purple-400 to-indigo-300' },
  ];
  const tags = ['Python','React','Flask','MongoDB','PostgreSQL','C++','NLP','FastAPI'];

  return (
  <main className="ai-hero relative z-20 min-h-screen flex flex-col px-6 overflow-x-hidden">
      <div className="flex-1 w-full mx-auto max-w-7xl flex flex-col justify-center pt-14 md:pt-16 pb-12 md:pb-14">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start relative z-10">
        <header className="space-y-8">
          <div>
            <p className="text-sm tracking-widest text-sky-300/80 font-medium mb-4">PORTFOLIO</p>
            <motion.h1
              className="ai-gradient-title relative text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 24 }}
            >
              <span className="inline-block animate-[shine_6s_linear_infinite] bg-[linear-gradient(110deg,#38bdf8_0%,#6366f1_40%,#a855f7_60%,#38bdf8_100%)] bg-[length:200%_100%] bg-clip-text text-transparent">
                Larry Dmonte
              </span>
            </motion.h1>
            <FadeUp delay={0.1}>
            <p className="mt-5 text-base md:text-lg text-slate-300/90 max-w-prose leading-relaxed">
              <span className="text-sky-300 font-medium">AI & Full Stack Engineer</span> | Building scalable applications powered by machine learning and modern backend systems.
            </p>
            </FadeUp>
          </div>
          <Stagger className="space-y-8">
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link href="/projects" className="ai-btn-primary">View Projects</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link href="/skills" className="ai-btn-outline">Explore Skills</Link>
              </motion.div>
            </div>
            {/* DataStructureNav moved above grid for full-width layout */}
          </Stagger>
        </header>
        <section className="relative self-start">
          <div className="relative w-full lg:mt-0">
            <motion.div
              className="ai-panel backdrop-blur-xl border border-slate-700/60 bg-slate-900/40 rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 110, damping: 20 }}
            >
              <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-400 mb-5">DOMAIN MATRIX</h2>
              <ul className="space-y-3 text-slate-300 text-sm">
                {domains.map(d => (
                  <motion.li key={d.label} className="flex items-start gap-3" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-b ${d.color} shadow-[0_0_0_4px_rgba(255,255,255,0.04)]`} />
                    <span>{d.label}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((t,i) => (
                  <motion.span key={t} className="ai-chip" initial={{ opacity:0, y: 8 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.05 * i + 0.2 }}>{t}</motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        </div>
        <div className="mt-10 -mx-6 px-6 lg:mx-0 lg:px-0">
          <DataStructureNav items={quick} />
        </div>
      </div>
      <footer className="relative z-10 mt-6 md:mt-2 pb-6 flex items-center justify-center gap-6 text-[10px] tracking-wide text-slate-500">
        <a className="hover:text-sky-300 transition" href="https://github.com/LARRYDMO" target="_blank" rel="noreferrer">GitHub</a>
        <a className="hover:text-sky-300 transition" href="https://www.linkedin.com/in/larry-dmonte-262543252/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="hover:text-sky-300 transition" href="mailto:larrydmonte21@gmail.com">Email</a>
      </footer>
    </main>
  );
}
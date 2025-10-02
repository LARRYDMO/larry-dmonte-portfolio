"use client";
import Section from "@/components/Section";
import { achievements } from "@/lib/xp";
import SubPageHeader from "@/components/SubPageHeader";
import { motion } from "framer-motion";

export default function AchievementsPage() {
  return (
    <main className="ai-page min-h-screen w-full bg-slate-950 text-slate-100 px-6">
      <div className="ai-page-bg" />
      <div className="relative w-full max-w-7xl mx-auto py-10">
        <SubPageHeader title="Achievements" subtitle="Notable milestones, awards, and recognitions." />
        <Section className="pt-0" id="achievements" title="" subtitle="">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map(a => (
              <motion.div whileHover={{ y:-4 }} key={a.name} className="group relative glass-card p-5 flex flex-col overflow-hidden">
                <div className="absolute inset-px rounded-[14px] bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="relative flex flex-col gap-2">
                  <h3 className="text-sm font-semibold tracking-wide text-sky-300 leading-snug">{a.name}</h3>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">{a.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
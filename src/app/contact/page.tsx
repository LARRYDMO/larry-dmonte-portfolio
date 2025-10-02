"use client";
import Section from "@/components/Section";
import { useState } from "react";
import SubPageHeader from "@/components/SubPageHeader";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const email = fd.get("email");
    const message = fd.get("message");
    setStatus("sending");
    // For now just build a mailto: fallback (no server configured)
    try {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:larrydmonte21@gmail.com?subject=${subject}&body=${body}`;
      setTimeout(()=> setStatus("sent"), 600);
    } catch (e) { setStatus("error"); }
  };

  return (
    <main className="ai-page min-h-screen w-full bg-slate-950 text-slate-100 px-6">
      <div className="ai-page-bg" />
      <div className="relative w-full max-w-5xl mx-auto py-10">
        <SubPageHeader title="Contact" subtitle="Reach out about collaboration, internships, roles or projects." />
        <Section className="pt-0" id="contact" title="" subtitle="">
          <div className="grid gap-10 lg:gap-14 md:grid-cols-5">
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="md:col-span-3 space-y-8 glass-card p-8">
              <form onSubmit={onSubmit} className="space-y-5" aria-label="Contact form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="text-slate-300">Name</span>
                    <input required name="name" type="text" className="rounded-lg bg-slate-900/60 border border-slate-700/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="text-slate-300">Email</span>
                    <input required name="email" type="email" className="rounded-lg bg-slate-900/60 border border-slate-700/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50" />
                  </label>
                </div>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-slate-300">Message</span>
                  <textarea required name="message" rows={6} className="rounded-lg bg-slate-900/60 border border-slate-700/70 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400/50" />
                </label>
                <div className="flex items-center gap-4">
                  <button disabled={status==="sending"} type="submit" className="ai-btn-primary disabled:opacity-60 disabled:cursor-wait">{status==="sending"?"Sending...":"Send Message"}</button>
                  {status === "sent" && <span className="text-xs text-emerald-400">Opened in your mail client.</span>}
                  {status === "error" && <span className="text-xs text-rose-400">Failed. Use direct email.</span>}
                </div>
              </form>
            </motion.div>
            <motion.aside initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }} className="md:col-span-2 space-y-6 text-sm">
              <div className="glass-card p-6">
                <h3 className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">Direct</h3>
                <ul className="space-y-2">
                  <li><a className="ai-link" href="mailto:larrydmonte21@gmail.com">larrydmonte21@gmail.com</a></li>
                  <li><a className="ai-link" href="https://github.com/LARRYDMO" target="_blank" rel="noreferrer">GitHub</a></li>
                  <li><a className="ai-link" href="https://www.linkedin.com/in/larry-dmonte-262543252/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                </ul>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">Focus Areas</h3>
                <p className="text-slate-400 leading-relaxed">Applied machine learning, model integration, vector search systems, data pipelines, full‑stack product engineering and rapid prototyping.</p>
              </div>
            </motion.aside>
          </div>
        </Section>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import RetroSection from "@/components/retro/RetroSection";
import { sfx } from "@/components/retro/Sfx";
import Link from "next/link";

export default function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const projects = [
    { id: "moneymitra", title: "MoneyMitra Mobile App", stack: "React Native, Node.js, MongoDB, TypeScript", links: { github: "", demo: "" },
      desc: "Personal finance companion enabling expense tracking, insights, and budgeting.", features: ["Cross-platform RN app", "Secure auth & sync", "Charts & categorization"] },
    { id: "imvn", title: "Interpreting Minds through Visual Narratives", stack: "TrOCR, BERT, NLP, Flask", links: { github: "", demo: "" },
      desc: "Vision-language system to extract and interpret narratives from images.", features: ["OCR with TrOCR", "BERT-based text inference", "Flask APIs"] },
    { id: "ovs", title: "Online Voting System", stack: "PHP, MySQL", links: { github: "", demo: "" },
      desc: "Web-based secure voting platform for elections.", features: ["Role-based access", "Audit logs", "Encrypted ballots"] },
    { id: "movies", title: "Movie Recommender System", stack: "Flask, TF-IDF, Faiss, MovieLens", links: { github: "", demo: "" },
      desc: "Content-based movie recommendations with vector search.", features: ["TF-IDF features", "Faiss ANN index", "Interactive UI"] },
    { id: "news-sent", title: "Indian News Sentiment Analysis", stack: "LSTM, FastAPI, live headlines", links: { github: "", demo: "" },
      desc: "Realtime sentiment over Indian news streams.", features: ["LSTM classifier", "FastAPI backend", "Live feed pipeline"] },
    { id: "audio-trans", title: "Audio Translation Service", stack: "Flask, SpeechRecognition, gTTS", links: { github: "", demo: "" },
      desc: "Speech-to-speech translation microservice.", features: ["Multilingual", "Streaming input", "TTS output"] },
    { id: "speech-sent", title: "Speech Sentiment Analyzer", stack: "Flask, MongoDB, TextBlob, SpeechRecognition", links: { github: "", demo: "" },
      desc: "Analyze sentiment directly from speech.", features: ["Audio capture", "Sentiment pipeline", "Results storage"] },
  ];

  return (
    <main className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] px-6">
      <div className="w-full max-w-6xl mx-auto py-10">
        <div className="mb-6">
          <Link className="pixel-mono text-xs underline" href="/" onClick={() => sfx.back()}>← MAIN MENU</Link>
        </div>
        <RetroSection id="projects" title="PROJECTS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group border border-[var(--border)] bg-[var(--card)]/40 p-4 cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--primary)]"
                onClick={() => { setExpandedProject((e) => e === p.id ? null : p.id); sfx.open(); }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="pixel-mono text-[15px] tracking-wider text-[var(--primary)]">{p.title}</h3>
                  <span className="pixel-mono text-xs opacity-80">{expandedProject === p.id ? "[-]" : "[+]"}</span>
                </div>
                <p className="pixel-mono text-xs opacity-80 mt-1">{p.stack}</p>
                {expandedProject === p.id && (
                  <div className="mt-3 animate-in fade-in-0 zoom-in-95">
                    <p className="text-sm opacity-90">{p.desc}</p>
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      {p.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                    <div className="mt-3 flex gap-4 text-sm">
                      {p.links.github && <a className="underline" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                      {p.links.demo && <a className="underline" href={p.links.demo} target="_blank" rel="noreferrer">Demo</a>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </RetroSection>
      </div>
    </main>
  );
}
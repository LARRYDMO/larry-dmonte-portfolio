"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sfx } from "@/components/retro/Sfx";
import { useRouter } from "next/navigation";

type MenuItem = {label: string;href: string;};

export default function Home() {
  const menu: MenuItem[] = useMemo(
    () => [
    { label: "PROJECTS", href: "/projects" },
    { label: "LANGUAGES & SKILLS", href: "/skills" },
    { label: "EXPERIENCE", href: "/experience" },
    { label: "ACHIEVEMENTS", href: "/achievements" },
    { label: "EDUCATION", href: "/education" },
    { label: "PLAY GAME", href: "/game" }],

    []
  );

  const [selected, setSelected] = useState(0);
  // removed inline sections & modal states now that sections are separate pages

  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => {const v = (s + 1) % menu.length;sfx.move();return v;});
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => {const v = (s - 1 + menu.length) % menu.length;sfx.move();return v;});
      } else if (e.key === "Enter") {
        const href = menu[selected]?.href;
        if (!href) return;
        sfx.select();
        router.push(href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, selected, router]);

  return (
    <main ref={containerRef} className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-6">
      {/* Background video - using the local file placed at public/videos/gtavc.mp4 */}
      <video
        className="bg-video"
        src="/videos/gtavc.mp4"
        poster="/videos/gtavc-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
  <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
  {/* Left: Title + Menu */}
  <section className="pixel-font left-pane">
          <h1
            className="crt-glow select-none leading-[0.9]"
            style={{
              fontSize: "clamp(32px, 6vw, 84px)",
              backgroundImage:
              "linear-gradient(180deg, oklch(0.9 0.2 95) 0%, oklch(0.85 0.2 85) 40%, oklch(0.6 0.25 25) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontWeight: 700
            }}>

            Larry Dmonte
          </h1>
          <p className="pixel-mono mt-2 text-sm tracking-widest opacity-90">
            SOFTWARE ENGINEER
          </p>

          <div className="mt-10">
            <p className="pixel-mono text-xs opacity-80 mb-4">PLAY SELECT</p>
            <ul className="space-y-3">
              {menu.map((item, i) => {
                const isActive = i === selected;
                return (
                  <li key={item.href} className="flex items-center">
                    {/* Pixel cursor triangle */}
                    <span
                      aria-hidden
                      className="mr-3"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "12px solid oklch(0.9 0.2 95)",
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        opacity: isActive ? 1 : 0.35,
                        filter: isActive ? "none" : "grayscale(0.3)"
                      }} />

                    <a
                      href={item.href}
                      className={
                      "inline-block pixel-mono text-[15px] md:text-base tracking-wider transition-colors" + (
                      isActive ?
                      " text-[var(--primary)]" :
                      " text-[var(--foreground)]/85 hover:text-[var(--primary)]/90")
                      }
                      onMouseEnter={() => setSelected(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        sfx.select();
                        router.push(item.href);
                      }}>

                      {item.label}
                    </a>
                  </li>);

              })}
            </ul>

            {/* Footer mini contacts */}
            <div className="mt-6 flex items-center gap-4 text-xs pixel-mono opacity-80">
              <a href="https://github.com/LARRYDMO" target="_blank" rel="noreferrer" title="GitHub" className="hover:opacity-100 cursor-pointer">🐱</a>
              <a href="https://www.linkedin.com/in/larry-dmonte-262543252/" target="_blank" rel="noreferrer" title="LinkedIn" className="hover:opacity-100 cursor-pointer">in</a>
              <a href="mailto:larrydmonte21@gmail.com" title="Email" className="hover:opacity-100 cursor-pointer">✉️ larrydmonte21@gmail.com</a>
            </div>
          </div>


        </section>

        {/* Right: Character */}
        <section className="relative select-none right-pane flex items-center justify-center">
          <div className="flex items-center gap-6 right-pane-inner w-full justify-center">
            <div className="character-plate flex justify-center items-center p-4 md:p-6">
              {/* Flip card: hover/focus/click to reveal stats & power-ups */}
              <FlipCard />
            </div>

            {/* pizza stack image removed (deleted) */}

          </div>
        </section>
      </div>

      {/* Sections removed in favor of dedicated routes */}
    </main>);
}

function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [autoUnflipMs, setAutoUnflipMs] = useState<number>(() => {
    try {
      const v = typeof window !== 'undefined' ? parseInt(localStorage.getItem('flipAutoUnflipMs') || '6000', 10) : 6000;
      return isNaN(v) ? 6000 : v;
    } catch (e) { return 6000; }
  });

  // Timer helpers to auto-unflip after a short duration
  const clearTimer = () => { if (timerRef.current) { window.clearTimeout(timerRef.current); timerRef.current = null; } };
  const setFlippedState = (next: boolean) => {
    setFlipped(next);
    clearTimer();
    if (next) {
      // auto-unflip after configured ms
      timerRef.current = window.setTimeout(() => setFlipped(false), autoUnflipMs) as unknown as number;
    }
  };

  // Toggle on click/tap for mobile; hover will handle desktop via CSS
  const onToggle = () => setFlippedState(!flipped);

  useEffect(() => {
    return () => { clearTimer(); };
  }, []);

  useEffect(() => {
    try { localStorage.setItem('flipAutoUnflipMs', String(autoUnflipMs)); } catch (e) { /* ignore */ }
    // if currently flipped, restart timer with new value
    if (flipped) {
      clearTimer();
      timerRef.current = window.setTimeout(() => setFlipped(false), autoUnflipMs) as unknown as number;
    }
  }, [autoUnflipMs]);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onClick={onToggle}
      onMouseLeave={() => setFlippedState(false)}
      onBlur={() => setFlippedState(false)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      className={"flip-card " + (flipped ? "is-flipped" : "")}
      aria-pressed={flipped}
      role="button"
      title="Toggle stats"
    >
      {/* small config toggle */}
      <button
        aria-label="Flip card settings"
        className="flip-config-toggle"
        onClick={(e) => { e.stopPropagation(); setShowConfig((s) => !s); }}
        onKeyDown={(e) => e.stopPropagation() }
        >
        ⚙
      </button>
      {showConfig && (
        <div className="flip-config-panel" onClick={(e) => e.stopPropagation()}>
          <label className="pixel-mono" style={{fontSize: '0.9rem'}}>Auto-unflip: <strong>{(autoUnflipMs/1000).toFixed(1)}s</strong></label>
          <input
            aria-label="Auto unflip timeout"
            type="range"
            min={1000}
            max={15000}
            step={500}
            value={autoUnflipMs}
            onChange={(e) => setAutoUnflipMs(parseInt((e.target as HTMLInputElement).value, 10))}
          />
        </div>
      )}
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={"https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/b496280d-59db-4ad8-97e2-8f6c906df0a5/visual-edit-uploads/1758826066713-ku875oku8kb.png"}
            alt="Pixel character holding game controller"
            className="pixelated character-img"
            width={360}
            height={460}
            style={{ imageRendering: "pixelated" as const }} />
        </div>
        <div className="flip-card-back">
          <div className="stats-card">
            <h3 className="pixel-font">Stats & Power-ups</h3>
            <div className="stat">
              <div className="stat-label">Health</div>
              <div className="stat-bar"><div className="stat-fill health" style={{width: '96%'}} aria-valuenow={96}></div></div>
              <div className="stat-meta">Problem Solving</div>
            </div>
            <div className="stat">
              <div className="stat-label">Strength</div>
              <div className="stat-bar"><div className="stat-fill strength" style={{width: '88%'}} aria-valuenow={88}></div></div>
              <div className="stat-meta">DSA</div>
            </div>
            <div className="stat">
              <div className="stat-label">Speed</div>
              <div className="stat-bar"><div className="stat-fill speed" style={{width: '82%'}} aria-valuenow={82}></div></div>
              <div className="stat-meta">Debugging</div>
            </div>
            <div className="stat">
              <div className="stat-label">Special Move</div>
              <div className="stat-bar"><div className="stat-fill special" style={{width: '76%'}} aria-valuenow={76}></div></div>
              <div className="stat-meta">AI / ML</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
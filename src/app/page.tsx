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
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Title + Menu */}
        <section className="pixel-font">
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
              <a href="https://linkedin.com/in/larry-dmonte" target="_blank" rel="noreferrer" title="LinkedIn" className="hover:opacity-100 cursor-pointer">in</a>
              <a href="mailto:larrydmonte21@gmail.com" title="Email" className="hover:opacity-100 cursor-pointer">✉️ larrydmonte21@gmail.com</a>
            </div>
          </div>

          {/* Bottom copy */}
          <div className="mt-14 text-center md:text-left">
            <p className="pixel-mono text-xs opacity-80">PORTFOLIO SYSTEM V1.0</p>
            <p className="pixel-mono mt-1 text-sm blink" style={{ color: "oklch(0.7 0.25 25)" }}>
              PRESS START
            </p>
          </div>
        </section>

        {/* Right: Character + Pizza stack */}
        <section className="relative select-none flex items-end justify-center md:justify-start">
          <div className="flex items-end gap-6">
            <img
              src={"https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/b496280d-59db-4ad8-97e2-8f6c906df0a5/visual-edit-uploads/1758826066713-ku875oku8kb.png"
              }
              alt="Pixel character holding game controller"
              className="pixelated !w-[280px] !h-full !max-w-[280px] !bg-none !bg-cover !bg-center"
              width={280}
              height={360}
              style={{ imageRendering: "pixelated" as const }} />

            <img
              src={""



              }
              alt="Stack of pixel pizza boxes"
              className="pixelated"
              width={160}
              height={260}
              style={{ imageRendering: "pixelated" as const }} />

          </div>
        </section>
      </div>

      {/* Sections removed in favor of dedicated routes */}
    </main>);
}
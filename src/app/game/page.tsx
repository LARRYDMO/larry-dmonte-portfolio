"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
// Lightweight inline SFX (replacing deprecated retro Sfx import)
const sfx = (() => {
  let ctx: AudioContext | null = null;
  const ensure = () => {
    if (typeof window === 'undefined') return null;
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    return ctx;
  };
  const beep = (freq: number, duration=0.08, volume=0.05) => {
    const ac = ensure(); if (!ac) return;
    const osc = ac.createOscillator(); const gain = ac.createGain();
    osc.type = 'square'; osc.frequency.value = freq; gain.gain.value = volume;
    osc.connect(gain); gain.connect(ac.destination); osc.start(); osc.stop(ac.currentTime + duration);
  };
  return {
    back: () => beep(200,0.1,0.06),
    select: () => beep(280,0.12,0.06),
  };
})();

export default function GamePage() {
  return (
    <main className="scanlines min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] px-4">
      <div className="w-full max-w-4xl mx-auto py-4">
        <div className="mb-4 flex items-center justify-between">
          <Link className="pixel-mono text-xs underline" href="/" onClick={() => sfx.back()}>← MAIN MENU</Link>
          <div className="pixel-mono text-xs opacity-80">Press Esc to exit</div>
        </div>
        <section className="border border-[var(--border)] bg-[var(--card)] p-3">
          <h2 className="pixel-mono text-lg md:text-xl tracking-widest text-[var(--primary)] mb-3">SNAKE</h2>
          <SnakeGame />
        </section>
      </div>
    </main>
  );
}

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const snakeRef = useRef<{ x: number; y: number }[]>([{ x: 8, y: 8 }]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 12, y: 8 });
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Navigate back to main menu
        window.history.length > 1 ? window.history.back() : (window.location.href = "/");
        return;
      }
      if (e.key === "ArrowUp" && dirRef.current.y !== 1) dirRef.current = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && dirRef.current.y !== -1) dirRef.current = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && dirRef.current.x !== 1) dirRef.current = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && dirRef.current.x !== -1) dirRef.current = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const size = 20; // grid 20x20
    const px = 14; // pixel size

    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, px * size, px * size);
      // food
      ctx.fillStyle = "#e74c3c";
      ctx.fillRect(foodRef.current.x * px, foodRef.current.y * px, px, px);
      // snake
      ctx.fillStyle = "#f1c40f";
      snakeRef.current.forEach((s) => ctx.fillRect(s.x * px, s.y * px, px, px));
    };

    const step = () => {
      const head = { ...snakeRef.current[0] };
      head.x += dirRef.current.x;
      head.y += dirRef.current.y;
      // wrap
      head.x = (head.x + size) % size;
      head.y = (head.y + size) % size;
      // collision with self
      if (snakeRef.current.some((s, i) => i > 0 && s.x === head.x && s.y === head.y)) {
        sfx.back();
        setScore(0);
        snakeRef.current = [{ x: 8, y: 8 }];
        dirRef.current = { x: 1, y: 0 };
      }
      snakeRef.current = [head, ...snakeRef.current];
      // eat
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((s) => s + 1);
        sfx.select();
        foodRef.current = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
      } else {
        snakeRef.current.pop();
      }
      draw();
    };

    tickRef.current = window.setInterval(step, 120);
    draw();
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={280} height={280} className="max-w-full h-auto border border-[var(--border)] mx-auto" style={{maxWidth: "min(280px, 80vw)", maxHeight: "min(280px, 60vh)"}} />
      <div className="pixel-mono text-xs mt-2">Score: {score}</div>
    </div>
  );
}
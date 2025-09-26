"use client";

let ctx: AudioContext | null = null;

function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

export function beep({ freq = 440, duration = 0.08, type = "square", volume = 0.06 }: { freq?: number; duration?: number; type?: OscillatorType; volume?: number; }) {
  const ac = ensureCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration);
}

export const sfx = {
  move() { beep({ freq: 680, duration: 0.05 }); },
  select() { beep({ freq: 280, duration: 0.12 }); },
  open() { beep({ freq: 520, duration: 0.15 }); },
  back() { beep({ freq: 200, duration: 0.1 }); },
};
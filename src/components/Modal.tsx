"use client";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  labelledById?: string;
}

export function Modal({ open, onClose, title, children, labelledById }: ModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Guard for SSR
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  if (isBrowser && !containerRef.current) {
    containerRef.current = document.createElement('div');
  }

  useEffect(() => {
    if (!isBrowser) return;
    const node = containerRef.current!;
    if (open) {
      document.body.appendChild(node);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', keyHandler);
      return () => {
        window.removeEventListener('keydown', keyHandler);
        document.body.style.overflow = prevOverflow;
        if (node.parentNode) node.parentNode.removeChild(node);
      };
    }
  }, [open, onClose, isBrowser]);

  if (!open || !isBrowser || !containerRef.current) return null;

  return createPortal(
    <div aria-modal="true" role="dialog" aria-labelledby={labelledById} className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl md:max-w-3xl rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-900/80 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.6),0_0_0_1px_rgba(56,189,248,0.25)] p-8 animate-[modalIn_.35s_ease]">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-slate-800/70 border border-slate-600/60 text-slate-300 hover:text-sky-200 hover:border-sky-400/50 hover:bg-slate-800/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60" aria-label="Close modal">
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
        {title && <h2 id={labelledById} className="text-sky-300 text-lg font-semibold tracking-wide mb-4">{title}</h2>}
        <div className="space-y-6 text-slate-300">{children}</div>
      </div>
      <style jsx>{`
        @keyframes modalIn_ { from { opacity:0; transform: translateY(16px) scale(.96);} to { opacity:1; transform: translateY(0) scale(1);} }
      `}</style>
    </div>,
    containerRef.current
  );
}

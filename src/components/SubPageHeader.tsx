"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Reverted to original single‑row pill navigation (user preferred previous design).
// Added Resume (external) link at the end; Contact remains removed.
interface NavItem { label: string; href: string; external?: boolean; }
const links: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Education", href: "/education" },
  { label: "Resume", href: "/resume/larry_resume.pdf", external: true },
];

export default function SubPageHeader({ title, subtitle }: { title: string; subtitle?: string; }) {
  const pathname = usePathname();
  return (
    <motion.header
      className="mb-4 flex flex-col gap-5 md:gap-5"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div>
        <Link href="/" className="group inline-flex items-center gap-1 text-xs font-medium tracking-wide text-sky-300/70 hover:text-sky-300 transition">
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Home
        </Link>
        <h1 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-slate-400 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
      <nav className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide relative">
        {links.map(l => {
          const active = !l.external && pathname === l.href;
          const classes = `group relative inline-flex items-center rounded-full px-4 py-1.5 border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${active ? 'text-sky-100' : 'text-slate-400/80 hover:text-sky-200'} ${active ? 'border-sky-500/60' : 'border-slate-700/70 hover:border-sky-500/40'} ${active ? 'bg-gradient-to-r from-sky-500/25 to-indigo-500/25 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]' : 'bg-slate-800/40 hover:bg-slate-700/40'}`;
          if (l.external) {
            return (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                <span className="relative z-10 tracking-wide flex items-center gap-1">{l.label}<span className="text-slate-400/70 group-hover:text-sky-300 text-[10px]" aria-hidden>↗</span></span>
              </a>
            );
          }
          return (
            <Link
              key={l.href}
              href={l.href}
              className={classes}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/30 to-indigo-500/30 backdrop-blur-[1px] border border-sky-500/50" aria-hidden
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                />
              )}
              <span className="relative z-10 tracking-wide">{l.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}

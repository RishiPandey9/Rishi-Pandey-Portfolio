"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ArrowSquareOut } from "@phosphor-icons/react";

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className="group relative border border-white/[0.07] bg-[#111] overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <div className="relative h-44 bg-[#0d0d0d] overflow-hidden">
        <div
          className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(220,38,38,${0.08 + i * 0.02}) 0%, transparent 70%), linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="white">
            <rect x="20" y="20" width="70" height="50" rx="4" opacity="0.4"/>
            <rect x="110" y="20" width="70" height="50" rx="4" opacity="0.3"/>
            <rect x="20" y="90" width="160" height="8" rx="2" opacity="0.2"/>
            <rect x="20" y="106" width="120" height="8" rx="2" opacity="0.15"/>
          </svg>
        </div>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${p.name}`}
            className="absolute top-3 right-3 w-7 h-7 bg-[#0a0a0a]/80 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ArrowSquareOut size={12} weight="bold" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[#dc2626] text-xs font-mono font-bold">{p.id}</p>
          <span className="text-[9px] font-mono tracking-[0.15em] text-white/20 uppercase">{p.category}</span>
        </div>
        <h3 className="font-black text-sm tracking-tight text-white uppercase">{p.name}</h3>
        <p className="text-[12px] text-white/40 leading-relaxed flex-1">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
          {p.technologies.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[9px] font-mono text-white/35 border border-white/[0.08] bg-white/[0.03]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative bg-[#0a0a0a] text-foreground py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dc2626]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
              FEATURED PROJECTS
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tighter text-white">SELECTED WORK</h2>
          </div>
          <a
            href="#projects"
            className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/30 hover:text-[#dc2626] transition-colors uppercase"
          >
            VIEW ALL PROJECTS
            <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
              <path d="M1 13L13 1M13 1H5M13 1V9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

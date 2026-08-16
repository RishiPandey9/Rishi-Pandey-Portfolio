"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects as localProjects } from "@/lib/data";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { loadProjects, type PortfolioProject } from "@/lib/firebase/projects";
import { ArrowSquareOut } from "@phosphor-icons/react";

function ProjectCard({ p, i }: { p: PortfolioProject; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.9", "start 0.28"],
  });
  const fromX = i % 2 === 0 ? -180 : 180;
  const x = useTransform(scrollYProgress, [0, 1], [fromX, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ x, opacity, scale, zIndex: i + 1 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      className="sticky top-24 mx-auto flex min-h-[520px] w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-[#101010] transition-[border-color,box-shadow] duration-500 hover:border-[#d63d21]/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] md:flex-row"
    >
      {/* Image area */}
      <div className="relative h-72 overflow-hidden bg-[#0d0d0d] md:h-auto md:w-[48%]">
        {p.image ? (
          <div
            className="absolute left-5 right-5 top-1/2 aspect-[16/10] -translate-y-1/2 rounded-xl border border-white/10 bg-contain bg-center bg-no-repeat shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ backgroundImage: `url(${p.image})`, backgroundColor: p.image.endsWith(".svg") ? "#101312" : "#f3eee8" }}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(105,166,91,${0.08 + i * 0.02}) 0%, transparent 70%), linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)` }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
              <svg viewBox="0 0 200 160" className="h-full w-full" fill="white">
                <rect x="20" y="20" width="70" height="50" rx="4" opacity="0.4"/>
                <rect x="110" y="20" width="70" height="50" rx="4" opacity="0.3"/>
                <rect x="20" y="90" width="160" height="8" rx="2" opacity="0.2"/>
                <rect x="20" y="106" width="120" height="8" rx="2" opacity="0.15"/>
              </svg>
            </div>
          </>
        )}
        {p.image && <div className="absolute inset-0 bg-gradient-to-r from-[#040403]/[0.02] via-transparent to-[#040403]/[0.2]" />}
        <span className="absolute bottom-5 left-6 border border-black/10 bg-[#f3eee8]/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#040403]/55 backdrop-blur-sm">Project preview</span>
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
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-9">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-xs font-bold text-[#d63d21]">{p.id}</p>
          <span className="text-[9px] font-mono tracking-[0.15em] text-white/20 uppercase">{p.category}</span>
        </div>
        <h3 className="max-w-xl text-2xl font-black uppercase tracking-[-0.04em] text-white md:text-4xl">{p.name}</h3>
        <p className="max-w-xl flex-1 text-sm leading-relaxed text-white/40">{p.description}</p>
        {(p.role || p.scope) && (
          <div className="grid gap-3 border-y border-white/[0.06] py-4 sm:grid-cols-2">
            {p.role && <div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">Role</p><p className="mt-1 text-xs text-white/70">{p.role}</p></div>}
            {p.scope && <div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">Scope</p><p className="mt-1 text-xs text-white/70">{p.scope}</p></div>}
          </div>
        )}
        {p.highlights && <ul className="grid gap-2 text-xs leading-5 text-white/45 sm:grid-cols-3">{p.highlights.map((highlight) => <li key={highlight} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-[#69a65b]" />{highlight}</li>)}</ul>}
        <div className="flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
          {p.technologies.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[9px] font-mono text-white/35 border border-white/[0.08] bg-white/[0.03]">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 pt-2">
          {p.link ? (
            <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#69a65b] transition-colors hover:text-white">
              View live project <ArrowSquareOut size={13} weight="bold" />
            </a>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">Live link pending</span>
          )}
          {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-[0.16em] text-white/35 hover:text-white">Source</a>}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<PortfolioProject[]>(localProjects.map((project, index) => ({ ...project, order: index })));

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    void loadProjects(
      (remoteProjects) => {
        const visibleProjects = remoteProjects.filter((project) => !project.name.toLowerCase().includes("portfolio"));
        if (visibleProjects.length > 0) setProjects(visibleProjects);
      },
      () => undefined,
    );
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#040403] py-32 text-foreground md:py-40">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#69a65b]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#d63d21]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d63d21]" />
              FEATURED PROJECTS
            </p>
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.82] tracking-[-0.08em] text-white">SELECTED<br />WORK<span className="text-[#69a65b]">.</span></h2>
          </div>
          <a
            href="#projects"
            className="hidden items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase transition-colors hover:text-[#69a65b] md:flex"
          >
            VIEW ALL PROJECTS
            <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
              <path d="M1 13L13 1M13 1H5M13 1V9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        <div className="mx-auto flex max-w-5xl flex-col gap-[28vh] pb-[35vh] md:gap-[38vh]">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  Atom,
  BracketsCurly,
  Cloud,
  Code,
  Cube,
  Database,
  FigmaLogo,
  GitBranch,
  Lightning,
  Sparkle,
  TerminalWindow,
  Triangle,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { technologies } from "@/lib/data";

const iconMap = {
  React: Atom,
  "Next.js": Triangle,
  TypeScript: BracketsCurly,
  "Node.js": TerminalWindow,
  Python: Code,
  PostgreSQL: Database,
  Prisma: Cube,
  OpenAI: Sparkle,
  AWS: Cloud,
  Docker: Cube,
  Git: GitBranch,
  Figma: FigmaLogo,
  "Framer Motion": Lightning,
} as const;

const firstLayer = technologies.slice(0, 7);
const secondLayer = technologies.slice(7);

function TechCard({ name, index }: { name: string; index: number }) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Code;

  return (
    <div className="group flex min-w-[178px] shrink-0 items-center gap-4 rounded-[1.25rem] border border-black/[0.08] bg-[#fffdfa] px-5 py-4 transition-[border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#69a65b]/60 hover:shadow-[0_18px_35px_rgba(4,4,3,0.08)]">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#040403] text-[#f3eee8] transition-colors duration-200 group-hover:bg-[#69a65b] group-hover:text-[#040403]">
        <Icon size={19} weight="duotone" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="mb-1 block font-mono text-[9px] tracking-[0.2em] text-black/35">0{index + 1}</span>
        <span className="block text-[13px] font-semibold tracking-tight text-[#040403]/75 group-hover:text-[#040403]">{name}</span>
      </span>
    </div>
  );
}

function TechLayer({ items, reverse = false }: { items: typeof technologies; reverse?: boolean }) {
  const loop = [...items, ...items];

  return (
    <div className="tech-layer relative overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0}>
      <div className={`tech-track flex w-max gap-4 px-6 md:gap-5 md:px-10 ${reverse ? "tech-track-reverse" : ""}`}>
        {loop.map((tech, index) => (
          <TechCard key={`${tech.name}-${index}`} name={tech.name} index={index % items.length} />
        ))}
      </div>
    </div>
  );
}

export function TechEcosystem() {
  return (
    <section className="relative overflow-hidden bg-[#f3eee8] py-32 text-[#040403] md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="mx-auto mb-14 max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#d63d21]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d63d21]" />
            Technology ecosystem
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#69a65b]" />
        </motion.div>
        <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[0.92] tracking-[-0.055em] md:text-6xl">
            Tools for turning<br />
            <span className="text-black/25">complexity into clarity.</span>
          </h2>
          <p className="max-w-xs text-sm leading-6 text-black/50">
            A focused working stack for thoughtful products, intelligent systems, and dependable digital experiences.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-24 h-24 w-px bg-[#69a65b] md:right-10" />
      <div className="space-y-4" aria-label="Technology ecosystem">
        <TechLayer items={firstLayer} />
        <TechLayer items={secondLayer} reverse />
      </div>
    </section>
  );
}

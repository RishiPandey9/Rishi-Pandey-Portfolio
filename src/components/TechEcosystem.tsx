"use client";

import { motion } from "framer-motion";
import { technologies } from "@/lib/data";

export function TechEcosystem() {
  return (
    <section className="relative bg-[#f5f5f5] text-[#0a0a0a] py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            TECHNOLOGY ECOSYSTEM
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
        </motion.div>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f5f5f5, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f5f5f5, transparent)" }} />

        <div className="flex gap-8 overflow-x-auto px-6 pb-2 whitespace-nowrap [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group flex shrink-0 items-center gap-3 rounded-full border border-black/[0.08] bg-white/60 px-5 py-3 transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#dc2626]/30"
            >
              <span className="text-base opacity-60 group-hover:opacity-100 transition-opacity">{tech.icon}</span>
              <span className="text-[12px] font-semibold text-[#0a0a0a]/60 group-hover:text-[#0a0a0a] transition-colors tracking-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { technologies } from "@/lib/data";

export function TechEcosystem() {
  const doubled = [...technologies, ...technologies];

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

        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-3 px-5 py-3 border border-black/[0.08] bg-white/60 shrink-0 hover:border-[#dc2626]/30 transition-colors duration-200 group"
            >
              <span className="text-base opacity-60 group-hover:opacity-100 transition-opacity">{tech.icon}</span>
              <span className="text-[12px] font-semibold text-[#0a0a0a]/60 group-hover:text-[#0a0a0a] transition-colors tracking-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { journeyStats } from "@/lib/data";

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] as const } },
};

const TIER_COLORS: Record<string, string> = {
  Rare: "bg-blue-500",
  Epic: "bg-purple-500",
  Mythic: "bg-[#dc2626]",
};

export function Stats() {
  return (
    <section className="relative bg-[#0a0a0a] text-foreground py-20 overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dc2626]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            STATS DEFINING
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white">
            THE JOURNEY
            <span className="text-white/20 ml-2">·</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Card 1: Projects Shipped with line chart */}
          <motion.div variants={card} className="border border-white/[0.08] bg-[#111] p-6 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-1">Trade Volume (Code)</p>
              <p className="text-4xl font-black text-white tracking-tighter">10+</p>
              <p className="text-[11px] text-white/30 mt-1">Projects Shipped</p>
            </div>
            {/* Mini line chart */}
            <svg viewBox="0 0 120 40" className="w-full" preserveAspectRatio="none">
              <polyline
                points="0,38 20,30 40,22 55,28 70,15 90,8 120,2"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="120" cy="2" r="3" fill="#dc2626" />
            </svg>
          </motion.div>

          {/* Card 2: Rarity System */}
          <motion.div variants={card} className="border border-white/[0.08] bg-[#111] p-6 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-1">Rarity System</p>
              <p className="text-4xl font-black text-white tracking-tighter">3</p>
              <p className="text-[11px] text-white/30 mt-1">Tiers</p>
            </div>
            <div className="flex flex-col gap-2">
              {["Rare", "Epic", "Mythic"].map((tier) => (
                <div key={tier} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${TIER_COLORS[tier]}`} />
                  <span className="text-[12px] text-white/70 font-medium">{tier}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Total Technologies */}
          <motion.div variants={card} className="border border-white/[0.08] bg-[#111] p-6 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-1">Technologies Mastered</p>
              <p className="text-4xl font-black text-white tracking-tighter">20+</p>
              <p className="text-[11px] text-white/30 mt-1">Tools &amp; Frameworks</p>
            </div>
            {/* Avatar-style dots */}
            <div className="flex gap-1.5 flex-wrap">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center text-[8px] text-white/30 font-mono"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Unique Clients */}
          <motion.div variants={card} className="border border-white/[0.08] bg-[#111] p-6 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-1">Unique Clients</p>
              <p className="text-4xl font-black text-white tracking-tighter">5+</p>
              <p className="text-[11px] text-white/30 mt-1">Satisfied Partners</p>
            </div>
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#111] bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-[10px] text-white/50 font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

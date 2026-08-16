"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Image from "next/image";
import { At, Check, Crosshair, MapPin, Translate, Clock } from "@phosphor-icons/react";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

export function About() {
  return (
    <section id="about" className="relative bg-[#f5f5f5] text-[#0a0a0a] overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-24 grid grid-cols-1 lg:grid-cols-[420px_1fr_280px] gap-10 lg:gap-16 items-start">
        {/* Left: portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[500px] rounded-[2rem] border border-black/10 bg-black/[0.03] p-2 lg:h-[560px]"
        >
          <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-[#d9dde0]">
            <Image
              src="/profile.png"
              alt="Portrait of Rishi Pandey"
              fill
              className="object-cover object-top grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/70">RISHI / ENGINEER</p>
              <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_16px_rgba(220,38,38,0.7)]" />
            </div>
          </div>
        </motion.div>

        {/* Center: bio */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6 pt-2"
        >
          <motion.p variants={reveal} className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-3">
            <span className="w-5 h-px bg-[#dc2626]" />
            ABOUT ME
          </motion.p>

          <motion.h2 variants={reveal} className="text-[clamp(1.9rem,3.5vw,2.8rem)] font-black leading-tight tracking-tighter">
            TURNING IDEAS INTO<br />
            INTELLIGENT <span className="text-[#dc2626]">DIGITAL PRODUCTS.</span>
          </motion.h2>

          <motion.p variants={reveal} className="text-[#0a0a0a]/55 text-[0.95rem] leading-relaxed max-w-[52ch]">
            {personalInfo.about}
          </motion.p>

          {/* Signature */}
          <motion.div variants={reveal} className="pt-2">
            <p
              className="text-[#0a0a0a]/50 text-2xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
            >
              {personalInfo.signature}
            </p>
          </motion.div>
        </motion.div>

        {/* Right: info card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-[1.5rem] border border-[#0a0a0a]/10 bg-white p-6 flex flex-col gap-4"
        >
          {[
            { icon: MapPin, label: "BASED IN", value: personalInfo.location },
            { icon: Check, label: "AVAILABLE FOR", value: personalInfo.availability },
            { icon: At, label: "EMAIL", value: personalInfo.email },
            { icon: Crosshair, label: "FOCUS", value: personalInfo.focus },
            { icon: Translate, label: "LANGUAGES", value: personalInfo.languages },
            { icon: Clock, label: "TIMEZONE", value: personalInfo.timezone },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-3 items-start pb-4 border-b border-black/[0.06] last:border-0 last:pb-0">
              <Icon size={17} weight="light" className="mt-0.5 shrink-0 text-[#dc2626]" />
              <div>
                <p className="text-[9px] font-mono tracking-[0.18em] text-black/30 uppercase mb-0.5">{label}</p>
                <p className="text-[13px] font-semibold text-[#0a0a0a]">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

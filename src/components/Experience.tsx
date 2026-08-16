"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } },
};

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#f5f5f5] text-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-[#dc2626] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            WHERE I&apos;VE BEEN
          </p>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tighter text-[#0a0a0a]">EXPERIENCE</h2>
        </motion.div>

        <div className="relative flex flex-col gap-0">
          {/* Vertical timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/[0.08] hidden md:block" />

          {experience.map((job, i) => (
            <motion.div
              key={i}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.1 }}
              className="relative md:pl-12 pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#dc2626] bg-[#f5f5f5] hidden md:block" />

              <div className="border border-black/[0.08] bg-white p-6 md:p-8 hover:border-[#dc2626]/30 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-base font-black tracking-tight text-[#0a0a0a] mb-1">{job.role}</h3>
                    <p className="text-[#dc2626] font-bold text-sm">{job.company}</p>
                  </div>
                  <div className="flex flex-col gap-1 md:items-end shrink-0">
                    <span className="text-[11px] font-mono text-black/40">{job.period}</span>
                    <span className="text-[11px] font-mono text-black/30">{job.location}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 mb-5">
                  {job.achievements.map((a, j) => (
                    <li key={j} className="flex items-start gap-3 text-[13px] text-black/55 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-[#dc2626]/60 mt-2 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/[0.06]">
                  {job.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-mono text-black/45 bg-black/[0.04] border border-black/[0.08]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

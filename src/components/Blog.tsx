"use client";

import { motion } from "framer-motion";

const posts = [
  { type: "BUILD LOG", title: "Designing systems that stay calm under pressure.", date: "Coming soon", index: "01" },
  { type: "FIELD NOTE", title: "What production AI work teaches you about product design.", date: "Coming soon", index: "02" },
  { type: "PLAYBOOK", title: "The small details that make a full-stack product feel finished.", date: "Coming soon", index: "03" },
];

export function Blog() {
  return (
    <section id="blog" className="relative overflow-hidden bg-[#f3eee8] py-32 text-[#040403] md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 flex items-end justify-between gap-6"
        >
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#d63d21]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d63d21]" />
              NOTES &amp; OBSERVATIONS
            </p>
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.82] tracking-[-0.08em]">THE<br />JOURNAL<span className="text-[#69a65b]">.</span></h2>
          </div>
          <span className="hidden text-[10px] font-mono tracking-[0.2em] text-black/35 md:block">THOUGHTS IN PROGRESS</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="group relative min-h-[340px] border-b border-black/[0.08] bg-[#f3eee8] p-8 transition-[background-color,transform] duration-500 hover:-translate-y-1 hover:bg-[#fffdfa] md:border-b-0 md:border-r last:border-r-0"
            >
              <div className="mb-14 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#d63d21]">{post.type}</span>
                <span className="text-[11px] font-mono text-black/25">{post.index}</span>
              </div>
              <h3 className="max-w-[18ch] text-xl font-black leading-tight tracking-tight">{post.title}</h3>
              <div className="mt-8 flex items-center justify-between border-t border-black/[0.08] pt-4 text-[10px] font-mono text-black/35">
                <span>{post.date}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

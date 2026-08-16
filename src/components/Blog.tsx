"use client";

import { motion } from "framer-motion";

const posts = [
  { type: "BUILD LOG", title: "Designing systems that stay calm under pressure.", date: "Coming soon", index: "01" },
  { type: "FIELD NOTE", title: "What production AI work teaches you about product design.", date: "Coming soon", index: "02" },
  { type: "PLAYBOOK", title: "The small details that make a full-stack product feel finished.", date: "Coming soon", index: "03" },
];

export function Blog() {
  return (
    <section id="blog" className="relative overflow-hidden bg-[#f5f5f5] py-24 text-[#0a0a0a]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 flex items-end justify-between gap-6"
        >
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#dc2626]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626]" />
              NOTES &amp; OBSERVATIONS
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tighter">THE JOURNAL</h2>
          </div>
          <span className="hidden text-[10px] font-mono tracking-[0.2em] text-black/35 md:block">THOUGHTS IN PROGRESS</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-0 border border-black/[0.08] md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="group relative min-h-64 border-b border-black/[0.08] p-6 transition-colors duration-300 hover:bg-white md:border-b-0 md:border-r last:border-r-0"
            >
              <div className="mb-14 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#dc2626]">{post.type}</span>
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

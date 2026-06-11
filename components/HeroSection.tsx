'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const WORDS = 'Nicht für alle. Für die, die nicht aufgeben.'.split(' ');

function AnimatedHeadline() {
  return (
    <h1
      className="font-heading font-black text-void-black leading-[1.1] tracking-tight mb-10"
      style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
    >
      {WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2 + i * 0.07,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.22em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white">
      <div className="relative z-10 max-w-4xl w-full">
        <motion.p
          {...fadeUp(0.1)}
          className="text-metallic text-xs tracking-[0.6em] uppercase mb-10"
        >
          Streetwear · Est. 2020
        </motion.p>

        <AnimatedHeadline />

        <motion.p
          {...fadeUp(1.1)}
          className="text-metallic text-[11px] tracking-[0.5em] uppercase mb-8"
        >
          Resilienz · Stärke · Stil
        </motion.p>

        <motion.div
          {...fadeUp(1.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className="bg-brand-blue text-worn-white px-10 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-brand-blue-dark transition-colors"
          >
            Shop entdecken
          </Link>
          <Link
            href="/story"
            className="border border-void-black/20 text-void-black/60 px-10 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:border-void-black/50 hover:text-void-black transition-colors"
          >
            Unsere Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-void-black/20" />
        <span className="text-void-black/25 text-[9px] tracking-[0.5em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

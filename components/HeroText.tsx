'use client';

import { motion } from 'framer-motion';

function AnimatedWord({
  text,
  startDelay,
}: {
  text: string;
  startDelay: number;
}) {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: startDelay + i * 0.065,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

export default function HeroText() {
  return (
    <h1
      className="font-heading font-black text-worn-white uppercase tracking-tighter leading-[0.85] mb-8"
      style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)' }}
    >
      <div className="overflow-hidden pb-2">
        <AnimatedWord text="BAZOOKA" startDelay={0.25} />
      </div>
      <div className="overflow-hidden pb-2">
        <AnimatedWord text="CITY" startDelay={0.7} />
      </div>
    </h1>
  );
}

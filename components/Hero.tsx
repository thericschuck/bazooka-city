'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
});

function BulletImage({
  src,
  style,
}: {
  src: string;
  style?: React.CSSProperties;
}) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div
        style={{ ...style, width: 180, height: 270, background: 'rgba(140,140,150,0.12)', borderRadius: 4 }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={180}
      height={270}
      style={style}
      onError={() => setErr(true)}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex items-center">

      {/* Subtle steel texture across whole background */}
      <Image
        src="/Steel%20Background.jpg"
        alt=""
        fill
        className="object-cover"
        style={{ opacity: 0.05 }}
        priority
      />

      {/* Hero image — right half, full height */}
      <div
        className="hidden lg:block absolute right-0 top-0 w-[48%] h-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.85) 55%, black 80%)',
        }}
      >
        <Image
          src="/hero.jpg"
          alt="Bazooka City"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Text content — left side */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-xl text-center lg:text-left">

          <motion.p
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: 14,
              letterSpacing: '0.2em',
              color: '#6b6b72',
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
            }}
          >
            Streetwear · Est. 2020
          </motion.p>

          <motion.h1
            {...fadeUp(0.25)}
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
              color: '#0e0e10',
              lineHeight: 1.12,
              marginBottom: '2rem',
            }}
          >
            Nicht für alle. Für die,
            <br />
            die{' '}
            <em style={{ color: 'var(--bc-steel-text)', fontStyle: 'italic' }}>
              nicht aufgeben.
            </em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.45)}
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '0.15em',
              color: '#6b6b72',
              textTransform: 'uppercase',
              marginBottom: '3rem',
            }}
          >
            Resilienz · Stärke · Stil
          </motion.p>

          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <Link
              href="/shop"
              className="hover:brightness-110 transition-[filter] duration-150 ease-linear"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--bc-steel)',
                color: 'var(--bc-light)',
                padding: '16px 42px',
                borderRadius: 4,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Shop Entdecken
            </Link>
            <Link
              href="/story"
              className="hover:brightness-90 transition-[filter] duration-150 ease-linear"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1.5px solid #0e0e10',
                color: '#0e0e10',
                padding: '16px 42px',
                borderRadius: 4,
                background: 'transparent',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Unsere Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Left bullet — decorative */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 pointer-events-none hidden sm:block"
      >
        <BulletImage
          src="/Image%20Left.png"
          style={{
            transform: 'translateX(-40%) rotate(5deg)',
            transformOrigin: 'bottom left',
            scale: 1.25,
          }}
        />
      </motion.div>
    </section>
  );
}

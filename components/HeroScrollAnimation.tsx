'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const FRAME_START = 50;
const FRAME_END = 66;
const FRAME_COUNT = FRAME_END - FRAME_START + 1;
const SCROLL_HEIGHT = '550vh';

function getTextParams() {
  const vh = window.innerHeight;
  const mobile = window.innerWidth < 640;
  return {
    initialY: mobile ? vh * 0.30 : Math.min(400, vh * 0.45),
    travel:   mobile ? vh * 0.55 : Math.min(620, vh * 0.72),
    stopY:    mobile ? -vh * 0.08 : -80,
  };
}

function framePath(i: number) {
  return `/hero-frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
}

export default function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const currentFrame = useRef(0);
  const raf = useRef<number>(0);
  const textParamsRef = useRef({ initialY: 400, travel: 620, stopY: -80 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Compute and cache text params; re-cache on resize
    textParamsRef.current = getTextParams();

    // Set initial text position
    if (textRef.current) {
      textRef.current.style.transform = `translateY(${textParamsRef.current.initialY}px)`;
    }

    function setSize() {
      if (!canvas) return;
      textParamsRef.current = getTextParams();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      draw(currentFrame.current);
    }

    function draw(index: number) {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = images.current[index];
      if (!img?.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;

      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (cr > ir) {
        sh = img.naturalWidth / cr;
        sy = (img.naturalHeight - sh) / 2;
      } else {
        sw = img.naturalHeight * cr;
        sx = (img.naturalWidth - sw) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }

    function onScroll() {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const index = Math.min(FRAME_COUNT - 1, Math.round(progress * (FRAME_COUNT - 1)));

      // Update canvas frame
      if (index !== currentFrame.current) {
        currentFrame.current = index;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => draw(index));
      }

      // Move text upward without re-render
      if (textRef.current) {
        const { initialY, travel, stopY } = textParamsRef.current;
        const y = Math.max(stopY, initialY - progress * travel);
        textRef.current.style.transform = `translateY(${y}px)`;
      }
    }

    // Load first frame immediately, rest in background
    const first = new Image();
    first.src = framePath(FRAME_START);
    first.onload = () => {
      images.current[0] = first;
      setSize();
    };

    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(FRAME_START + i);
      images.current[i] = img;
    }

    setSize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setSize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block" />

        {/* Subtle center-darkening overlay for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
        />

        {/* Centered text — moves up on scroll via textRef */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={textRef}
            className="flex flex-col items-center text-center"
            style={{ willChange: 'transform' }}
          >
            <p
              className="text-[10px] tracking-[0.55em] uppercase mb-4 font-semibold"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Official Collection
            </p>
            <h1
              className="text-6xl sm:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight uppercase mb-6"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Bazooka City
            </h1>
            <p
              className="text-lg sm:text-2xl lg:text-3xl font-black text-white/80 leading-tight tracking-widest uppercase mb-10"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Nicht für alle.<br />
              Für die, die<br />
              nicht aufgeben.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/shop"
                className="pointer-events-auto inline-flex items-center text-xs font-bold tracking-[0.3em] uppercase text-white px-7 py-3 hover:opacity-90 transition-opacity duration-200"
                style={{ background: 'var(--bc-steel)' }}
              >
                Shop entdecken
              </Link>
              <Link
                href="/story"
                className="pointer-events-auto inline-flex items-center text-xs font-bold tracking-[0.3em] uppercase text-white border border-white/50 px-7 py-3 hover:bg-white hover:text-black transition-colors duration-200"
              >
                Unsere Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

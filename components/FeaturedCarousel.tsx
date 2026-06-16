'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ShopifyProductBase } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface Props {
  products: ShopifyProductBase[];
}

export default function FeaturedCarousel({ products }: Props) {
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ cardWidth: 260, xOffset: 310, trackHeight: 440 });
  const touchStartX = useRef(0);
  const count = products.length;

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const cardWidth = w < 640 ? Math.min(190, w * 0.58) : 260;
      const xOffset = w < 640 ? Math.min(210, w * 0.57) : 310;
      const trackHeight = cardWidth * (4 / 3) + 90;
      setDims({ cardWidth, xOffset, trackHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setActive((i) => (i + dir + count) % count);
  }, [count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) go(delta > 0 ? 1 : -1);
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Track */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: dims.trackHeight }}
      >
        {products.map((product, index) => {
          let offset = index - active;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          if (Math.abs(offset) > 1) return null;

          const isActive = offset === 0;
          const image = product.images.edges[0]?.node;
          const price = product.priceRange.minVariantPrice;

          return (
            <motion.div
              key={product.id}
              animate={{
                x: offset * dims.xOffset,
                scale: isActive ? 1 : 0.72,
                opacity: isActive ? 1 : 0.55,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              style={{
                position: 'absolute',
                width: dims.cardWidth,
                zIndex: isActive ? 20 : 10,
                cursor: isActive ? 'default' : 'pointer',
              }}
              onClick={() => !isActive && go(offset > 0 ? 1 : -1)}
            >
              <Link
                href={`/shop/${product.handle}`}
                onClick={(e) => !isActive && e.preventDefault()}
                className="block"
              >
                <div
                  style={{
                    background: '#0e0e10',
                    border: '1px solid rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div className="relative" style={{ aspectRatio: '3/4' }}>
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText ?? product.title}
                        fill
                        className="object-cover"
                        sizes={`${dims.cardWidth}px`}
                      />
                    ) : (
                      <div className="w-full h-full" style={{ background: '#1a1a22' }} />
                    )}
                    {!product.availableForSale && (
                      <span
                        className="absolute top-3 left-3 text-[10px] px-2 py-1 tracking-wider uppercase"
                        style={{
                          background: 'rgba(14,14,16,0.85)',
                          color: 'rgba(255,255,255,0.55)',
                        }}
                      >
                        Ausverkauft
                      </span>
                    )}
                    {/* Gradient on active card */}
                    {isActive && (
                      <div
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(14,14,16,0.92) 0%, rgba(26,26,30,0.4) 55%, transparent 100%)',
                        }}
                      >
                        <span className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
                          {formatPrice(price.amount, price.currencyCode)}
                        </span>
                        <span className="text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: 'var(--bc-steel)' }}>
                          Jetzt ansehen →
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className="px-4 py-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <h3
                      className="text-sm font-medium tracking-wide truncate"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {formatPrice(price.amount, price.currencyCode)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-6 pb-4">
        <button
          onClick={() => go(-1)}
          aria-label="Vorheriges Produkt"
          className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-50 text-sm"
          style={{
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.8)',
            background: 'transparent',
          }}
        >
          ←
        </button>

        <div className="flex gap-2 items-center">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Produkt ${i + 1}`}
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === active ? 'var(--bc-steel)' : 'rgba(255,255,255,0.25)',
                border: 'none',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Nächstes Produkt"
          className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-50 text-sm"
          style={{
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.8)',
            background: 'transparent',
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

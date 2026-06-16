import Link from 'next/link';
import Image from 'next/image';
import { shopifyFetch } from '@/lib/shopify';
import { ALL_PRODUCTS_QUERY } from '@/lib/queries';
import type { ShopifyProductsResponse } from '@/lib/types';
import HeroScrollAnimation from '@/components/HeroScrollAnimation';
import FeaturedCarousel from '@/components/FeaturedCarouselLoader';

export default async function HomePage() {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 8 },
  });

  const products = data.products.edges.map((e) => e.node);

  return (
    <>
    <link rel="preload" href="/hero-frames/ezgif-frame-050.webp" as="image" />
    <main>
      <HeroScrollAnimation />

      {/* ── Brand values strip ── */}
      <section
        className="relative overflow-hidden border-y"
        style={{
          background: '#1a1a22',
          borderColor: 'rgba(255,255,255,0.07)',
        }}
      >
        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 18px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-3 divide-x divide-white/10">

            {/* Resilienz */}
            <div className="flex flex-col items-center gap-4 px-2 sm:px-6">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="min-h-[2.5em] flex items-end justify-center">
                  <p className="text-[8px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.35em] uppercase text-white leading-tight text-center">
                    Resilienz
                  </p>
                </div>
                <div className="w-4 sm:w-6 h-0.5" style={{ background: 'var(--bc-steel)' }} />
              </div>
            </div>

            {/* Stärke */}
            <div className="flex flex-col items-center gap-4 px-2 sm:px-6">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="min-h-[2.5em] flex items-end justify-center">
                  <p className="text-[8px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.35em] uppercase text-white leading-tight text-center">
                    Stärke
                  </p>
                </div>
                <div className="w-4 sm:w-6 h-0.5" style={{ background: 'var(--bc-steel)' }} />
              </div>
            </div>

            {/* Durchhaltevermögen */}
            <div className="flex flex-col items-center gap-4 px-2 sm:px-6">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="min-h-[2.5em] flex items-end justify-center">
                  <p className="text-[7px] sm:text-[10px] font-bold tracking-[0.08em] sm:tracking-[0.2em] uppercase text-white leading-tight text-center">
                    Durchhalte&shy;vermögen
                  </p>
                </div>
                <div className="w-4 sm:w-6 h-0.5" style={{ background: 'var(--bc-steel)' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="relative overflow-hidden">
        {/* Blurred steel background — served as WebP/AVIF via Next.js Image */}
        <Image
          src="/Steel Background.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: 'blur(8px)', transform: 'scale(1.06)' }}
          quality={20}
          sizes="100vw"
          priority={false}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,10,0.70)' }} />

        <div className="relative pt-12 pb-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-2 px-2">
              <div>
                <p
                  className="text-[10px] tracking-[0.45em] uppercase mb-1.5 font-semibold"
                  style={{ color: 'var(--bc-steel)' }}
                >
                  Auswahl
                </p>
                <h2
                  className="font-black text-3xl text-white tracking-tight uppercase"
                  style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                >
                  Featured
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-semibold tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
                style={{ color: 'var(--bc-steel)' }}
              >
                Alle ansehen →
              </Link>
            </div>

            <FeaturedCarousel products={products} />
          </div>
        </div>
      </section>

      {/* ── Brand teaser ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#1a1a22' }}
      >
        {/* Ghost text */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden select-none pointer-events-none">
          <p
            className="font-black leading-none uppercase tracking-tight"
            style={{
              fontSize: '13vw',
              color: 'rgba(255,255,255,0.05)',
              fontFamily: 'var(--font-barlow-condensed)',
              marginTop: '0.1em',
              marginLeft: '-0.02em',
            }}
          >
            RESILIENT
          </p>
          <p
            className="font-black leading-none uppercase tracking-tight text-right"
            style={{
              fontSize: '13vw',
              color: 'rgba(255,255,255,0.05)',
              fontFamily: 'var(--font-barlow-condensed)',
              marginBottom: '0.1em',
              marginRight: '-0.02em',
            }}
          >
            STRENGTH
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-5 font-semibold" style={{ color: 'var(--bc-steel)' }}>
            Die Marke
          </p>
          <h2
            className="font-black text-3xl sm:text-4xl text-white mb-7 leading-tight uppercase"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Mehr als Streetwear.
          </h2>
          <p className="leading-relaxed mb-12 text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            BAZOOKA CITY© steht nicht nur für physische Stärke, sondern vor allem
            für mentale Stärke und den Glauben daran, dass man trotz
            Schwierigkeiten weiterhin kämpfen kann — ein Symbol für Resilienz und
            Durchhaltevermögen.
          </p>
          <Link
            href="/story"
            className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-white px-9 py-3.5 hover:opacity-85 transition-opacity"
            style={{ background: 'var(--bc-steel)' }}
          >
            Story lesen →
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}

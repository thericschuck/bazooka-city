import Link from 'next/link';
import { shopifyFetch } from '@/lib/shopify';
import { ALL_PRODUCTS_QUERY } from '@/lib/queries';
import type { ShopifyProductsResponse } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 4 },
  });

  const products = data.products.edges.map((e) => e.node);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{
          minHeight: '92vh',
          background: 'linear-gradient(150deg, #0f2444 0%, #1e3a5c 35%, #2d5282 70%, #4a6fa5 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 93%, 0 100%)',
          paddingBottom: '5rem',
        }}
      >
        <div className="relative z-10 max-w-4xl">
          <p className="text-white/50 text-xs tracking-[0.6em] uppercase mb-8">
            Streetwear · Est. 2020
          </p>

          <h1
            className="font-bold tracking-tighter text-white uppercase leading-[0.88] mb-10"
            style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
          >
            Bazooka
            <br />
            <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>
              City
            </span>
          </h1>

          <p className="text-white/65 text-sm sm:text-base tracking-[0.35em] mb-12 uppercase">
            Stärke &nbsp;·&nbsp; Resilienz &nbsp;·&nbsp; Style
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-block bg-white text-brand-blue px-10 py-3.5 text-xs font-bold tracking-[0.25em] uppercase hover:bg-white/90 transition-colors"
            >
              Shop entdecken
            </Link>
            <Link
              href="/story"
              className="inline-block border border-white/40 text-white px-10 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white/10 transition-colors"
            >
              Unsere Story
            </Link>
          </div>
        </div>

        {/* decorative lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white" />
          <div className="absolute top-0 bottom-0 right-1/4 w-px bg-white" />
        </div>
      </section>

      {/* Brand values strip */}
      <section className="bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-3 divide-x divide-white/20">
          {['Stärke', 'Resilienz', 'Durchhaltevermögen'].map((value) => (
            <div key={value} className="text-center py-1">
              <p className="text-white text-xs tracking-[0.25em] uppercase">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-brand-blue text-xs tracking-[0.4em] uppercase mb-2">Auswahl</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Featured</h2>
          </div>
          <Link
            href="/shop"
            className="text-xs text-brand-grey hover:text-brand-blue transition-colors tracking-[0.2em] uppercase"
          >
            Alle ansehen →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand teaser */}
      <section className="bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-brand-blue text-xs tracking-[0.4em] uppercase mb-4">
            Die Marke
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-snug">
            Mehr als Streetwear.
          </h2>
          <p className="text-brand-grey leading-relaxed mb-8 text-sm sm:text-base">
            BAZOOKA CITY© steht nicht nur für physische Stärke, sondern vor allem für mentale
            Stärke und den Glauben daran, dass man trotz Schwierigkeiten weiterhin kämpfen kann —
            ein Symbol für Resilienz und Durchhaltevermögen.
          </p>
          <Link
            href="/story"
            className="inline-block bg-brand-blue text-white px-8 py-3 text-xs font-bold tracking-[0.25em] uppercase hover:bg-brand-blue-dark transition-colors"
          >
            Story lesen
          </Link>
        </div>
      </section>
    </main>
  );
}

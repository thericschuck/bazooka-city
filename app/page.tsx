import Link from 'next/link';
import Image from 'next/image';
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
      {/* Hero – white background */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-brand-blue text-xs tracking-[0.5em] uppercase mb-5">
                Streetwear · Est. 2020
              </p>
              <h1
                className="font-black text-foreground uppercase tracking-tighter leading-[0.88] mb-6"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
              >
                Bazooka
                <br />
                <span className="text-brand-blue">City</span>
              </h1>
              <p className="text-brand-grey text-sm sm:text-base tracking-[0.3em] uppercase mb-10">
                Stärke &nbsp;·&nbsp; Resilienz &nbsp;·&nbsp; Style
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link
                  href="/shop"
                  className="inline-block bg-brand-blue text-white px-10 py-3.5 text-xs font-bold tracking-[0.25em] uppercase hover:bg-brand-blue-dark transition-colors"
                >
                  Shop entdecken
                </Link>
                <Link
                  href="/story"
                  className="inline-block border border-brand-blue text-brand-blue px-10 py-3.5 text-xs font-bold tracking-[0.25em] uppercase hover:bg-brand-blue hover:text-white transition-colors"
                >
                  Unsere Story
                </Link>
              </div>
            </div>

            {/* Logo */}
            <div className="shrink-0 relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/Kleineslogo_Homepage.jpg"
                alt="Bazooka City Logo"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 288px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand-values strip */}
      <section className="bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-3 divide-x divide-white/20">
          {['Stärke', 'Resilienz', 'Durchhaltevermögen'].map((value) => (
            <p key={value} className="text-center text-white text-xs tracking-[0.25em] uppercase py-1">
              {value}
            </p>
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
          <p className="text-brand-blue text-xs tracking-[0.4em] uppercase mb-4">Die Marke</p>
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

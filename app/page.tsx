import Link from 'next/link';
import { shopifyFetch } from '@/lib/shopify';
import { ALL_PRODUCTS_QUERY } from '@/lib/queries';
import type { ShopifyProductsResponse } from '@/lib/types';
import Hero from '@/components/Hero';
import ParallaxGrid from '@/components/ParallaxGrid';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 4 },
  });

  const products = data.products.edges.map((e) => e.node);

  return (
    <main>
      <Hero />

      {/* Brand values strip */}
      <section className="bg-carbon border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-3 divide-x divide-border">
          {['Stärke', 'Resilienz', 'Durchhaltevermögen'].map((value) => (
            <p
              key={value}
              className="text-center text-amber text-[10px] tracking-[0.35em] uppercase py-1.5"
            >
              {value}
            </p>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-amber text-[10px] tracking-[0.5em] uppercase mb-2">
              Auswahl
            </p>
            <h2 className="font-heading font-black text-3xl text-worn-white tracking-tight">
              Featured
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs text-metallic hover:text-worn-white transition-colors tracking-[0.2em] uppercase"
          >
            Alle ansehen →
          </Link>
        </div>

        <ParallaxGrid>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </ParallaxGrid>
      </section>

      {/* Brand teaser */}
      <section className="bg-carbon border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-amber text-[10px] tracking-[0.5em] uppercase mb-4">
            Die Marke
          </p>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-worn-white mb-6 leading-snug">
            Mehr als Streetwear.
          </h2>
          <p className="text-metallic leading-relaxed mb-10 text-sm sm:text-base max-w-2xl mx-auto">
            BAZOOKA CITY© steht nicht nur für physische Stärke, sondern vor allem
            für mentale Stärke und den Glauben daran, dass man trotz
            Schwierigkeiten weiterhin kämpfen kann — ein Symbol für Resilienz und
            Durchhaltevermögen.
          </p>
          <Link
            href="/story"
            className="inline-block bg-brand-blue text-worn-white px-8 py-3 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-brand-blue-dark transition-colors"
          >
            Story lesen
          </Link>
        </div>
      </section>
    </main>
  );
}

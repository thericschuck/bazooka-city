import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { ALL_PRODUCTS_QUERY } from '@/lib/queries';
import type { ShopifyProductsResponse } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Shop | Bazooka City',
  description: 'Die gesamte Bazooka City Kollektion.',
};

export default async function ShopPage() {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 20 },
  });

  const products = data.products.edges.map((e) => e.node);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand-grey text-xs tracking-[0.4em] uppercase mb-2">
          Kollektion
        </p>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">Shop</h1>
      </div>

      {products.length === 0 ? (
        <p className="text-brand-grey text-center py-24 tracking-widest">
          Keine Produkte verfügbar.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

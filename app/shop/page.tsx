import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { ALL_PRODUCTS_QUERY } from '@/lib/queries';
import type { ShopifyProductsResponse } from '@/lib/types';
import ShopLayout from '@/components/ShopLayout';

export const metadata: Metadata = {
  title: 'Shop | Bazooka City',
  description: 'Die gesamte Bazooka City Kollektion.',
};

export default async function ShopPage() {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 50 },
  });

  const products = data.products.edges.map((e) => e.node);

  return <ShopLayout products={products} />;
}

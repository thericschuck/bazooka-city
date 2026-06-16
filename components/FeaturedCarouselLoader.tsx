'use client';

import dynamic from 'next/dynamic';
import type { ShopifyProductBase } from '@/lib/types';

const FeaturedCarousel = dynamic(() => import('./FeaturedCarousel'), {
  ssr: false,
  loading: () => <div style={{ height: 500 }} />,
});

export default function FeaturedCarouselLoader({ products }: { products: ShopifyProductBase[] }) {
  return <FeaturedCarousel products={products} />;
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ShopifyProductBase } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: ShopifyProductBase;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-card overflow-hidden group border border-border hover:border-brand-blue transition-colors"
    >
      <Link href={`/shop/${product.handle}`} className="block">
        <div className="relative aspect-3/4 overflow-hidden bg-card-hover">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-card-hover" />
          )}
          {!product.availableForSale && (
            <span className="absolute top-3 left-3 bg-white/90 text-brand-grey text-xs px-2 py-1 tracking-wider uppercase border border-border">
              Ausverkauft
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-foreground text-sm font-medium tracking-wide truncate">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-brand-blue text-sm font-bold">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            <span className="text-xs text-brand-grey uppercase tracking-wider border border-border px-2 py-1 group-hover:border-brand-blue group-hover:text-brand-blue transition-colors">
              Ansehen
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ShopifyProductBase } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: ShopifyProductBase;
}

const cardVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -6,
    transition: { type: 'spring' as const, stiffness: 240, damping: 16 },
  },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.22 } },
};

const overlayTextVariants = {
  rest: { y: 14, opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.28, delay: 0.06 } },
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      className="bg-carbon overflow-hidden cursor-pointer"
    >
      <Link href={`/shop/${product.handle}`} className="block">
        <div className="relative aspect-3/4 overflow-hidden bg-card-hover">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-card-hover" />
          )}

          {/* Steel overlay on hover */}
          <motion.div
            variants={overlayVariants}
            className="absolute inset-0 flex flex-col items-center justify-end pb-8"
            style={{
              background:
                'linear-gradient(to top, rgba(14,14,16,0.95) 0%, rgba(26,26,30,0.5) 50%, transparent 100%)',
            }}
          >
            <motion.span
              variants={overlayTextVariants}
              className="font-heading font-black text-worn-white text-2xl sm:text-3xl"
            >
              {formatPrice(price.amount, price.currencyCode)}
            </motion.span>
            <motion.span
              variants={overlayTextVariants}
              className="text-metallic text-[10px] tracking-[0.35em] uppercase mt-1.5"
            >
              Jetzt ansehen →
            </motion.span>
          </motion.div>

          {!product.availableForSale && (
            <span className="absolute top-3 left-3 bg-void-black/80 text-metallic text-xs px-2 py-1 tracking-wider uppercase">
              Ausverkauft
            </span>
          )}
        </div>

        <div className="p-4 bg-carbon border-t border-border">
          <h3 className="text-worn-white text-sm font-medium tracking-wide truncate">
            {product.title}
          </h3>
          <p className="text-metallic text-xs mt-1">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

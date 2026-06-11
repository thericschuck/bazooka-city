'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ShopifyImage } from '@/lib/types';

interface ProductGalleryProps {
  images: ShopifyImage[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {active && (
          <Image
            src={active.url}
            alt={active.altText ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActiveIndex(i)}
              aria-label={`Bild ${i + 1} anzeigen`}
              className={`relative aspect-square overflow-hidden bg-gray-100 transition-all ${
                i === activeIndex
                  ? 'ring-2 ring-bc-steel opacity-100'
                  : 'opacity-50 hover:opacity-90'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

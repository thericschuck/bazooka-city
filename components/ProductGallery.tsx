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
  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[3/4] bg-card overflow-hidden">
        {activeImage && (
          <Image
            src={activeImage.url}
            alt={activeImage.altText ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setActiveIndex(index)}
              aria-label={`Bild ${index + 1} anzeigen`}
              className={`relative aspect-square overflow-hidden bg-card transition-opacity ${
                index === activeIndex
                  ? 'ring-1 ring-brand-blue opacity-100'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${title} ${index + 1}`}
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

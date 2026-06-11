'use client';

import { useState } from 'react';
import { useCart } from '@shopify/hydrogen-react';
import type { ShopifyVariant } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductActionsProps {
  variants: ShopifyVariant[];
}

export default function ProductActions({ variants }: ProductActionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries(
      variants[0]?.selectedOptions.map(({ name, value }) => [name, value]) ?? []
    )
  );
  const [added, setAdded] = useState(false);

  const { linesAdd, status } = useCart();

  const selectedVariant =
    variants.find((v) =>
      v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
    ) ?? variants[0];

  const optionMap = variants.reduce<Record<string, string[]>>((acc, variant) => {
    variant.selectedOptions.forEach(({ name, value }) => {
      if (!acc[name]) acc[name] = [];
      if (!acc[name].includes(value)) acc[name].push(value);
    });
    return acc;
  }, {});

  const isValueAvailable = (optionName: string, optionValue: string): boolean => {
    const testOptions = { ...selectedOptions, [optionName]: optionValue };
    return variants.some(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.every((opt) => testOptions[opt.name] === opt.value)
    );
  };

  const handleAddToCart = () => {
    if (!selectedVariant?.availableForSale) return;
    linesAdd([{ merchandiseId: selectedVariant.id, quantity: 1 }]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const isLoading = status === 'updating' || status === 'creating';

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold text-brand-blue">
        {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
      </p>

      {Object.entries(optionMap).map(([name, values]) => (
        <div key={name}>
          <p className="text-xs tracking-[0.15em] uppercase text-brand-grey mb-3">{name}</p>
          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const isSelected = selectedOptions[name] === value;
              const available = isValueAvailable(name, value);

              return (
                <button
                  key={value}
                  onClick={() =>
                    setSelectedOptions((prev) => ({ ...prev, [name]: value }))
                  }
                  disabled={!available}
                  className={`px-4 py-2 text-sm tracking-wide transition-colors ${
                    isSelected
                      ? 'bg-brand-blue text-white border border-brand-blue'
                      : available
                        ? 'bg-white text-foreground border border-border hover:border-brand-blue hover:text-brand-blue'
                        : 'bg-white text-brand-grey/40 border border-border/40 cursor-not-allowed line-through'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale || isLoading}
        className={`w-full py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all ${
          !selectedVariant?.availableForSale
            ? 'bg-border text-brand-grey cursor-not-allowed'
            : added
              ? 'bg-green-600 text-white'
              : isLoading
                ? 'bg-brand-blue/60 text-white cursor-wait'
                : 'bg-brand-blue text-white hover:bg-brand-blue-dark'
        }`}
      >
        {!selectedVariant?.availableForSale
          ? 'Ausverkauft'
          : added
            ? 'Zum Warenkorb hinzugefügt ✓'
            : isLoading
              ? 'Wird hinzugefügt…'
              : 'In den Warenkorb'}
      </button>
    </div>
  );
}

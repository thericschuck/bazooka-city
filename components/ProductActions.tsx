'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@shopify/hydrogen-react';
import type { ShopifyVariant } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const SIZE_CHART = [
  { size: 'XS',  brust: '80–84',   taille: '60–64',  hüfte: '86–90'   },
  { size: 'S',   brust: '84–88',   taille: '64–68',  hüfte: '90–94'   },
  { size: 'M',   brust: '88–92',   taille: '68–72',  hüfte: '94–98'   },
  { size: 'L',   brust: '92–96',   taille: '72–76',  hüfte: '98–102'  },
  { size: 'XL',  brust: '96–100',  taille: '76–80',  hüfte: '102–106' },
  { size: 'XXL', brust: '100–104', taille: '80–84',  hüfte: '106–110' },
];

const isSizeOption = (name: string) =>
  name.toLowerCase().includes('größe') ||
  name.toLowerCase().includes('grosse') ||
  name.toLowerCase() === 'size';

interface ProductActionsProps {
  variants: ShopifyVariant[];
}

export default function ProductActions({ variants }: ProductActionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries(
      variants[0]?.selectedOptions.map(({ name, value }) => [name, value]) ?? []
    )
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const { linesAdd, status } = useCart();

  const selectedVariant =
    variants.find((v) =>
      v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
    ) ?? variants[0];

  const optionMap = variants.reduce<Record<string, string[]>>((acc, v) => {
    v.selectedOptions.forEach(({ name, value }) => {
      if (!acc[name]) acc[name] = [];
      if (!acc[name].includes(value)) acc[name].push(value);
    });
    return acc;
  }, {});

  const isValueAvailable = (optionName: string, optionValue: string) => {
    const test = { ...selectedOptions, [optionName]: optionValue };
    return variants.some(
      (v) => v.availableForSale && v.selectedOptions.every((opt) => test[opt.name] === opt.value)
    );
  };

  const handleAddToCart = () => {
    if (!selectedVariant?.availableForSale) return;
    linesAdd([{ merchandiseId: selectedVariant.id, quantity }]);
    setBounce(true);
    setAdded(true);
    setTimeout(() => setBounce(false), 500);
    setTimeout(() => setAdded(false), 2600);
  };

  const isLoading = status === 'updating' || status === 'creating';

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <p className="text-2xl font-bold" style={{ color: 'var(--bc-steel)' }}>
        {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
      </p>

      <div className="border-t border-gray-200" />

      {/* Option selectors */}
      {Object.entries(optionMap).map(([name, values]) => (
        <div key={name}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold">
              {name}
            </p>
            {isSizeOption(name) && (
              <button
                onClick={() => setShowSizeChart((v) => !v)}
                className="text-xs underline underline-offset-2 transition-colors"
                style={{ color: 'var(--bc-steel)' }}
              >
                {showSizeChart ? 'Schließen' : 'Größentabelle'}
              </button>
            )}
          </div>

          {/* Size chart */}
          <AnimatePresence>
            {showSizeChart && isSizeOption(name) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden overflow-x-auto mb-4"
              >
                <table className="w-full text-xs border-collapse min-w-[320px]">
                  <thead>
                    <tr className="bg-gray-100">
                      {['Größe', 'Brust (cm)', 'Taille (cm)', 'Hüfte (cm)'].map((h) => (
                        <th key={h} className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row) => (
                      <tr key={row.size} className="even:bg-gray-50">
                        <td className="border border-gray-200 px-3 py-2 font-semibold text-gray-800">{row.size}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-600">{row.brust}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-600">{row.taille}</td>
                        <td className="border border-gray-200 px-3 py-2 text-gray-600">{row.hüfte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Option buttons */}
          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const isSelected = selectedOptions[name] === value;
              const available = isValueAvailable(name, value);
              return (
                <button
                  key={value}
                  onClick={() => setSelectedOptions((prev) => ({ ...prev, [name]: value }))}
                  disabled={!available}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    isSelected
                      ? 'text-white border-bc-steel bg-bc-steel'
                      : available
                        ? 'bg-white text-gray-800 border-gray-300 hover:border-bc-steel hover:text-bc-steel'
                        : 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed line-through'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity + Add to cart */}
      <div className="flex items-stretch gap-3">
        <div className="flex items-center border border-gray-300">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg select-none"
          >
            −
          </button>
          <span className="w-10 flex items-center justify-center text-sm font-semibold text-gray-900 border-x border-gray-300 py-3">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg select-none"
          >
            +
          </button>
        </div>

        <motion.button
          onClick={handleAddToCart}
          animate={bounce ? { scale: [1, 1.05, 0.97, 1.02, 1] } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          disabled={!selectedVariant?.availableForSale || isLoading}
          className={`flex-1 text-sm font-semibold tracking-[0.2em] uppercase transition-colors ${
            !selectedVariant?.availableForSale
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : added
                ? 'bg-green-600 text-white'
                : isLoading
                  ? 'bg-bc-steel/60 text-white cursor-wait'
                  : 'bg-bc-steel text-white hover:opacity-90'
          }`}
        >
          {!selectedVariant?.availableForSale
            ? 'Ausverkauft'
            : added
              ? 'Im Warenkorb ✓'
              : isLoading
                ? 'Wird hinzugefügt…'
                : 'In den Warenkorb'}
        </motion.button>
      </div>
    </div>
  );
}

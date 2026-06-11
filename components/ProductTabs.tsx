'use client';

import { useState } from 'react';

interface ProductTabsProps {
  description: string;
  tags: string[];
  productType: string;
}

const TABS = ['Beschreibung', 'Zusätzliche Informationen', 'Rezensionen (0)'];

export default function ProductTabs({ description, tags, productType }: ProductTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white border border-gray-200">
      {/* Tab headers */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-none">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-6 py-4 text-sm font-medium tracking-wide whitespace-nowrap border-b-2 -mb-px transition-colors ${
              active === i
                ? 'border-bc-steel text-bc-steel'
                : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {active === 0 && (
          <div className="text-sm text-gray-700 leading-relaxed">
            {description ? (
              <p className="whitespace-pre-line">{description}</p>
            ) : (
              <p className="text-gray-400">Keine Beschreibung vorhanden.</p>
            )}
          </div>
        )}

        {active === 1 && (
          <div className="text-sm space-y-3">
            {productType && (
              <div className="flex gap-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold w-36 pt-0.5">
                  Kategorie
                </span>
                <span className="text-gray-700">{productType}</span>
              </div>
            )}
            {tags.length > 0 && (
              <div className="flex gap-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold w-36 pt-0.5">
                  Schlagwörter
                </span>
                <span className="text-gray-700">{tags.join(', ')}</span>
              </div>
            )}
            {!productType && tags.length === 0 && (
              <p className="text-gray-400">Keine zusätzlichen Informationen vorhanden.</p>
            )}
          </div>
        )}

        {active === 2 && (
          <p className="text-gray-400 text-sm text-center py-6">
            Noch keine Rezensionen vorhanden.
          </p>
        )}
      </div>
    </div>
  );
}

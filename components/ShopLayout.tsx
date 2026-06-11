'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import type { ShopifyProductBase } from '@/lib/types';

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'title_asc';

interface ShopLayoutProps {
  products: ShopifyProductBase[];
}

export default function ShopLayout({ products }: ShopLayoutProps) {
  const prices = products.map((p) =>
    parseFloat(p.priceRange.minVariantPrice.amount)
  );
  const absMin = Math.floor(Math.min(...(prices.length ? prices : [0])));
  const absMax = Math.ceil(Math.max(...(prices.length ? prices : [100])));

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [priceMin, setPriceMin] = useState(absMin);
  const [priceMax, setPriceMax] = useState(absMax);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const types = products.map((p) => p.productType).filter(Boolean);
    return [...new Set(types)];
  }, [products]);

  const recentProducts = useMemo(() => products.slice(0, 4), [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    result = result.filter((p) => {
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      return price >= priceMin && price <= priceMax;
    });

    if (selectedCategory) {
      result = result.filter((p) => p.productType === selectedCategory);
    }

    if (sort === 'price_asc')
      result.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    if (sort === 'price_desc')
      result.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    if (sort === 'title_asc')
      result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [products, search, sort, priceMin, priceMax, selectedCategory]);

  const leftPct = ((priceMin - absMin) / (absMax - absMin)) * 100;
  const rightPct = ((priceMax - absMin) / (absMax - absMin)) * 100;

  const thumbClass =
    'absolute w-full h-full appearance-none bg-transparent pointer-events-none ' +
    '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto ' +
    '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 ' +
    '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bc-steel ' +
    '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white ' +
    '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm';

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-700">Shop</span>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex gap-6 items-start">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col gap-10 w-60 shrink-0 bg-white border border-gray-200 p-6">

          {/* Price range */}
          <div>
            <div className="relative h-2 mb-5">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <div
                className="absolute h-full bg-bc-steel rounded-full"
                style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
              />
              <input
                type="range"
                min={absMin}
                max={absMax}
                value={priceMin}
                onChange={(e) =>
                  setPriceMin(Math.min(+e.target.value, priceMax - 1))
                }
                className={thumbClass}
              />
              <input
                type="range"
                min={absMin}
                max={absMax}
                value={priceMax}
                onChange={(e) =>
                  setPriceMax(Math.max(+e.target.value, priceMin + 1))
                }
                className={thumbClass}
              />
            </div>

            <button
              onClick={() => {
                setPriceMin(absMin);
                setPriceMax(absMax);
                setSelectedCategory(null);
                setSearch('');
              }}
              className="px-4 py-1.5 border border-gray-300 text-gray-800 text-xs tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors"
            >
              Filter
            </button>
            <p className="text-gray-500 text-xs mt-2">
              Preis: {priceMin} € — {priceMax} €
            </p>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <h3 className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-4 font-semibold">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat ? null : cat)
                    }
                    className={`flex items-center gap-3 text-xs tracking-widest uppercase transition-colors text-left ${
                      selectedCategory === cat
                        ? 'text-bc-steel'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                        selectedCategory === cat ? 'bg-bc-steel' : 'bg-gray-300'
                      }`}
                    />
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Products */}
          <div>
            <h3 className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-4 font-semibold">
              Recent Products
            </h3>
            <div className="flex flex-col gap-3">
              {recentProducts.map((p) => {
                const img = p.images.edges[0]?.node;
                return (
                  <Link
                    key={p.id}
                    href={`/shop/${p.handle}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="relative w-12 h-12 shrink-0 bg-gray-100 overflow-hidden">
                      {img && (
                        <Image
                          src={img.url}
                          alt={img.altText ?? p.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-900 transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 p-6">

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Produkte suchen ..."
              className="w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm px-4 py-3 pr-12 outline-none focus:border-bc-steel transition-colors"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          {/* Results bar */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">
              {filtered.length === products.length
                ? `Alle ${filtered.length} Ergebnisse werden angezeigt`
                : `${filtered.length} von ${products.length} Ergebnissen`}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-2 outline-none focus:border-bc-steel transition-colors cursor-pointer"
            >
              <option value="default">Nach Beliebtheit sortiert</option>
              <option value="price_asc">Preis aufsteigend</option>
              <option value="price_desc">Preis absteigend</option>
              <option value="title_asc">Name A–Z</option>
            </select>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-gray-400 text-center py-24 tracking-widest text-sm">
              Keine Produkte gefunden.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <div key={product.id} className="shadow-md hover:shadow-xl transition-shadow duration-200">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

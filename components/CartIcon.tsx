'use client';

import { useState } from 'react';
import { useCart } from '@shopify/hydrogen-react';
import CartDrawer from './CartDrawer';

export default function CartIcon() {
  const [open, setOpen] = useState(false);
  const { totalQuantity } = useCart();
  const count = totalQuantity ?? 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative text-white hover:text-white/80 transition-colors"
        aria-label={`Warenkorb öffnen${count > 0 ? ` – ${count} Artikel` : ''}`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>

        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-brand-blue text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

'use client';

import { useCart } from '@shopify/hydrogen-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { lines, cost, checkoutUrl, linesRemove, linesUpdate } = useCart();
  const cartLines = lines ?? [];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card z-50 flex flex-col shadow-2xl border-l border-border"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-brand-blue">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white">
                Warenkorb
                {cartLines.length > 0 && (
                  <span className="ml-2 text-white/60 font-normal">
                    ({cartLines.length})
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Schließen"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartLines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border-strong"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-brand-grey text-sm">Dein Warenkorb ist leer.</p>
                  <button
                    onClick={onClose}
                    className="text-xs text-brand-blue hover:underline tracking-[0.15em] uppercase"
                  >
                    Weiter einkaufen
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-border">
                  {cartLines.map((line) => {
                    const image = line.merchandise?.image;
                    const productTitle = line.merchandise?.product?.title ?? '';
                    const variantTitle = line.merchandise?.title;
                    const price = line.merchandise?.price;

                    return (
                      <div key={line.id} className="flex gap-4 py-4">
                        <div className="relative w-16 h-20 bg-card shrink-0 overflow-hidden">
                          {image?.url && (
                            <Image
                              src={image.url}
                              alt={image.altText ?? productTitle}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground leading-snug">
                            {productTitle}
                          </p>
                          {variantTitle && variantTitle !== 'Default Title' && (
                            <p className="text-xs text-brand-grey mt-0.5">{variantTitle}</p>
                          )}
                          {price && (
                            <p className="text-sm font-semibold text-brand-blue mt-1">
                              {formatPrice(price.amount, price.currencyCode)}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                if (line.quantity <= 1) {
                                  linesRemove([line.id]);
                                } else {
                                  linesUpdate([{ id: line.id, quantity: line.quantity - 1 }]);
                                }
                              }}
                              className="w-7 h-7 border border-border flex items-center justify-center text-brand-grey hover:border-brand-blue hover:text-brand-blue transition-colors"
                              aria-label="Menge verringern"
                            >
                              −
                            </button>
                            <span className="text-sm w-5 text-center font-medium">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() =>
                                linesUpdate([{ id: line.id, quantity: line.quantity + 1 }])
                              }
                              className="w-7 h-7 border border-border flex items-center justify-center text-brand-grey hover:border-brand-blue hover:text-brand-blue transition-colors"
                              aria-label="Menge erhöhen"
                            >
                              +
                            </button>

                            <button
                              onClick={() => linesRemove([line.id])}
                              className="ml-auto text-brand-grey/40 hover:text-red-500 transition-colors"
                              aria-label="Artikel entfernen"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cartLines.length > 0 && cost?.subtotalAmount && (
              <div className="px-6 py-5 border-t border-border bg-card">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-brand-grey">Zwischensumme</span>
                  <span className="text-sm font-bold text-foreground">
                    {formatPrice(
                      cost.subtotalAmount.amount,
                      cost.subtotalAmount.currencyCode,
                    )}
                  </span>
                </div>
                <p className="text-xs text-brand-grey mb-4">
                  Versand und Steuern werden an der Kasse berechnet.
                </p>
                {checkoutUrl && (
                  <a
                    href={checkoutUrl}
                    className="block w-full bg-brand-blue text-white text-center py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-blue-dark transition-colors"
                  >
                    Zur Kasse →
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

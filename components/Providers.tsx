'use client';

import { CartProvider, ShopifyProvider } from '@shopify/hydrogen-react';

const domain = (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '').replace(/^https?:\/\//, '');
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ShopifyProvider
      storeDomain={domain}
      storefrontToken={token}
      storefrontApiVersion="2026-04"
      countryIsoCode="DE"
      languageIsoCode="DE"
    >
      <CartProvider>{children}</CartProvider>
    </ShopifyProvider>
  );
}

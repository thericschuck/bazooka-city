type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
};

export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 60,
}: ShopifyFetchParams): Promise<T> {
  const rawDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!rawDomain || !token) {
    throw new Error(
      'Missing Shopify env vars: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN must be set.'
    );
  }

  const domain = rawDomain.replace(/^https?:\/\//, '');

  const res = await fetch(`https://${domain}/api/2026-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    data: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL: ${json.errors[0].message}`);
  }

  return json.data;
}

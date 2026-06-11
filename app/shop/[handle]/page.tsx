import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { ALL_PRODUCTS_QUERY, SINGLE_PRODUCT_QUERY } from '@/lib/queries';
import type { ShopifyProductResponse, ShopifyProductsResponse } from '@/lib/types';
import ProductGallery from '@/components/ProductGallery';
import ProductActions from '@/components/ProductActions';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 100 },
    revalidate: 3600,
  });

  return data.products.edges.map(({ node }) => ({
    handle: node.handle,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: SINGLE_PRODUCT_QUERY,
    variables: { handle },
  });

  if (!data.product) {
    return { title: 'Produkt nicht gefunden | Bazooka City' };
  }

  return {
    title: `${data.product.title} | Bazooka City`,
    description: data.product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: SINGLE_PRODUCT_QUERY,
    variables: { handle },
  });

  if (!data.product) notFound();

  const product = data.product;
  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <ProductGallery images={images} title={product.title} />

        <div className="flex flex-col gap-6">
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-brand-grey tracking-[0.2em] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {product.title}
          </h1>

          {product.description && (
            <p className="text-brand-grey text-sm leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="border-t border-border pt-6">
            <ProductActions variants={variants} />
          </div>
        </div>
      </div>
    </main>
  );
}

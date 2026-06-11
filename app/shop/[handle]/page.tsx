import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { ALL_PRODUCTS_QUERY, SINGLE_PRODUCT_QUERY } from '@/lib/queries';
import type { ShopifyProductResponse, ShopifyProductsResponse } from '@/lib/types';
import ProductGallery from '@/components/ProductGallery';
import ProductActions from '@/components/ProductActions';
import ProductTabs from '@/components/ProductTabs';
import { formatPrice } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
    variables: { first: 100 },
    revalidate: 3600,
  });
  return data.products.edges.map(({ node }) => ({ handle: node.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: SINGLE_PRODUCT_QUERY,
    variables: { handle },
  });
  if (!data.product) return { title: 'Produkt nicht gefunden | Bazooka City' };
  return {
    title: `${data.product.title} | Bazooka City`,
    description: data.product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  const [productData, allData] = await Promise.all([
    shopifyFetch<ShopifyProductResponse>({
      query: SINGLE_PRODUCT_QUERY,
      variables: { handle },
    }),
    shopifyFetch<ShopifyProductsResponse>({
      query: ALL_PRODUCTS_QUERY,
      variables: { first: 8 },
    }),
  ]);

  if (!productData.product) notFound();

  const product = productData.product;
  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const related = allData.products.edges
    .map((e) => e.node)
    .filter((p) => p.handle !== handle)
    .slice(0, 4);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/shop" className="hover:text-gray-700 transition-colors">Shop</Link>
          <span>›</span>
          <span className="text-gray-700 truncate max-w-50">{product.title}</span>
        </nav>

        {/* Product section */}
        <div className="bg-white border border-gray-200 p-6 lg:p-10 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery images={images} title={product.title} />

            <div className="flex flex-col gap-6">
              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h1>

              <ProductActions variants={variants} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-10">
          <ProductTabs
            description={product.description}
            tags={product.tags}
            productType={product.productType}
          />
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ähnliche Produkte</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => {
                const img = p.images.edges[0]?.node;
                const price = p.priceRange.minVariantPrice;
                return (
                  <Link
                    key={p.id}
                    href={`/shop/${p.handle}`}
                    className="bg-white border border-gray-200 group hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
                      {img && (
                        <Image
                          src={img.url}
                          alt={img.altText ?? p.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 mb-1">
                        {p.title}
                      </p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--bc-steel)' }}>
                        {formatPrice(price.amount, price.currencyCode)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

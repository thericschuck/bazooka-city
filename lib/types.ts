export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  price: ShopifyMoney;
}

export interface ShopifyProductBase {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
}

export interface ShopifyProduct extends ShopifyProductBase {
  description: string;
  tags: string[];
  variants: {
    edges: { node: ShopifyVariant }[];
  };
}

export interface ShopifyProductsResponse {
  products: {
    edges: { node: ShopifyProductBase }[];
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct | null;
}

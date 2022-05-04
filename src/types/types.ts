export type Currency = {
  label: string;
  symbol: string;
};
export type Price = {
  currency: Currency;
  amount: number;
};

export type Attribute = {
  displayValue: string;
  value: string;
  id: string;
};

export type AttributeSet = {
  id: string;
  name: string;
  type: string;
  items: [Attribute];
};

export type ProductType = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: [string];
  description: string;
  category: string;
  attributes: [AttributeSet?];
  prices: [Price];
  brand: string;
};

export type CategoryType = {
  name: string;
  products: ProductType[];
};

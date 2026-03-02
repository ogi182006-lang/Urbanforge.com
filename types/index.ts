export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  images: string[];
  category: "streetwear" | "accessories" | "tech" | "footwear";
  tags: string[];
  stock: number;
  sizes?: string[];
  colors?: ProductColor[];
  is_featured: boolean;
  is_new: boolean;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected_size?: string;
  selected_color?: string;
}

export interface CartStore {
  items: CartItem[];
  total: number;
  count: number;
}

export interface SpinResult {
  discount: number;
  label: string;
}

export type Category = "all" | "streetwear" | "accessories" | "tech" | "footwear";

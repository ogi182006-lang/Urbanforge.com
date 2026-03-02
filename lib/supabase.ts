import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all products with optional category filter
export async function getProducts(category?: string): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products:", error);
    return getMockProducts();
  }
  return data || getMockProducts();
}

// Fetch single product
export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    // Fallback to mock
    return getMockProducts().find((p) => p.id === id) || getMockProducts()[0];
  }
  return data;
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(8);

  if (error) return getMockProducts().filter((p) => p.is_featured);
  return data || getMockProducts().filter((p) => p.is_featured);
}

// Mock data fallback (used when Supabase not configured)
export function getMockProducts(): Product[] {
  return [
    {
      id: "1",
      name: "Neon Phantom Hoodie",
      slug: "neon-phantom-hoodie",
      description:
        "Heavyweight 380gsm streetwear hoodie with reflective neon print. Crafted for Delhi winters, built for the streets. Oversized fit, kangaroo pocket, ribbed cuffs.",
      price: 2499,
      original_price: 3499,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      ],
      category: "streetwear",
      tags: ["hoodie", "neon", "oversized", "winter"],
      stock: 12,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Phantom Black", hex: "#0a0a0a" },
        { name: "Cyber Purple", hex: "#8b00ff" },
        { name: "Acid Cyan", hex: "#00f5ff" },
      ],
      is_featured: true,
      is_new: true,
      rating: 4.8,
      review_count: 234,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "CyberPunk Air Max Clone",
      slug: "cyberpunk-air-max",
      description:
        "Futuristic chunky sneakers with iridescent sole. Lightweight EVA foam, mesh upper, metallic lace loops. The drip is real.",
      price: 3999,
      original_price: 5499,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
      ],
      category: "footwear",
      tags: ["sneakers", "chunky", "iridescent"],
      stock: 5,
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: [
        { name: "White Noise", hex: "#f0f0f0" },
        { name: "Void Black", hex: "#111111" },
      ],
      is_featured: true,
      is_new: false,
      rating: 4.6,
      review_count: 189,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Forge Pro Wireless Buds",
      slug: "forge-pro-wireless-buds",
      description:
        "30hr ANC earbuds with spatial audio. Custom-tuned 10mm dynamic drivers, IPX5, dual mic noise cancellation. Sound that hits different.",
      price: 4999,
      original_price: 6999,
      images: [
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      ],
      category: "tech",
      tags: ["earbuds", "anc", "wireless", "audio"],
      stock: 23,
      colors: [
        { name: "Matte Black", hex: "#1a1a1a" },
        { name: "Pearl White", hex: "#f5f5f5" },
        { name: "Neon Teal", hex: "#00e5c8" },
      ],
      is_featured: true,
      is_new: true,
      rating: 4.9,
      review_count: 512,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Forge Chain Pendant",
      slug: "forge-chain-pendant",
      description:
        "Heavy 925 silver chain with custom anvil pendant. The OG UrbanForge signature piece. 24-inch rope chain, lobster clasp, tarnish-resistant coating.",
      price: 1899,
      original_price: 2499,
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800",
      ],
      category: "accessories",
      tags: ["chain", "silver", "pendant", "jewelry"],
      stock: 8,
      colors: [
        { name: "Silver", hex: "#c0c0c0" },
        { name: "Gold Plated", hex: "#ffd700" },
      ],
      is_featured: true,
      is_new: false,
      rating: 4.7,
      review_count: 156,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Urban Cargo Joggers",
      slug: "urban-cargo-joggers",
      description:
        "Multi-pocket tactical joggers in stretch-woven nylon. Six zip pockets, adjustable hem, reflective piping. Street-ready, daily-wearable.",
      price: 1799,
      original_price: 2299,
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800",
      ],
      category: "streetwear",
      tags: ["joggers", "cargo", "tactical", "pants"],
      stock: 19,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { name: "Charcoal", hex: "#333333" },
        { name: "Olive", hex: "#6b6b47" },
        { name: "Slate Blue", hex: "#4a5568" },
      ],
      is_featured: false,
      is_new: true,
      rating: 4.5,
      review_count: 98,
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      name: "HoloGlare Sunglasses",
      slug: "hologlare-sunglasses",
      description:
        "Y2K-inspired wraparound frames with holographic mirror lenses. UV400 protection, TR90 frame, fits all face shapes. See the city different.",
      price: 999,
      original_price: 1499,
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
      ],
      category: "accessories",
      tags: ["sunglasses", "y2k", "holographic", "UV400"],
      stock: 31,
      colors: [
        { name: "Chrome", hex: "#c0c0c0" },
        { name: "Rose Gold", hex: "#b76e79" },
        { name: "Gunmetal", hex: "#2a2a2a" },
      ],
      is_featured: false,
      is_new: false,
      rating: 4.4,
      review_count: 203,
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      name: "Forge SmartWatch X1",
      slug: "forge-smartwatch-x1",
      description:
        "AMOLED smartwatch with 45mm case, health monitoring, GPS. 7-day battery, 100+ workout modes, customizable watch faces. The wrist flex is immaculate.",
      price: 8999,
      original_price: 12999,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
      ],
      category: "tech",
      tags: ["smartwatch", "amoled", "fitness", "gps"],
      stock: 7,
      colors: [
        { name: "Midnight", hex: "#0d0d0d" },
        { name: "Starlight", hex: "#e8e8e8" },
        { name: "Cyan Surge", hex: "#00f0ff" },
      ],
      is_featured: true,
      is_new: true,
      rating: 4.7,
      review_count: 341,
      created_at: new Date().toISOString(),
    },
    {
      id: "8",
      name: "Street Puffer Vest",
      slug: "street-puffer-vest",
      description:
        "Channel-quilted puffer vest, 90% duck down fill. Lightweight packable design, stand collar, asymmetric zipper. Layering done right.",
      price: 2199,
      original_price: 2999,
      images: [
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      ],
      category: "streetwear",
      tags: ["puffer", "vest", "down", "winter"],
      stock: 15,
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Jet Black", hex: "#050505" },
        { name: "Stone", hex: "#8a8070" },
        { name: "Electric Violet", hex: "#8b00ff" },
      ],
      is_featured: false,
      is_new: false,
      rating: 4.6,
      review_count: 127,
      created_at: new Date().toISOString(),
    },
  ];
}

// Supabase SQL schema (run in Supabase SQL editor)
export const SUPABASE_SCHEMA = `
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  images TEXT[] DEFAULT '{}',
  category TEXT CHECK (category IN ('streetwear','accessories','tech','footwear')),
  tags TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  sizes TEXT[] DEFAULT '{}',
  colors JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE products;
`;

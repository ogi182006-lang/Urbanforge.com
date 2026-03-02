import type { Metadata } from "next";
import { Suspense } from "react";
import { BentoGrid } from "@/components/BentoGrid";
import { SkeletonBento } from "@/components/SkeletonCard";
import { getProducts, getMockProducts } from "@/lib/supabase";
import { VoiceSearch } from "@/components/VoiceSearch";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse all UrbanForge streetwear, gadgets and accessories. Filter by category, search by voice.",
};

async function ProductsGrid({ q }: { q?: string }) {
  let products;
  try {
    products = await getProducts();
    if (!products || products.length === 0) products = getMockProducts();
  } catch {
    products = getMockProducts();
  }

  const filtered = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())) ||
          p.category.toLowerCase().includes(q.toLowerCase())
      )
    : products;

  return <BentoGrid products={filtered} />;
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-black text-white mb-2">
          The <span className="neon-text">Drop</span>
        </h1>
        <p className="text-white/40 mb-8">Search, filter, and cop your next piece.</p>
        <VoiceSearch />
      </div>

      <Suspense fallback={
        <div className="px-4 max-w-7xl mx-auto">
          <SkeletonBento />
        </div>
      }>
        <AsyncProducts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function AsyncProducts({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  return <ProductsGrid q={params.q} />;
}

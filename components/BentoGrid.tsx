"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type Category = "all" | "streetwear" | "accessories" | "tech" | "footwear";

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "⚡" },
  { value: "streetwear", label: "Streetwear", emoji: "👕" },
  { value: "tech", label: "Tech", emoji: "🎧" },
  { value: "accessories", label: "Accessories", emoji: "💎" },
  { value: "footwear", label: "Footwear", emoji: "👟" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
};

interface BentoGridProps {
  products: Product[];
}

export function BentoGrid({ products }: BentoGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Bento layout: assign grid spans based on index
  const getBentoClass = (index: number): string => {
    const patterns = [
      "col-span-2 row-span-2", // 0: large
      "col-span-1 row-span-1", // 1: small
      "col-span-1 row-span-1", // 2: small
      "col-span-1 row-span-1", // 3: small
      "col-span-1 row-span-1", // 4: small
      "col-span-2 row-span-1", // 5: wide
      "col-span-1 row-span-1", // 6: small
      "col-span-1 row-span-1", // 7: small
    ];
    return patterns[index % patterns.length] || "col-span-1 row-span-1";
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Featured <span className="neon-text">Drops</span>
          </h2>
          <p className="text-white/40 text-sm mt-1">
            {filtered.length} items · Updated weekly
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 min-h-9 flex items-center gap-1.5 border",
                activeCategory === cat.value
                  ? "bg-cyan-400/15 border-cyan-400/40 text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                  : "border-white/8 text-white/40 hover:text-white hover:border-white/20 bg-transparent"
              )}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px]"
        key={activeCategory}
      >
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className={cn(getBentoClass(i), "min-h-0")}
          >
            <ProductCard
              product={product}
              priority={i < 2}
              variant={getBentoClass(i).includes("row-span-2") ? "large" : "default"}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold">No products in this category yet.</p>
          <p className="text-sm mt-1">Check back soon for new drops!</p>
        </div>
      )}
    </section>
  );
}

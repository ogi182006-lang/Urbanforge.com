"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/lib/cart";
import { Button } from "./ui/button";
import { toast } from "./ui/toaster";
import { cn } from "@/lib/utils";

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    setAdding(true);
    addItem(product, selectedSize, selectedColor);
    toast(`🔥 ${product.name} added to cart!`, "success");
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
            Size: <span className="text-white/60">{selectedSize}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "h-10 min-w-10 px-3 rounded-xl text-sm font-bold transition-all border",
                  selectedSize === size
                    ? "bg-cyan-400/15 border-cyan-400/60 text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
            Color: <span className="text-white/60">{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
                className={cn(
                  "h-9 w-9 rounded-xl border-2 transition-all",
                  selectedColor === color.name
                    ? "border-cyan-400 scale-110 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                    : "border-white/10 hover:border-white/30 hover:scale-105"
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stock status */}
      <div className="flex items-center gap-2">
        <div className={cn(
          "h-2 w-2 rounded-full",
          product.stock > 10 ? "bg-green-400" :
          product.stock > 0 ? "bg-amber-400" : "bg-red-500"
        )} />
        <span className="text-xs text-white/40 font-medium">
          {product.stock > 10 ? "In Stock" :
           product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
        </span>
      </div>

      {/* Add to cart */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="neon"
          size="lg"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || adding}
          className="flex-1 relative overflow-hidden"
          aria-label="Add to cart"
        >
          <AnimatePresence mode="wait">
            {adding ? (
              <motion.span
                key="added"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center gap-2"
              >
                ✓ Added to Cart!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        <Button
          variant="outline"
          size="lg"
          disabled={product.stock === 0}
          onClick={() => {
            handleAddToCart();
            setTimeout(() => {
              window.location.href = "/cart";
            }, 400);
          }}
          className="flex-1 sm:flex-none sm:w-auto"
        >
          <Zap size={16} />
          Buy Now
        </Button>
      </div>
    </div>
  );
}

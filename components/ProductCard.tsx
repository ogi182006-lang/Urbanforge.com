"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Zap, Eye } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "./ui/toaster";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  variant?: "default" | "large" | "compact";
}

export function ProductCard({ product, className, priority, variant = "default" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    toast(`${product.name} added to cart! 🔥`, "success");
    setTimeout(() => setAdding(false), 800);
  };

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const isLarge = variant === "large";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group relative", className)}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <div
          className={cn(
            "relative glass overflow-hidden h-full flex flex-col transition-all duration-300",
            "hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,240,255,0.08)]",
            isHovered && "ring-1 ring-cyan-400/20"
          )}
        >
          {/* Image */}
          <div className={cn("relative overflow-hidden bg-white/3", isLarge ? "h-72" : "h-48")}>
            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
            />

            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4"
            >
              <span className="glass px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                <Eye size={12} />
                Quick View
              </span>
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.is_new && <Badge variant="new" className="text-[10px]">NEW</Badge>}
              {discount > 0 && (
                <Badge variant="default" className="text-[10px]">
                  -{discount}%
                </Badge>
              )}
              {product.stock < 5 && product.stock > 0 && (
                <Badge variant="destructive" className="text-[10px] flex items-center gap-1">
                  <Zap size={8} fill="currentColor" />
                  Only {product.stock} left
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary" className="text-[10px]">Sold Out</Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-3 flex flex-col gap-2 flex-1">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-0.5">
                {product.category}
              </p>
              <h3 className={cn(
                "font-bold text-white leading-tight line-clamp-2",
                isLarge ? "text-lg" : "text-sm"
              )}>
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-white/50 font-medium">{product.rating}</span>
              <span className="text-xs text-white/25">({product.review_count})</span>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between gap-2 mt-auto pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className={cn("font-black neon-text-cyan", isLarge ? "text-xl" : "text-base")}>
                  {formatPrice(product.price)}
                </span>
                {product.original_price && (
                  <span className="text-xs text-white/30 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || adding}
                className="h-9 px-3 text-xs border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400 shrink-0"
                aria-label={`Add ${product.name} to cart`}
              >
                {adding ? (
                  <motion.span
                    key="adding"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-cyan-400"
                  >
                    ✓
                  </motion.span>
                ) : (
                  <ShoppingCart size={13} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, generateWhatsAppMessage } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SpinWheel } from "./SpinWheel";
import type { SpinResult } from "@/types";

export function CartView() {
  const { items, total, count, removeItem, updateQuantity, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "919876543210";

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim())) {
      e.phone = "Enter a valid 10-digit Indian mobile number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) return;
    setSubmitting(true);

    const msgItems = items.map((i) => ({
      name: `${i.product.name}${i.selected_size ? ` (${i.selected_size})` : ""}${i.selected_color ? ` - ${i.selected_color}` : ""}`,
      quantity: i.quantity,
      price: i.product.price,
    }));

    const msg = generateWhatsAppMessage(
      msgItems,
      total,
      name.trim(),
      phone.trim(),
      spinResult?.discount || 0
    );

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setTimeout(() => setSubmitting(false), 1500);
  };

  if (count === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="text-7xl">🛒</div>
          <h1 className="text-3xl font-black text-white">Your cart is empty</h1>
          <p className="text-white/40">
            Looks like you haven&apos;t added anything yet. Time to shop!
          </p>
          <Button variant="neon" size="lg" asChild>
            <Link href="/products">
              <ShoppingBag size={18} />
              Browse Products
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/products"
          className="text-white/40 hover:text-white transition-colors"
          aria-label="Continue shopping"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white">
            Your <span className="neon-text">Cart</span>
          </h1>
          <p className="text-white/40 text-sm">{count} item{count !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* Cart items */}
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const key = `${item.product.id}-${item.selected_size}-${item.selected_color}`;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4"
                >
                  {/* Product image */}
                  <Link href={`/products/${item.product.id}`} className="shrink-0">
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-white/5">
                      <Image
                        src={item.product.images[0] || "/placeholder.jpg"}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="font-bold text-white text-sm leading-tight hover:text-cyan-400 transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex gap-2 mt-1">
                      {item.selected_size && (
                        <span className="text-xs text-white/30">Size: {item.selected_size}</span>
                      )}
                      {item.selected_color && (
                        <span className="text-xs text-white/30">· {item.selected_color}</span>
                      )}
                    </div>
                    <p className="text-base font-black neon-text-cyan mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selected_size, item.selected_color)}
                      className="h-8 w-8 rounded-lg bg-white/8 text-white/60 hover:text-white hover:bg-white/15 flex items-center justify-center transition-all"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selected_size, item.selected_color)}
                      className="h-8 w-8 rounded-lg bg-white/8 text-white/60 hover:text-white hover:bg-white/15 flex items-center justify-center transition-all"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id, item.selected_size, item.selected_color)}
                      className="h-8 w-8 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 flex items-center justify-center transition-all ml-1"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Clear cart */}
          <button
            onClick={clearCart}
            className="text-xs text-white/20 hover:text-red-400 transition-colors self-end mt-1"
          >
            Clear cart
          </button>
        </div>

        {/* Order summary sidebar */}
        <div className="flex flex-col gap-4 sticky top-24">
          {/* Spin wheel */}
          <SpinWheel onResult={setSpinResult} />

          {/* Order summary */}
          <div className="glass rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-lg font-black text-white">Order Summary</h2>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selected_size}`} className="flex justify-between text-xs text-white/40">
                  <span className="truncate mr-2">{item.product.name} ×{item.quantity}</span>
                  <span className="shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/6 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              {spinResult && spinResult.discount > 0 && (
                <div className="flex justify-between text-sm text-cyan-400">
                  <span>Discount ({spinResult.discount}%)</span>
                  <span>-{formatPrice(Math.round(total * spinResult.discount / 100))}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-white/50">
                <span>Shipping</span>
                <span className="text-green-400">{total >= 999 ? "FREE" : formatPrice(99)}</span>
              </div>
              <div className="flex justify-between font-black text-lg text-white pt-1 border-t border-white/6">
                <span>Total</span>
                <span className="neon-text-cyan">
                  {formatPrice(
                    spinResult?.discount
                      ? total - Math.round(total * spinResult.discount / 100) + (total < 999 ? 99 : 0)
                      : total + (total < 999 ? 99 : 0)
                  )}
                </span>
              </div>
            </div>

            {/* Name + Phone */}
            <div className="space-y-3 pt-1">
              <div>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                  aria-label="Your name"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setErrors(p => ({ ...p, phone: undefined })); }}
                  aria-label="Mobile number"
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Checkout button */}
            <Button
              variant="neon"
              size="lg"
              onClick={handleCheckout}
              disabled={submitting}
              className="w-full"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <MessageCircle size={18} />
                  Checkout via WhatsApp
                </>
              )}
            </Button>

            <p className="text-center text-xs text-white/20 leading-relaxed">
              You&apos;ll be redirected to WhatsApp with your order summary. We&apos;ll confirm and arrange payment. 🤝
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

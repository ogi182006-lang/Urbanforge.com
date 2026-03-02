import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { SkeletonBento } from "@/components/SkeletonCard";
import { getFeaturedProducts, getMockProducts } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "UrbanForge — Forged for the Streets, Built for the Bold",
  description:
    "Shop Delhi's freshest streetwear, gadgets & accessories. Neon aesthetics. Futuristic fits. Order via WhatsApp instantly.",
};

async function FeaturedProducts() {
  let products;
  try {
    products = await getFeaturedProducts();
    if (!products || products.length === 0) {
      products = getMockProducts();
    }
  } catch {
    products = getMockProducts();
  }

  return <BentoGrid products={products} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Marquee strip */}
      <div className="overflow-hidden border-y border-white/6 bg-black/20 py-3 select-none">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(3)].flatMap(() => [
            "⚡ FREE SHIPPING ABOVE ₹999",
            "🔥 NEW DROPS EVERY FRIDAY",
            "💳 PAY EASY VIA WHATSAPP",
            "🚀 SAME-DAY DISPATCH DELHI",
            "💎 PREMIUM QUALITY GUARANTEE",
          ]).map((text, i) => (
            <span key={i} className="text-xs font-bold text-white/30 tracking-widest uppercase">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <Suspense fallback={
        <div className="py-16 px-4 max-w-7xl mx-auto">
          <SkeletonBento />
        </div>
      }>
        <FeaturedProducts />
      </Suspense>

      {/* Brand strip */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center overflow-hidden relative">
          <div className="absolute inset-0 grid-glow rounded-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Why UrbanForge?
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              No app. No hassle.
              <br />
              <span className="neon-text">Just WhatsApp & chill.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              Browse, pick your drip, spin the wheel for a discount, and send us your order on
              WhatsApp. We confirm, you pay on delivery. Simple as that. 💬
            </p>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            {[
              { icon: "⚡", title: "Instant Order", desc: "WhatsApp checkout in 30 seconds" },
              { icon: "🚚", title: "Fast Dispatch", desc: "Delhi orders out same day" },
              { icon: "🔄", title: "Easy Returns", desc: "7-day no-questions returns" },
              { icon: "🎰", title: "Spin & Win", desc: "Random discount on every cart" },
            ].map((f) => (
              <div key={f.title} className="glass rounded-xl p-4">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-white/40">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </>
  );
}

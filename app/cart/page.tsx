import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your cart and checkout via WhatsApp. Spin the wheel for a discount!",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <CartView />
    </div>
  );
}

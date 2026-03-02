import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Home, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found | UrbanForge",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-20">
      <div className="text-[120px] font-black neon-text leading-none select-none">
        404
      </div>
      <h1 className="text-3xl font-black text-white mt-4 mb-3">
        Page Not Found
      </h1>
      <p className="text-white/40 max-w-xs mb-8 leading-relaxed">
        This page got lost somewhere in the cyber-streets of Delhi. 🌆
      </p>
      <div className="flex gap-3">
        <Button variant="neon" asChild>
          <Link href="/"><Home size={16} /> Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products"><Zap size={16} /> Browse Shop</Link>
        </Button>
      </div>
    </div>
  );
}

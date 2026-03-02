"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Mic, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/cart", label: "Cart" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong border-b border-white/8 py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap
              size={24}
              className="text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300"
              fill="currentColor"
            />
          </div>
          <span className="text-xl font-black tracking-tight">
            <span className="neon-text">Urban</span>
            <span className="text-white">Forge</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "text-cyan-400 bg-cyan-400/10"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mic hint */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-white/40 hover:text-purple-400"
            aria-label="Voice search"
            title="Voice search available in search bar"
          >
            <Mic size={18} />
          </Button>

          {/* Cart */}
          <Link href="/cart" aria-label={`Cart (${count} items)`}>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white/70 hover:text-white"
              asChild={false}
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 text-[10px] font-black text-white flex items-center justify-center badge-pulse">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/8 glass-strong"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                    pathname === link.href
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-white/70 hover:text-white hover:bg-white/8"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ParticleCanvas } from "./ParticleCanvas";
import { VoiceSearch } from "./VoiceSearch";
import { Badge } from "./ui/badge";

const STATS = [
  { value: "10K+", label: "Orders Delivered" },
  { value: "500+", label: "Drops Listed" },
  { value: "4.8★", label: "Avg Rating" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-12"
    >
      {/* Particle background */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>

      {/* Gradient mesh */}
      <div className="absolute inset-0 grid-glow" aria-hidden="true" />

      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-black text-white/[0.015] tracking-tighter">
          FORGE
        </span>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center gap-6 px-4 max-w-5xl mx-auto"
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge variant="neon" className="gap-1.5 px-4 py-1.5 text-xs">
            <Sparkles size={11} />
            New Drops Every Friday · Delhi-Exclusive Collabs
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-balance"
        >
          <span className="text-white">Forged </span>
          <span className="neon-text">for the</span>
          <br />
          <span className="text-white">Streets</span>
          <span className="text-white/20">.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-xl text-white/50 max-w-2xl leading-relaxed"
        >
          Premium streetwear, cutting-edge tech & killer accessories.
          <br className="hidden sm:block" />
          Delhi-born. World-ready. Order via WhatsApp in seconds.
        </motion.p>

        {/* Voice Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full max-w-xl"
        >
          <VoiceSearch />
          <p className="text-xs text-white/20 mt-2 flex items-center justify-center gap-1">
            <Zap size={10} />
            Try voice: &quot;Show me hoodies under ₹3000&quot;
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Button variant="neon" size="lg" asChild className="w-full sm:w-auto group">
            <Link href="/products">
              Shop Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link href="/products?category=new">
              <TrendingUp size={18} />
              New Arrivals
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-8 pt-4"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black neon-text">{stat.value}</div>
              <div className="text-xs text-white/30 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}

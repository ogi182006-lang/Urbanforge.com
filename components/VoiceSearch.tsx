"use client";

import { useState } from "react";
import { Mic, MicOff, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceSearch } from "@/lib/voice";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function VoiceSearch() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { startListening } = useVoiceSearch();
  const router = useRouter();

  const handleVoice = () => {
    startListening({
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      onResult: (text) => {
        setQuery(text);
        setIsListening(false);
        router.push(`/products?q=${encodeURIComponent(text)}`);
      },
      onError: () => {
        setIsListening(false);
        setIsSupported(false);
      },
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
      <div
        className={cn(
          "flex items-center gap-3 glass rounded-2xl px-4 py-3 transition-all duration-300",
          isListening && "ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        )}
      >
        <Search size={18} className="text-white/30 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isListening ? "Listening..." : "Search hoodies, earbuds, sneakers..."}
          className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none min-w-0"
          aria-label="Search products"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-white/30 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {isSupported && (
          <button
            type="button"
            onClick={handleVoice}
            className={cn(
              "h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0",
              isListening
                ? "bg-red-500/20 text-red-400 animate-pulse"
                : "bg-white/8 text-white/50 hover:text-purple-400 hover:bg-purple-400/10"
            )}
            aria-label={isListening ? "Listening..." : "Voice search"}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.span key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <MicOff size={15} />
                </motion.span>
              ) : (
                <motion.span key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Mic size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>

      {isListening && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1 items-end h-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-cyan-400 rounded-full"
              animate={{ height: ["4px", "20px", "4px"] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </form>
  );
}

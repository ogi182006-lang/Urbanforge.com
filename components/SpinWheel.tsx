"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gift } from "lucide-react";
import { Button } from "./ui/button";
import type { SpinResult } from "@/types";

const SEGMENTS: SpinResult[] = [
  { discount: 5, label: "5% OFF 🎉" },
  { discount: 10, label: "10% OFF 🔥" },
  { discount: 0, label: "Better Luck!" },
  { discount: 15, label: "15% OFF ⚡" },
  { discount: 0, label: "Try Again!" },
  { discount: 20, label: "20% OFF 💥" },
  { discount: 5, label: "5% OFF 🎉" },
  { discount: 10, label: "10% OFF 🔥" },
];

const COLORS = [
  "#00f0ff22", "#8b00ff33", "#00f0ff11", "#c300ff33",
  "#6400ff22", "#00f0ff33", "#8b00ff22", "#c300ff22",
];

interface SpinWheelProps {
  onResult: (result: SpinResult) => void;
}

export function SpinWheel({ onResult }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const segCount = SEGMENTS.length;
  const segAngle = 360 / segCount;

  const drawWheel = (rot: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const r = cx - 4;

    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < segCount; i++) {
      const startAngle = ((rot + i * segAngle - 90) * Math.PI) / 180;
      const endAngle = ((rot + (i + 1) * segAngle - 90) * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[i];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(((rot + i * segAngle + segAngle / 2 - 90) * Math.PI) / 180);
      ctx.fillStyle = "white";
      ctx.font = "bold 10px Manrope, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(SEGMENTS[i].label, r - 10, 4);
      ctx.restore();
    }

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#0a0a14";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,240,255,0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const spin = () => {
    if (spinning || hasSpun) return;
    setSpinning(true);

    const extra = 1440 + Math.random() * 720;
    const targetRot = rotation + extra;

    let current = rotation;
    const totalFrames = 120;
    let frame = 0;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = () => {
      frame++;
      const t = frame / totalFrames;
      const eased = easeOut(t);
      current = rotation + extra * eased;
      drawWheel(current % 360);
      setRotation(current);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        const finalRot = current % 360;
        const normalised = (360 - finalRot + 270) % 360;
        const idx = Math.floor(normalised / segAngle) % segCount;
        const res = SEGMENTS[idx];
        setResult(res);
        setHasSpun(true);
        setSpinning(false);
        onResult(res);
      }
    };

    drawWheel(rotation);
    requestAnimationFrame(animate);
  };

  // Draw initial wheel
  if (typeof window !== "undefined" && canvasRef.current) {
    requestAnimationFrame(() => drawWheel(rotation));
  }

  return (
    <div className="glass rounded-2xl p-6 flex flex-col items-center gap-5">
      <div className="flex items-center gap-2">
        <Gift size={20} className="text-purple-400" />
        <h3 className="text-lg font-black text-white">Spin for Discount</h3>
        <Sparkles size={16} className="text-cyan-400" />
      </div>

      <p className="text-xs text-white/40 text-center -mt-2">
        Spin once to unlock a random discount on your order!
      </p>

      {/* Wheel */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-cyan-400 drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]" />

        <canvas
          ref={(el) => {
            (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
            if (el) drawWheel(rotation % 360);
          }}
          width={220}
          height={220}
          className="rounded-full border border-white/10"
          style={{ filter: "drop-shadow(0 0 20px rgba(100,0,255,0.3))" }}
        />
      </div>

      {result ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          {result.discount > 0 ? (
            <>
              <p className="text-2xl font-black neon-text">{result.label}</p>
              <p className="text-xs text-white/40 mt-1">
                Discount applied to your WhatsApp order!
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-white/60">{result.label}</p>
              <p className="text-xs text-white/30 mt-1">No discount this time. Good luck next order!</p>
            </>
          )}
        </motion.div>
      ) : (
        <Button
          onClick={spin}
          disabled={spinning}
          variant="neon"
          size="lg"
          className="w-full"
        >
          {spinning ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
          ) : (
            <>
              <Sparkles size={16} />
              Spin the Wheel
            </>
          )}
        </Button>
      )}
    </div>
  );
}

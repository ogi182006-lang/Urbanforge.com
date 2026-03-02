"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
}

let toastQueue: Toast[] = [];
let listeners: ((toasts: Toast[]) => void)[] = [];

export function toast(message: string, type: Toast["type"] = "success") {
  const id = Math.random().toString(36).slice(2);
  toastQueue = [...toastQueue, { id, message, type }];
  listeners.forEach((l) => l(toastQueue));
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    listeners.forEach((l) => l(toastQueue));
  }, 3000);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const l = (t: Toast[]) => setToasts([...t]);
    listeners.push(l);
    return () => { listeners = listeners.filter((x) => x !== l); };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "glass px-4 py-3 rounded-xl text-sm font-medium text-white shadow-2xl pointer-events-auto",
            "animate-in slide-in-from-right-5 fade-in duration-300",
            t.type === "error" && "border-red-500/30 bg-red-950/50",
            t.type === "success" && "border-cyan-500/30 bg-cyan-950/30",
            t.type === "info" && "border-purple-500/30 bg-purple-950/30"
          )}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

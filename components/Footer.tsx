import Link from "next/link";
import { Zap, Instagram, Twitter, Youtube, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black/40 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap size={20} className="text-cyan-400" fill="currentColor" />
              <span className="text-lg font-black">
                <span className="neon-text">Urban</span>
                <span className="text-white">Forge</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Forged for the streets.<br />Built for the bold.
            </p>
            <div className="flex items-center gap-1 mt-3 text-white/30 text-xs">
              <MapPin size={12} />
              <span>New Delhi, India 🇮🇳</span>
            </div>
            <div className="flex gap-3 mt-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                  aria-label={["Instagram","Twitter","YouTube"][i]}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Shop</h3>
            <ul className="space-y-2">
              {["Streetwear", "Accessories", "Tech Gadgets", "Footwear", "New Arrivals", "Sale"].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-sm text-white/50 hover:text-cyan-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Info</h3>
            <ul className="space-y-2">
              {["About Us", "Size Guide", "Shipping Info", "Returns", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Connect</h3>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || "919876543210"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition-colors mb-3"
            >
              <span>💬</span> WhatsApp Us
            </a>
            <a
              href="mailto:hello@urbanforge.in"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors"
            >
              <Mail size={14} /> hello@urbanforge.in
            </a>
            <p className="text-xs text-white/25 mt-4">
              Orders via WhatsApp only.<br />
              Quick response 10am–10pm IST
            </p>
          </div>
        </div>

        <div className="border-t border-white/6 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} UrbanForge. All rights reserved.
          </p>
          <p className="text-xs text-white/15 font-mono">
            v1.0.0 · Made with 🔥 in Delhi
          </p>
        </div>
      </div>
    </footer>
  );
}

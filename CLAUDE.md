# UrbanForge — CLAUDE Rules & Dev Guidelines

## Project Identity
**UrbanForge** — A premium Delhi/urban youth fashion & gadget e-commerce store.
Tagline: *Forged for the streets. Built for the bold.*

## Strict Coding Rules

### Dark Mode
- `dark` class MUST always be supported on every component
- Default: system preference via `next-themes`, with manual toggle
- Never use `text-black` or `bg-white` without a `dark:` variant

### Components
- All components: functional + hooks (no class components, ever)
- Props: fully typed with TypeScript interfaces in `types/index.ts`
- Never use `any` — use `unknown` and narrow types

### Performance
- `next/image` for ALL images — always set width/height or fill+sizes
- Always `priority` on above-the-fold images
- Lazy-load 3D: `dynamic(() => import(...), { ssr: false })`
- Skeleton loaders for every async data fetch
- No `console.log` in production

### Styling
- Tailwind CSS 4 utility classes
- glassmorphism: `backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl shadow-xl`
- Thumb-friendly: all tap targets minimum h-12 (48px)
- Mobile-first approach

### Animations
- Page transitions via AnimatePresence
- Respect prefers-reduced-motion
- Max 0.6s for UI animations

### Git Commits
- feat/fix/style/perf/chore prefix convention

### Supabase
- Client in lib/supabase.ts (singleton)
- Always unsubscribe realtime on unmount
- Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

### Cart
- localStorage key: uf_cart
- useCart() hook from lib/cart.ts

### WhatsApp
- Phone: NEXT_PUBLIC_WA_NUMBER env var
- Always encodeURIComponent the message

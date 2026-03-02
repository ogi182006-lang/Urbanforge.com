# UrbanForge ⚡

> Delhi's premier streetwear & tech gadgets store — Forged for the urban youth.

![UrbanForge](./public/logo.svg)

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and add your values
cp .env.example .env.local
# Edit .env.local — at minimum, set NEXT_PUBLIC_WHATSAPP_NUMBER

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> **Note:** The app works completely with beautiful mock data even without Supabase configured. Just add your WhatsApp number in `.env.local` and deploy!

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env vars in Vercel dashboard or:
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
```

---

## 🗃️ Supabase Setup (Optional — for real products)

1. Create a project at [supabase.com](https://supabase.com)
2. Run this SQL in the SQL editor:

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  original_price numeric,
  images text[] default '{}',
  category text,
  tags text[] default '{}',
  stock integer default 0,
  sizes text[] default '{}',
  colors text[] default '{}',
  is_featured boolean default false,
  is_new boolean default false,
  rating numeric default 4.5,
  review_count integer default 0,
  created_at timestamptz default now()
);

-- Enable realtime updates
alter publication supabase_realtime add table products;

-- Example product
insert into products (name, description, price, original_price, images, category, tags, stock, sizes, colors, is_featured, is_new)
values (
  'Cyber Hoodie X',
  'Premium oversized hoodie with neon print.',
  2499, 3999,
  array['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800'],
  'streetwear',
  array['hoodie', 'streetwear'],
  15,
  array['S','M','L','XL'],
  array['#000000','#c300ff'],
  true, true
);
```

3. Copy your project URL and anon key to `.env.local`

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| @react-three/fiber | 3D product viewer |
| Zustand | Cart state (localStorage) |
| Supabase | Database + realtime |
| next-themes | Dark/light mode |
| lucide-react | Icons |

---

## 🎯 Features

- **Bento Grid** product showcase
- **Voice Search** (Web Speech API, en-IN)
- **Scrollytelling Hero** with parallax & particles
- **3D Product Viewer** (Three.js / @react-three/fiber)
- **Spin Wheel** gamification (5–20% discounts)
- **WhatsApp Checkout** — no payment gateway needed
- **Dark Mode** (default) with system preference
- **Glassmorphism** UI throughout
- **Full SEO** — metadata, OG, JSON-LD, sitemap, robots
- **Mock data fallback** — works without Supabase

---

## 📱 WhatsApp Checkout Flow

1. User adds items to cart
2. Spins the wheel for a discount (optional)
3. Enters name + phone number
4. Clicks "Order via WhatsApp"
5. Pre-filled WhatsApp message opens with full order summary
6. You confirm and arrange delivery/payment!

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅ | Your WhatsApp number with country code |
| `NEXT_PUBLIC_SUPABASE_URL` | ❌ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ | Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | ❌ | Your deployed URL (for SEO) |

---

Made with ⚡ in Delhi, India.

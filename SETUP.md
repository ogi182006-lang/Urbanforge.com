# UrbanForge — Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Configure Environment
Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

### Supabase Setup
1. Go to https://supabase.com → New Project
2. Copy your Project URL and anon key to `.env.local`
3. In Supabase SQL Editor, run the schema from `lib/supabase.ts` (see `SUPABASE_SCHEMA` export)

### WhatsApp
Set `NEXT_PUBLIC_WA_NUMBER` to your WhatsApp Business number (e.g., `919876543210` for +91 98765 43210)

## 3. Run Dev Server
```bash
npm run dev
```
Open http://localhost:3000

## 4. Build for Production
```bash
npm run build
npm start
```

## 5. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env vars in Vercel dashboard or via CLI:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_WA_NUMBER
```

## Supabase Schema (run in SQL editor)
```sql
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  images TEXT[] DEFAULT '{}',
  category TEXT CHECK (category IN ('streetwear','accessories','tech','footwear')),
  tags TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  sizes TEXT[] DEFAULT '{}',
  colors JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE products;
```

## Note on Mock Data
Without Supabase configured, the site uses built-in mock products (8 items). 
This is production-safe — configure Supabase to use real data.

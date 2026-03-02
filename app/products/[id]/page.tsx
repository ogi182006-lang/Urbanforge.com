import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Shield, Truck, RefreshCw, Zap } from "lucide-react";
import { getProduct, getMockProducts } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BentoGrid } from "@/components/BentoGrid";
import { ProductActions } from "@/components/ProductActions";

// Lazy-load 3D viewer (client only)
const ProductViewer = dynamic(() => import("@/components/3d/ProductViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 md:h-80 glass rounded-2xl skeleton" />
  ),
});

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let product;
  try {
    product = await getProduct(id);
  } catch {
    product = getMockProducts().find((p) => p.id === id);
  }

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | UrbanForge`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0], width: 800, height: 600 }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  let product;
  try {
    product = await getProduct(id);
  } catch {
    product = getMockProducts().find((p) => p.id === id);
  }

  if (!product) notFound();

  const relatedProducts = getMockProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  // 3D color from first product color
  const viewerColor = product.colors?.[0]?.hex || "#00f0ff";

  // JSON-LD Product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.review_count,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>

          {/* Main product grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Images + 3D */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="relative aspect-[4/3] overflow-hidden glass rounded-2xl">
                <Image
                  src={product.images[0] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {product.is_new && (
                  <Badge variant="new" className="absolute top-4 left-4">NEW DROP</Badge>
                )}
                {discount > 0 && (
                  <Badge variant="default" className="absolute top-4 right-4">-{discount}%</Badge>
                )}
              </div>

              {/* Thumbnail row */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden glass border border-white/10">
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 3D Viewer */}
              <ProductViewer color={viewerColor} />
            </div>

            {/* Right: Product info + actions */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                    {product.category}
                  </span>
                  {product.stock < 5 && product.stock > 0 && (
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Zap size={10} fill="currentColor" />
                      Only {product.stock} left!
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white">{product.rating}</span>
                  <span className="text-sm text-white/30">({product.review_count} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-black neon-text-cyan">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && (
                    <>
                      <span className="text-xl text-white/30 line-through">
                        {formatPrice(product.original_price)}
                      </span>
                      <Badge variant="neon" className="text-xs">Save {discount}%</Badge>
                    </>
                  )}
                </div>

                <p className="text-white/50 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-lg bg-white/5 text-white/40 border border-white/8">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Client-side actions (size/color selector + add to cart) */}
              <ProductActions product={product} />

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, text: "Free Ship ₹999+" },
                  { icon: Shield, text: "Authentic Goods" },
                  { icon: RefreshCw, text: "7-Day Returns" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="glass rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
                    <Icon size={16} className="text-cyan-400" />
                    <span className="text-xs text-white/40 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-black text-white mb-6">
                You Might Also <span className="neon-text">Like</span>
              </h2>
              <BentoGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

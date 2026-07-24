import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/data/api";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { StyledWith } from "@/components/product/StyledWith";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — MISUNI JEWELS",
    };
  }

  return {
    title: `${product.name} — MISUNI JEWELS`,
    description: product.description,
    openGraph: {
      title: `${product.name} — MISUNI JEWELS`,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="max-w-[1440px] mx-auto px-8 py-32 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-[0.3rem] text-[#2d3435] mb-8">
          Product Not Found
        </h1>
        <Link
          href="/collections"
          className="inline-block bg-[#2d3435] text-[#faf7f6] px-12 py-5 uppercase tracking-[0.3rem] text-sm hover:bg-[#535252] transition-all"
        >
          Browse Collections
        </Link>
      </main>
    );
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <ImageGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <StyledWith products={relatedProducts} />
      )}
    </main>
  );
}

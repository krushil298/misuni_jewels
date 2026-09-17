import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/data/api";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Icon } from "@/components/ui/Icon";
import { getProductSchema } from "@/lib/schema";
import { titleCase } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Piece not found" };

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | MISUNI JEWELS`,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // A bad slug is a 404, not a styled dead end that still renders chrome.
  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductSchema(product)),
        }}
      />

      <main className="mx-auto w-full max-w-[1600px] px-5 py-6 md:px-8 md:py-10 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-6 md:mb-10">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/collections"
                className="meta transition-colors duration-150 hover:text-brand"
              >
                Collection
              </Link>
            </li>
            <li aria-hidden className="text-ink-faint">
              <Icon name="chevron-right" size={12} />
            </li>
            <li>
              <Link
                href={`/collections?category=${product.category}`}
                className="meta transition-colors duration-150 hover:text-brand"
              >
                {titleCase(product.category)}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <ImageGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <RelatedProducts products={related} />
      </main>
    </>
  );
}

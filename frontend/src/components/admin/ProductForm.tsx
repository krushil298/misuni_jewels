"use client";

import { useState, useCallback, useEffect } from "react";
import type { Product } from "@/types";

type ProductFormData = Omit<Product, "id">;

interface ProductFormProps {
  /** If provided, the form is in "edit" mode. Otherwise, "create" mode. */
  initialData?: Product;
  /** Called when the form is submitted with valid data */
  onSubmit: (data: ProductFormData) => Promise<void>;
  /** Whether the form is currently submitting */
  submitting?: boolean;
}

const CATEGORIES = ["necklaces", "rings", "earrings", "bracelets", "bangles", "pendants"];
const METALS = [
  "18k Yellow Gold",
  "18k White Gold",
  "18k Rose Gold",
  "14k Yellow Gold",
  "14k White Gold",
  "14k Rose Gold",
  "22k Yellow Gold",
  "Platinum",
];
const COLLECTIONS = ["celestial", "eternal", "heritage", "modern", "signature", ""];

/** Auto-generate a slug from a product name */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function ProductForm({ initialData, onSubmit, submitting }: ProductFormProps) {
  const isEdit = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [price, setPrice] = useState(initialData?.price?.toString() ?? "");
  const [category, setCategory] = useState(initialData?.category ?? CATEGORIES[0]);
  const [metal, setMetal] = useState(initialData?.metal ?? METALS[0]);
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [details, setDetails] = useState(initialData?.details?.join("\n") ?? "");
  const [sizes, setSizes] = useState(initialData?.sizes?.join(", ") ?? "");
  const [images, setImages] = useState(initialData?.images?.join("\n") ?? "");
  const [isBestseller, setIsBestseller] = useState(initialData?.isBestseller ?? false);
  const [isNew, setIsNew] = useState(initialData?.isNew ?? false);
  const [collection, setCollection] = useState(initialData?.collection ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate slug from name (unless user has manually edited it)
  useEffect(() => {
    if (!slugTouched && !isEdit) {
      setSlug(generateSlug(name));
    }
  }, [name, slugTouched, isEdit]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Product name is required";
    if (!slug.trim()) newErrors.slug = "Slug is required";
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Enter a valid price greater than 0";
    if (!description.trim()) newErrors.description = "Description is required";

    const imageUrls = images
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);
    if (imageUrls.length === 0) newErrors.images = "At least one image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, slug, price, description, images]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const imageUrls = images
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const detailsList = details
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    const sizesList = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const formData: ProductFormData = {
      name: name.trim(),
      slug: slug.trim(),
      price: Number(price),
      category,
      metal,
      description: description.trim(),
      details: detailsList,
      sizes: sizesList.length > 0 ? sizesList : undefined,
      images: imageUrls,
      isBestseller,
      isNew,
      collection: collection || "",
    };

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* ── Basic Info ──────────────────────────────────────── */}
      <section className="admin-card p-6 space-y-5">
        <h2 className="text-[0.7rem] tracking-[0.2rem] uppercase font-bold text-white font-sans mb-2">
          Basic Information
        </h2>

        {/* Name */}
        <div>
          <label htmlFor="name" className="admin-label">Product Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`admin-input ${errors.name ? "!border-red-500/50" : ""}`}
            placeholder="Celestial Drop Necklace"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="admin-label">Slug *</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className={`admin-input ${errors.slug ? "!border-red-500/50" : ""}`}
            placeholder="celestial-drop-necklace"
          />
          {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug}</p>}
          {!slugTouched && !isEdit && (
            <p className="text-white/20 text-[0.6rem] mt-1">Auto-generated from name</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="admin-label">Price (₹) *</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`admin-input ${errors.price ? "!border-red-500/50" : ""}`}
            placeholder="45000"
            min="0"
            step="1"
          />
          {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
        </div>

        {/* Category + Metal row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="category" className="admin-label">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="admin-input capitalize"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#1a2421] capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="metal" className="admin-label">Metal</label>
            <select
              id="metal"
              value={metal}
              onChange={(e) => setMetal(e.target.value)}
              className="admin-input"
            >
              {METALS.map((m) => (
                <option key={m} value={m} className="bg-[#1a2421]">
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Collection */}
        <div>
          <label htmlFor="collection" className="admin-label">Collection</label>
          <select
            id="collection"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="admin-input capitalize"
          >
            {COLLECTIONS.map((col) => (
              <option key={col} value={col} className="bg-[#1a2421] capitalize">
                {col || "— None —"}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Description & Details ───────────────────────────── */}
      <section className="admin-card p-6 space-y-5">
        <h2 className="text-[0.7rem] tracking-[0.2rem] uppercase font-bold text-white font-sans mb-2">
          Description & Details
        </h2>

        {/* Description */}
        <div>
          <label htmlFor="description" className="admin-label">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`admin-input admin-textarea ${errors.description ? "!border-red-500/50" : ""}`}
            placeholder="A graceful necklace featuring a brilliant-cut diamond pendant..."
          />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Details (one per line) */}
        <div>
          <label htmlFor="details" className="admin-label">
            Details <span className="text-white/20">(one per line)</span>
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="admin-input admin-textarea"
            placeholder={"18k Yellow Gold\n0.5ct IGI Certified Diamond\nAdjustable chain 16-18 inches\nBIS Hallmarked"}
          />
        </div>

        {/* Sizes */}
        <div>
          <label htmlFor="sizes" className="admin-label">
            Sizes <span className="text-white/20">(comma-separated, optional)</span>
          </label>
          <input
            id="sizes"
            type="text"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="admin-input"
            placeholder="5, 6, 7, 8, 9"
          />
        </div>
      </section>

      {/* ── Images ──────────────────────────────────────────── */}
      <section className="admin-card p-6 space-y-5">
        <h2 className="text-[0.7rem] tracking-[0.2rem] uppercase font-bold text-white font-sans mb-2">
          Images
        </h2>

        <div>
          <label htmlFor="images" className="admin-label">
            Image URLs * <span className="text-white/20">(one per line)</span>
          </label>
          <textarea
            id="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className={`admin-input admin-textarea ${errors.images ? "!border-red-500/50" : ""}`}
            placeholder={"https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg"}
          />
          {errors.images && <p className="text-red-400 text-xs mt-1">{errors.images}</p>}
        </div>

        {/* Image preview */}
        {images.trim() && (
          <div className="flex gap-3 flex-wrap">
            {images
              .split("\n")
              .map((url) => url.trim())
              .filter(Boolean)
              .slice(0, 6)
              .map((url, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded bg-white/5 overflow-hidden border border-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ))}
          </div>
        )}
      </section>

      {/* ── Flags ───────────────────────────────────────────── */}
      <section className="admin-card p-6 space-y-5">
        <h2 className="text-[0.7rem] tracking-[0.2rem] uppercase font-bold text-white font-sans mb-2">
          Flags
        </h2>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Bestseller toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`admin-toggle ${isBestseller ? "active" : ""}`}
              onClick={() => setIsBestseller(!isBestseller)}
            />
            <span className="text-[0.7rem] tracking-wider text-white/60 group-hover:text-white/80 transition-colors font-sans">
              Bestseller
            </span>
          </label>

          {/* New Arrival toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`admin-toggle ${isNew ? "active" : ""}`}
              onClick={() => setIsNew(!isNew)}
            />
            <span className="text-[0.7rem] tracking-wider text-white/60 group-hover:text-white/80 transition-colors font-sans">
              New Arrival
            </span>
          </label>
        </div>
      </section>

      {/* ── Submit ──────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="admin-btn admin-btn-primary"
        >
          {submitting
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
              ? "Save Changes"
              : "Create Product"}
        </button>
        <a
          href="/admin/products"
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

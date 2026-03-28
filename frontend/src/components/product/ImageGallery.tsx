"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(0);

  return (
    <div className="lg:col-span-7 space-y-8">
      <div className="aspect-[4/5] bg-surface-container-lowest overflow-hidden">
        <Image
          src={images[mainImage]}
          alt={name}
          width={1200}
          height={1500}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-8">
          {images.slice(1, 3).map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImage(i + 1)}
              className={`aspect-[4/5] bg-surface-container-lowest overflow-hidden border-2 transition-colors ${
                mainImage === i + 1
                  ? "border-[#2d3435]"
                  : "border-transparent hover:border-[#adb3b4]"
              }`}
            >
              <Image
                src={img}
                alt={`${name} view ${i + 2}`}
                width={600}
                height={750}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

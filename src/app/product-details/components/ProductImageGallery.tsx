'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-secondary cursor-zoom-in border border-border"
        onClick={() => setZoomed(true)}
      >
        <AppImage
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          priority
          className="object-cover transition-all duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-card transition-all"
          aria-label="Previous image"
        >
          <Icon name="ChevronLeftIcon" size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-card transition-all"
          aria-label="Next image"
        >
          <Icon name="ChevronRightIcon" size={16} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-foreground/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 p-2 bg-card/80 rounded-lg backdrop-blur-sm">
          <Icon name="MagnifyingGlassPlusIcon" size={14} className="text-muted-foreground" />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
              idx === activeIndex ? 'border-primary shadow-md' : 'border-border hover:border-muted-foreground'
            }`}
            aria-label={`View image ${idx + 1} of ${productName}`}
          >
            <AppImage
              src={img.src}
              alt={`Thumbnail ${idx + 1} of ${productName}`}
              fill
              className="object-cover"
              sizes="80px"
            />
            {idx !== activeIndex && (
              <div className="absolute inset-0 bg-white/30" />
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="relative max-w-3xl w-full aspect-square" onClick={(e) => e.stopPropagation()}>
            <AppImage
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-lg"
              aria-label="Close zoom"
            >
              <Icon name="XMarkIcon" size={18} />
            </button>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-lg hover:bg-secondary transition-colors"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={18} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-lg hover:bg-secondary transition-colors"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
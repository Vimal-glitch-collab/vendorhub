'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface Category {
  name: string;
  productCount: string;
  image: string;
  alt: string;
  tag?: string;
  colSpan?: string;
  rowSpan?: string;
}

const categories: Category[] = [
{
  name: 'Electronics',
  productCount: '12,400 products',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c3fcab2-1772196420648.png",
  alt: 'Bright tech products on white surface, cameras laptops headphones arranged neatly, clean studio lighting, airy open environment',
  tag: 'Most Popular',
  colSpan: 'md:col-span-2'
},
{
  name: 'Fashion',
  productCount: '8,200 products',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d765b663-1767177310946.png",
  alt: 'Bright airy clothing store with white walls, neatly hung colorful garments, natural daylight streaming through windows',
  rowSpan: 'md:row-span-2'
},
{
  name: 'Home & Living',
  productCount: '6,800 products',
  image: "https://images.unsplash.com/photo-1723257131569-56c62bfa1d2f",
  alt: 'Bright modern living room with natural light, minimalist white furniture, clean open space with indoor plants'
},
{
  name: 'Sports',
  productCount: '4,100 products',
  image: "https://images.unsplash.com/photo-1685633224745-ebb90e6ae2fd",
  alt: 'Bright gym with athletic equipment, clean white floors, natural light from skylights, energetic open atmosphere'
},
{
  name: 'Beauty',
  productCount: '3,900 products',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_111818c78-1772546703266.png",
  alt: 'Bright beauty product flat lay on white marble, skincare bottles and cosmetics neatly arranged, soft natural lighting'
},
{
  name: 'Books & Stationery',
  productCount: '5,300 products',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_146e0a255-1772094884313.png",
  alt: 'Bright airy library with white wooden shelves, colorful book spines, warm natural light through tall windows',
  colSpan: 'md:col-span-2'
}];


export default function CategoryBentoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-hidden').forEach((el) => {
              el.classList.add('scroll-visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 scroll-hidden stagger-1">
          <div>
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">
              Shop by Category
            </span>
            <h2 className="text-section-title font-extrabold text-foreground tracking-tight">
              Find what you&apos;re looking for.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-foreground border-b border-border hover:border-foreground pb-0.5 transition-colors whitespace-nowrap">
            
            View all categories
            <span>→</span>
          </Link>
        </div>

        {/* Bento Grid
           STEP 1: 6 cards: [Electronics cs-2, Fashion rs-2, Home & Living, Sports, Beauty, Books cs-2]
           STEP 2:
           Row 1: [col-1: Electronics cs-2] [col-3: Fashion rs-2]
           Row 2: [col-1: Home & Living] [col-2: Sports] [col-3: already filled by Fashion]
           Row 3: [col-1: Beauty] [col-2+3: Books cs-2]
           STEP 3: Placed 6/6 ✓
          */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px]">
          {categories.map((cat, idx) =>
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className={`group relative overflow-hidden rounded-2xl card-lift scroll-hidden stagger-${Math.min(idx + 1, 6)} ${cat.colSpan || ''} ${cat.rowSpan || ''}`}>
            
              {/* Image */}
              <AppImage
              src={cat.image}
              alt={cat.alt}
              fill
              className="object-cover product-image-zoom"
              sizes="(max-width: 768px) 100vw, 33vw" />
            
              {/* Scrim — dark text needs light scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

              {/* Tag */}
              {cat.tag &&
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                  {cat.tag}
                </div>
            }

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                <h3 className="text-white font-bold text-xl mb-1">{cat.name}</h3>
                <p className="text-white/70 text-xs font-medium">{cat.productCount}</p>
                <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-accent text-xs font-bold">Shop Now</span>
                  <span className="text-accent text-xs">→</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}
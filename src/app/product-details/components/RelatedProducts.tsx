'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useWishlist } from '@/context/WishlistContext';

interface RelatedProduct {
  id: string;
  name: string;
  vendor: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  alt: string;
}

const relatedProducts: RelatedProduct[] = [
{
  id: 'rp1',
  name: 'Portable Bluetooth Speaker',
  vendor: 'AudioTech Pro',
  price: 2299,
  originalPrice: 3500,
  rating: 4.6,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16a636a27-1772489230362.png",
  alt: 'Compact portable Bluetooth speaker on bright white background, product photography, cylindrical design'
},
{
  id: 'rp2',
  name: 'Premium Wired IEM Earphones',
  vendor: 'SoundForge',
  price: 1799,
  originalPrice: 2800,
  rating: 4.5,
  image: "https://images.unsplash.com/photo-1666023894557-56a49fdd1a31",
  alt: 'High-fidelity wired earphones with braided cable on white surface, clean product photography'
},
{
  id: 'rp3',
  name: 'USB-C DAC Amplifier',
  vendor: 'TechVault',
  price: 3199,
  originalPrice: 4500,
  rating: 4.7,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12aedb95c-1776723661975.png",
  alt: 'Small portable audio amplifier device on bright clean background, tech product photography'
},
{
  id: 'rp4',
  name: 'Headphone Stand & Organizer',
  vendor: 'DeskCraft',
  price: 899,
  originalPrice: 1299,
  rating: 4.4,
  image: "https://images.unsplash.com/photo-1616661318204-51ededbdf7a8",
  alt: 'Minimalist wooden headphone stand on clean white desk, bright studio lighting, product photography'
}];


function StarRating({ rating }: {rating: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <svg key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-accent' : 'text-border'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>);

}

export default function RelatedProducts({ currentProductId }: {currentProductId: string;}) {
  const products = relatedProducts.filter((p) => p.id !== currentProductId);
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">You may also like</h2>
        <Link
          href="/products?category=Electronics"
          className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          
          View all
          <Icon name="ArrowRightIcon" size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) =>
        <div
          key={product.id}
          className="group bg-card rounded-2xl border border-border overflow-hidden card-lift">
          
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <Link href="/product-details">
                <AppImage
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover product-image-zoom"
                sizes="(max-width: 640px) 50vw, 25vw" />
              </Link>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-100 transition-all duration-300 hover:scale-110"
                aria-label={`Toggle wishlist for ${product.name}`}>
                <Icon
                  name="HeartIcon"
                  size={15}
                  variant={wishlist.has(product.id) ? 'solid' : 'outline'}
                  className={wishlist.has(product.id) ? 'text-red-500' : 'text-muted-foreground'} />
              </button>
            </div>
            <Link href="/product-details">
              <div className="p-3.5">
                <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">{product.vendor}</p>
                <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <StarRating rating={product.rating} />
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm font-extrabold text-foreground">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>);

}
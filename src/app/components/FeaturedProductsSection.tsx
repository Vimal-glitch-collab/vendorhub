'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useWishlist } from '@/context/WishlistContext';

interface Product {
  id: string;
  name: string;
  vendor: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  alt: string;
  badge?: string;
  category: string;
}

const allProducts: Product[] = [
{
  id: '1',
  name: 'Wireless Noise-Cancelling Headphones',
  vendor: 'AudioTech Pro',
  price: 4299,
  originalPrice: 6999,
  rating: 4.7,
  reviewCount: 2341,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13c1b7db7-1772147463184.png",
  alt: 'Premium black wireless headphones on white surface, clean studio lighting, product photography style',
  badge: 'Best Seller',
  category: 'Electronics'
},
{
  id: '2',
  name: 'Slim Fit Linen Blazer',
  vendor: 'StyleCraft Studio',
  price: 2199,
  originalPrice: 3500,
  rating: 4.5,
  reviewCount: 873,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1070a870d-1772240204012.png",
  alt: 'Elegant beige linen blazer on white hanger, bright studio background, fashion product photography',
  category: 'Fashion'
},
{
  id: '3',
  name: 'Ceramic Pour-Over Coffee Set',
  vendor: 'HomeBrews Co.',
  price: 1850,
  originalPrice: 2400,
  rating: 4.8,
  reviewCount: 1204,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_199b7dc29-1772084610568.png",
  alt: 'White ceramic pour-over coffee set on bright kitchen counter, natural morning light, clean minimal styling',
  badge: 'New Arrival',
  category: 'Home & Living'
},
{
  id: '4',
  name: 'Adjustable Resistance Band Set',
  vendor: 'FitGear India',
  price: 899,
  originalPrice: 1499,
  rating: 4.6,
  reviewCount: 3102,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19abbf843-1772953728103.png",
  alt: 'Colorful resistance bands on bright white background, fitness equipment flat lay, clean product shot',
  category: 'Sports'
},
{
  id: '5',
  name: 'Vitamin C Brightening Serum',
  vendor: 'GlowLab Naturals',
  price: 1299,
  originalPrice: 1800,
  rating: 4.9,
  reviewCount: 4567,
  image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19",
  alt: 'Glass serum bottle on white marble surface, bright beauty product photography, clean minimal background',
  badge: 'Top Rated',
  category: 'Beauty'
},
{
  id: '6',
  name: 'Smart LED Desk Lamp',
  vendor: 'LuminTech',
  price: 2499,
  originalPrice: 3299,
  rating: 4.4,
  reviewCount: 921,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c1868b7-1775004105210.png",
  alt: 'Modern white LED desk lamp on bright office desk, clean minimal workspace, natural lighting',
  category: 'Electronics'
},
{
  id: '7',
  name: 'Running Performance Shoes',
  vendor: 'SpeedStep Athletics',
  price: 3799,
  originalPrice: 5200,
  rating: 4.7,
  reviewCount: 1678,
  image: "https://images.unsplash.com/photo-1704900264036-26bb66daa464",
  alt: 'Bright red and white athletic running shoes on clean white background, product photography, dynamic angle',
  badge: 'Sale',
  category: 'Sports'
},
{
  id: '8',
  name: 'Handmade Terracotta Planter Set',
  vendor: 'EarthCraft Decor',
  price: 1150,
  originalPrice: 1600,
  rating: 4.6,
  reviewCount: 543,
  image: "https://images.unsplash.com/photo-1622289954933-569e4c8472e4",
  alt: 'Set of terracotta plant pots with succulents on bright white shelf, natural daylight, clean airy setting',
  category: 'Home & Living'
}];


const tabs = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'];

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

export default function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState('All');
  const { wishlist, toggleWishlist } = useWishlist();
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeTab === 'All' ? allProducts : allProducts.filter((p) => p.category === activeTab);

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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const discountPct = (orig: number, curr: number) => Math.round((orig - curr) / orig * 100);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 scroll-hidden stagger-1">
          <div>
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">
              Curated for You
            </span>
            <h2 className="text-section-title font-extrabold text-foreground tracking-tight">
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            
            View All Products
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scroll-hidden stagger-2 no-scrollbar">
          {tabs.map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === tab ?
            'bg-primary text-primary-foreground shadow-md' :
            'bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border'}`
            }>
            
              {tab}
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product, idx) =>
          <div
            key={product.id}
            className={`group bg-card rounded-2xl border border-border overflow-hidden card-lift scroll-hidden stagger-${Math.min(idx + 1, 6)}`}>
            
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <AppImage
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover product-image-zoom"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              
                {/* Badge */}
                {product.badge &&
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${
              product.badge === 'Sale' ? 'bg-red-500 text-white' :
              product.badge === 'Top Rated' ? 'bg-accent text-accent-foreground' :
              'bg-primary text-primary-foreground'}`
              }>
                    {product.badge}
                  </div>
              }
                {/* Discount badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">
                  -{discountPct(product.originalPrice, product.price)}%
                </div>
                {/* Wishlist */}
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
                {/* Quick add overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <Icon name="ShoppingCartIcon" size={13} />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3.5">
                <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">{product.vendor}</p>
                <Link href="/product-details">
                  <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2 hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <StarRating rating={product.rating} />
                  <span className="text-[10px] text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-foreground">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
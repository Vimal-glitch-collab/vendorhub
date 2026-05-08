'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const heroStats = [
{ value: '50K+', label: 'Products Listed' },
{ value: '2,800+', label: 'Verified Vendors' },
{ value: '4.8★', label: 'Avg Rating' }];


const categoryPills = [
'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty', 'Books', 'Toys', 'Automotive'];


const heroImages = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1885790d3-1773125383143.png",
  alt: 'Bright modern retail store interior with clean white shelves, colorful products neatly arranged, warm natural lighting flooding through large windows'
},
{
  src: "https://images.unsplash.com/photo-1718941013826-ce2c1c3351f3",
  alt: 'Aerial view of vibrant marketplace with organized product displays, warm overhead lighting, busy shopping atmosphere with golden tones'
},
{
  src: "https://images.unsplash.com/photo-1681505801131-faf8deb17f93",
  alt: 'Contemporary e-commerce product display on clean surface, warm studio lighting, minimalist arrangement of consumer goods'
}];


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, i) =>
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === currentSlide ? 1 : 0 }}>
          
            <AppImage
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw" />
          
          </div>
        )}
        {/* Dark scrim — white text on dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/20" />
        {/* Warm accent glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blob-primary opacity-30" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 z-0 noise-overlay pointer-events-none" />

      {/* Floating stat cards */}
      <div className="absolute top-32 right-8 hidden xl:block z-10 animate-float">
        <div className="glass-dark rounded-2xl p-4 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Icon name="ShoppingBagIcon" size={15} className="text-accent" />
            </div>
            <span className="text-xs font-medium text-white/70">Today&apos;s Orders</span>
          </div>
          <p className="text-2xl font-bold text-white">1,284</p>
          <p className="text-xs text-accent mt-1">↑ 18% from yesterday</p>
        </div>
      </div>

      <div className="absolute top-56 right-8 hidden xl:block z-10 animate-float-delayed">
        <div className="glass-dark rounded-2xl p-4 text-white shadow-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'pingOnce 2s ease-out infinite' }} />
            <span className="text-xs font-medium text-white/70">New Vendor</span>
          </div>
          <p className="text-sm font-semibold text-white">StyleCraft Studio</p>
          <p className="text-xs text-white/60">Just joined · Mumbai</p>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 pt-32 md:pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-dark text-white text-xs font-semibold tracking-widest uppercase mb-8 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pingOnce 2s ease-out infinite' }} />
            India&apos;s Fastest Growing Marketplace
          </div>

          {/* Headline */}
          <h1 className="text-hero-display font-extrabold text-white mb-6 leading-none tracking-tight">
            Shop from{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #E8B86D 0%, #F0CC8A 50%, #C49A4A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              
              2,800+
            </span>{' '}
            <br className="hidden sm:block" />
            verified vendors.
          </h1>

          <p className="text-white/80 text-lg md:text-xl font-light mb-10 max-w-xl leading-relaxed">
            Discover unique products, compare prices, and buy with confidence. Every vendor verified, every purchase protected.
          </p>

          {/* Search Bar */}
          <div className="glass-card rounded-2xl p-2 shadow-2xl mb-8 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Icon
                  name="MagnifyingGlassIcon"
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent text-foreground text-sm font-medium placeholder:text-muted-foreground focus:outline-none" />
                
              </div>
              <div className="flex items-center gap-2 sm:border-l border-border px-2">
                <select className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer py-3 px-2 min-w-[120px]">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Living</option>
                  <option>Sports</option>
                </select>
              </div>
              <Link
                href={`/products${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
                
                <Icon name="MagnifyingGlassIcon" size={16} />
                <span>Search</span>
              </Link>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categoryPills.map((cat) =>
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="px-4 py-2 rounded-full glass-dark text-white/85 text-xs font-medium border border-white/15 hover:bg-white/20 hover:text-white transition-all">
              
                {cat}
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {heroStats.map((stat) =>
            <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-white/60 font-medium mt-0.5">{stat.label}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) =>
        <button
          key={i}
          onClick={() => setCurrentSlide(i)}
          className={`rounded-full transition-all duration-300 ${
          i === currentSlide ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/40'}`
          }
          aria-label={`Go to slide ${i + 1}`} />

        )}
      </div>
    </section>);

}
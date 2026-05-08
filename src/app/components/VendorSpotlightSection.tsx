'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const featuredVendors = [
{
  id: 'v1',
  name: 'AudioTech Pro',
  category: 'Electronics',
  rating: 4.9,
  products: 234,
  sales: '12.4K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_166b5af31-1777824479299.png",
  alt: 'Modern electronics store interior with bright lighting, clean product displays, professional retail environment',
  badge: 'Top Seller'
},
{
  id: 'v2',
  name: 'StyleCraft Studio',
  category: 'Fashion',
  rating: 4.7,
  products: 512,
  sales: '8.1K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d765b663-1767177310946.png",
  alt: 'Bright fashion boutique with white walls, stylish clothing displays, natural light and clean minimal aesthetic',
  badge: 'Rising Star'
},
{
  id: 'v3',
  name: 'GlowLab Naturals',
  category: 'Beauty',
  rating: 4.8,
  products: 89,
  sales: '6.7K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b420209f-1772072853000.png",
  alt: 'Bright beauty studio with white marble surfaces, natural skincare products arranged neatly, clean airy space',
  badge: 'Verified'
}];


export default function VendorSpotlightSection() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary overflow-hidden relative">
      {/* Background atmosphere */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] blob-primary opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] blob-primary opacity-15 translate-x-1/2 translate-y-1/2" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 scroll-hidden stagger-1">
          <div>
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">
              Spotlight
            </span>
            <h2 className="text-section-title font-extrabold text-white tracking-tight">
              Top Vendors This Month
            </h2>
            <p className="text-white/60 text-base mt-3 max-w-md leading-relaxed">
              Meet the vendors trusted by thousands of shoppers. Quality products, reliable service.
            </p>
          </div>
          <Link
            href="/products?filter=vendors"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-all whitespace-nowrap">
            
            Browse All Vendors
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Vendor cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {featuredVendors?.map((vendor, idx) =>
          <div
            key={vendor?.id}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 scroll-hidden stagger-${idx + 2}`}
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={vendor?.image}
                alt={vendor?.alt}
                fill
                className="object-cover product-image-zoom"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                  {vendor?.badge}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold text-lg">{vendor?.name}</h3>
                    <p className="text-white/50 text-xs font-medium">{vendor?.category}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1">
                    <Icon name="StarIcon" size={12} variant="solid" className="text-accent" />
                    <span className="text-white text-xs font-bold">{vendor?.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4">
                  <div>
                    <p className="text-white font-bold text-lg">{vendor?.products}</p>
                    <p className="text-white/50 text-xs">Products</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{vendor?.sales}</p>
                    <p className="text-white/50 text-xs">Sales</p>
                  </div>
                </div>

                <Link
                href={`/products?vendor=${encodeURIComponent(vendor?.name)}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-all group-hover:border-accent/50 group-hover:text-accent">
                
                  View Products
                  <Icon name="ArrowRightIcon" size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Become a vendor CTA */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 p-8 md:p-12 scroll-hidden stagger-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
                Start selling on VendorHub
              </h3>
              <p className="text-white/60 text-base max-w-lg leading-relaxed">
                Join 2,800+ vendors reaching millions of buyers. Zero setup fee. Start selling in under 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 mt-5 justify-center md:justify-start">
                {['Zero Commission on First 50 Orders', 'Dedicated Vendor Support', 'Real-time Analytics']?.map((perk) =>
                <div key={perk} className="flex items-center gap-2 text-sm text-white/70">
                    <Icon name="CheckCircleIcon" size={15} className="text-accent shrink-0" />
                    {perk}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button className="px-8 py-4 bg-accent text-accent-foreground rounded-full text-sm font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                Become a Vendor
              </button>
              <button className="px-8 py-4 border border-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
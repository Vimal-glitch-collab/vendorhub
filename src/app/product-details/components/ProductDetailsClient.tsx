'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/AppIcon';
import ProductImageGallery from './ProductImageGallery';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';
import { useWishlist } from '@/context/WishlistContext';

const product = {
  id: '1',
  name: 'Wireless Noise-Cancelling Headphones Pro',
  vendor: 'AudioTech Pro',
  vendorRating: 4.9,
  vendorSales: '12.4K',
  price: 4299,
  originalPrice: 6999,
  rating: 4.7,
  reviewCount: 2341,
  badge: 'Best Seller',
  inStock: true,
  stockCount: 47,
  category: 'Electronics',
  description: `Experience next-level audio immersion with the AudioTech Pro Wireless Headphones. Featuring industry-leading active noise cancellation that blocks up to 98% of ambient noise, 30-hour battery life, and premium 40mm dynamic drivers for rich, detailed sound.

The ergonomic over-ear design with memory foam cushions ensures all-day comfort, while the foldable design makes it perfect for travel. Connect wirelessly via Bluetooth 5.3 or use the included 3.5mm cable for wired listening.`,
  highlights: [
  'Active Noise Cancellation — blocks 98% ambient noise',
  '30-hour battery life with quick-charge (10 min = 3 hrs)',
  'Bluetooth 5.3 with multipoint connection (2 devices)',
  'Premium 40mm dynamic drivers',
  'Foldable design with carrying case included',
  'Compatible with iOS & Android'],

  specs: {
    'Driver Size': '40mm Dynamic',
    'Frequency Response': '20Hz – 20kHz',
    'Impedance': '32 Ohm',
    'Battery Life': '30 hours (ANC on)',
    'Charging Time': '2 hours (full)',
    'Connectivity': 'Bluetooth 5.3 + 3.5mm',
    'Weight': '250g',
    'Colors': 'Midnight Black, Pearl White, Navy Blue'
  },
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_13c1b7db7-1772147463184.png", alt: 'Premium black wireless headphones front view, clean white studio background, professional product photography' },
  { src: "https://images.unsplash.com/photo-1612076666255-06d681f82e94", alt: 'Wireless headphones on wooden desk, lifestyle product photography, warm natural lighting' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1abfa8669-1772098420613.png", alt: 'Close-up of headphone ear cup detail, showing premium materials and stitching, bright studio light' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_12f855e20-1772534572443.png", alt: 'Person wearing headphones in bright minimal room, lifestyle shot showing comfortable fit and modern design' }],

  colors: ['Midnight Black', 'Pearl White', 'Navy Blue']
};

const tabs = ['Overview', 'Specifications', 'Reviews', 'Shipping'];

function StarRating({ rating, size = 16 }: {rating: number;size?: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <svg key={star} style={{ width: size, height: size }} className={star <= Math.round(rating) ? 'text-accent' : 'text-border'} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>);

}

export default function ProductDetailsClient() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [addedToCart, setAddedToCart] = useState(false);

  const discountPct = Math.round((product.originalPrice - product.price) / product.originalPrice * 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href="/products?category=Electronics" className="hover:text-foreground transition-colors">Electronics</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Image Gallery — col 1-6 */}
        <div className="lg:col-span-6">
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Info — col 7-12 */}
        <div className="lg:col-span-6">
          {/* Vendor info */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">{product.vendor}</span>
            <span className="text-border">·</span>
            <div className="flex items-center gap-1">
              <Icon name="StarIcon" size={12} variant="solid" className="text-accent" />
              <span className="text-xs text-muted-foreground">{product.vendorRating} vendor rating</span>
            </div>
            <span className="text-border">·</span>
            <div className="flex items-center gap-1">
              <Icon name="ShieldCheckIcon" size={12} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">Verified</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm font-bold text-foreground">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
            {product.badge &&
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">{product.badge}</span>
            }
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6 p-4 bg-secondary rounded-xl">
            <span className="text-3xl font-extrabold text-foreground">₹{product.price.toLocaleString()}</span>
            <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            <span className="px-2.5 py-1 bg-green-500 text-white text-sm font-bold rounded-lg">-{discountPct}%</span>
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-5">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? `In Stock — ${product.stockCount} units left` : 'Out of Stock'}
            </span>
          </div>

          {/* Color selector */}
          <div className="mb-5">
            <p className="text-sm font-bold text-foreground mb-2.5">
              Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) =>
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                selectedColor === color ?
                'border-primary bg-primary text-primary-foreground' :
                'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`
                }>
                
                  {color}
                </button>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-bold text-foreground mb-2.5">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  aria-label="Decrease quantity">
                  
                  <Icon name="MinusIcon" size={16} />
                </button>
                <span className="w-12 text-center text-sm font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  aria-label="Increase quantity">
                  
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">Max 10 per order</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
              addedToCart ?
              'bg-green-500 text-white' : 'bg-secondary border-2 border-primarytext-foreground hover:bg-muted'}`
              }>
              
              <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingCartIcon'} size={16} />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50">
              
              <Icon name="BoltIcon" size={16} />
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
              wishlisted ? 'border-red-300 bg-red-50 text-red-500' : 'border-border text-muted-foreground hover:border-red-300 hover:text-red-500'}`
              }
              aria-label="Toggle wishlist">
              
              <Icon name="HeartIcon" size={18} variant={wishlisted ? 'solid' : 'outline'} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
            { icon: 'ShieldCheckIcon', label: 'Buyer Protection', sub: 'Full refund guarantee' },
            { icon: 'TruckIcon', label: 'Free Delivery', sub: 'Orders above ₹499' },
            { icon: 'ArrowPathIcon', label: 'Easy Returns', sub: '7-day return policy' }].
            map((badge) =>
            <div key={badge.label} className="flex flex-col items-center text-center p-3 bg-secondary rounded-xl">
                <Icon name={badge.icon as 'ShieldCheckIcon'} size={18} className="text-accent mb-1.5" />
                <p className="text-xs font-bold text-foreground leading-tight">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{badge.sub}</p>
              </div>
            )}
          </div>

          {/* Vendor card */}
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                AT
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{product.vendor}</p>
                <div className="flex items-center gap-1.5">
                  <Icon name="StarIcon" size={11} variant="solid" className="text-accent" />
                  <span className="text-xs text-muted-foreground">{product.vendorRating} · {product.vendorSales} sales</span>
                </div>
              </div>
            </div>
            <Link
              href={`/products?vendor=${encodeURIComponent(product.vendor)}`}
              className="px-4 py-2 border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-secondary transition-colors">
              
              View Store
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="mb-12">
        {/* Tab headers */}
        <div className="flex items-center gap-1 border-b border-border mb-8 overflow-x-auto">
          {tabs.map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
            activeTab === tab ?
            'border-primary text-foreground' :
            'border-transparent text-muted-foreground hover:text-foreground'}`
            }>
            
              {tab}
            </button>
          )}
        </div>

        {/* Tab content */}
        {activeTab === 'Overview' &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Product Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line mb-6">
                {product.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                {product.highlights.map((h) =>
              <li key={h} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Icon name="CheckCircleIcon" size={16} className="text-green-500 shrink-0 mt-0.5" />
                    {h}
                  </li>
              )}
              </ul>
            </div>
          </div>
        }

        {activeTab === 'Specifications' &&
        <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-foreground mb-4">Technical Specifications</h3>
            <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
              {Object.entries(product.specs).map(([key, value], idx) =>
            <div
              key={key}
              className={`flex items-center px-5 py-3.5 ${idx % 2 === 0 ? 'bg-secondary' : 'bg-card'}`}>
              
                  <span className="w-44 text-sm font-semibold text-foreground shrink-0">{key}</span>
                  <span className="text-sm text-muted-foreground">{value}</span>
                </div>
            )}
            </div>
          </div>
        }

        {activeTab === 'Reviews' &&
        <ProductReviews rating={product.rating} reviewCount={product.reviewCount} />
        }

        {activeTab === 'Shipping' &&
        <div className="max-w-2xl space-y-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Shipping & Delivery</h3>
            {[
          { icon: 'TruckIcon', title: 'Standard Delivery', desc: 'Delivered in 3–5 business days. Free on orders above ₹499.', price: '₹49' },
          { icon: 'BoltIcon', title: 'Express Delivery', desc: 'Delivered in 1–2 business days. Available in select cities.', price: '₹149' },
          { icon: 'ArrowPathIcon', title: 'Return Policy', desc: 'Easy 7-day return. No questions asked for defective items.', price: 'Free' }].
          map((item) =>
          <div key={item.title} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon name={item.icon as 'TruckIcon'} size={18} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-foreground">{item.title}</p>
                    <span className="text-sm font-bold text-accent">{item.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
          )}
          </div>
        }
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} />
    </div>);

}
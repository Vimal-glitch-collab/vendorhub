'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import ProductSidebar from './ProductSidebar';
import ProductSkeleton from './ProductSkeleton';
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
  inStock: boolean;
}

const allProducts: Product[] = [
{ id: '1', name: 'Wireless Noise-Cancelling Headphones Pro', vendor: 'AudioTech Pro', price: 4299, originalPrice: 6999, rating: 4.7, reviewCount: 2341, image: "https://img.rocket.new/generatedImages/rocket_gen_img_13c1b7db7-1772147463184.png", alt: 'Premium black wireless headphones on white surface, clean product photography', badge: 'Best Seller', category: 'Electronics', inStock: true },
{ id: '2', name: 'Slim Fit Linen Blazer — Beige', vendor: 'StyleCraft Studio', price: 2199, originalPrice: 3500, rating: 4.5, reviewCount: 873, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1070a870d-1772240204012.png", alt: 'Elegant beige linen blazer on white hanger, fashion product photography', category: 'Fashion', inStock: true },
{ id: '3', name: 'Ceramic Pour-Over Coffee Set', vendor: 'HomeBrews Co.', price: 1850, originalPrice: 2400, rating: 4.8, reviewCount: 1204, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce0f7636-1776227898386.png", alt: 'White ceramic pour-over coffee set on bright kitchen counter, natural morning light', badge: 'New', category: 'Home & Living', inStock: true },
{ id: '4', name: 'Adjustable Resistance Band Set (5-Pack)', vendor: 'FitGear India', price: 899, originalPrice: 1499, rating: 4.6, reviewCount: 3102, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d13cb57b-1766778351825.png", alt: 'Colorful resistance bands on bright white background, fitness equipment flat lay', category: 'Sports', inStock: true },
{ id: '5', name: 'Vitamin C Brightening Serum 30ml', vendor: 'GlowLab Naturals', price: 1299, originalPrice: 1800, rating: 4.9, reviewCount: 4567, image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19", alt: 'Glass serum bottle on white marble surface, bright beauty product photography', badge: 'Top Rated', category: 'Beauty', inStock: true },
{ id: '6', name: 'Smart LED Desk Lamp with USB-C', vendor: 'LuminTech', price: 2499, originalPrice: 3299, rating: 4.4, reviewCount: 921, image: "https://images.unsplash.com/photo-1481529402569-14288964caa4", alt: 'Modern white LED desk lamp on bright office desk, clean minimal workspace', category: 'Electronics', inStock: true },
{ id: '7', name: 'Running Performance Shoes — CloudFoam', vendor: 'SpeedStep Athletics', price: 3799, originalPrice: 5200, rating: 4.7, reviewCount: 1678, image: "https://images.unsplash.com/photo-1704900264036-26bb66daa464", alt: 'Bright red and white athletic running shoes on clean white background, product photography', badge: 'Sale', category: 'Sports', inStock: true },
{ id: '8', name: 'Handmade Terracotta Planter Set (3pc)', vendor: 'EarthCraft Decor', price: 1150, originalPrice: 1600, rating: 4.6, reviewCount: 543, image: "https://images.unsplash.com/photo-1622289954933-569e4c8472e4", alt: 'Set of terracotta plant pots with succulents on bright white shelf, natural daylight', category: 'Home & Living', inStock: true },
{ id: '9', name: 'Stainless Steel Water Bottle 1L', vendor: 'EcoCarry', price: 699, originalPrice: 999, rating: 4.5, reviewCount: 2890, image: "https://images.unsplash.com/photo-1695561069859-24c43e9e1f2c", alt: 'Matte black stainless steel water bottle on bright white surface, clean product shot', category: 'Sports', inStock: true },
{ id: '10', name: 'Bamboo Cutting Board Set', vendor: 'KitchenCraft Co.', price: 1100, originalPrice: 1500, rating: 4.3, reviewCount: 678, image: "https://images.unsplash.com/photo-1613108875671-69e7111916f7", alt: 'Natural bamboo cutting boards in different sizes on bright kitchen counter, clean natural light', category: 'Home & Living', inStock: false },
{ id: '11', name: 'Retinol Anti-Aging Night Cream', vendor: 'GlowLab Naturals', price: 1599, originalPrice: 2200, rating: 4.7, reviewCount: 1834, image: "https://img.rocket.new/generatedImages/rocket_gen_img_111818c78-1772546703266.png", alt: 'Elegant cream jar on white marble with flowers, bright beauty product photography', category: 'Beauty', inStock: true },
{ id: '12', name: 'Mechanical Gaming Keyboard RGB', vendor: 'TechVault', price: 5499, originalPrice: 7500, rating: 4.8, reviewCount: 1123, image: "https://img.rocket.new/generatedImages/rocket_gen_img_135ae548d-1774761145135.png", alt: 'RGB mechanical gaming keyboard on dark desk, colorful backlit keys, tech product photography', badge: 'New', category: 'Electronics', inStock: true }];


const sortOptions = [
{ value: 'relevance', label: 'Most Relevant' },
{ value: 'price-asc', label: 'Price: Low to High' },
{ value: 'price-desc', label: 'Price: High to Low' },
{ value: 'rating', label: 'Highest Rated' },
{ value: 'newest', label: 'Newest First' }];


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

export default function ProductsPageClient() {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { wishlist, toggleWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = allProducts.
  filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchRating = p.rating >= minRating;
    const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.vendor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchPrice && matchRating && matchSearch;
  }).
  sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeFilters: string[] = [];
  if (selectedCategory !== 'All') activeFilters.push(selectedCategory);
  if (minRating > 0) activeFilters.push(`${minRating}★+`);

  const discountPct = (orig: number, curr: number) => Math.round((orig - curr) / orig * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      {/* Page header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground font-medium">Products</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-2">
          All Products
        </h1>
        <p className="text-muted-foreground text-sm">{filteredProducts.length} products found</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => {setSearch(e.target.value);setPage(1);}}
          placeholder="Search products or vendors..."
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all" />
        
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 &&
      <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((f) =>
        <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              {f}
              <button onClick={() => {setSelectedCategory('All');setMinRating(0);}} className="hover:text-red-500 transition-colors">
                <Icon name="XMarkIcon" size={12} />
              </button>
            </span>
        )}
          <button onClick={() => {setSelectedCategory('All');setMinRating(0);setPriceRange([0, 10000]);}} className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-red-500 transition-colors">
            Clear all
          </button>
        </div>
      }

      <div className="flex gap-6">
        {/* Sidebar */}
        <ProductSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={(c) => {setSelectedCategory(c);setPage(1);}}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onRatingChange={(r) => {setMinRating(r);setPage(1);}} />
        

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3">
            <p className="text-sm text-muted-foreground hidden sm:block">
              Showing <span className="font-semibold text-foreground">{(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)}</span> of <span className="font-semibold text-foreground">{filteredProducts.length}</span> results
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-xl px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40">
                
                {sortOptions.map((o) =>
                <option key={o.value} value={o.value}>{o.label}</option>
                )}
              </select>
              <div className="flex items-center gap-1 border border-border rounded-xl p-1 bg-card">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  
                  <Icon name="Squares2X2Icon" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  
                  <Icon name="ListBulletIcon" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          {loading ?
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
              {Array.from({ length: 9 }).map((_, i) => <ProductSkeleton key={i} viewMode={viewMode} />)}
            </div> :
          paginatedProducts.length === 0 ?
          <div className="flex flex-col items-center justify-center py-24 text-center">
              <Icon name="MagnifyingGlassIcon" size={48} className="text-border mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm">Try adjusting your filters or search query.</p>
            </div> :

          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
              {paginatedProducts.map((product) =>
            viewMode === 'grid' ? (
            /* Grid Card */
            <div key={product.id} className="group bg-card rounded-2xl border border-border overflow-hidden card-lift">
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <AppImage src={product.image} alt={product.alt} fill className="object-cover product-image-zoom" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                      {product.badge &&
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${product.badge === 'Sale' ? 'bg-red-500 text-white' : product.badge === 'Top Rated' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
                          {product.badge}
                        </div>
                }
                      <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">
                        -{discountPct(product.originalPrice, product.price)}%
                      </div>
                      {!product.inStock &&
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <span className="px-3 py-1 bg-foreground text-background text-xs font-bold rounded-full">Out of Stock</span>
                        </div>
                }
                      <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label={`Toggle wishlist for ${product.name}`}>
                  
                        <Icon name="HeartIcon" size={15} variant={wishlist.has(product.id) ? 'solid' : 'outline'} className={wishlist.has(product.id) ? 'text-red-500' : 'text-muted-foreground'} />
                      </button>
                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button disabled={!product.inStock} className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50">
                          <Icon name="ShoppingCartIcon" size={13} />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">{product.vendor}</p>
                      <Link href="/product-details">
                        <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2 hover:text-accent transition-colors">{product.name}</h3>
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
                  </div>) : (

            /* List Card */
            <div key={product.id} className="group bg-card rounded-2xl border border-border overflow-hidden card-lift">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-xl bg-secondary">
                        <AppImage src={product.image} alt={product.alt} fill className="object-cover product-image-zoom" sizes="112px" />
                        {!product.inStock &&
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-foreground">Out of Stock</span>
                          </div>
                  }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">{product.vendor}</p>
                        <Link href="/product-details">
                          <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 hover:text-accent transition-colors line-clamp-2">{product.name}</h3>
                        </Link>
                        <div className="flex items-center gap-1.5 mb-2">
                          <StarRating rating={product.rating} />
                          <span className="text-[10px] text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-extrabold text-foreground">₹{product.price.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="text-xs font-bold text-green-600">-{discountPct(product.originalPrice, product.price)}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 rounded-full hover:bg-secondary transition-colors"
                        aria-label={`Toggle wishlist for ${product.name}`}>
                        
                              <Icon name="HeartIcon" size={16} variant={wishlist.has(product.id) ? 'solid' : 'outline'} className={wishlist.has(product.id) ? 'text-red-500' : 'text-muted-foreground'} />
                            </button>
                            <button disabled={!product.inStock} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-colors disabled:opacity-50">
                              <Icon name="ShoppingCartIcon" size={12} />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)

            )}
            </div>
          }

          {/* Pagination */}
          {!loading && totalPages > 1 &&
          <div className="flex items-center justify-center gap-2 mt-10">
              <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary disabled:opacity-40 transition-colors">
              
                <Icon name="ChevronLeftIcon" size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${p === page ? 'bg-primary text-primary-foreground shadow-md' : 'border border-border text-muted-foreground hover:bg-secondary'}`}>
              
                  {p}
                </button>
            )}
              <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary disabled:opacity-40 transition-colors">
              
                <Icon name="ChevronRightIcon" size={16} />
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}
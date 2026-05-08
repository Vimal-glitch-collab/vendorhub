'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty', 'Books', 'Toys'];
const vendors = ['AudioTech Pro', 'StyleCraft Studio', 'GlowLab Naturals', 'FitGear India', 'HomeBrews Co.', 'LuminTech'];

interface Props {
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  priceRange: number[];
  onPriceChange: (r: number[]) => void;
  minRating: number;
  onRatingChange: (r: number) => void;
}

export default function ProductSidebar({ selectedCategory, onCategoryChange, priceRange, onPriceChange, minRating, onRatingChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Icon name="TagIcon" size={14} className="text-accent" />
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Icon name="CheckIcon" size={12} />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Icon name="CurrencyRupeeIcon" size={14} className="text-accent" />
          Price Range
        </h3>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-accent"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[[0, 1000], [1000, 3000], [3000, 6000], [6000, 10000]].map(([min, max]) => (
              <button
                key={`${min}-${max}`}
                onClick={() => onPriceChange([min, max])}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  priceRange[0] === min && priceRange[1] === max
                    ? 'border-accent bg-accent/10 text-accent' :'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
              >
                ₹{min/1000 > 0 ? `${min/1000}K` : '0'}–₹{max/1000}K
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Icon name="StarIcon" size={14} className="text-accent" />
          Minimum Rating
        </h3>
        <div className="space-y-1">
          {[4.5, 4, 3.5, 3, 0].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                minRating === r
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className={`w-3 h-3 ${s <= Math.round(r) ? 'text-accent' : minRating === r ? 'text-primary-foreground/30' : 'text-border'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>{r === 0 ? 'All Ratings' : `${r}+ Stars`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vendors */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Icon name="BuildingStorefrontIcon" size={14} className="text-accent" />
          Vendors
        </h3>
        <div className="space-y-1">
          {vendors.map((v) => (
            <label key={v} className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors group">
              <input type="checkbox" className="rounded accent-accent" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{v}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-semibold text-foreground mb-4 hover:bg-secondary transition-colors"
      >
        <Icon name="AdjustmentsHorizontalIcon" size={16} />
        Filters
      </button>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-card overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Filters</h2>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-28 bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-foreground">Filters</h2>
            <button
              onClick={() => { onCategoryChange('All'); onRatingChange(0); onPriceChange([0, 10000]); }}
              className="text-xs text-accent font-semibold hover:underline"
            >
              Reset all
            </button>
          </div>
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/AppIcon';

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 49;
const TAX_RATE = 0.18;

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-shimmer h-8 w-48 rounded-xl mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-shimmer h-32 rounded-2xl" />
              ))}
            </div>
            <div className="animate-shimmer h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="ShoppingCartIcon" size={40} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added anything yet. Explore our products and find something you love.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            <Icon name="ShoppingBagIcon" size={18} />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Icon name="TrashIcon" size={15} />
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-card border border-border rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                  removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.vendor}</p>
                        {(item.color || item.size) && (
                          <div className="flex gap-2 mt-1">
                            {item.color && (
                              <span className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded-full">
                                {item.color}
                              </span>
                            )}
                            {item.size && (
                              <span className="text-xs bg-secondary text-foreground px-2 py-0.5 rounded-full">
                                {item.size}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Icon name="XMarkIcon" size={16} />
                      </button>
                    </div>

                    {/* Price + Quantity Row */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-secondary rounded-full px-1 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-card disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Icon name="MinusIcon" size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Icon name="PlusIcon" size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <p className="text-xs text-muted-foreground line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            >
              <Icon name="ArrowLeftIcon" size={15} />
              Continue shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
              <h2 className="font-bold text-foreground text-lg mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-foreground font-medium">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="text-foreground font-medium">
                      ₹{shipping.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (18% GST)</span>
                  <span className="text-foreground font-medium">
                    ₹{Math.round(tax).toLocaleString('en-IN')}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 text-xs text-foreground">
                    <span className="font-medium">
                      Add ₹{(SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more
                    </span>{' '}
                    to get free shipping!
                  </div>
                )}

                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                  <span>Total</span>
                  <span>₹{Math.round(total).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full mt-6 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Icon name="LockClosedIcon" size={16} />
                Proceed to Checkout
              </button>

              {/* Payment Icons */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Icon name="ShieldCheckIcon" size={13} />
                <span>Secure checkout · SSL encrypted</span>
              </div>

              {/* Coupon */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-medium text-foreground mb-2">Have a coupon?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 text-xs bg-secondary border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                  <button className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-xs font-semibold hover:bg-accent/90 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

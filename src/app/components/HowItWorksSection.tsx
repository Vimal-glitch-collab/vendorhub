'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    step: '01',
    icon: 'MagnifyingGlassIcon',
    title: 'Discover',
    description: 'Browse thousands of products from 2,800+ verified vendors. Use smart filters to find exactly what you need.',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-100',
  },
  {
    step: '02',
    icon: 'ShieldCheckIcon',
    title: 'Verify',
    description: 'Every vendor is background-checked and verified. Read authentic reviews from real buyers before purchasing.',
    color: 'bg-green-50 text-green-600',
    borderColor: 'border-green-100',
  },
  {
    step: '03',
    icon: 'CreditCardIcon',
    title: 'Purchase',
    description: 'Secure checkout with multiple payment options. Your payment is held safely until you confirm delivery.',
    color: 'bg-amber-50 text-amber-600',
    borderColor: 'border-amber-100',
  },
  {
    step: '04',
    icon: 'TruckIcon',
    title: 'Delivered',
    description: 'Real-time order tracking from vendor to your doorstep. Hassle-free returns within 7 days.',
    color: 'bg-purple-50 text-purple-600',
    borderColor: 'border-purple-100',
  },
];

export default function HowItWorksSection() {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 scroll-hidden stagger-1">
          <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">
            Simple Process
          </span>
          <h2 className="text-section-title font-extrabold text-foreground tracking-tight mb-4">
            How VendorHub works
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            From discovery to delivery, we&apos;ve made shopping from multiple vendors as simple as a few clicks.
          </p>
        </div>

        {/* Steps — Horizontal flow with connector lines */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-border z-0" style={{ left: '12.5%', right: '12.5%' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, idx) => (
              <div
                key={step.step}
                className={`relative flex flex-col items-center text-center scroll-hidden stagger-${idx + 1}`}
              >
                {/* Step number + icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} border-2 ${step.borderColor} flex items-center justify-center mb-0 shadow-sm`}>
                    <Icon name={step.icon as 'MagnifyingGlassIcon'} size={26} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 scroll-hidden stagger-5">
          {[
            { icon: 'ShieldCheckIcon', label: 'Buyer Protection', sub: 'On every order' },
            { icon: 'ArrowPathIcon', label: 'Easy Returns', sub: '7-day hassle-free' },
            { icon: 'TruckIcon', label: 'Fast Delivery', sub: '2-5 business days' },
            { icon: 'StarIcon', label: 'Verified Vendors', sub: '100% background checked' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 bg-card rounded-xl border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Icon name={badge.icon as 'ShieldCheckIcon'} size={18} className="text-accent" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import CategoryBentoSection from '@/app/components/CategoryBentoSection';
import FeaturedProductsSection from '@/app/components/FeaturedProductsSection';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import VendorSpotlightSection from '@/app/components/VendorSpotlightSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryBentoSection />
        <FeaturedProductsSection />
        <HowItWorksSection />
        <VendorSpotlightSection />
      </main>
      <Footer />
    </div>
  );
}
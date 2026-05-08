import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetailsClient from '@/app/product-details/components/ProductDetailsClient';

export const metadata = {
  title: 'Wireless Noise-Cancelling Headphones Pro — VendorHub',
  description: 'Shop premium wireless headphones from AudioTech Pro on VendorHub. Verified vendor, buyer protection, fast delivery.',
};

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        <ProductDetailsClient />
      </main>
      <Footer />
    </div>
  );
}
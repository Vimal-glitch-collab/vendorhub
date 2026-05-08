import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsPageClient from '@/app/products/components/ProductsPageClient';

export const metadata = {
  title: 'Browse Products — VendorHub',
  description: 'Discover thousands of products from verified vendors. Filter by category, price, and rating.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-32">
        <ProductsPageClient />
      </main>
      <Footer />
    </div>
  );
}
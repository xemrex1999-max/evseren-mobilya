export const dynamic = "force-dynamic";
import React from 'react';
import dbConnect from '@/lib/mongodb';
import { Product } from '@/lib/models';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import ProductDetailClient from '@/components/product/ProductDetailClient';

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  await dbConnect();
  
  let product;
  try {
    product = await Product.findById(params.id);
  } catch (error) {
    return notFound();
  }

  if (!product) return notFound();

  // Convert to plain object for client component
  const productData = JSON.parse(JSON.stringify(product));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <ProductDetailClient product={productData} />
      </div>
    </div>
  );
}
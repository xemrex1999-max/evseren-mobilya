import React from 'react';
import dbConnect from '@/lib/mongodb';
import { Product } from '@/lib/models';
import ProductCard from '@/components/ui/ProductCard';

export default async function ProductsPage() {
  await dbConnect();
  const products = await Product.find({}).sort({ createdAt: -1 });

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 uppercase">Tüm Koleksiyon</h1>
          <p className="text-sm text-neutral-500 font-light max-w-lg leading-relaxed">
            İnegöl'ün en seçkin tasarımları, modern dokunuşlar ve zamansız estetikle evinizi bekliyor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product: any) => (
            <ProductCard 
              key={product._id.toString()} 
              product={JSON.parse(JSON.stringify(product))} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

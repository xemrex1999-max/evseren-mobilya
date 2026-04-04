import React from 'react'
import dbConnect from '@/lib/mongodb'
import { Product } from '@/lib/models'
import ProductCard from '@/components/ui/ProductCard'

const HomeProductGrid = async () => {
  await dbConnect()
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(8)

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-neutral-400 block">Koleksiyon</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
          Sizin İçin Seçtiklerimiz
        </h2>
        <div className="w-20 h-1 bg-neutral-900 mx-auto rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product: any) => (
          <ProductCard key={product._id.toString()} product={JSON.parse(JSON.stringify(product))} />
        ))}
      </div>
    </section>
  )
}

export default HomeProductGrid;

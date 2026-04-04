"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/store/useCart'

const ProductDetailClient = ({ product }: { product: any }) => {
  const [qty, setQty] = useState(1)
  const addItem = useCart(state => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: qty
    })
    // Show a success message or open cart drawer
    alert("Ürün sepete eklendi!")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* IMAGE GALLERY */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-neutral-100"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-8 left-8 bg-neutral-900 text-white text-xs px-4 py-2 font-bold rounded-full uppercase tracking-widest shadow-2xl">
            {product.badge}
          </div>
        )}
      </motion.div>

      {/* INFO SECTION */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-10"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 block">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight mb-6">
            {product.name}
          </h1>
          <div className="text-3xl font-light tracking-tighter text-neutral-900">
            {formatPrice(product.price)}
          </div>
        </div>

        <p className="text-sm md:text-base font-light text-neutral-600 leading-relaxed max-w-xl">
          {product.description}
        </p>

        {/* QUANTITY & ADD TO CART */}
        <div className="flex flex-wrap items-center gap-6 pt-4">
          <div className="flex items-center bg-neutral-100 rounded-full px-6 py-4 gap-8">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Minus size={18} strokeWidth={1.5} />
            </button>
            <span className="text-sm font-bold w-4 text-center">{qty}</span>
            <button 
              onClick={() => setQty(qty + 1)}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Plus size={18} strokeWidth={1.5} />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className="flex-1 py-5 bg-neutral-900 text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
          >
            <ShoppingCart size={18} strokeWidth={1.5} />
            Sepete Ekle
          </button>

          <button className="p-5 bg-white border border-neutral-100 rounded-full text-neutral-400 hover:text-red-500 hover:border-red-100 transition-all shadow-lg active:scale-95">
            <Heart size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* VALUE PROPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-neutral-100">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-neutral-50 rounded-2xl text-neutral-600">
              <Truck size={24} strokeWidth={1} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Ücretsiz Nakliye</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-neutral-50 rounded-2xl text-neutral-600">
              <ShieldCheck size={24} strokeWidth={1} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">2 Yıl Garanti</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-neutral-50 rounded-2xl text-neutral-600">
              <RotateCcw size={24} strokeWidth={1} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">30 Gün İade</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductDetailClient;

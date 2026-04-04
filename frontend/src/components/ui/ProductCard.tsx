"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    badge?: string;
  }
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-neutral-100"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* BADGE */}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] px-3 py-1 font-bold rounded-full uppercase tracking-widest shadow-xl">
            {product.badge}
          </div>
        )}

        {/* OVERLAY ACTIONS */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/20 to-transparent">
          <div className="flex gap-2 justify-center">
            <button className="p-3 bg-white text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-all shadow-lg active:scale-95">
              <ShoppingCart size={18} strokeWidth={1.5} />
            </button>
            <button className="p-3 bg-white text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-all shadow-lg active:scale-95">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <Link href={`/product/${product._id}`} className="p-3 bg-white text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-all shadow-lg active:scale-95">
              <Eye size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 text-center">
        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mb-2 block">
          {product.category}
        </span>
        <h3 className="text-sm font-bold text-neutral-900 mb-3 group-hover:text-neutral-600 transition-colors">
          {product.name}
        </h3>
        <div className="text-lg font-light tracking-tighter text-neutral-900">
          {formatPrice(product.price)}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard;

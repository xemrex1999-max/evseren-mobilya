export const dynamic = "force-dynamic";
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { cart, removeItem, updateQty, getTotal } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-neutral-100 rounded-full text-neutral-400 mb-8"
        >
          <ShoppingBag size={48} strokeWidth={1} />
        </motion.div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4 uppercase tracking-[0.2em]">Sepetiniz Boş</h1>
        <p className="text-sm text-neutral-500 font-light mb-12 max-w-xs">
          Henüz sepetinize bir ürün eklemediniz. İnegöl'ün en şık tasarımlarını keşfetmeye başlayın.
        </p>
        <Link 
          href="/products" 
          className="px-12 py-5 bg-neutral-900 text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-2xl active:scale-95"
        >
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col lg:flex-row gap-20">
        
        {/* ITEMS LIST */}
        <div className="flex-1 space-y-12">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-10">
            <h1 className="text-4xl font-bold tracking-tighter text-neutral-900">SEPETİNİZ</h1>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{cart.length} ÜRÜN</span>
          </div>

          <div className="space-y-10">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-8 relative pb-10 border-b border-neutral-50"
                >
                  <div className="w-32 aspect-square rounded-3xl overflow-hidden bg-neutral-100 shadow-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-neutral-900 leading-tight">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center bg-neutral-50 rounded-full px-4 py-2 gap-6">
                        <button 
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="text-neutral-400 hover:text-neutral-900 transition-all active:scale-90"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="text-neutral-400 hover:text-neutral-900 transition-all active:scale-90"
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>
                      <div className="text-lg font-light tracking-tighter text-neutral-900">
                        {formatPrice(item.price * item.qty)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-[400px] space-y-10">
          <div className="bg-neutral-900 p-10 rounded-[40px] text-white shadow-2xl space-y-10">
            <h2 className="text-2xl font-bold tracking-tighter uppercase tracking-[0.1em]">Sipariş Özeti</h2>
            
            <div className="space-y-6 text-sm font-light text-neutral-400 border-b border-neutral-800 pb-10">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span className="text-white">{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Nakliye & Kurulum</span>
                <span className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Ücretsiz</span>
              </div>
              <div className="flex justify-between">
                <span>KDV (%20)</span>
                <span className="text-white">Dahildir</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <span className="text-xl font-bold uppercase tracking-widest">TOPLAM</span>
              <span className="text-3xl font-light tracking-tighter">{formatPrice(getTotal())}</span>
            </div>

            <Link 
              href="/checkout" 
              className="w-full py-6 bg-white text-neutral-900 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-neutral-100 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
            >
              Ödeme Adımına Geç
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="p-8 bg-neutral-100 rounded-[30px]">
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-4">Güvenilir Nakliye</p>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Tüm siparişleriniz sigortalı ve profesyonel ekibimiz tarafından kapınıza kadar ulaştırılmaktadır.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
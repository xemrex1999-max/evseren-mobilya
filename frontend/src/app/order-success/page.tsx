"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Package, Truck, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        
        {/* SUCCESS ICON */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="mx-auto w-24 h-24 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-2xl"
        >
          <CheckCircle2 size={48} strokeWidth={1} />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 uppercase">Siparişiniz Alındı!</h1>
          <p className="text-sm text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
            Harika bir seçim yaptınız. Siparişiniz başarıyla oluşturuldu ve ekibimiz hazırlıklara başladı.
          </p>
        </div>

        {/* ORDER INFO CARD */}
        <div className="bg-neutral-50 p-8 rounded-[40px] border border-neutral-100 flex flex-wrap justify-between items-center gap-6">
          <div className="text-left">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-1">Sipariş No</span>
            <div className="text-sm font-bold text-neutral-900 select-all">{orderId || "YÜKLENİYOR..."}</div>
          </div>
          <Link 
            href={`/track-order?id=${orderId}`}
            className="px-8 py-4 bg-white text-neutral-900 border border-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all shadow-xl"
          >
            Siparişi Takip Et
          </Link>
        </div>

        {/* GUIDES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
          <div className="p-6 bg-white border border-neutral-100 rounded-3xl text-left flex items-start gap-4">
            <div className="p-3 bg-neutral-50 rounded-2xl text-neutral-600"><Package size={20} strokeWidth={1.5} /></div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-widest">Hazırlanıyor</h4>
              <p className="text-[10px] text-neutral-500 leading-relaxed font-light">Ürünleriniz kalite kontrolünden geçirilerek özenle paketleniyor.</p>
            </div>
          </div>
          <div className="p-6 bg-white border border-neutral-100 rounded-3xl text-left flex items-start gap-4">
            <div className="p-3 bg-neutral-50 rounded-2xl text-neutral-600"><Truck size={20} strokeWidth={1.5} /></div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-widest">Hızlı Teslimat</h4>
              <p className="text-[10px] text-neutral-500 leading-relaxed font-light">Profesyonel ekiplerimiz adresinize kadar en güvenli şekilde ulaştıracak.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Alışverişe Devam Et
          </Link>
        </div>

      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <SuccessContent />
    </Suspense>
  )
}

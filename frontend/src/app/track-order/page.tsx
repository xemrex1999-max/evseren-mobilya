"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, Truck, CheckCircle2, Box, Home, MapPin, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { formatPrice, cn } from '@/lib/utils'

const STATUS_STEPS = [
  { id: 'paid', label: 'Onaylandı', icon: CheckCircle2, desc: 'Siparişiniz başarıyla alındı.' },
  { id: 'preparing', label: 'Hazırlanıyor', icon: Box, desc: 'Ürünleriniz paketleniyor.' },
  { id: 'shipped', label: 'Kargoda', icon: Truck, desc: 'Paketiniz yola çıktı.' },
  { id: 'delivery', label: 'Dağıtımda', icon: MapPin, desc: 'Kurye adresinize geliyor.' },
  { id: 'delivered', label: 'Teslim Edildi', icon: Home, desc: 'Ürünleriniz teslim edildi.' }
]

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get('id')
  const [orderId, setOrderId] = useState(orderIdParam || '')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchOrder = async (id: string) => {
    if (!id) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/orders/track?id=${id}`)
      const data = await res.json()
      if (res.ok) {
        setOrder(data.order)
      } else {
        setError('Sipariş bulunamadı. Lütfen kodu kontrol edin.')
      }
    } catch (err) {
      setError('Sistem hatası oluştu.')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (orderIdParam) fetchOrder(orderIdParam)
  }, [orderIdParam])

  const currentStatusIndex = order ? STATUS_STEPS.findIndex(s => s.id === order.status) : 0

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[90vh]">
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter text-neutral-900 uppercase">Sipariş Takibi</h1>
        <p className="text-sm text-neutral-500 font-light max-w-sm mx-auto leading-relaxed">
          Sipariş durumunuzu öğrenmek için sipariş kodunuzu girin.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-lg mx-auto mb-20 group">
        <div className="absolute inset-y-0 left-6 flex items-center text-neutral-300 group-focus-within:text-neutral-900 transition-colors">
          <Search size={20} strokeWidth={1.5} />
        </div>
        <input 
          type="text"
          placeholder="Sipariş Kodu (Örn: ORDER-XXXXXX)"
          className="w-full pl-16 pr-24 py-6 bg-white border border-neutral-100 rounded-3xl text-sm font-bold tracking-widest uppercase focus:ring-4 focus:ring-neutral-100 transition-all outline-none shadow-2xl"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchOrder(orderId)}
        />
        <button 
          onClick={() => fetchOrder(orderId)}
          className="absolute right-3 top-3 bottom-3 bg-neutral-900 text-white px-8 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : 'SORGULA'}
        </button>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500 text-xs font-bold uppercase tracking-widest">
          {error}
        </motion.div>
      )}

      {/* TRACKING TIMELINE */}
      {order && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-20 pt-10"
        >
          {/* VISUAL TIMELINE */}
          <div className="relative flex justify-between items-start">
            <div className="absolute top-7 left-10 right-10 h-[2px] bg-neutral-100 -z-10">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStatusIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                className="h-full bg-neutral-900"
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>

            {STATUS_STEPS.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center gap-4 group">
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl border-4",
                  idx <= currentStatusIndex ? "bg-neutral-900 text-white border-neutral-50 scale-110" : "bg-white text-neutral-300 border-neutral-50"
                )}>
                  <step.icon size={22} strokeWidth={1.5} />
                </div>
                <div className="text-center space-y-1">
                  <h4 className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    idx <= currentStatusIndex ? "text-neutral-900" : "text-neutral-300"
                  )}>{step.label}</h4>
                  <p className="text-[9px] text-neutral-400 font-light hidden sm:block w-24 mx-auto leading-tight">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER INFO SUMMARY */}
          <div className="bg-neutral-50 p-12 rounded-[50px] border border-neutral-100 flex flex-col md:flex-row gap-12 justify-between items-start md:items-center">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-2">Teslimat Adresi</span>
                <p className="text-sm font-bold text-neutral-900 max-w-xs leading-relaxed">
                  {order.shippingAddress.address}, {order.shippingAddress.district}/{order.shippingAddress.city}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-2">Alıcı Bilgisi</span>
                <p className="text-sm font-bold text-neutral-900">{order.shippingAddress.name} • {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="text-right space-y-6 w-full md:w-auto border-t md:border-t-0 md:border-l border-neutral-200 pt-8 md:pt-0 md:pl-12">
              <div className="flex justify-between md:block gap-4">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-2">Toplam Tutar</span>
                <div className="text-3xl font-light tracking-tighter text-neutral-900">{formatPrice(order.totalAmount)}</div>
              </div>
              <button className="w-full md:w-auto px-8 py-4 bg-white border border-neutral-200 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all shadow-xl">
                E-Arşiv Fatura
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-neutral-900" size={32} />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  )
}

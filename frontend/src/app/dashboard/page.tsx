"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, User, MapPin, Settings, LogOut, ChevronRight, Clock } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { formatPrice, cn } from '@/lib/utils'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session } = (((useSession() || {}) || {}) || {})
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/orders/${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [session])

  if (!session) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold">Lütfen giriş yapın.</h1>
        <Link href="/auth/login" className="inline-block px-8 py-4 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-widest">Giriş Yap</Link>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

        {/* SIDEBAR */}
        <aside className="space-y-8">
          <div className="p-8 bg-neutral-50 rounded-[40px] border border-neutral-100 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-neutral-900 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {session?.user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">{session?.user?.name || 'Kullanıcı'}</h2>
              <p className="text-xs text-neutral-400">{session?.user?.email || ''}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { label: 'Siparişlerim', icon: Package, active: true },
              { label: 'Adreslerim', icon: MapPin },
              { label: 'Profil Ayarları', icon: Settings },
            ].map((item) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-3xl text-sm font-bold transition-all",
                  item.active ? "bg-neutral-900 text-white shadow-xl" : "text-neutral-500 hover:bg-neutral-50"
                )}
              >
                <item.icon size={18} strokeWidth={1.5} />
                {item.label}
              </button>
            ))}
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-4 p-5 rounded-3xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all mt-8"
            >
              <LogOut size={18} strokeWidth={1.5} />
              Çıkış Yap
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-12">
          <div className="flex justify-between items-end">
            <h1 className="text-4xl font-bold tracking-tighter text-neutral-900 uppercase">Sipariş Geçmişi</h1>
            <span className="text-xs font-bold text-neutral-400 border-b-2 border-neutral-100 pb-1">{orders.length} Sipariş</span>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
               <div className="w-8 h-8 border-4 border-neutral-100 border-t-neutral-900 rounded-full animate-spin" />    
             </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-[40px] space-y-6">
              <Package size={48} className="mx-auto text-neutral-200" />
              <p className="text-neutral-500 font-light">Henüz bir siparişiniz bulunmuyor.</p>
              <Link href="/products" className="inline-block px-8 py-4 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">Alışverişe Başla</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any) => (
                <Link
                  key={order._id}
                  href={`/track-order?id=${order.orderCode}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white border border-neutral-100 rounded-[40px] hover:shadow-2xl hover:border-neutral-200 transition-all gap-8"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-neutral-50 rounded-2xl text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <Clock size={24} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{order.orderCode}</span>
                      <h3 className="text-sm font-bold text-neutral-900">
                        {new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-12">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Durum</span>
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-full tracking-widest">
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Toplam</span>
                      <span className="text-base font-bold text-neutral-900">{formatPrice(order.totalAmount)}</span>      
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-full text-neutral-300 group-hover:translate-x-2 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
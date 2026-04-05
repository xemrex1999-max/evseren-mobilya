"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, Truck, CreditCard, ShoppingCart, MapPin, ArrowLeft } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { formatPrice, cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const STEPS = [
  { id: 'address', label: 'Teslimat', icon: MapPin },
  { id: 'payment', label: 'Ödeme', icon: CreditCard },
  { id: 'confirm', label: 'Onay', icon: CheckCircle2 }
]

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const { cart, getTotal, clearCart } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: 'İstanbul',
    district: '',
    address: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    installment: 1
  })

  useEffect(() => {
    setMounted(true)
    if (mounted && cart.length === 0) router.push('/cart')
  }, [mounted, cart, router])

  if (!mounted || cart.length === 0) return null

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => Math.max(0, s - 1))

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate order creation
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingAddress: {
            name: formData.firstName + ' ' + formData.lastName,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            district: formData.district,
            address: formData.address
          },
          totalAmount: getTotal()
        })
      })
      
      const data = await res.json()
      if (res.ok) {
        clearCart()
        router.push(`/order-success?id=${data.orderId}`)
      } else {
        alert("Sipariş oluşturulamadı.")
      }
    } catch (err) {
      alert("Hata oluştu.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* LEFT: CHECKOUT STEPS */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* STEP INDICATOR */}
          <div className="flex items-center justify-between px-4">
            {STEPS.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                    step >= idx ? "bg-neutral-900 text-white shadow-xl scale-110" : "bg-neutral-100 text-neutral-400"
                  )}>
                    <s.icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    step >= idx ? "text-neutral-900" : "text-neutral-400"
                  )}>{s.label}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-[1px] bg-neutral-100 mx-4 mt-[-24px]" />
                )}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="address"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-2 gap-6">
                  <input 
                    placeholder="Adınız"
                    className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                  <input 
                    placeholder="Soyadınız"
                    className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <input 
                    placeholder="E-posta"
                    className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  <input 
                    placeholder="Telefon"
                    className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <textarea 
                  placeholder="Teslimat Adresi"
                  rows={4}
                  className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
                <div className="flex justify-end pt-8">
                  <button 
                    onClick={handleNext}
                    className="bg-neutral-900 text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl flex items-center gap-3"
                  >
                    Ödeme Adımına Geç <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="p-10 bg-neutral-900 rounded-[40px] text-white space-y-8 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-8 bg-neutral-800 rounded-md" />
                    <ShoppingCart size={24} className="opacity-20" />
                  </div>
                  <div className="text-xl md:text-2xl font-mono tracking-[0.2em]">
                    {formData.cardNumber || "•••• •••• •••• ••••"}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] uppercase opacity-40 mb-1">Kart Sahibi</div>
                      <div className="text-sm font-bold uppercase tracking-widest">{formData.cardName || "İSİM SOYİSİM"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase opacity-40 mb-1">Son Kullanma</div>
                      <div className="text-sm font-bold tracking-widest">{formData.cardExpiry || "00/00"}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <input 
                    placeholder="Kart Üzerindeki Ad"
                    className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 shadow-sm"
                    value={formData.cardName}
                    onChange={e => setFormData({...formData, cardName: e.target.value})}
                  />
                  <input 
                    placeholder="Kart Numarası"
                    className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 shadow-sm"
                    value={formData.cardNumber}
                    onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <input 
                      placeholder="AA/YY"
                      className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 shadow-sm"
                      value={formData.cardExpiry}
                      onChange={e => setFormData({...formData, cardExpiry: e.target.value})}
                    />
                    <input 
                      placeholder="CVV"
                      type="password"
                      className="w-full px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 shadow-sm"
                      value={formData.cardCVV}
                      onChange={e => setFormData({...formData, cardCVV: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={handleBack} className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Geri Dön
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-neutral-900 text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl"
                  >
                    {loading ? 'İşleniyor...' : 'Siparişi Tamamla'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* RIGHT: ORDER SUMMARY (STICKY) */}
        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[40px] border border-neutral-100 shadow-2xl sticky top-24 space-y-10">
            <h3 className="text-xl font-bold tracking-tighter uppercase tracking-[0.1em]">Sipariş Özeti</h3>
            
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">{item.qty} ADET</p>
                    <p className="text-xs font-light text-neutral-900">{formatPrice(item.price * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-10 border-t border-neutral-100">
              <div className="flex justify-between text-sm text-neutral-500 font-light">
                <span>Ara Toplam</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-500 font-light">
                <span>Nakliye</span>
                <span className="text-green-500 font-bold text-[10px] uppercase">Ücretsiz</span>
              </div>
              <div className="flex justify-between text-xl font-bold tracking-tighter text-neutral-900 pt-4 border-t border-neutral-50">
                <span>TOPLAM</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
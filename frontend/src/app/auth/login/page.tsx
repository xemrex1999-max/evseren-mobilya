"use client";
export const dynamic = "force-dynamic";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (isLogin) {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })
      if (res?.error) {
        setError('E-posta veya şifre hatalı.')
      } else {
        router.push('/')
      }
    } else {
      // Register logic
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if (res.ok) {
          setIsLogin(true)
          setError('Kayıt başarılı! Şimdi giriş yapabilirsiniz.')
        } else {
          setError(data.message || 'Bir hata oluştu.')
        }
      } catch (err) {
        setError('Sunucu hatası oluştu.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 py-12">
      <div className="max-w-md w-full bg-white p-10 shadow-2xl rounded-3xl relative overflow-hidden">
        {/* DECORATIVE BACKGROUND */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100 rounded-bl-full -z-10 opacity-50" />
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
            {isLogin ? 'Hoş Geldiniz' : 'Hesap Oluştur'}
          </h2>
          <p className="text-sm text-neutral-500 font-light">
            {isLogin ? 'Evseren dünyasına geri dönün.' : 'Aramıza katılmak için formu doldurun.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-4 flex items-center text-neutral-400">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center text-neutral-400">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <input
              type="email"
              placeholder="E-posta Adresi"
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center text-neutral-400">
              <Lock size={18} strokeWidth={1.5} />
            </div>
            <input
              type="password"
              placeholder="Şifre"
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          {error && (
            <div className="text-xs text-red-500 font-medium px-2 animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'İşleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest"
          >
            {isLogin ? "HENÜZ HESABINIZ YOK MU? KAYIT OLUN" : "ZATEN HESABINIZ VAR MI? GİRİŞ YAPIN"}
          </button>
        </div>
      </div>
    </div>
  )
}
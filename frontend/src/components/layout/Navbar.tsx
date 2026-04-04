"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/store/useCart'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cart = useCart((state) => state.cart)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0)

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
      isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className={cn(
          "text-2xl font-bold tracking-tighter transition-colors",
          isScrolled ? "text-neutral-900" : "text-white"
        )}>
          EVSEREN<span className="opacity-50 font-light">.PRO</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className={cn(
          "hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors",
          isScrolled ? "text-neutral-600" : "text-neutral-300"
        )}>
          <Link href="/products" className="hover:text-neutral-900 transition-colors">Ürünler</Link>
          <Link href="/katalog" className="hover:text-neutral-900 transition-colors">Katalog</Link>
          <Link href="/hakkimizda" className="hover:text-neutral-900 transition-colors">Hakkımızda</Link>
          <Link href="/iletisim" className="hover:text-neutral-900 transition-colors">İletişim</Link>
        </div>

        {/* ICONS */}
        <div className={cn(
          "flex items-center gap-6 transition-colors",
          isScrolled ? "text-neutral-600" : "text-white"
        )}>
          <button className="hover:opacity-60 transition-opacity">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <Link href="/auth/login" className="hover:opacity-60 transition-opacity">
            <User size={22} strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="relative group hover:opacity-60 transition-opacity">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            className="md:hidden hover:opacity-60"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-neutral-100 p-6 md:hidden animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-4 text-center font-medium uppercase tracking-widest text-neutral-600">
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>Ürünler</Link>
            <Link href="/katalog" onClick={() => setIsMenuOpen(false)}>Katalog</Link>
            <Link href="/hakkimizda" onClick={() => setIsMenuOpen(false)}>Hakkımızda</Link>
            <Link href="/iletisim" onClick={() => setIsMenuOpen(false)}>İletişim</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;

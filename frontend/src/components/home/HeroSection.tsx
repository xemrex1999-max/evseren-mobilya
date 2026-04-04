"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000')",
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4 text-neutral-300"
        >
          Yeni Sezon 2026 Koleksiyonu
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl leading-[0.9]"
        >
          YAŞAM ALANINIZA <br /> <span className="font-light italic text-neutral-300">RUH KATIN.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-sm md:text-base font-light tracking-wide mb-12 max-w-lg mx-auto text-neutral-400"
        >
          Modern çizgiler, zamansız tasarımlar ve İnegöl'ün eşsiz işçiliği ile evinizi yeniden keşfedin. 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link 
            href="/products" 
            className="group relative inline-flex items-center gap-4 bg-white text-neutral-900 px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-neutral-100 transition-all shadow-2xl"
          >
            Koleksiyonu İncele
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-white/0 to-white/50"
      />
    </section>
  )
}

export default HeroSection;

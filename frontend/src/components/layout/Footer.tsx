import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 pt-20 pb-12 px-6 md:px-12 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12">
        {/* LOGO & ADDRESS */}
        <div className="w-full md:w-auto px-4">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
            EVSEREN<span className="text-neutral-500 font-light">.PRO</span>
          </Link>
          <div className="mt-8 space-y-4 text-sm font-light">
            <p className="flex items-center gap-3">
              <MapPin size={18} className="text-neutral-500" />
              Mahmudiye Mh. No:33 İnegöl / BURSA
            </p>
            <p className="flex items-center gap-3">
              <Phone size={18} className="text-neutral-500" />
              +90 (532) 000 00 00
            </p>
            <p className="flex items-center gap-3">
              <Mail size={18} className="text-neutral-500" />
              info@evserenmobilya.com
            </p>
          </div>
        </div>

        {/* SHOP LINKS */}
        <div className="px-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-8">Kategoriler</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link href="/products?cat=yatak" className="hover:text-white transition-colors">Yatak Odası</Link></li>
            <li><Link href="/products?cat=yemek" className="hover:text-white transition-colors">Yemek Odası</Link></li>
            <li><Link href="/products?cat=koltuk" className="hover:text-white transition-colors">Koltuk Takımı</Link></li>
            <li><Link href="/products?cat=aksesuar" className="hover:text-white transition-colors">Aksesuarlar</Link></li>
          </ul>
        </div>

        {/* CORPORATE LINKS */}
        <div className="px-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-8">Kurumsal</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link href="/hakkimizda" className="hover:text-white transition-colors">Biz Kimiz?</Link></li>
            <li><Link href="/kvkk" className="hover:text-white transition-colors">KVKK Politikası</Link></li>
            <li><Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Sözleşmesi</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div className="px-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-8">Bizi Takip Edin</h4>
          <div className="flex gap-4">
            <Link href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors">
              <Globe size={20} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors">
              <Share2 size={20} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors">
              <Globe size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-medium tracking-widest uppercase text-neutral-600">
        <p>© 2026 EVSEREN MOBİLYA. TÜM HAKLARI SAKLIDIR.</p>
        <div className="flex gap-4">
          <img src="https://checkout.iyzipay.com/assets/img/footer/iyzi-white.svg" alt="Payment" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-opacity" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

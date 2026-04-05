export const dynamic = "force-dynamic";
import HeroSection from "@/components/home/HeroSection";
import HomeProductGrid from "@/components/home/HomeProductGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      <div className="relative z-10 -mt-20">
        <Suspense fallback={
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
          </div>
        }>
          <HomeProductGrid />
        </Suspense>
      </div>

      {/* ADDITIONAL CONTENT SECTION */}
      <section className="py-24 bg-neutral-50 px-6 md:px-12 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Biz Kimiz?</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              İnegöl'ün En Seçkin <br /> <span className="font-light italic text-neutral-400">Tasarımlarını Keşfedin.</span>
            </h2>
            <p className="text-sm md:text-base font-light text-neutral-600 leading-relaxed max-w-xl">
              20 yılı aşkın tecrübemizle, geleneksel mobilya ustalığını modern tasarım vizyonuyla birleştiriyoruz. 
              Sadece mobilya değil, yaşam boyu sürecek konfor ve estetik sunuyoruz.
            </p>
            <div className="pt-4">
              <button className="px-8 py-4 bg-white border border-neutral-900 text-neutral-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all shadow-xl">
                Hikayemizi Okuyun
              </button>
            </div>
          </div>
          <div className="flex-1 w-full aspect-square rounded-[40px] overflow-hidden shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover"
              alt="Workshop"
            />
            <div className="absolute inset-0 bg-neutral-900/10" />
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { ArrowRight, ChevronDown, Calculator } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero/hero.png"
          alt="T-shirt printing background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-white/20 text-blue-200 text-sm font-semibold mb-6 animate-bounce">
            🔥 Pusat Sablon Kaos Custom Terpercaya
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold leading-[1.1] mb-6">
            Bikin Kaos Impianmu <br />
            <span className="text-blue-400">Jadi Nyata!</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-light leading-relaxed">
            Mau bikin kaos satuan atau lusinan? Di sini tempatnya! Kualitas distro, pengerjaan kilat, harga bersahabat. Bergaransi 100% jika hasil tidak sesuai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('dtf-calculator')}
              className="flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl active:scale-95 border-2 border-transparent hover:border-blue-200"
            >
              <Calculator size={20} className="text-blue-600" /> Hitung Estimasi Harga
            </button>
            <button
              onClick={() => scrollTo('order-form')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20 active:scale-95"
            >
              Pesan via WhatsApp <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollTo('catalog')}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
            >
              Lihat Katalog
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <button
          onClick={() => scrollTo('about')}
          className="text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to About"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;

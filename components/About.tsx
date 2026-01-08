
import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0 opacity-50"></div>
            <img
              src="/hero/about.gif"
              alt="Our Workshop"
              className="rounded-3xl shadow-2xl relative z-10 w-full"
            />
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-2xl shadow-xl z-20 hidden md:block">
              <p className="text-4xl font-bold mb-1">5+</p>
              <p className="text-blue-100 font-medium">Tahun Pengalaman</p>
            </div>
          </div>

          <div>
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">Tentang AlyoneShop</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Solusi Cetak Custom Serba Ada</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Tak hanya sekadar kaos, kami hadir untuk memenuhi segala kebutuhan branding dan merchandise Anda. Mulai dari apparel (Kaos, Polo, Hoodie) hingga souvenir (Mug, Lanyard, Pin). AlyoneShop siap menjadi partner produksi satu atap untuk personal, komunitas, maupun perusahaan.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl text-blue-600 flex-shrink-0">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Visi</h4>
                  <p className="text-sm text-slate-500">Menjadi vendor custom apparel & merchandise terlengkap & terpercaya #1 di Indonesia.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl text-blue-600 flex-shrink-0">
                  <Eye size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Misi</h4>
                  <p className="text-sm text-slate-500">Menghadirkan hasil cetak terbaik, presisi, awet, dan layanan yang super ramah.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

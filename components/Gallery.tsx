
import React, { useState, useMemo } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    'Semua',
    'DTF',
    'Plastisol Reguler',
    'Plastisol Flock',
    'Plastisol Metallic',
    'Plastisol Reflective',
    'Plastisol Glow'
  ];

  const filteredItems = useMemo(() => {
    if (filter === 'Semua') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === filter);
  }, [filter]);

  const openItem = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeItem = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Hasil Karya Kami</h2>
          <p className="text-slate-500">Intip berbagai project sablon yang telah kami kerjakan dengan berbagai teknik printing profesional.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 border ${filter === cat
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openItem(item)}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-slate-100 animate-in fade-in zoom-in duration-500 cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <span className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-1">{item.category}</span>
                <h4 className="text-white font-bold text-lg leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <p className="text-lg">Belum ada item untuk kategori ini.</p>
          </div>
        )}

        {/* Portfolio Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={closeItem}></div>
            <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
              <button
                onClick={closeItem}
                className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur rounded-full text-slate-800 hover:bg-white transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row max-h-[90vh]">
                {/* Image Area */}
                <div className="md:w-3/5 bg-slate-100 overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover aspect-square md:aspect-auto"
                  />
                </div>

                {/* Info Area */}
                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-3">{selectedItem.category}</span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight">{selectedItem.title}</h3>
                  <div className="w-12 h-1 bg-blue-600 rounded-full mb-8"></div>

                  <p className="text-slate-500 mb-10 leading-relaxed text-sm md:text-base">
                    Hasil produksi nyata menggunakan teknik {selectedItem.category}. Kami menjamin ketajaman warna dan daya tahan sablon yang tinggi untuk setiap pesanan Anda.
                  </p>

                  <a
                    href={`https://wa.me/6282223703140?text=Halo AlyOneShop, saya tertarik dengan hasil sablon ${selectedItem.title} (${selectedItem.category})`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group"
                  >
                    Tanya Tentang Produk Ini <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

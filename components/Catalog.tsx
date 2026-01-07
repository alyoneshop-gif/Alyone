
import React, { useState, useMemo } from 'react';
import { X, ShoppingBag, Check, Ruler } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product, ColorOption } from '../types';

const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false);

  const categories = ['Semua', 'NSA', 'ADW'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Semua') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.availableColors?.[0]?.name || null);
    setCurrentImage(product.image);
    setShowSizeChart(false);
    document.body.style.overflow = 'hidden';
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setSelectedColor(null);
    setCurrentImage(null);
    setShowSizeChart(false);
    document.body.style.overflow = 'auto';
  };

  const handleColorClick = (color: ColorOption) => {
    if (color.name === selectedColor) return;

    setIsChangingImage(true);
    setSelectedColor(color.name);

    // Memberikan efek transisi saat ganti gambar
    setTimeout(() => {
      if (color.image) {
        setCurrentImage(color.image);
      }
      setIsChangingImage(false);
    }, 200);
  };

  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">Katalog Produk</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Pilihan Bahan Kaos & Contoh Hasil</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${activeCategory === cat ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer animate-in fade-in zoom-in duration-500"
              onClick={() => openProduct(product)}
            >
              {/* Fixed Aspect Ratio Container for Grid */}
              <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-100 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Lihat Detail
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600">
                  {product.category}
                </div>
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h4>
              <p className="text-blue-600 font-bold text-sm mt-1">{product.price}</p>

              <div className="flex items-center gap-1.5 mt-3">
                {product.availableColors?.slice(0, 5).map((color, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-slate-200"
                    style={{ background: color.hex }}
                    title={color.name}
                  ></div>
                ))}
                {(product.availableColors?.length || 0) > 5 && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    +{(product.availableColors?.length || 0) - 5} Warna
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeProduct}></div>
            <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in slide-in-from-bottom-8 duration-300 max-h-[90vh] overflow-y-auto md:overflow-hidden">
              <button
                onClick={closeProduct}
                className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur rounded-full text-slate-800 hover:bg-white transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              {/* Modal Image Container - Fixed size on desktop */}
              <div className="md:w-1/2 h-[350px] md:h-[600px] relative overflow-hidden bg-slate-100">
                <img
                  src={currentImage || selectedProduct.image}
                  alt={selectedProduct.name}
                  className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${isChangingImage ? 'opacity-50 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col bg-white overflow-y-auto">
                <div className="mb-6">
                  <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{selectedProduct.category} Collection</span>
                  <h3 className="text-3xl font-extrabold text-slate-900 mt-2 mb-4 leading-tight">{selectedProduct.name}</h3>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-2xl font-bold text-blue-600">{selectedProduct.price}</p>
                    <button
                      onClick={() => setShowSizeChart(!showSizeChart)}
                      className="flex items-center gap-2 text-xs font-black uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <Ruler size={14} /> {showSizeChart ? 'Deskripsi' : 'Size Chart'}
                    </button>
                  </div>

                  {showSizeChart && selectedProduct.sizeChart ? (
                    <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-200 text-slate-700">
                              <th className="px-4 py-3 text-left">Size</th>
                              <th className="px-4 py-3 text-left">Lebar (cm)</th>
                              <th className="px-4 py-3 text-left">Panjang (cm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedProduct.sizeChart.map((row, idx) => (
                              <tr key={idx} className="border-t border-slate-200 hover:bg-white transition-colors">
                                <td className="px-4 py-3 font-bold text-slate-900">{row.size}</td>
                                <td className="px-4 py-3 text-slate-600">{row.width}</td>
                                <td className="px-4 py-3 text-slate-600">{row.length}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 italic text-center">*Toleransi ukuran +/- 1-2 cm</p>
                    </div>
                  ) : (
                    <div className="space-y-4 text-slate-600 text-sm">
                      <p>Koleksi {selectedProduct.category} menggunakan bahan berkualitas premium yang sangat nyaman. Tersedia dalam {selectedProduct.availableColors?.length} pilihan warna menarik.</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 font-medium">
                          <Check size={14} className="text-green-500" /> Original {selectedProduct.category}
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <Check size={14} className="text-green-500" /> Jahitan Rantai
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <Check size={14} className="text-green-500" /> Bahan Combed Premium
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <Check size={14} className="text-green-500" /> Siap Sablon
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                {selectedProduct.availableColors && !showSizeChart && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-bold text-slate-900">Pilih Warna ({selectedProduct.availableColors.length}):</h5>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{selectedColor}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto p-1 custom-scrollbar">
                      {selectedProduct.availableColors.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => handleColorClick(color)}
                          className={`w-9 h-9 rounded-xl border-2 transition-all p-1 flex items-center justify-center flex-shrink-0 ${selectedColor === color.name ? 'border-blue-600 scale-110 shadow-lg' : 'border-transparent hover:border-slate-300'}`}
                          title={color.name}
                        >
                          <div
                            className="w-full h-full rounded-lg border border-slate-100"
                            style={{ background: color.hex }}
                          ></div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h5 className="font-bold text-slate-900 mb-3">Pilih Ukuran:</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizeChart?.map(row => (
                      <button key={row.size} className="min-w-[48px] h-10 px-2 border-2 border-slate-200 flex items-center justify-center rounded-xl text-sm font-bold hover:border-blue-600 hover:text-blue-600 cursor-pointer transition-colors active:scale-90">
                        {row.size}
                      </button>
                    )) || ['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button key={size} className="w-12 h-10 border-2 border-slate-200 flex items-center justify-center rounded-xl text-sm font-bold hover:border-blue-600 hover:text-blue-600 cursor-pointer transition-colors active:scale-90">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                  <a
                    href={`https://wa.me/6282223703140?text=Halo AlyOneShop, saya tertarik pesan ${selectedProduct.name} warna ${selectedColor || '-'}`}
                    target="_blank"
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                  >
                    <ShoppingBag size={20} /> Konsultasi Pesanan
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>

          <div className="relative z-10 text-center md:text-left max-w-xl">
            <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Butuh Katalog Lengkap & Daftar Harga?</h3>
            <p className="text-blue-100 text-lg opacity-90 font-medium">Tim kami siap membantu merekomendasikan bahan & teknik sablon terbaik sesuai budget dan kebutuhan Anda.</p>
          </div>
          <a href="#contact" className="relative z-10 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/20 whitespace-nowrap hover:-translate-y-1 active:translate-y-0">
            Hubungi CS Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catalog;

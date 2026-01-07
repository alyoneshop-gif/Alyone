
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Calculator, Image as ImageIcon, Plus, Trash2, ArrowRightLeft } from 'lucide-react';

// ==========================================
// DATA HARGA
// ==========================================

// 1. HARGA UTAMA (UMUM) - Digunakan untuk desain dengan harga tertinggi
const MAIN_PRICING_TIERS = [
  { label: 'Label 5 x 5', maxArea: 25, prices: { 1: 5000, 6: 5000, 12: 5000, 25: 4000, 50: 4000 } },
  { label: 'Logo 10 x 10', maxArea: 100, prices: { 1: 10000, 6: 10000, 12: 9000, 25: 9000, 50: 8500 } },
  { label: '25 x 7', maxArea: 175, prices: { 1: 15000, 6: 14000, 12: 13000, 25: 11000, 50: 9000 } },
  { label: 'A5', maxArea: 280, prices: { 1: 17000, 6: 15000, 12: 14000, 25: 12000, 50: 10000 } },
  { label: 'Mid A5 - A4', maxArea: 390, prices: { 1: 21000, 6: 19000, 12: 18000, 25: 16000, 50: 14000 } },
  { label: 'A4', maxArea: 560, prices: { 1: 25000, 6: 23000, 12: 21000, 25: 19000, 50: 16000 } },
  { label: 'Mid A4 - A3', maxArea: 810, prices: { 1: 30000, 6: 28000, 12: 26000, 25: 24000, 50: 21000 } },
  { label: 'A3', maxArea: 1120, prices: { 1: 35000, 6: 32000, 12: 30000, 25: 28000, 50: 25000 } },
];

// 2. HARGA TAMBAHAN - Digunakan untuk desain kedua (harga lebih rendah)
const ADDITIONAL_PRICING_TIERS = [
  { label: 'Label 5 x 5', maxArea: 25, prices: { 1: 5000, 6: 4500, 12: 4000, 25: 4000, 50: 3000 } },
  { label: 'Logo 10 x 10', maxArea: 100, prices: { 1: 5000, 6: 5000, 12: 5000, 25: 5000, 50: 5000 } },
  { label: '25 x 7', maxArea: 175, prices: { 1: 10000, 6: 9000, 12: 8000, 25: 6000, 50: 4000 } },
  { label: 'A5', maxArea: 280, prices: { 1: 12000, 6: 10000, 12: 9000, 25: 7000, 50: 5000 } },
  { label: 'Mid A5 - A4', maxArea: 390, prices: { 1: 16000, 6: 14000, 12: 13000, 25: 11000, 50: 9000 } },
  { label: 'A4', maxArea: 560, prices: { 1: 20000, 6: 18000, 12: 16000, 25: 14000, 50: 11000 } },
  { label: 'Mid A4 - A3', maxArea: 810, prices: { 1: 25000, 6: 23000, 12: 21000, 25: 19000, 50: 16000 } },
  { label: 'A3', maxArea: 1120, prices: { 1: 30000, 6: 27000, 12: 25000, 25: 23000, 50: 20000 } },
];

interface DesignState {
  id: number;
  image: string | null;
  pixelDims: { w: number; h: number } | null;
  widthCm: number | '';
  heightCm: number | '';
  result?: {
    area: number;
    tierLabel: string;
    unitPrice: number;
    subtotal: number;
    isOversized: boolean;
    type: 'Utama' | 'Tambahan';
  } | null;
}

const DTFCalculator: React.FC = () => {
  const [mode, setMode] = useState<'single' | 'double'>('single');
  const [quantity, setQuantity] = useState<number>(1);

  const [design1, setDesign1] = useState<DesignState>({ id: 1, image: null, pixelDims: null, widthCm: '', heightCm: '' });
  const [design2, setDesign2] = useState<DesignState>({ id: 2, image: null, pixelDims: null, widthCm: '', heightCm: '' });

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // Helper: Hitung harga berdasarkan tabel tertentu
  const calculatePrice = (width: number, height: number, qty: number, pricingTable: typeof MAIN_PRICING_TIERS) => {
    const area = width * height;
    const tier = pricingTable.find(t => area <= t.maxArea);

    let unitPrice = 0;
    if (tier) {
      if (qty >= 50) unitPrice = tier.prices[50];
      else if (qty >= 25) unitPrice = tier.prices[25];
      else if (qty >= 12) unitPrice = tier.prices[12];
      else if (qty >= 6) unitPrice = tier.prices[6];
      else unitPrice = tier.prices[1];
    }

    return {
      area: parseFloat(area.toFixed(2)),
      tierLabel: tier ? tier.label : 'Ukuran Custom / Besar',
      unitPrice,
      isOversized: !tier && area > 1120
    };
  };

  // Effect Utama: Logika Perbandingan Harga
  useEffect(() => {
    const w1 = Number(design1.widthCm);
    const h1 = Number(design1.heightCm);
    const w2 = Number(design2.widthCm);
    const h2 = Number(design2.heightCm);

    // 1. Hitung kedua desain menggunakan HARGA UTAMA dulu untuk perbandingan
    const res1_base = (w1 && h1) ? calculatePrice(w1, h1, quantity, MAIN_PRICING_TIERS) : null;
    const res2_base = (w2 && h2) ? calculatePrice(w2, h2, quantity, MAIN_PRICING_TIERS) : null;

    if (mode === 'single') {
      // Single Mode: Selalu pakai Harga Utama
      if (res1_base) {
        setDesign1(prev => ({
          ...prev,
          result: {
            ...res1_base,
            subtotal: res1_base.unitPrice * quantity,
            type: 'Utama'
          }
        }));
      } else {
        setDesign1(prev => ({ ...prev, result: null }));
      }
    } else {
      // Double Mode: Bandingkan Harga Base
      if (res1_base && res2_base) {
        const price1 = res1_base.unitPrice;
        const price2 = res2_base.unitPrice;

        // Tentukan mana Utama mana Tambahan
        // Default: Desain 1 Utama
        let d1Type: 'Utama' | 'Tambahan' = 'Utama';
        let d2Type: 'Utama' | 'Tambahan' = 'Tambahan';

        // Jika Desain 2 lebih mahal, tukar peran
        if (price2 > price1) {
          d1Type = 'Tambahan';
          d2Type = 'Utama';
        }

        // Hitung Final Price sesuai peran
        const res1_final = d1Type === 'Utama'
          ? res1_base
          : calculatePrice(w1, h1, quantity, ADDITIONAL_PRICING_TIERS); // Gunakan tabel Tambahan

        const res2_final = d2Type === 'Utama'
          ? res2_base
          : calculatePrice(w2, h2, quantity, ADDITIONAL_PRICING_TIERS); // Gunakan tabel Tambahan

        setDesign1(prev => ({
          ...prev,
          result: { ...res1_final, subtotal: res1_final.unitPrice * quantity, type: d1Type }
        }));

        setDesign2(prev => ({
          ...prev,
          result: { ...res2_final, subtotal: res2_final.unitPrice * quantity, type: d2Type }
        }));

      } else {
        // Jika salah satu belum diisi, tampilkan preview harga utama (sementara)
        if (res1_base) setDesign1(prev => ({ ...prev, result: { ...res1_base, subtotal: res1_base.unitPrice * quantity, type: 'Utama' } }));
        else setDesign1(prev => ({ ...prev, result: null }));

        if (res2_base) setDesign2(prev => ({ ...prev, result: { ...res2_base, subtotal: res2_base.unitPrice * quantity, type: 'Utama' } }));
        else setDesign2(prev => ({ ...prev, result: null }));
      }
    }
  }, [design1.widthCm, design1.heightCm, design2.widthCm, design2.heightCm, quantity, mode]);


  // Handler Generic untuk Upload & Input
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, designNo: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const newState = {
            image: event.target?.result as string,
            pixelDims: { w: img.naturalWidth, h: img.naturalHeight },
            widthCm: '',
            heightCm: '',
            result: null
          };
          if (designNo === 1) setDesign1(prev => ({ ...prev, ...newState }));
          else setDesign2(prev => ({ ...prev, ...newState }));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDimensionChange = (val: number, type: 'w' | 'h', designNo: 1 | 2) => {
    const targetState = designNo === 1 ? design1 : design2;
    const setTarget = designNo === 1 ? setDesign1 : setDesign2;

    if (type === 'w') {
      let newH: number | '' = '';
      if (targetState.pixelDims && val > 0) {
        const ratio = targetState.pixelDims.h / targetState.pixelDims.w;
        newH = parseFloat((val * ratio).toFixed(2));
      }
      setTarget(prev => ({ ...prev, widthCm: val, heightCm: newH }));
    } else {
      let newW: number | '' = '';
      if (targetState.pixelDims && val > 0) {
        const ratio = targetState.pixelDims.w / targetState.pixelDims.h;
        newW = parseFloat((val * ratio).toFixed(2));
      }
      setTarget(prev => ({ ...prev, heightCm: val, widthCm: newW }));
    }
  };

  const resetDesign = (designNo: 1 | 2) => {
    const resetState = { image: null, pixelDims: null, widthCm: '', heightCm: '', result: null };
    if (designNo === 1) setDesign1(prev => ({ ...prev, ...resetState }));
    else setDesign2(prev => ({ ...prev, ...resetState }));
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // Render Input Card
  const renderDesignInput = (design: DesignState, inputRef: React.RefObject<HTMLInputElement | null>, designNo: 1 | 2) => (
    <div className={`bg-slate-50 p-6 rounded-[2rem] border transition-all ${design.result ? 'border-blue-200 shadow-md' : 'border-slate-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-slate-700 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">{designNo}</span>
          Desain {designNo}
        </h4>
        {design.image && (
          <button onClick={() => resetDesign(designNo)} className="text-red-500 hover:text-red-600 p-1 bg-white rounded-full shadow-sm">
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Image Upload Area */}
      <div className="mb-6">
        <div
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all h-48 ${design.image ? 'border-blue-400 bg-white' : 'border-slate-300 hover:border-blue-400 hover:bg-white'}`}
        >
          {design.image ? (
            <>
              <img src={design.image} alt="Preview" className="h-full w-full object-contain rounded-lg" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/70 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                {design.pixelDims?.w} x {design.pixelDims?.h} px
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500 mb-2">
                <Upload size={20} />
              </div>
              <p className="text-slate-500 text-xs font-medium text-center">Upload Gambar</p>
            </>
          )}
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, designNo)}
          />
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Lebar (cm)</label>
          <input
            type="number"
            value={design.widthCm}
            onChange={(e) => handleDimensionChange(parseFloat(e.target.value), 'w', designNo)}
            disabled={!design.image}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-bold"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Tinggi (cm)</label>
          <input
            type="number"
            value={design.heightCm}
            onChange={(e) => handleDimensionChange(parseFloat(e.target.value), 'h', designNo)}
            disabled={!design.image}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-sm font-bold"
            placeholder="Auto"
          />
        </div>
      </div>
    </div>
  );

  const totalPrice = (design1.result?.subtotal || 0) + (mode === 'double' ? (design2.result?.subtotal || 0) : 0);
  const isReady = design1.result && (mode === 'single' || (mode === 'double' && design2.result));

  return (
    <section id="dtf-calculator" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid xl:grid-cols-12 gap-12 items-start">

          {/* Left Column: Input Area */}
          <div className="xl:col-span-7">
            <div className="mb-8">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Cek Harga Instan</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Kalkulator Sablon DTF</h2>
              <p className="text-slate-500">Upload desainmu. Jika menggunakan 2 desain, sistem otomatis mendeteksi desain dengan harga tertinggi sebagai <strong>HARGA UTAMA</strong>, dan desain lainnya mendapat <strong>HARGA TAMBAHAN (Lebih Hemat)</strong>.</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-2 mb-8 inline-flex items-center gap-2">
              <button
                onClick={() => { setMode('single'); setDesign2(prev => ({ ...prev, image: null, result: null })); }}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${mode === 'single' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <ImageIcon size={18} /> 1 Desain
              </button>
              <button
                onClick={() => setMode('double')}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${mode === 'double' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <ArrowRightLeft size={18} /> 2 Desain
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {renderDesignInput(design1, fileInputRef1, 1)}

              {mode === 'double' ? (
                renderDesignInput(design2, fileInputRef2, 2)
              ) : (
                <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 border-dashed border-slate-100 text-slate-300 bg-slate-50/50">
                  <Plus size={48} className="mb-2" />
                  <p className="font-bold">Tambah Desain Ke-2</p>
                  <button onClick={() => setMode('double')} className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-full text-sm font-bold shadow-sm border border-slate-200 hover:border-blue-400">Aktifkan Mode 2 Desain</button>
                </div>
              )}
            </div>

            {/* Quantity Input Global */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="font-bold text-slate-800">Jumlah Pesanan (Pcs)</h5>
                <p className="text-xs text-slate-500">Jumlah kaos/media yang akan disablon</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 hover:shadow-md transition-all">-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center font-black text-2xl py-2 bg-transparent border-b-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 hover:shadow-md transition-all">+</button>
              </div>
            </div>
          </div>

          {/* Right Column: Result Card */}
          <div className="xl:col-span-5 xl:sticky xl:top-32">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full -mr-20 -mt-20 blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                    <Calculator size={24} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Rincian Biaya</h3>
                </div>

                {!isReady ? (
                  <div className="text-center py-12 text-slate-400 border-2 border-dashed border-white/10 rounded-2xl">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Lengkapi data desain & ukuran<br />untuk melihat estimasi harga.</p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Design 1 Detail */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 relative overflow-hidden">
                      {design1.result?.type === 'Utama' && <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl">HARGA UTAMA</div>}
                      {design1.result?.type === 'Tambahan' && <div className="absolute top-0 right-0 bg-green-500 text-xs font-bold px-3 py-1 rounded-bl-xl">HARGA TAMBAHAN</div>}

                      <h5 className="font-bold text-blue-200 mb-2 text-sm">Desain 1</h5>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{design1.result?.area} cm² ({design1.result?.tierLabel})</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">@ {formatRupiah(design1.result?.unitPrice || 0)} x {quantity}</span>
                        <span className="font-bold">{formatRupiah(design1.result?.subtotal || 0)}</span>
                      </div>
                      {design1.result?.isOversized && <p className="text-red-400 text-xs mt-1">*Ukuran melebihi A3, harga custom.</p>}
                    </div>

                    {/* Design 2 Detail */}
                    {mode === 'double' && design2.result && (
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 relative overflow-hidden">
                        {design2.result?.type === 'Utama' && <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl">HARGA UTAMA</div>}
                        {design2.result?.type === 'Tambahan' && <div className="absolute top-0 right-0 bg-green-500 text-xs font-bold px-3 py-1 rounded-bl-xl">HARGA TAMBAHAN</div>}

                        <h5 className="font-bold text-blue-200 mb-2 text-sm">Desain 2</h5>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{design2.result?.area} cm² ({design2.result?.tierLabel})</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">@ {formatRupiah(design2.result?.unitPrice || 0)} x {quantity}</span>
                          <span className="font-bold">{formatRupiah(design2.result?.subtotal || 0)}</span>
                        </div>
                        {design2.result?.isOversized && <p className="text-red-400 text-xs mt-1">*Ukuran melebihi A3, harga custom.</p>}
                      </div>
                    )}

                    <div className="h-px bg-white/10 my-4"></div>

                    <div>
                      <span className="block text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Total Estimasi</span>
                      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                        {formatRupiah(totalPrice)}
                      </div>
                    </div>

                    {/* Construct WhatsApp Message */}
                    {(() => {
                      let msg = `Halo AlyOneShop, saya cek kalkulator untuk pesanan: %0A%0A`;
                      msg += `*Jumlah:* ${quantity} pcs%0A`;
                      msg += `------------------%0A`;
                      msg += `*Desain 1:* ${design1.widthCm}x${design1.heightCm}cm (${design1.result?.tierLabel})%0A`;
                      msg += `Harga: ${formatRupiah(design1.result?.subtotal || 0)} (${design1.result?.type})%0A`;
                      if (mode === 'double' && design2.result) {
                        msg += `------------------%0A`;
                        msg += `*Desain 2:* ${design2.widthCm}x${design2.heightCm}cm (${design2.result?.tierLabel})%0A`;
                        msg += `Harga: ${formatRupiah(design2.result?.subtotal || 0)} (${design2.result?.type})%0A`;
                      }
                      msg += `==================%0A`;
                      msg += `*TOTAL ESTIMASI: ${formatRupiah(totalPrice)}*`;

                      return (
                        <a
                          href={`https://wa.me/6282223703140?text=${msg}`}
                          target="_blank"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/50 mt-4 group"
                        >
                          Pesan Sekarang <ArrowRightLeft size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-6 text-center italic max-w-sm mx-auto">
              *Harga di atas adalah estimasi jasa sablon DTF. Belum termasuk kaos.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DTFCalculator;

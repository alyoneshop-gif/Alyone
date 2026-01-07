
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate loading
    const btn = e.currentTarget.querySelector('button');
    if (btn) btn.innerHTML = 'Mengirim...';

    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset back after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4 block">Hubungi Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">Siap Memulai Project Sablon Anda?</h2>
            <p className="text-slate-400 mb-12 max-w-lg leading-relaxed">
              Konsultasikan kebutuhan sablon Anda secara gratis. Baik itu desain, pemilihan bahan, maupun negosiasi harga untuk partai besar. Tim kami siap merespons dalam waktu kurang dari 24 jam.
            </p>

            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Workshop</h4>
                  <p className="text-slate-400">Jl. Glagahsari, Gang Suromangun, Glagah UH IV/369C, Umbulharjo, Yogyakarta</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                  <p className="text-slate-400">+62 822-2370-3140</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p className="text-slate-400">alyoneshop@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-16">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 hover:-translate-y-1">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div id="order-form" className="relative">
            <div className={`bg-white rounded-[2.5rem] p-8 md:p-12 text-slate-900 shadow-2xl transition-all duration-500 ${isSubmitted ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
              <h3 className="text-2xl font-black mb-8">Kirim Pesanan</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 transition-all bg-slate-50 font-medium"
                      placeholder="Contoh: Budi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">No. WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 transition-all bg-slate-50 font-medium"
                      placeholder="0812..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 transition-all bg-slate-50 font-medium"
                    placeholder="budi@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Detail Pesanan</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 transition-all bg-slate-50 font-medium resize-none"
                    placeholder="Ceritakan desain Anda, jumlah kaos, dan jenis bahan..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100 group"
                >
                  Kirim Pesanan <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Success Overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center text-slate-900 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black mb-4 text-green-600">Terima Kasih!</h3>
                <p className="text-slate-600 text-lg mb-8">Pesan Anda telah berhasil dikirim. Admin AlyoneShop akan segera menghubungi Anda melalui WhatsApp.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

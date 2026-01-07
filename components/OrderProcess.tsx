
import React from 'react';
import { ORDER_STEPS } from '../constants';

const OrderProcess: React.FC = () => {
  return (
    <section id="how-to-order" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">Cara Pemesanan</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Langkah Mudah Sablon di Sini</h2>
          <p className="text-slate-500">Proses transparan dan mudah, mulai dari diskusi desain hingga barang sampai di depan pintu Anda.</p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-blue-200 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {ORDER_STEPS.map((step) => (
              <div key={step.number} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-200">
                  {step.number}
                </div>
                <h4 className="font-extrabold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderProcess;

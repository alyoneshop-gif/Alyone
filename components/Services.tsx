
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">Layanan Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Teknik Sablon Profesional</h2>
          <p className="text-slate-500">Kami menggunakan peralatan modern dan bahan baku premium untuk memastikan hasil sablon yang tajam dan tahan lama.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-300 transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
              <a href="#order-form" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Pelajari Lebih Lanjut <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

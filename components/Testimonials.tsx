
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
// Fix: Import Testimonial type from types.ts to replace 'any'
import { Testimonial } from '../types';

// Fix: Define TestimonialCardProps interface
interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Fix: Use React.FC to properly handle React-specific props like 'key' in TypeScript
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 mb-6 group relative">
    <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors">
      <Quote size={40} fill="currentColor" />
    </div>
    <div className="flex gap-1 mb-4 text-yellow-400 relative z-10">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
    <p className="text-slate-600 italic mb-6 leading-relaxed relative z-10 text-sm">"{testimonial.text}"</p>
    <div className="flex items-center gap-4 relative z-10">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover border-2 border-blue-50 shadow-sm"
      />
      <div>
        <h4 className="font-bold text-slate-900 text-xs">{testimonial.name}</h4>
        <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  // Triple the items to ensure smooth infinite loop
  const column1 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const column2 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].reverse();
  const column3 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">Testimoni</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Kata Mereka</h2>
          <p className="text-slate-500">Ribuan pelanggan puas. Cek apa kata mereka tentang hasil sablon di AlyoneShop.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] relative overflow-hidden group/container">
          {/* Gradients to mask the top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none"></div>

          {/* Column 1 - Slow */}
          <div className="flex flex-col animate-scroll-v-slow hover-pause">
            {column1.map((t, i) => <TestimonialCard key={`c1-${i}`} testimonial={t} />)}
          </div>

          {/* Column 2 - Medium (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col animate-scroll-v-medium hover-pause">
            {column2.map((t, i) => <TestimonialCard key={`c2-${i}`} testimonial={t} />)}
          </div>

          {/* Column 3 - Fast (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col animate-scroll-v-fast hover-pause">
            {column3.map((t, i) => <TestimonialCard key={`c3-${i}`} testimonial={t} />)}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-v {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
        .animate-scroll-v-slow {
          animation: scroll-v 40s linear infinite;
        }
        .animate-scroll-v-medium {
          animation: scroll-v 30s linear infinite;
        }
        .animate-scroll-v-fast {
          animation: scroll-v 50s linear infinite;
        }
        .hover-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

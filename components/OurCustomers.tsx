
import React from 'react';
import { CLIENT_LOGOS } from '../constants';

const OurCustomers: React.FC = () => {
  // Duplikat list logo untuk efek looping yang mulus
  const doubledLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Partner Terpercaya</h3>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-scroll py-4">
          {doubledLogos.map((logo, idx) => (
            <div 
              key={`${logo.id}-${idx}`} 
              className="flex-shrink-0 mx-8 md:mx-12 group transition-all duration-300"
            >
              <div className="w-24 md:w-32 h-12 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OurCustomers;

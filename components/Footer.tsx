
import React from 'react';
import { Shirt } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/10 py-12 text-slate-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img
              src="/logo/logo-white.png"
              alt="AlyoneShop Logo"
              className="h-8 w-auto opacity-80"
            />
          </div>

          <div className="text-sm text-center md:text-right">
            <p>© {new Date().getFullYear()} AlyoneShop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

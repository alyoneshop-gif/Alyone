
import React, { useState, useEffect } from 'react';
import { Menu, X, Shirt } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'dtf-calculator', 'catalog', 'portfolio', 'how-to-order', 'contact'];
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (isAtBottom) {
        setActiveSection('contact');
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Beranda', href: '#home', id: 'home' },
    { name: 'Tentang', href: '#about', id: 'about' },
    { name: 'Layanan', href: '#services', id: 'services' },
    { name: 'Cek Harga DTF', href: '#dtf-calculator', id: 'dtf-calculator' },
    { name: 'Katalog', href: '#catalog', id: 'catalog' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Pemesanan', href: '#how-to-order', id: 'how-to-order' },
    { name: 'Kontak', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2 group transition-transform hover:scale-105">
            <img
              src={scrolled ? "/logo/logo-black.png" : "/logo/logo-white.png"}
              alt="AlyoneShop Logo"
              className="h-10 w-auto transition-all duration-300"
            />
          </a>

          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-3 py-2 rounded-full font-bold text-xs transition-all duration-300 relative ${scrolled ? (activeSection === link.id ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50') : (activeSection === link.id ? 'text-white bg-white/20 backdrop-blur-md' : 'text-white/80 hover:text-white hover:bg-white/10')}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a href="#order-form" onClick={(e) => handleNavClick(e, 'order-form')} className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg active:scale-95 ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300' : 'bg-white text-blue-600 hover:bg-blue-50'}`}>
              Pesan Sekarang
            </a>
          </div>

          <button className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10 backdrop-blur-md'}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-x-0 top-[72px] bg-white border-t border-slate-100 shadow-2xl transition-all duration-500 origin-top overflow-hidden h-[calc(100vh-72px)] overflow-y-auto ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.id)} className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${activeSection === link.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
              {link.name}
              {activeSection === link.id && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <a href="#order-form" onClick={(e) => handleNavClick(e, 'order-form')} className="w-full flex items-center justify-center bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 active:scale-95 transition-transform">
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

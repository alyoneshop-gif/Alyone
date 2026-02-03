
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Catalog from './components/Catalog';
import Gallery from './components/Gallery';
import OrderProcess from './components/OrderProcess';
import Testimonials from './components/Testimonials';
import OurCustomers from './components/OurCustomers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import DTFCalculator from './components/DTFCalculator';
import { useImageProtection } from './hooks/useImageProtection';

const App: React.FC = () => {
  useImageProtection();

  const handleImageContextMenu = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'IMG') {
      e.preventDefault();
    }
  };

  return (
    <div 
      className="relative antialiased text-slate-900 bg-white" 
      onContextMenu={handleImageContextMenu}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <OurCustomers />
        <Services />
        <DTFCalculator />
        <Catalog />
        <Gallery />
        <OrderProcess />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;

import React from 'react';
import { Truck, Award, Zap, Palette, Printer, Clock } from 'lucide-react';
import { Service, Product, Testimonial, OrderStep, ColorOption, GalleryItem, ClientLogo } from './types';

export const COLORS = {
  primary: '#2563eb', // Blue 600
  secondary: '#f8fafc', // Slate 50
  text: '#1e293b', // Slate 800
  accent: '#3b82f6', // Blue 500
};

// Map of Color Names to Hex Codes
const COLOR_HEX_MAP: Record<string, string> = {
  'Black': '#1a1a1a',
  'White': '#ffffff',
  'Navy': '#1e3a8a',
  'Red': '#dc2626',
  'Maroon': '#7f1d1d',
  'Royal Blue': '#2563eb',
  'Forest Green': '#14532d',
  'Gold': '#fbbf24',
  'Yellow': '#fbbf24',
  'Daisy': '#fbbf24', // Similar to Gold/Yellow
  'Orange': '#ea580c',
  'Purple': '#7e22ce',
  'Charcoal': '#334155',
  'Sport Grey': '#94a3b8',
  'Carolina Blue': '#7dd3fc',
  'Irish Green': '#16a34a',
  'Light Pink': '#fbcfe8',
  'Heliconia': '#be185d',
  'Lime': '#84cc16',
  'Military Green': '#57534e',
  'Sapphire': '#0ea5e9',
  'Sand': '#d6d3d1',
  'Chestnut': '#7c2d12',
  'Dark Chocolate': '#451a03',
  'Aqua Sky': '#22d3ee',
  'Black Heather': '#475569',
  'Burgundy Heather': '#991b1b',
  'Butter': '#fef08a',
  'Dark Green Heather': '#064e3b',
  'Green Ash': '#86efac',
  'Lilac': '#e879f9',
  'Navy Heather': '#334155',
  'Red Heather': '#b91c1c',
  'Salmon': '#fda4af',
  'Army': '#4b5563',
  'Black Camo': '#171717',
  'Forest Camo': '#14532d',
  'Light Blue': '#bae6fd',
};

// Helper to generate ColorOption array from file list
const createProductColors = (folderName: string, fileNames: string[]): ColorOption[] => {
  return fileNames.map(fileName => {
    // Extract color name: Remove prefix (digits + dash) and suffix (.jpg), and cleanup "(1)"
    // e.g., "87-Black.jpg" -> "Black"
    // e.g., "99-Black (1).jpg" -> "Black"
    let cleanName = fileName
      .replace(/^[0-9]+-/, '') // Remove prefix like "87-"
      .replace(/\.jpg$/, '')   // Remove extension
      .replace(/\s\([0-9]+\)$/, '') // Remove " (1)"
      .trim();

    return {
      name: cleanName,
      hex: COLOR_HEX_MAP[cleanName] || '#cbd5e1', // Default to slate-300 if not found
      image: `/assets/product/${folderName}/${fileName}`
    };
  });
};

// File lists from public/assets/product
const NSA_SOFT_TEE_Vs = [
  "87-Black.jpg", "87-Carolina Blue.jpg", "87-Charcoal.jpg", "87-Chestnut.jpg",
  "87-Daisy.jpg", "87-Dark Chocolate.jpg", "87-Forest Green.jpg", "87-Gold.jpg",
  "87-Heliconia.jpg", "87-Irish Green.jpg", "87-Light Pink.jpg", "87-Lime.jpg",
  "87-Maroon.jpg", "87-Military Green.jpg", "87-Navy.jpg", "87-Orange.jpg",
  "87-Purple.jpg", "87-Red.jpg", "87-Royal Blue.jpg", "87-Sand.jpg",
  "87-Sapphire.jpg", "87-Sport Grey.jpg", "87-White.jpg"
];

const NSA_PREMIUM_Vs = [
  "99-Aqua Sky.jpg", "99-Black (1).jpg", "99-Black Heather.jpg", "99-Black.jpg",
  "99-Burgundy Heather.jpg", "99-Butter.jpg", "99-Carolina Blue (1).jpg", "99-Charcoal (1).jpg",
  "99-Daisy (1).jpg", "99-Dark Chocolate (1).jpg", "99-Dark Green Heather.jpg", "99-Forest Green (1).jpg",
  "99-Gold (1).jpg", "99-Green Ash.jpg", "99-Irish Green (1).jpg", "99-Light Pink (1).jpg",
  "99-Lilac.jpg", "99-Maroon (1).jpg", "99-Military Green (1).jpg", "99-Navy (1).jpg",
  "99-Navy Heather.jpg", "99-Orange (1).jpg", "99-Purple (1).jpg", "99-Red (1).jpg",
  "99-Red Heather.jpg", "99-Royal Blue (1).jpg", "99-Salmon.jpg", "99-Sand (1).jpg",
  "99-Sport Grey (1).jpg", "99-White (1).jpg"
];

const NSA_HOODIE_Vs = [
  "103-Army.jpg", "103-Black Camo.jpg", "103-Black.jpg", "103-Forest Camo.jpg",
  "103-Forest Green.jpg", "103-Gold.jpg", "103-Light Blue.jpg", "103-Light Pink.jpg",
  "103-Lilac.jpg", "103-Maroon.jpg", "103-Navy.jpg", "103-Red.jpg",
  "103-Royal Blue.jpg", "103-Sport Grey.jpg"
];

const NSA_ZIP_HOODIE_Vs = [
  "102-Black Camo.jpg", "102-Black.jpg", "102-Forest Camo.jpg", "102-Forest Green.jpg",
  "102-Maroon.jpg", "102-Navy.jpg", "102-Sport Grey.jpg"
];

const POLO_Vs = [
  "96-Black.jpg", "96-Carolina Blue.jpg", "96-Charcoal.jpg", "96-Daisy.jpg",
  "96-Forest Green.jpg", "96-Irish Green (1).jpg", "96-Light Pink.jpg", "96-Maroon (1).jpg",
  "96-Navy (1).jpg", "96-Orange (1).jpg", "96-Red (1).jpg", "96-Royal Blue (1).jpg",
  "96-Sport Grey (1).jpg", "96-White (1).jpg"
];


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'NSA Soft Tee 30s',
    price: 'Mulai Rp 45.000',
    image: '/assets/product/NSA soft tee 30s/87-Black.jpg',
    category: 'NSA',
    availableColors: createProductColors('NSA soft tee 30s', NSA_SOFT_TEE_Vs),
    sizeChart: [{ size: 'S', width: 47, length: 66 }, { size: 'M', width: 50, length: 69 }, { size: 'L', width: 53, length: 72 }, { size: 'XL', width: 56, length: 74 }, { size: 'XXL', width: 59, length: 76 }]
  },
  {
    id: 2,
    name: 'NSA Premium 24s',
    price: 'Mulai Rp 50.000',
    image: '/assets/product/NSA premium 24s/99-Black.jpg',
    category: 'NSA',
    availableColors: createProductColors('NSA premium 24s', NSA_PREMIUM_Vs),
    sizeChart: [{ size: 'S', width: 47, length: 66 }, { size: 'M', width: 50, length: 69 }, { size: 'L', width: 53, length: 72 }, { size: 'XL', width: 56, length: 74 }, { size: 'XXL', width: 59, length: 76 }]
  },
  {
    id: 11,
    name: 'NSA Zip Hoodie',
    price: 'Mulai Rp 140.000',
    image: '/assets/product/NSA zip hoodie/102-Black.jpg',
    category: 'NSA',
    availableColors: createProductColors('NSA zip hoodie', NSA_ZIP_HOODIE_Vs),
    sizeChart: [{ size: 'S', width: 51, length: 65 }, { size: 'M', width: 54, length: 68 }, { size: 'L', width: 57, length: 71 }, { size: 'XL', width: 61, length: 74 }, { size: 'XXL', width: 64, length: 77 }]
  },
  {
    id: 12,
    name: 'NSA Hoodie',
    price: 'Mulai Rp 130.000',
    image: '/assets/product/NSA Hoodie/103-Black.jpg',
    category: 'NSA',
    availableColors: createProductColors('NSA Hoodie', NSA_HOODIE_Vs),
    sizeChart: [{ size: 'S', width: 51, length: 65 }, { size: 'M', width: 54, length: 68 }, { size: 'L', width: 57, length: 71 }, { size: 'XL', width: 61, length: 74 }, { size: 'XXL', width: 64, length: 77 }]
  },
  {
    id: 15,
    name: 'ADW Hoodie Premium',
    price: 'Mulai Rp 90.000',
    image: '/assets/product/NSA Hoodie/103-Black.jpg', // Reusing NSA Hoodie Image as placeholder or similar
    category: 'ADW',
    availableColors: createProductColors('NSA Hoodie', NSA_HOODIE_Vs), // Reusing colors
    sizeChart: [{ size: 'S', width: 51, length: 65 }, { size: 'M', width: 54, length: 68 }, { size: 'L', width: 57, length: 71 }, { size: 'XL', width: 61, length: 74 }, { size: 'XXL', width: 64, length: 77 }]
  },
  {
    id: 16,
    name: 'ADW Polo Shirt',
    price: 'Mulai Rp 63.000',
    image: '/assets/product/Polo/96-Black.jpg',
    category: 'ADW',
    availableColors: createProductColors('Polo', POLO_Vs),
    sizeChart: [{ size: 'S', width: 47, length: 66 }, { size: 'M', width: 50, length: 69 }, { size: 'L', width: 53, length: 72 }, { size: 'XL', width: 56, length: 74 }, { size: 'XXL', width: 59, length: 76 }]
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: 'Jersey Komunitas Full Color', category: 'DTF', image: '/portfolio/portfolio (1).png' },
  { id: 2, title: 'Kaos Distro High Opacity', category: 'Plastisol Reguler', image: '/portfolio/portfolio (2).png' },
  { id: 3, title: 'Logo Eksklusif Efek Beludru', category: 'Plastisol Flock', image: '/portfolio/portfolio (3).png' },
  { id: 4, title: 'Desain Gold Luxury', category: 'Plastisol Metallic', image: '/portfolio/portfolio (4).png' },
  { id: 5, title: 'Safety Gear Glow', category: 'Plastisol Glow', image: '/portfolio/portfolio (5).png' },
  { id: 6, title: 'Branding Event Reflektif', category: 'Plastisol Reflective', image: '/portfolio/portfolio (6).png' },
  { id: 7, title: 'Artwork Satuan Detail', category: 'DTF', image: '/portfolio/portfolio (7).png' },
  { id: 8, title: 'Corporate T-Shirt', category: 'Plastisol Reguler', image: '/portfolio/portfolio (8).png' },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: 1, name: 'Brand 1', url: 'https://images.seeklogo.com/logo-png/1/1/bank-mandiri-logo-png_seeklogo-16290.png' },
  { id: 2, name: 'Brand 2', url: 'https://images.seeklogo.com/logo-png/35/1/bank-bni-logo-png_seeklogo-355606.png' },
  { id: 3, name: 'Brand 3', url: 'https://images.seeklogo.com/logo-png/30/1/bank-bri-bank-rakyat-logo-png_seeklogo-304232.png' },
  { id: 4, name: 'Brand 4', url: 'https://images.seeklogo.com/logo-png/35/1/pu-logo-png_seeklogo-355609.png' },
  { id: 5, name: 'Brand 5', url: 'https://images.seeklogo.com/logo-png/20/2/universitas-gadjah-mada-logo-png_seeklogo-209146.png' },
  { id: 6, name: 'Brand 6', url: 'https://images.seeklogo.com/logo-png/20/2/universitas-ahmad-dahlan-yogyakarta-logo-png_seeklogo-203811.png' },
  { id: 7, name: 'Brand 7', url: 'https://images.seeklogo.com/logo-png/23/2/universitas-islam-indonesia-logo-png_seeklogo-231955.png' },
  { id: 8, name: 'Brand 8', url: 'https://images.seeklogo.com/logo-png/25/2/universitas-negeri-yogyakarta-logo-png_seeklogo-258396.png' },
  { id: 9, name: 'Brand 9', url: 'https://images.seeklogo.com/logo-png/19/2/universitas-islam-negeri-sunan-kalijaga-yogyakarta-logo-png_seeklogo-191466.png' },
  { id: 10, name: 'Brand 10', url: 'https://images.seeklogo.com/logo-png/9/2/muhammadiyah-logo-png_seeklogo-95839.png' },
  { id: 11, name: 'Brand 11', url: 'https://images.seeklogo.com/logo-png/29/2/bethesda-logo-png_seeklogo-290695.png' },
  { id: 12, name: 'Brand 12', url: 'https://images.seeklogo.com/logo-png/35/2/puskesmas-logo-png_seeklogo-359624.png' },
];

export const SERVICES: Service[] = [
  { id: 'dtf', title: 'Sablon DTF (Digital)', description: 'Solusi sablon satuan dengan warna tak terbatas. Hasil cetak tajam, detail presisi, & pengerjaan kilat.', icon: <Printer className="w-8 h-8 text-blue-600" /> },
  { id: 'plastisol', title: 'Sablon Plastisol (Manual)', description: 'Standar kualitas distro terbaik. Tinta awet, warna solid/bold, & tekstur premium. Cocok untuk order lusinan.', icon: <Palette className="w-8 h-8 text-blue-600" /> },
  { id: 'rubber', title: 'Sablon Rubber (Waterbase)', description: 'Tinta menyerap ke serat kain. Hasil elastis, tahan setrika, & sangat lembut. Favorit untuk kaos event & anak.', icon: <Zap className="w-8 h-8 text-blue-600" /> },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Andi Pratama', role: 'Ketua Komunitas Motor', text: 'Hasil sablon plastisolnya mantap banget, warna keluar dan gak pecah.', rating: 5, avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: 2, name: 'Siska Amelia', role: 'Owner Brand Lokal', text: 'AlyoneShop jadi partner tetap produksi brand saya. Pengerjaan cepat dan admin sangat membantu proses desain dari nol.', rating: 5, avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 3, name: 'Budi Santoso', role: 'Event Organizer', text: 'Pesan 200 kaos dalam 3 hari selesai tepat waktu. Kualitas bahan NSA memang tidak perlu diragukan.', rating: 4, avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: 4, name: 'Rina Wijaya', role: 'Fashion Designer', text: 'Teknik DTF-nya sangat halus, gradasi warna yang rumit pun bisa tercetak dengan sempurna.', rating: 5, avatar: 'https://picsum.photos/seed/user4/100/100' },
  { id: 5, name: 'Dedi Kurniawan', role: 'Anggota Karang Taruna', text: 'Harga sablon di sini paling kompetitif untuk kualitas sekelas distro. Sangat worth it untuk seragam organisasi.', rating: 5, avatar: 'https://picsum.photos/seed/user5/100/100' },
  { id: 6, name: 'Maya Sari', role: 'Mahasiswa', text: 'Baru pertama kali nyoba sablon satuan buat kado, hasilnya memuaskan banget. Packingnya juga rapi.', rating: 5, avatar: 'https://picsum.photos/seed/user6/100/100' },
];

export const ORDER_STEPS: OrderStep[] = [
  { number: 1, title: 'Chat Admin', description: 'Konsultasi desain & kebutuhan bajumu gratis via WhatsApp.' },
  { number: 2, title: 'Deal Spesifikasi', description: 'Pilih jenis bahan & sablon sesuai budget. Kami buatkan mockup visualnya!' },
  { number: 3, title: 'Produksi', description: 'Cukup DP 80%, pesanan langsung diproses dengan standar QC tinggi.' },
  { number: 4, title: 'Siap Kirim', description: 'Pelunasan mudah, barang dikirim ke lokasimu dengan aman.' },
  { number: 5, title: 'Garansi', description: 'Ada cacat? Kami ganti baru! Kepuasanmu prioritas nomor satu.' },
];

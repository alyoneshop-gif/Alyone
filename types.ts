
// Fix: Import React to provide the namespace for React.ReactNode
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface SizeInfo {
  size: string;
  width: number;
  length: number;
}

export interface ColorOption {
  name: string;
  hex: string;
  image?: string; // Gambar spesifik untuk warna ini
}

export interface Product {
  id: number;
  name: string;
  image: string; // Gambar utama/default
  price: string;
  category: string;
  availableColors?: ColorOption[];
  sizeChart?: SizeInfo[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface OrderStep {
  number: number;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'DTF' | 'Plastisol Reguler' | 'Plastisol Flock' | 'Plastisol Metallic' | 'Plastisol Reflective' | 'Plastisol Glow';
  image: string;
}

export interface ClientLogo {
  id: number;
  name: string;
  url: string;
}
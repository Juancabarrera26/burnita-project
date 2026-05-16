/**
 * Home Page - Burnita Shop
 * Design: Artesanía Cálida Contemporánea
 * A complete landing page for artisan candle shop
 */

import { useEffect } from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import BurnitaLab from "@/components/BurnitaLab";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Scroll a la sección si hay un hash en la URL
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Esperar a que el DOM esté completamente renderizado
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff6ea' }}>
      <main>
        <Hero />
        <div style={{ backgroundColor: '#fff6ea' }}>
          <Products />
          <BurnitaLab />
          <About />
          <Categories />
          <Contact />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}

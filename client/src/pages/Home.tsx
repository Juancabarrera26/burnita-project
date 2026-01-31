/**
 * Home Page - Burnita Shop
 * Design: Artesanía Cálida Contemporánea
 * A complete landing page for artisan candle shop
 */

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import BurnitaLab from "@/components/BurnitaLab";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Products />
        <BurnitaLab />
        <About />
        <Categories />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

/**
 * Products Component - Burnita Shop
 * Design: Product carousel with colored backgrounds
 * Features: Product cards with hover effects, navigation arrows
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Postre Rosado",
    material: "Natural Soy Wax",
    price: "$28.00",
    bgColor: "bg-pink-200",
    image: "/images/candles_product.webp",
  },
  {
    id: 2,
    name: "Cóctel Amarillo",
    material: "Natural Soy Wax",
    price: "$32.00",
    bgColor: "bg-yellow-100",
    image: "/images/candles_product.webp",
  },
  {
    id: 3,
    name: "Galleta Clásica",
    material: "Natural Soy Wax",
    price: "$26.00",
    bgColor: "bg-amber-100",
    image: "/images/candles_product.webp",
  },
  {
    id: 4,
    name: "Postre Rosado Intenso",
    material: "Natural Soy Wax",
    price: "$30.00",
    bgColor: "bg-pink-300",
    image: "/images/candles_product.webp",
  },
  {
    id: 5,
    name: "Cóctel Dorado",
    material: "Natural Soy Wax",
    price: "$29.00",
    bgColor: "bg-amber-200",
    image: "/images/candles_product.webp",
  },
  {
    id: 6,
    name: "Galleta Especial",
    material: "Natural Soy Wax",
    price: "$27.00",
    bgColor: "bg-orange-100",
    image: "/images/candles_product.webp",
  },
];

export default function Products() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProducts = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleProducts >= products.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - visibleProducts : prev - 1
    );
  };

  return (
    <section id="products" className="py-20 md:py-28 bg-cream">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Colección Especial
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brown-dark">
              Velas Artesanales
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2 mt-6 md:mt-0">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-brown-dark/20 flex items-center justify-center hover:border-brown-dark/40 hover:bg-brown-dark/5 transition-all"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5 text-brown-dark" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-brown-dark/20 flex items-center justify-center hover:border-brown-dark/40 hover:bg-brown-dark/5 transition-all"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5 text-brown-dark" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${currentIndex * (100 / visibleProducts + 2)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group cursor-pointer"
              >
                {/* Product Image */}
                <div
                  className={`relative aspect-square rounded-2xl overflow-hidden mb-4 ${product.bgColor}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-brown-dark mb-1">
                      {product.name}
                    </h3>
                    <p className="font-sans text-sm text-brown-dark/60">
                      {product.material}
                    </p>
                  </div>
                  <p className="font-sans text-lg font-semibold text-gold">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-brown-dark/30 text-brown-dark hover:bg-brown-dark hover:text-cream font-sans font-medium rounded-full px-8 bg-transparent"
          >
            View All Products
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

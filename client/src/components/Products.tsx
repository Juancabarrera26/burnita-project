/**
 * Products Component - BURNITA
 * Brandbook: Fondo blanco/crema, texto Charcoal Night
 * Precios: Guayaba Pop, badges: Mango Fizz
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Postre Rosado",
    material: "Cera de Soya Natural",
    price: "$28.00",
    bgColor: "bg-lavanda/30",
    image: "/images/candles_product.webp",
  },
  {
    id: 2,
    name: "Cóctel Amarillo",
    material: "Cera de Soya Natural",
    price: "$32.00",
    bgColor: "bg-mango/20",
    image: "/images/candles_product.webp",
  },
  {
    id: 3,
    name: "Galleta Clásica",
    material: "Cera de Soya Natural",
    price: "$26.00",
    bgColor: "bg-crema",
    image: "/images/candles_product.webp",
  },
  {
    id: 4,
    name: "Postre Rosado Intenso",
    material: "Cera de Soya Natural",
    price: "$30.00",
    bgColor: "bg-guayaba/15",
    image: "/images/candles_product.webp",
  },
  {
    id: 5,
    name: "Cóctel Dorado",
    material: "Cera de Soya Natural",
    price: "$29.00",
    bgColor: "bg-mango/30",
    image: "/images/candles_product.webp",
  },
  {
    id: 6,
    name: "Galleta Especial",
    material: "Cera de Soya Natural",
    price: "$27.00",
    bgColor: "bg-mint/20",
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
    <section id="products" className="py-20 md:py-28 bg-white" style={{backgroundColor: '#fff6ea'}}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            {/* Badge - Mango Fizz */}
            <span className="inline-block px-3 py-1 bg-mango/20 text-charcoal font-body text-xs font-semibold tracking-widest uppercase rounded-full mb-3">
              Colección Especial
            </span>
            {/* Title - Manrope */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tracking-brand-tight">
              Velas Artesanales
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2 mt-6 md:mt-0">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-charcoal/20 flex items-center justify-center hover:border-guayaba hover:bg-guayaba/5 transition-all"
              aria-label="Productos anteriores"
            >
              <ChevronLeft className="w-5 h-5 text-charcoal" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-charcoal/20 flex items-center justify-center hover:border-guayaba hover:bg-guayaba/5 transition-all"
              aria-label="Siguientes productos"
            >
              <ChevronRight className="w-5 h-5 text-charcoal" />
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
                  {/* NO COMESTIBLE badge */}
                  <span className="absolute top-3 right-3 px-2 py-1 bg-charcoal text-crema font-body text-[10px] font-semibold uppercase tracking-wider rounded">
                    No Comestible
                  </span>
                </div>

                {/* Product Info */}
                <div className="flex items-start justify-between">
                  <div>
                    {/* Product Name - Manrope */}
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-1">
                      {product.name}
                    </h3>
                    {/* Material - Inter */}
                    <p className="font-body text-sm text-charcoal/60">
                      {product.material}
                    </p>
                  </div>
                  {/* Price - Guayaba Pop */}
                  <p className="font-body text-lg font-semibold text-guayaba">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Button - Outline style */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-crema font-body font-medium rounded-full px-8 bg-transparent"
          >
            Ver Todos los Productos
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

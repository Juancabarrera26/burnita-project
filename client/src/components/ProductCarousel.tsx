/**
 * ProductCarousel - Carrusel horizontal de productos
 * MOBILE: Interfaz separada - 1 foto a la vez, puntos del 1 al 10
 * DESKTOP: Interfaz separada - 4 fotos a la vez, puntos del 1 al 4
 */

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  bgColor: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ==================== MOBILE INTERFACE ====================
  if (isMobile) {
    const handlePrevMobile = () => {
      setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    };

    const handleNextMobile = () => {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    };

    return (
      <div className="relative w-full">
        {/* Contenedor del carrusel - 1 foto a la vez */}
        <div className="overflow-hidden bg-white">
          <motion.div
            className="flex"
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              width: `${products.length * 100}%`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full"
              >
                <motion.div
                  className="group px-4"
                >
                  <div
                    className={`${product.bgColor} rounded-2xl p-6 mb-4 overflow-hidden relative h-64 flex items-center justify-center`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-charcoal">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-display text-xl font-bold text-guayaba">
                        {product.price.toLocaleString("es-CO")} COP
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Botones de navegación - Mobile */}
        <button
          onClick={handlePrevMobile}
          className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-8 z-10 p-2 rounded-full bg-guayaba hover:bg-guayaba/80 text-white transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextMobile}
          className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-8 z-10 p-2 rounded-full bg-guayaba hover:bg-guayaba/80 text-white transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicadores - Mobile: del 1 al 10 (todas las fotos) */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {Array.from({ length: products.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-guayaba w-8" : "bg-guayaba/30 w-2"
              }`}
              aria-label={`Ir a foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ==================== DESKTOP INTERFACE ====================
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);
  const maxIndicators = Math.min(4, maxIndex + 1);

  const handlePrevDesktop = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndicators - 1 : prev - 1));
  };

  const handleNextDesktop = () => {
    setCurrentIndex((prev) => (prev === maxIndicators - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Contenedor del carrusel - 4 fotos a la vez */}
      <div className="overflow-hidden bg-white">
        <motion.div
          className="flex gap-6 md:gap-8"
          animate={{ x: -currentIndex * (100 / itemsPerView) + "%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            width: `${(products.length / itemsPerView) * 100}%`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: `${100 / products.length}%` }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div
                  className={`${product.bgColor} rounded-2xl p-6 mb-4 overflow-hidden relative h-64 flex items-center justify-center`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-charcoal">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-display text-xl font-bold text-guayaba">
                      {product.price.toLocaleString("es-CO")} COP
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Botones de navegación - Desktop */}
      {products.length > itemsPerView && (
        <>
          <button
            onClick={handlePrevDesktop}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-10 p-2 rounded-full bg-guayaba hover:bg-guayaba/80 text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextDesktop}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-12 md:translate-x-16 z-10 p-2 rounded-full bg-guayaba hover:bg-guayaba/80 text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicadores - Desktop: del 1 al 4 */}
      {products.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndicators }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-guayaba w-8" : "bg-guayaba/30 w-2"
              }`}
              aria-label={`Ir a posición ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

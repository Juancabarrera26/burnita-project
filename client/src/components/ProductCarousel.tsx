/**
 * ProductCarousel - Carrusel horizontal de productos
 * Desktop: Muestra 4 productos, puntos del 1 al 4
 * Mobile: Muestra 1 producto, puntos del 1 al 10 (todas las fotos)
 * Navegación con botones izquierda/derecha
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

  // Configuración responsive
  const getItemsPerView = () => {
    if (typeof window === "undefined") return 4;
    const width = window.innerWidth;
    if (width < 768) return 1; // mobile
    if (width < 1024) return 2; // tablet
    return 4; // desktop
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Actualizar itemsPerView en resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      setIsMobile(newItemsPerView === 1);
    };
    
    // Inicializar isMobile
    setIsMobile(itemsPerView === 1);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, products.length - itemsPerView);
  
  // Lógica de indicadores diferente según dispositivo
  let maxIndicators: number;
  if (isMobile) {
    // Mobile: mostrar todos los productos (del 1 al 10)
    maxIndicators = products.length;
  } else {
    // Desktop/Tablet: mostrar solo 4 puntos
    maxIndicators = Math.min(4, maxIndex + 1);
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndicators - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndicators - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Contenedor del carrusel */}
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

      {/* Botones de navegación */}
      {products.length > itemsPerView && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-10 p-2 rounded-full bg-guayaba hover:bg-guayaba/80 text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-12 md:translate-x-16 z-10 p-2 rounded-full bg-guayaba hover:bg-guayaba/80 text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicadores de posición: responsivo */}
      {products.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
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

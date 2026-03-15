/**
 * Products Component - BURNITA
 * Brandbook: Fondo blanco/crema, texto Charcoal Night
 * Precios: Guayaba Pop, badges: Mango Fizz
 * Tipografía: Manrope para títulos, Inter para texto
 * 
 * Carrusel corregido:
 * - Sin scrollbars visibles
 * - Autoplay basado ÚNICAMENTE en scroll real del contenedor
 * - Sin lógica de índices
 * - Reinicio suave al final
 * - Reanudación rápida (3 segundos)
 */

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Mapeo de imágenes reales del carrusel de productos
const products = [
  {
    id: 1,
    name: "Nube de Fresa",
    material: "Cera de Soya Natural",
    price: "$28.00",
    bgColor: "bg-lavanda/30",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/eLfUhTdnLWLCwiNF.webp",
  },
  {
    id: 2,
    name: "Sandía Sunset",
    material: "Cera de Soya Natural",
    price: "$32.00",
    bgColor: "bg-mango/20",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/rMmHBSviZqJUEakl.webp",
  },
  {
    id: 3,
    name: "Miel Dorada",
    material: "Cera de Soya Natural",
    price: "$26.00",
    bgColor: "bg-crema",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/jKdkhnkfHJcSkDfU.webp",
  },
  {
    id: 4,
    name: "Mojito Verde",
    material: "Cera de Soya Natural",
    price: "$30.00",
    bgColor: "bg-guayaba/15",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/CZamKEhNVDpNpvdU.webp",
  },
  {
    id: 5,
    name: "Frutos del Bosque",
    material: "Cera de Soya Natural",
    price: "$29.00",
    bgColor: "bg-mango/30",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/lsfgucvuDBbOBRtl.webp",
  },
  {
    id: 6,
    name: "Atardecer Tropical",
    material: "Cera de Soya Natural",
    price: "$27.00",
    bgColor: "bg-mint/20",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/KtCXNCkEisgWrviL.webp",
  },
  {
    id: 7,
    name: "Océano Nocturno",
    material: "Cera de Soya Natural",
    price: "$31.00",
    bgColor: "bg-mint/30",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/cAdqkYKtZbuNJjwA.webp",
  },
  {
    id: 8,
    name: "Eclipse Dorado",
    material: "Cera de Soya Natural",
    price: "$33.00",
    bgColor: "bg-guayaba/20",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/IPeSKSvvXNaAfAxq.webp",
  },
];

export default function Products() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(3); // Default desktop
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  // Detectar cantidad de productos visibles según breakpoint
  useEffect(() => {
    const updateVisibleProducts = () => {
      if (window.innerWidth < 640) {
        setVisibleProducts(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(2); // Tablet
      } else {
        setVisibleProducts(3); // Desktop
      }
    };

    updateVisibleProducts();
    window.addEventListener('resize', updateVisibleProducts);
    return () => window.removeEventListener('resize', updateVisibleProducts);
  }, []);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current || isScrollingRef.current) return;

    const carousel = carouselRef.current;
    const cardElement = carousel.querySelector('[data-product-card]');
    if (!cardElement) return;

    const cardWidth = cardElement.getBoundingClientRect().width;
    const gap = 24; // gap-6 = 24px
    // Usar 1 producto para navegación manual (más granular)
    const scrollAmount = cardWidth + gap;

    isScrollingRef.current = true;
    lastScrollTimeRef.current = Date.now();

    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    // Permitir siguiente scroll después de que termine la animación
    setTimeout(() => {
      isScrollingRef.current = false;
      checkScroll();
    }, 600);
  };

  const pauseAutoplay = () => {
    setIsAutoplayActive(false);
    lastScrollTimeRef.current = Date.now();
    
    // Limpiar timeout anterior si existe
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // Reanudar autoplay después de 3 segundos sin interacción
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoplayActive(true);
    }, 3000);
  };

  // Autoplay effect - Basado ÚNICAMENTE en scroll real del contenedor
  useEffect(() => {
    if (!isAutoplayActive || !carouselRef.current) return;

    const carousel = carouselRef.current;

    autoplayIntervalRef.current = setInterval(() => {
      // No hacer nada si el carrusel está en medio de un scroll
      if (!carousel || isScrollingRef.current) return;

      const cardElement = carousel.querySelector('[data-product-card]');
      if (!cardElement) return;

      // Obtener medidas reales del contenedor
      const cardWidth = cardElement.getBoundingClientRect().width;
      const gap = 24; // gap-6 = 24px
      const singleCardScroll = cardWidth + gap;
      const scrollAmount = singleCardScroll * visibleProducts;

      // Obtener posición actual del scroll
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      const maxScroll = scrollWidth - clientWidth;

      // Marcar como scrolling para evitar conflictos
      isScrollingRef.current = true;

      // Verificar si estamos cerca del final
      // Si scrollLeft + scrollAmount >= maxScroll, reiniciar
      if (scrollLeft + scrollAmount >= maxScroll - 10) {
        // Reiniciar al inicio de forma suave
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Desplazar según cantidad de productos visibles
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }

      // Esperar a que termine la animación antes de permitir el siguiente scroll
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    }, 2500); // Velocidad: 2.5 segundos

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isAutoplayActive, visibleProducts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

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
              onClick={() => {
                pauseAutoplay();
                scroll('left');
              }}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border-2 border-charcoal/20 flex items-center justify-center hover:border-guayaba hover:bg-guayaba/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Productos anteriores"
            >
              <ChevronLeft className="w-5 h-5 text-charcoal" />
            </button>
            <button
              onClick={() => {
                pauseAutoplay();
                scroll('right');
              }}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border-2 border-charcoal/20 flex items-center justify-center hover:border-guayaba hover:bg-guayaba/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Siguientes productos"
            >
              <ChevronRight className="w-5 h-5 text-charcoal" />
            </button>
          </div>
        </div>

        {/* Products Carousel - Scroll Snap sin scrollbars */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
          }}
          onScroll={checkScroll}
          onMouseEnter={pauseAutoplay}
          onTouchStart={pauseAutoplay}
        >
          {/* Ocultar scrollbar en Chrome/Safari */}
          <style>{`
            [data-carousel]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              data-product-card
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 group cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              style={{
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always',
              }}
            >
              {/* Product Image */}
              <div
                className={`relative aspect-square rounded-2xl overflow-hidden mb-4 ${product.bgColor}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
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

/**
 * ProductCarousel - Carrusel horizontal de productos
 * Basado en el carrusel del Home (Products.tsx)
 * - Scroll suave con botones izq/der
 * - Loop visual infinito con clones
 * - Autoplay responsivo
 * - SIN deslizador
 */

import { useRef, useState, useEffect } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(3); // Default desktop
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const isResettingRef = useRef(false);

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
    window.addEventListener("resize", updateVisibleProducts);
    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, []);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current || isScrollingRef.current) return;

    const carousel = carouselRef.current;
    const cardElement = carousel.querySelector("[data-product-card]");
    if (!cardElement) return;

    const cardWidth = cardElement.getBoundingClientRect().width;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;

    isScrollingRef.current = true;
    lastScrollTimeRef.current = Date.now();

    if (direction === "left") {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
      checkScroll();
    }, 600);
  };

  const pauseAutoplay = () => {
    setIsAutoplayActive(false);
    lastScrollTimeRef.current = Date.now();

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoplayActive(true);
    }, 3000);
  };

  // Autoplay effect - Con loop visual infinito
  useEffect(() => {
    if (!isAutoplayActive || !carouselRef.current) return;

    const carousel = carouselRef.current;

    autoplayIntervalRef.current = setInterval(() => {
      if (!carousel || isScrollingRef.current || isResettingRef.current) return;

      const cardElement = carousel.querySelector("[data-product-card]");
      if (!cardElement) return;

      const cardWidth = cardElement.getBoundingClientRect().width;
      const gap = 24;
      const singleCardScroll = cardWidth + gap;

      const scrollAmount = singleCardScroll * visibleProducts;

      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      const maxScroll = scrollWidth - clientWidth;

      isScrollingRef.current = true;

      const originalProductsWidth = singleCardScroll * products.length;
      const cloneStartPosition = originalProductsWidth;

      if (scrollLeft + scrollAmount >= cloneStartPosition - 10) {
        isResettingRef.current = true;
        carousel.scrollTo({ left: 0, behavior: "auto" });

        setTimeout(() => {
          isResettingRef.current = false;
          isScrollingRef.current = false;
        }, 50);
      } else {
        const newScrollLeft = scrollLeft + scrollAmount;
        carousel.scrollTo({ left: newScrollLeft, behavior: "smooth" });

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      }
    }, 2500);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isAutoplayActive, visibleProducts, carouselRef, products.length]);

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

  // Crear array de productos con clones al final
  const displayProducts = [
    ...products,
    ...products.slice(0, 3),
  ];

  return (
    <div className="relative w-full">
      {/* Botones de navegación */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            pauseAutoplay();
            scroll("left");
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
            scroll("right");
          }}
          disabled={!canScrollRight}
          className="w-12 h-12 rounded-full border-2 border-charcoal/20 flex items-center justify-center hover:border-guayaba hover:bg-guayaba/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Siguientes productos"
        >
          <ChevronRight className="w-5 h-5 text-charcoal" />
        </button>
      </div>

      {/* Carrusel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth bg-white"
        style={{
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflowY: "hidden",
        }}
        onScroll={checkScroll}
        onMouseEnter={pauseAutoplay}
        onTouchStart={pauseAutoplay}
      >
        <style>{`
          [data-carousel]::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {displayProducts.map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            data-product-card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % products.length) * 0.1 }}
            className="flex-shrink-0 group cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            style={{
              scrollSnapAlign: "center",
              scrollSnapStop: "always",
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
            </div>

            {/* Product Info */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-1">
                  {product.name}
                </h3>
              </div>
              <p className="font-body text-lg font-semibold text-guayaba">
                {typeof product.price === "number"
                  ? product.price.toLocaleString("es-CO") + " COP"
                  : product.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

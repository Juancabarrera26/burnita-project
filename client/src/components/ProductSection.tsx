import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  bgColor: string;
}

interface ProductSectionProps {
  title: string;
  description: string;
  products: Product[];
}

export default function ProductSection({
  title,
  description,
  products,
}: ProductSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Mostrar 4 productos inicialmente (2 filas de 2 en mobile, 2 en tablet, 1 fila de 4 en desktop)
  const initialCount = 4;
  const visibleProducts = showAll ? products : products.slice(0, initialCount);
  const hasMore = products.length > initialCount;

  const handleScroll = () => {
    if (showAll) {
      const element = document.getElementById(`section-${title}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setTimeout(handleScroll, 100);
    }
  };

  return (
    <section id={`section-${title}`} className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Título y descripción */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${product.bgColor}`}
            >
              {/* Imagen */}
              <div className="w-full h-48 md:h-56 lg:h-64 flex items-center justify-center mb-4 overflow-hidden rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nombre y precio */}
              <h3 className="text-center font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {product.name}
              </h3>
              <p className="text-center text-pink-600 font-bold text-lg md:text-xl">
                {(product.price / 1000).toLocaleString("es-CO")} COP
              </p>
            </div>
          ))}
        </div>

        {/* Botón Ver más / Ver menos */}
        {hasMore && (
          <div className="flex justify-center">
            <Button
              onClick={toggleShowAll}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 text-base md:text-lg border-2 border-pink-600 text-pink-600 hover:bg-pink-50"
            >
              {showAll ? (
                <>
                  Ver menos
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  Ver más
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

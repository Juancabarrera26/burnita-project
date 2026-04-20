/**
 * Categories Component - BURNITA
 * Brandbook: Fondo Lavanda Nube (módulos secundarios)
 * Cards con borde Charcoal, badge Guayaba Pop
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { motion } from "framer-motion";
import { useLocation } from "wouter";

const firstRowCategories = [
  {
    id: 1,
    name: "CÓCTELES",
    image: "/manus-storage/BurnitaShNov25(45)(1)_a23c552f.webp",
    rotation: -5,
    link: "/shop#cocteles",
  },
  {
    id: 2,
    name: "POSTRES",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/postres_2d9b2cab.jpeg",
    rotation: -2,
    link: "/shop#postres",
  },
  {
    id: 4,
    name: "TEMPORADA",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/temporada_aedf55be.jpeg",
    rotation: 5,
    link: "/shop#temporada",
  },
];

const secondRowCategories = [
  {
    id: 3,
    name: "RECORDATORIOS",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/recordatorios_282e5b3c.jpeg",
    rotation: 2,
    link: "/solicitud/recordatorios",
  },
  {
    id: 5,
    name: "EMPRESARIAL",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/empresarial_f2ba8815.jpeg",
    rotation: -3,
    link: "/solicitud/empresarial",
  },
];

interface Category {
  id: number;
  name: string;
  image: string;
  rotation: number;
  link: string | null;
}

interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: () => void;
}

const CategoryCard = ({ category, index, onClick }: CategoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: category.rotation }}
    whileInView={{ opacity: 1, y: 0, rotate: category.rotation }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ 
      y: -10, 
      rotate: 0,
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    className={`group ${category.link ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className="w-44 sm:w-48 md:w-52 lg:w-56 bg-white rounded-xl border-2 border-charcoal shadow-lg overflow-hidden">
      {/* Card Header */}
      <div className="px-3 py-2 border-b border-charcoal/20">
        <p className="font-body text-xs font-semibold text-charcoal/60 uppercase tracking-wider">
          {category.name}
        </p>
      </div>

      {/* Card Image */}
      <div className="aspect-[3/4] bg-gradient-to-b from-lavanda/20 to-mint/10 p-3">
        <div className="w-full h-full rounded-lg overflow-hidden bg-crema/50">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-3 py-3 bg-gradient-to-r from-lavanda/20 to-mint/10 border-t border-charcoal/20">
        <p className="font-display text-base md:text-lg font-semibold text-charcoal text-center">
          {category.name}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function Categories() {
  const [, navigate] = useLocation();

  const handleCardClick = (link: string | null) => {
    if (link) {
      if (link.startsWith('#')) {
        // Scroll to section on current page
        const sectionId = link.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to different page
        navigate(link);
      }
    }
  };

  return (
    <section id="colecciones" className="py-20 md:py-28 bg-lavanda/20 relative overflow-hidden" style={{backgroundColor: '#fff6ea'}}>
      <div className="container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] tracking-brand-tight">
            Colecciones
          </h2>
        </motion.div>

        {/* Cards Container */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop: First Row - Flex centered like second row */}
          <div className="hidden md:flex justify-center gap-6 lg:gap-8 mb-12">
            {firstRowCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                onClick={() => handleCardClick(category.link)}
              />
            ))}
          </div>

          {/* Desktop: Second Row - Centered flex container */}
          <div className="hidden md:flex justify-center gap-6 lg:gap-8">
            {secondRowCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index + firstRowCategories.length}
                onClick={() => handleCardClick(category.link)}
              />
            ))}
          </div>

          {/* Tablet: 2 columns grid */}
          <div className="hidden sm:grid md:hidden grid-cols-2 gap-4 lg:gap-6 justify-items-center">
            {[...firstRowCategories, ...secondRowCategories].map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                onClick={() => handleCardClick(category.link)}
              />
            ))}
          </div>

          {/* Mobile: 1 column */}
          <div className="grid sm:hidden grid-cols-1 gap-4 justify-items-center">
            {[...firstRowCategories, ...secondRowCategories].map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                onClick={() => handleCardClick(category.link)}
              />
            ))}
          </div>
        </div>

        {/* Decorative Badge - Guayaba Pop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-8 right-8 hidden lg:block"
        >
          <div className="w-32 h-32 rounded-full bg-guayaba flex items-center justify-center shadow-xl" style={{backgroundColor: '#2adcdf', borderRadius: '0px', width: '0px', height: '0px', opacity: '0'}}>
            <div className="text-center text-white">
              <p className="font-display text-xs font-bold uppercase tracking-wider leading-tight">
                Enciende<br />Diversión<br />Siempre
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

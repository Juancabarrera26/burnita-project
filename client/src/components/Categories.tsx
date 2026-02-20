/**
 * Categories Component - BURNITA
 * Brandbook: Fondo Lavanda Nube (módulos secundarios)
 * Cards con borde Charcoal, badge Guayaba Pop
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "CÓCTELES",
    image: "/images/cocktail_candle.jpg",
    rotation: -5,
  },
  {
    id: 2,
    name: "POSTRES",
    image: "/images/donut_candles.jpg",
    rotation: -2,
  },
  {
    id: 3,
    name: "RECORDATORIOS",
    image: "/images/food_candles.jpg",
    rotation: 2,
  },
  {
    id: 4,
    name: "TEMPORADA",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/kBiCBCJmtWoUPVTB.jpg",
    rotation: 5,
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 md:py-28 bg-lavanda/20 relative overflow-hidden" style={{backgroundColor: '#c7aad5'}}>
      <div className="container">
        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
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
              className="group cursor-pointer"
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
          ))}
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

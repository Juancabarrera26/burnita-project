/**
 * BurnitaLab Component - BURNITA
 * Brandbook: Fondo Lavanda Nube (módulos secundarios)
 * CTA: Guayaba Pop, badges: Mango Fizz
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const colorTags = [
  { name: "Rosado Claro", color: "bg-guayaba/30" },
  { name: "Amarillo Claro", color: "bg-mango/40" },
  { name: "Color Galleta", color: "bg-crema" },
];

export default function BurnitaLab() {
  return (
    <section className="py-20 md:py-28 bg-lavanda/30 relative overflow-hidden" style={{backgroundColor: '#c7aad5'}}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge - Mango Fizz */}
            <span className="inline-block px-3 py-1 bg-mango/30 text-charcoal font-body text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
              Nuevos Experimentos
            </span>
            
            {/* Title - Manrope */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] tracking-brand-tight mb-6">
              BURNITA<br />Lab.
            </h2>
            
            {/* Description - Inter */}
            <p className="font-body text-base md:text-lg text-charcoal/70 mb-8 max-w-md leading-relaxed">
              Donde la creatividad se encuentra con la química. Descubre nuestros
              aromas experimentales, colores audaces y lotes limitados que
              desafían los límites de la fabricación tradicional de velas.
            </p>

            {/* Color Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {colorTags.map((tag) => (
                <span
                  key={tag.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal/20 bg-white/50 font-body text-sm text-charcoal"
                >
                  <span className={`w-3 h-3 rounded-full ${tag.color}`} />
                  {tag.name}
                </span>
              ))}
            </div>

            {/* CTA - Guayaba Pop */}
            <Button
              size="lg"
              className="bg-guayaba hover:bg-guayaba/90 text-white font-body font-medium rounded-full px-8"
            >
              Explorar el Lab
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          {/* Image with Badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/burnita_lab_colorful.webp"
                alt="BURNITA Lab - Experimentos coloridos"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Decorative Badge - Mint Soda */}
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-mint border-4 border-dashed border-charcoal/20 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <p className="font-display text-lg md:text-xl font-bold text-charcoal">100%</p>
                  <p className="font-body text-xs md:text-sm text-charcoal/80 leading-tight">
                    Diversión<br />Garantizada
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

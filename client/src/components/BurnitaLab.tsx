/**
 * BurnitaLab Component - Burnita Shop
 * Design: Pink background with colorful imagery
 * Features: Color tags, decorative badge, experimental vibe
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const colorTags = [
  { name: "Rosado Claro", color: "bg-pink-200" },
  { name: "Amarillo Claro", color: "bg-yellow-200" },
  { name: "Color Galleta", color: "bg-amber-200" },
];

export default function BurnitaLab() {
  return (
    <section className="py-20 md:py-28 bg-pink-soft relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Nuevos Experimentos
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brown-dark leading-[1.1] mb-6">
              Burnita<br />Lab.
            </h2>
            <p className="font-sans text-base md:text-lg text-brown-dark/70 mb-8 max-w-md leading-relaxed">
              Donde la creatividad se encuentra con la química. Descubre nuestros
              aromas experimentales, colores audaces y lotes limitados que
              desafían los límites de la fabricación tradicional de velas.
            </p>

            {/* Color Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {colorTags.map((tag) => (
                <span
                  key={tag.name}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brown-dark/20 font-sans text-sm text-brown-dark`}
                >
                  <span className={`w-3 h-3 rounded-full ${tag.color}`} />
                  {tag.name}
                </span>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-white font-sans font-medium rounded-full px-8"
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
                alt="Burnita Lab - Experimentos coloridos"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Decorative Badge */}
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-cream border-4 border-dashed border-gold/40 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <p className="font-serif text-lg md:text-xl text-gold italic">100%</p>
                  <p className="font-serif text-sm md:text-base text-brown-dark italic leading-tight">
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

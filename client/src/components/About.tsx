/**
 * About Component - BURNITA
 * Brandbook: Fondo Crema Vitrina, texto Charcoal Night
 * Acentos: Guayaba Pop, Mango Fizz
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "Diversión Garantizada" },
  { value: "3", label: "Pasos para Personalizar" },
  { value: "Hand", label: "Poured in Bogotá" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-crema">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Circular frame */}
              <div className="aspect-square rounded-full overflow-hidden border-8 border-white/50 shadow-2xl">
                <img
                  src="/images/artisan_hands.webp"
                  alt="Artesano creando velas a mano"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring - Guayaba Pop */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-guayaba/40 scale-110" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            {/* Badge - Mango Fizz */}
            <span className="inline-block px-3 py-1 bg-mango/30 text-charcoal font-body text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
              Desde 2023
            </span>
            
            {/* Title - Manrope */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] tracking-brand-tight mb-6">
              ¿Postre o vela?<br />
              <span className="text-guayaba">Sí.</span>
            </h2>

            {/* Description - Inter */}
            <div className="space-y-4 mb-8">
              <p className="font-body text-base md:text-lg text-charcoal/70 leading-relaxed">
                No hacemos velas para que pasen desapercibidas. Las hacemos para
                despertar sonrisas. Para convertir un "gracias" en wow, un detalle
                en recuerdo, un evento en foto obligada.
              </p>
              <p className="font-body text-base md:text-lg text-charcoal/70 leading-relaxed">
                Somos color, textura y juego. Somos artesanía con guiño foodie,
                hiperrealismo que no se come pero se antoja. Creemos en la
                personalización simple, en la entrega a tiempo y en empaques que
                dicen "abréme ya".
              </p>
              <p className="font-body text-base md:text-lg text-charcoal/70 leading-relaxed">
                Encendemos momentos que se quedan: en la mesa, en la memoria y en
                el carrete.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-charcoal/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  {/* Stat Value - Guayaba Pop */}
                  <p className="font-display text-2xl md:text-3xl font-bold text-guayaba mb-1">
                    {stat.value}
                  </p>
                  {/* Stat Label - Inter */}
                  <p className="font-body text-xs md:text-sm text-charcoal/60 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA - Outline */}
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-crema font-body font-medium rounded-full px-8 bg-transparent"
            >
              Conoce nuestra historia
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

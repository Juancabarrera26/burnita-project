/**
 * About Component - Burnita Shop
 * Design: Beige background with circular image and stats
 * Features: Brand story, key metrics, artisan imagery
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "Fun Guaranteed" },
  { value: "3", label: "Pasos para Personalizar" },
  { value: "Hand", label: "Poured in Bogotá" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-beige">
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
              <div className="aspect-square rounded-full overflow-hidden border-8 border-cream/50 shadow-2xl">
                <img
                  src="/images/artisan_hands.webp"
                  alt="Artesano creando velas a mano"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30 scale-110" />
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
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Desde 2023
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brown-dark leading-[1.1] mb-6">
              ¿Postre o vela?<br />
              <span className="italic">Sí.</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-sans text-base md:text-lg text-brown-dark/70 leading-relaxed">
                No hacemos velas para que pasen desapercibidas. Las hacemos para
                despertar sonrisas. Para convertir un "gracias" en wow, un detalle
                en recuerdo, un evento en foto obligada.
              </p>
              <p className="font-sans text-base md:text-lg text-brown-dark/70 leading-relaxed">
                Somos color, textura y juego. Somos artesanía con guiño foodie,
                hiperrealismo que no se come pero se antoja. Creemos en la
                personalización simple, en la entrega a tiempo y en empaques que
                dicen "abréme ya".
              </p>
              <p className="font-sans text-base md:text-lg text-brown-dark/70 leading-relaxed">
                Encendemos momentos que se quedan: en la mesa, en la memoria y en
                el carrete.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-brown-dark/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="font-serif text-2xl md:text-3xl text-gold mb-1">
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs md:text-sm text-brown-dark/60 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-brown-dark/30 text-brown-dark hover:bg-brown-dark hover:text-cream font-sans font-medium rounded-full px-8 bg-transparent"
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

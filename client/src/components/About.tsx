/**
 * About Component - BURNITA
 * Brandbook: Fondo Crema Vitrina, texto Charcoal Night
 * Acentos: Guayaba Pop, Mango Fizz
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "Hiperrealismo Artesanal" },
  { value: "Hechas", label: "a tu manera" },
  { value: "Encendidas", label: "para recordar" },
];

export default function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-crema">
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
                  src="/manus-storage/burnita-icon_2a02c0e1.png"
                  alt="Persona disfrutando de cóctel con vela Burnita"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 60%" }}
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
              Desde 2025
            </span>
            
            {/* Title - Manrope */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] tracking-brand-tight mb-6">
              Nuestra historia
            </h2>

            {/* Description - Inter */}
            <div className="space-y-4 mb-8">
              <p className="font-body text-base md:text-lg text-charcoal/70 leading-relaxed">
                Todo comenzó en 2025 con una idea simple: crear velas que sorprendieran de verdad.

Inspiradas en postres, cócteles y pequeños momentos especiales, empezamos a diseñar piezas hiperrealistas que juegan con la percepción y transforman cualquier ocasión en algo memorable.
              </p>
              <p className="font-body text-base md:text-lg text-charcoal/70 leading-relaxed">
                Cada vela nace desde la artesanía, el detalle y la creatividad, mezclando color, textura y un guiño foodie imposible de ignorar. Lo que parece un postre o una bebida favorita, en realidad es una pieza hecha para decorar, regalar y dejar huella.
              </p>
              <p className="font-body text-base md:text-lg text-charcoal/70 leading-relaxed">
                Con el tiempo, nuestra colección creció entre velas de temporada, diseños especiales y experiencias de personalización para recordatorios y detalles corporativos, pensadas para hacer que cada celebración, evento o marca se recuerde de una forma única.
              </p>
              <p className="font-body text-base md:text-lg text-charcoal/70 leading-relaxed">
                Más que velas, son momentos que se quedan.
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


          </motion.div>
        </div>
      </div>
    </section>
  );
}

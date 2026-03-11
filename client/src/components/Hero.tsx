/**
 * Hero Component - BURNITA
 * Brandbook: Video 4K como fondo sin overlay oscuro
 * El video es protagonista con color original intacto
 * Tipografía: Manrope para títulos, Inter para texto
 * Colores: Mango Fizz badge, Crema Vitrina texto, Guayaba Pop + Mint Soda CTAs
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background 4K - Sin overlay oscuro */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/yZqplQzWRIJNIWak.mp4" type="video/mp4" />
      </video>

      {/* Content - Con z-index para estar encima del video */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge - Mango Fizz highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="px-4 py-1.5 bg-mango text-charcoal font-body text-xs font-semibold tracking-widest uppercase rounded-full">
              Hiperrealismo Lúdico
            </span>
          </motion.div>

          {/* Main Title - Manrope 800, Crema Vitrina con text-shadow sutil */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-crema leading-[1.05] tracking-brand mb-8"
            style={{
              textShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
              color: '#110d09',
            }}
          >
            Enciende la{" "}
            <span className="block">Diversión.</span>
          </motion.h1>

          {/* Description - Inter 400, Crema Vitrina 90% con text-shadow sutil */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{
              color: '#110d09',
              textShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Velas lúdicas que encienden conversación. Objetos-conversación que
            elevan cumpleaños, mesas y eventos con color, textura y humor.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA - Guayaba Pop */}
            <Button
              size="lg"
              className="bg-guayaba text-crema hover:bg-guayaba/90 font-body font-medium rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
            >
              Ver Colección
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            {/* Secondary CTA - Mint Soda */}
            <Button
              size="lg"
              className="bg-mint text-charcoal hover:bg-mint/90 font-body font-medium rounded-full px-8 py-6 text-base"
            >
              Personaliza la tuya
            </Button>
          </motion.div>
        </div>
      </div>


    </section>
  );
}

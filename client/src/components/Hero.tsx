/**
 * Hero Component - Burnita Shop
 * Design: Full-screen hero with warm salmon background
 * Features: Animated text, CTA buttons, decorative elements
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-salmon overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-salmon/50" />

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-brown-dark/70 mb-6"
          >
            Hiperrealismo Lúdico
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown-dark leading-[0.95] mb-8"
          >
            Enciende la{" "}
            <span className="block">Diversión.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base md:text-lg text-brown-dark/80 max-w-xl mx-auto mb-10 leading-relaxed"
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
            <Button
              size="lg"
              className="bg-cream text-brown-dark hover:bg-white font-sans font-medium rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
            >
              Ver Colección
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-brown-dark/30 text-brown-dark hover:bg-brown-dark/10 font-sans font-medium rounded-full px-8 py-6 text-base bg-transparent"
            >
              Personaliza la tuya
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-brown-dark/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-brown-dark/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

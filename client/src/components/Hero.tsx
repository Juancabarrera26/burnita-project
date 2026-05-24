/**
 * Hero Component - BURNITA
 * Brandbook: Video 4K como fondo sin overlay oscuro
 * El video es protagonista con color original intacto
 * Tipografía: Manrope para títulos, Inter para texto
 * Colores: Crema Vitrina texto, Guayaba Pop + Mint Soda CTAs
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Hero() {
  const [, navigate] = useLocation();

  const handleScrollToCollections = () => {
    const collectionsSection = document.getElementById('colecciones');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToBurnitaLab = () => {
    const burnitaLabSection = document.getElementById('burnita-lab');
    if (burnitaLabSection) {
      burnitaLabSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background 4K - Sin overlay oscuro */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/manus-storage/burnita-hero_8e8bc8a7.mp4" type="video/mp4" />
      </video>

      {/* Content - Con z-index para estar encima del video */}
      <div className="container relative z-10 pt-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Title - Tipografía responsive, tamaño medio equilibrado */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-crema leading-tight tracking-brand"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              textShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
              color: '#110d09',
            }}
          >
            Más que una vela
          </motion.h1>

          {/* Subtitle - Más pequeño que el título, legible y elegante */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-semibold text-crema leading-tight mt-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              textShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
              color: '#110d09',
            }}
          >
            Una experiencia
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            {/* Primary CTA - Guayaba Pop */}
            <Button
              onClick={handleScrollToCollections}
              size="lg"
              className="bg-guayaba text-crema hover:bg-guayaba/90 font-body font-medium rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Ver Colección
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            {/* Secondary CTA - Mint Soda */}
            <Button
              onClick={handleScrollToBurnitaLab}
              size="lg"
              className="bg-mint text-charcoal hover:bg-mint/90 font-body font-medium rounded-full px-8 py-6 text-base cursor-pointer"
            >
              Personaliza la tuya
            </Button>
          </motion.div>
        </div>
      </div>


    </section>
  );
}

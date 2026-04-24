/**
 * CustomizationCTA Component - BURNITA
 * Sección final: "¿No encontraste lo que buscas?"
 * CTA para contactar por WhatsApp
 */

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CustomizationCTA() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "573013493062";
    const message = encodeURIComponent(
      "Hola, quiero crear una vela personalizada. ¿Me puedes ayudar?"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-20 md:py-28 bg-crema">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Title - Manrope */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-brand-tight mb-4">
            ¿No encontraste lo que buscas?
          </h2>

          {/* Description - Inter */}
          <p className="font-body text-base md:text-lg text-charcoal/70 mb-10 max-w-lg mx-auto">
            Creamos velas personalizadas para ti, según tu idea. Cuéntanos qué tienes en mente y haremos realidad tu vela perfecta.
          </p>

          {/* CTA Button - WhatsApp */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-guayaba text-white hover:bg-guayaba/90 font-body font-medium rounded-full px-10 py-3 shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </Button>
          </motion.div>

          {/* Subtext - Inter */}
          <p className="font-body text-sm text-charcoal/50 mt-6">
            Responderemos en menos de 2 horas
          </p>
        </motion.div>
      </div>
    </section>
  );
}

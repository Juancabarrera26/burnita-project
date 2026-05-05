/**
 * ShopContactCTA Component - BURNITA
 * Sección final de Shop: "¿No encontraste lo que buscas?"
 * Con botones de WhatsApp y Llamar
 */

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ShopContactCTA() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "3214175699";
    const message = encodeURIComponent(
      "Hola, quiero crear una vela personalizada. ¿Me puedes ayudar?"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:+573214175699";
  };

  return (
    <section className="py-16 md:py-24 bg-crema">
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

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* WhatsApp Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-guayaba text-white hover:bg-guayaba/90 font-body font-medium rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Escribir por WhatsApp
              </Button>
            </motion.div>

            {/* Call Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleCallClick}
                size="lg"
                className="bg-charcoal text-white hover:bg-charcoal/90 font-body font-medium rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Llamar ahora
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Contact Component - BURNITA
 * "¿No encontraste lo que buscas?" section
 * Brandbook: Fondo Crema, botones Guayaba Pop y Mint
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 md:py-28 bg-crema">
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
            Estamos aquí para ayudarte. Contacta con nuestro equipo y te asistiremos con cualquier pregunta o solicitud especial.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/573214175699?text=Hola%2C%20vengo%20desde%20Burnita%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-guayaba text-white font-body font-semibold rounded-full hover:bg-guayaba/90 transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>

            {/* Call Button */}
            <a
              href="tel:+573214175699"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-charcoal text-charcoal font-body font-semibold rounded-full hover:bg-charcoal hover:text-crema transition-all"
            >
              <Phone className="w-5 h-5" />
              Llamar
            </a>
          </div>

          {/* Additional Info */}
          <p className="font-body text-sm text-charcoal/60 mt-8">
            Email: <a href="mailto:Info@burnita.com" className="underline hover:text-charcoal transition-colors">Info@burnita.com</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

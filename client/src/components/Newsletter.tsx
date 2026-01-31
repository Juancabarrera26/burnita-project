/**
 * Newsletter Component - BURNITA
 * Brandbook: Fondo Crema Vitrina, CTA Guayaba Pop
 * Tipografía: Manrope para títulos, Inter para texto
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("¡Gracias por suscribirte! Pronto recibirás novedades.");
      setEmail("");
    }
  };

  return (
    <section id="newsletter" className="py-20 md:py-28 bg-crema">
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
            Únete al Círculo
          </h2>
          
          {/* Description - Inter */}
          <p className="font-body text-base md:text-lg text-charcoal/70 mb-8 max-w-lg mx-auto">
            Suscríbete para recibir actualizaciones, acceso a ofertas exclusivas y más.
            Además, obtén un 10% de descuento en tu primer pedido.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="flex-1 px-5 py-3 rounded-full border-2 border-charcoal/20 bg-white font-body text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-guayaba transition-colors"
              required
            />
            {/* CTA - Guayaba Pop */}
            <Button
              type="submit"
              size="lg"
              className="bg-guayaba text-white hover:bg-guayaba/90 font-body font-medium rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
            >
              Suscribirse
            </Button>
          </form>

          {/* Legal text - Inter */}
          <p className="font-body text-xs text-charcoal/50">
            Al suscribirte aceptas nuestros{" "}
            <a href="#" className="underline hover:text-charcoal transition-colors">
              Términos y Condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline hover:text-charcoal transition-colors">
              Política de Privacidad
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

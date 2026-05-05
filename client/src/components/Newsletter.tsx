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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email
    if (!email || !email.includes("@")) {
      toast.error("Por favor ingresa un email válido");
      return;
    }

    setIsLoading(true);

    try {
      // Enviar datos a send-email.php
      const formData = new FormData();
      formData.append("form_type", "subscription");
      formData.append("email", email);

      const response = await fetch("/send-email.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message || "Error al enviar la suscripción");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar la suscripción. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-12 md:py-16 bg-charcoal">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Title - Manrope */}
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-brand-tight mb-3">
            Únete al Círculo
          </h2>
          
          {/* Description - Inter */}
          <p className="font-body text-sm md:text-base text-white/70 mb-6 max-w-lg mx-auto">
            Suscríbete para conocer nuevos lanzamientos, promociones y novedades exclusivas de Burnita.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="flex-1 px-5 py-3 rounded-full border-2 border-white/20 bg-charcoal/50 font-body text-white placeholder:text-white/40 focus:outline-none focus:border-guayaba transition-colors"
              required
              disabled={isLoading}
            />
            {/* CTA - Guayaba Pop */}
            <Button
              type="submit"
              size="lg"
              className="bg-guayaba text-white hover:bg-guayaba/90 font-body font-medium rounded-full px-8 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Quiero enterarme"}
            </Button>
          </form>

          {/* Legal text - Inter */}
          <p className="font-body text-xs text-white/50">
            Al suscribirte aceptas nuestros{" "}
            <a href="#" className="underline hover:text-white transition-colors">
              Términos y Condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline hover:text-white transition-colors">
              Política de Privacidad
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

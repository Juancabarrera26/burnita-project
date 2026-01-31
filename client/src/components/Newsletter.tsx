/**
 * Newsletter Component - Burnita Shop
 * Design: Salmon background with email subscription
 * Features: Email input, subscribe button, legal text
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
    <section id="newsletter" className="py-20 md:py-28 bg-salmon">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brown-dark italic mb-4">
            Join the Inner Circle
          </h2>
          <p className="font-sans text-base md:text-lg text-brown-dark/70 mb-8 max-w-lg mx-auto">
            Subscribe to receive updates, access to exclusive deals, and more.
            Plus, get 10% off your first order when you sign up.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full border-2 border-brown-dark/20 bg-cream/50 font-sans text-brown-dark placeholder:text-brown-dark/40 focus:outline-none focus:border-gold transition-colors"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="bg-cream text-brown-dark hover:bg-white font-sans font-medium rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
            >
              Subscribe
            </Button>
          </form>

          <p className="font-sans text-xs text-brown-dark/50">
            By subscribing you agree to our{" "}
            <a href="#" className="underline hover:text-brown-dark transition-colors">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-brown-dark transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

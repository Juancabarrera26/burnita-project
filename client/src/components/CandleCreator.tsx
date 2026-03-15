/**
 * CandleCreator Component - BURNITA
 * Sistema interactivo para personalizar y descubrir velas
 * Brandbook: Guayaba Pop para CTA, Mango Fizz para badges
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Preference {
  id: string;
  label: string;
}

interface Recommendation {
  type: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

const preferences: Preference[] = [
  { id: "dulce", label: "Dulce" },
  { id: "frutal", label: "Frutal" },
  { id: "citrico", label: "Cítrico" },
  { id: "cremoso", label: "Cremoso" },
  { id: "tropical", label: "Tropical" },
  { id: "elegante", label: "Elegante" },
  { id: "festivo", label: "Festivo" },
  { id: "relajante", label: "Relajante" },
  { id: "corporativo", label: "Corporativo" },
];

const recommendationLogic: Record<string, Recommendation> = {
  "dulce-cremoso": {
    type: "Postre",
    name: "Cupcake de Vainilla",
    price: "$50.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-postres-1_893c54ad.png",
    description: "Vela con forma de postre realista, perfecta para los amantes de lo dulce.",
  },
  "frutal-tropical": {
    type: "Cóctel",
    name: "Mojito Verde",
    price: "$45.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-cocteles-1_893c54ad.png",
    description: "Vela con forma de cóctel tropical, ideal para ambientes festivos.",
  },
  "elegante-corporativo": {
    type: "Empresarial",
    name: "Vela Corporativa Personalizada",
    price: "$45.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-empresarial-1_893c54ad.png",
    description: "Vela personalizada con logo o diseño especial para tu empresa.",
  },
  "festivo-dulce": {
    type: "Recordatorio",
    name: "Mini Vela Celebración",
    price: "$40.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-recordatorios-1_893c54ad.png",
    description: "Pequeña vela perfecta para eventos y celebraciones especiales.",
  },
  "citrico-relajante": {
    type: "Cóctel",
    name: "Sandía Sunset",
    price: "$32.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-cocteles-1_893c54ad.png",
    description: "Vela refrescante con aroma cítrico tropical.",
  },
  "relajante-cremoso": {
    type: "Postre",
    name: "Helado de Fresa",
    price: "$50.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-postres-1_893c54ad.png",
    description: "Vela con aroma relajante y textura cremosa.",
  },
  "frutal-dulce": {
    type: "Recordatorio",
    name: "Frutos del Bosque",
    price: "$29.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-recordatorios-1_893c54ad.png",
    description: "Pequeña vela con aromas frutales naturales.",
  },
  "elegante-relajante": {
    type: "Cóctel",
    name: "Océano Nocturno",
    price: "$31.000 COP",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-cocteles-1_893c54ad.png",
    description: "Vela elegante con aroma marino relajante.",
  },
};

export default function CandleCreator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const togglePreference = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      } else if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const getRecommendation = () => {
    if (selected.length === 0) return;

    const key = selected.sort().join("-");
    const rec = recommendationLogic[key];

    if (rec) {
      setRecommendation(rec);
    } else {
      // Fallback: recomendación aleatoria si no hay combinación exacta
      const keys = Object.keys(recommendationLogic);
      const randomRec = recommendationLogic[keys[Math.floor(Math.random() * keys.length)]];
      setRecommendation(randomRec);
    }

    setShowRecommendation(true);
  };

  const resetCreator = () => {
    setSelected([]);
    setRecommendation(null);
    setShowRecommendation(false);
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <span className="inline-block px-3 py-1 bg-mango/30 text-charcoal font-body text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
            Personalización
          </span>

          {/* Title */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] tracking-brand-tight mb-6">
            Creador de Velas
          </h2>

          {/* Description */}
          <p className="font-body text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Descubre la vela perfecta para ti. Selecciona tus preferencias y te
            recomendaremos la vela ideal según tus gustos.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-lavanda/10 rounded-2xl p-8 md:p-10"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6">
              ¿Qué te atrae?
            </h3>

            <p className="font-body text-sm text-charcoal/70 mb-6">
              Selecciona hasta 2 características que te definan:
            </p>

            {/* Preference Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {preferences.map((pref) => (
                <motion.button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-3 px-4 rounded-lg font-body font-medium text-sm transition-all duration-200 border-2 ${
                    selected.includes(pref.id)
                      ? "bg-guayaba text-white border-guayaba"
                      : "bg-white text-charcoal border-charcoal/20 hover:border-guayaba/50"
                  }`}
                >
                  {pref.label}
                </motion.button>
              ))}
            </div>

            {/* Selected Count */}
            <p className="font-body text-xs text-charcoal/60 mb-6">
              {selected.length}/2 seleccionadas
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={getRecommendation}
                disabled={selected.length === 0}
                size="lg"
                className="w-full bg-guayaba hover:bg-guayaba/90 text-white font-body font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Descubrir mi vela
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {showRecommendation && recommendation ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-mango/10 to-guayaba/10 rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden bg-lavanda/20">
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-mango text-charcoal font-body text-xs font-semibold rounded-full">
                      {recommendation.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
                    {recommendation.name}
                  </h3>

                  <p className="font-body text-sm text-charcoal/70 mb-4">
                    {recommendation.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="font-body text-xs text-charcoal/60 uppercase tracking-widest mb-1">
                      Precio aproximado
                    </p>
                    <p className="font-display text-2xl font-bold text-guayaba">
                      {recommendation.price}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => (window.location.href = "/shop")}
                      size="lg"
                      className="flex-1 bg-guayaba hover:bg-guayaba/90 text-white font-body font-medium rounded-full"
                    >
                      Ver producto
                    </Button>
                    <Button
                      onClick={resetCreator}
                      variant="outline"
                      size="lg"
                      className="flex-1 border-charcoal/20 text-charcoal hover:bg-charcoal/5 font-body font-medium rounded-full"
                    >
                      Intentar de nuevo
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-lavanda/20 rounded-2xl p-8 md:p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-mango/20 flex items-center justify-center mb-4">
                  <span className="text-2xl md:text-3xl">🕯️</span>
                </div>
                <p className="font-body text-base text-charcoal/70">
                  Selecciona tus preferencias y descubre tu vela perfecta
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Explore Lab Page - Burnita Shop
 * Design: Artesanía Cálida Contemporánea
 * Interactive candle customization and generation with AI
 */

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

type CandleType = "Cóctel" | "Postre" | "Elegante" | "Corporativa";
type CandleAroma = "Frutal" | "Dulce" | "Cítrico" | "Especiado";
type CandleColor = "Rosado" | "Amarillo" | "Rojo" | "Blanco";
type CandleDecoration = "Frutas" | "Crema" | "Especias" | "Minimalista";

interface CandleCustomization {
  type: CandleType | "";
  aroma: CandleAroma | "";
  color: CandleColor | "";
  decoration: CandleDecoration | "";
}

interface GeneratedCandle {
  type: CandleType;
  aroma: CandleAroma;
  color: CandleColor;
  decoration: CandleDecoration;
  imageUrl: string;
}

const CANDLE_OPTIONS = {
  type: [
    { label: "Cóctel", value: "Cóctel" as CandleType },
    { label: "Postre", value: "Postre" as CandleType },
    { label: "Elegante", value: "Elegante" as CandleType },
    { label: "Corporativa", value: "Corporativa" as CandleType },
  ],
  aroma: [
    { label: "Frutal", value: "Frutal" as CandleAroma },
    { label: "Dulce", value: "Dulce" as CandleAroma },
    { label: "Cítrico", value: "Cítrico" as CandleAroma },
    { label: "Especiado", value: "Especiado" as CandleAroma },
  ],
  color: [
    { label: "Rosado", value: "Rosado" as CandleColor },
    { label: "Amarillo", value: "Amarillo" as CandleColor },
    { label: "Rojo", value: "Rojo" as CandleColor },
    { label: "Blanco", value: "Blanco" as CandleColor },
  ],
  decoration: [
    { label: "Frutas", value: "Frutas" as CandleDecoration },
    { label: "Crema", value: "Crema" as CandleDecoration },
    { label: "Especias", value: "Especias" as CandleDecoration },
    { label: "Minimalista", value: "Minimalista" as CandleDecoration },
  ],
};

export default function ExploreLab() {
  const [customization, setCustomization] = useState<CandleCustomization>({
    type: "",
    aroma: "",
    color: "",
    decoration: "",
  });

  const [generatedCandle, setGeneratedCandle] = useState<GeneratedCandle | null>(null);
  const generateImageMutation = trpc.candles.generateImage.useMutation();

  const handleSelect = (category: keyof CandleCustomization, value: string) => {
    setCustomization((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : (value as any),
    }));
  };

  const handleGenerate = async () => {
    if (!customization.type || !customization.aroma || !customization.color || !customization.decoration) {
      alert("Por favor selecciona una opción en cada categoría");
      return;
    }

    try {
      const result = await generateImageMutation.mutateAsync({
        type: customization.type,
        aroma: customization.aroma,
        color: customization.color,
        decoration: customization.decoration,
      });

      const candle: GeneratedCandle = {
        type: customization.type as CandleType,
        aroma: customization.aroma as CandleAroma,
        color: customization.color as CandleColor,
        decoration: customization.decoration as CandleDecoration,
        imageUrl: result.imageUrl || "",
      };
      setGeneratedCandle(candle);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error al generar la imagen. Por favor intenta de nuevo.");
    }
  };

  const getRecommendedPrice = () => {
    const basePrice: Record<CandleType, number> = {
      "Cóctel": 45000,
      "Postre": 50000,
      "Elegante": 55000,
      "Corporativa": 60000,
    };
    return customization.type ? basePrice[customization.type] : 45000;
  };

  const isLoading = generateImageMutation.isPending;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-[#fff6ea] to-[#f5e6d3]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              Crea tu vela personalizada
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Selecciona las características y descubre tu vela ideal.
            </p>
          </div>
        </section>

        {/* Customization Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Selection Panel */}
              <div className="space-y-8">
                {/* Tipo de Vela */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-black">Tipo de Vela</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CANDLE_OPTIONS.type.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect("type", option.value)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          customization.type === option.value
                            ? "bg-[#FF5CA8] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aroma */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-black">Aroma</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CANDLE_OPTIONS.aroma.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect("aroma", option.value)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          customization.aroma === option.value
                            ? "bg-[#FFC24A] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-black">Color</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CANDLE_OPTIONS.color.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect("color", option.value)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          customization.color === option.value
                            ? "bg-[#2ADBC9] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decoración */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-black">Decoración</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CANDLE_OPTIONS.decoration.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect("decoration", option.value)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          customization.decoration === option.value
                            ? "bg-[#C7B8FF] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full py-4 text-lg font-bold bg-[#FF5CA8] hover:bg-[#FF3D8F] text-white rounded-full transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin w-5 h-5" />
                      Generando tu vela...
                    </span>
                  ) : (
                    "Generar mi vela"
                  )}
                </Button>
              </div>

              {/* Preview Panel */}
              <div className="flex flex-col items-center justify-center">
                {generatedCandle ? (
                  <div className="w-full bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                    {/* Generated Image */}
                    <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 h-96 flex items-center justify-center">
                      <img
                        src={generatedCandle.imageUrl}
                        alt="Tu vela personalizada"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-2">
                          Vela {generatedCandle.type}
                        </h3>
                        <p className="text-gray-600">
                          Aroma: <span className="font-semibold">{generatedCandle.aroma}</span> • Color:{" "}
                          <span className="font-semibold">{generatedCandle.color}</span> • Decoración:{" "}
                          <span className="font-semibold">{generatedCandle.decoration}</span>
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-600 text-sm mb-2">PRECIO APROXIMADO</p>
                        <p className="text-3xl font-bold text-[#FF5CA8]">
                          ${getRecommendedPrice().toLocaleString("es-CO")} COP
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <Button className="bg-[#FF5CA8] hover:bg-[#FF3D8F] text-white font-bold py-2 rounded-full">
                          Agregar al carrito
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setGeneratedCandle(null)}
                          className="border-2 border-gray-300 text-gray-700 font-bold py-2 rounded-full hover:bg-gray-50"
                        >
                          Intentar de nuevo
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-[#fff6ea] to-[#f5e6d3] rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🕯️</div>
                      <p className="text-gray-600 font-semibold">
                        Selecciona tus preferencias y haz clic en "Generar mi vela"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 px-4 bg-[#fff6ea]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-black">¿Cómo funciona?</h2>
            <p className="text-gray-700 mb-8">
              Selecciona las características de tu vela personalizada y nuestro generador de IA creará una imagen única basada en tus preferencias. Luego puedes agregar tu vela al carrito y personalizarla aún más con nuestro equipo.
            </p>
            <Button className="bg-[#FF5CA8] hover:bg-[#FF3D8F] text-white font-bold py-3 px-8 rounded-full">
              Contacta con nosotros
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

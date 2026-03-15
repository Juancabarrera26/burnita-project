/**
 * Explore Lab Page - Burnita Shop
 * Design: Artesanía Cálida Contemporánea
 * Interactive candle customization and generation
 */

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface CandleCustomization {
  type: string;
  aroma: string;
  color: string;
  decoration: string;
}

const CANDLE_OPTIONS = {
  type: [
    { label: "Cóctel", value: "coctel" },
    { label: "Postre", value: "postre" },
    { label: "Elegante", value: "elegante" },
    { label: "Corporativa", value: "corporativa" },
  ],
  aroma: [
    { label: "Frutal", value: "frutal" },
    { label: "Dulce", value: "dulce" },
    { label: "Cítrico", value: "citrico" },
    { label: "Especiado", value: "especiado" },
  ],
  color: [
    { label: "Rosado", value: "rosado" },
    { label: "Amarillo", value: "amarillo" },
    { label: "Rojo", value: "rojo" },
    { label: "Blanco", value: "blanco" },
  ],
  decoration: [
    { label: "Frutas", value: "frutas" },
    { label: "Crema", value: "crema" },
    { label: "Especias", value: "especias" },
    { label: "Minimalista", value: "minimalista" },
  ],
};

export default function ExploreLab() {
  const [customization, setCustomization] = useState<CandleCustomization>({
    type: "",
    aroma: "",
    color: "",
    decoration: "",
  });

  const [generatedCandle, setGeneratedCandle] = useState<CandleCustomization | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelect = (category: keyof CandleCustomization, value: string) => {
    setCustomization((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const handleGenerate = async () => {
    if (!customization.type || !customization.aroma || !customization.color || !customization.decoration) {
      alert("Por favor selecciona una opción en cada categoría");
      return;
    }

    setIsGenerating(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setGeneratedCandle(customization);
    setIsGenerating(false);
  };

  const getPlaceholderImage = () => {
    // Generate a placeholder image URL based on customization
    // This will be replaced with actual AI image generation in the future
    const colors: Record<string, string> = {
      rosado: "FFB6D9",
      amarillo: "FFE66D",
      rojo: "FF6B6B",
      blanco: "FFFFFF",
    };

    const bgColor = colors[customization.color] || "FFFFFF";
    return `https://via.placeholder.com/400x500/${bgColor}/000000?text=Tu+Vela+${customization.type}`;
  };

  const getRecommendedPrice = () => {
    const basePrice: Record<string, number> = {
      coctel: 45000,
      postre: 50000,
      elegante: 55000,
      corporativa: 60000,
    };
    return basePrice[customization.type] || 45000;
  };

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
                  disabled={isGenerating}
                  className="w-full py-4 text-lg font-bold bg-[#FF5CA8] hover:bg-[#FF3D8F] text-white rounded-full transition-all"
                >
                  {isGenerating ? "Generando tu vela..." : "Generar mi vela"}
                </Button>
              </div>

              {/* Preview Panel */}
              <div className="flex flex-col items-center justify-center">
                {generatedCandle ? (
                  <div className="w-full bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                    {/* Placeholder Image */}
                    <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 h-96 flex items-center justify-center">
                      <img
                        src={getPlaceholderImage()}
                        alt="Tu vela personalizada"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-2">
                          Vela {generatedCandle.type.charAt(0).toUpperCase() + generatedCandle.type.slice(1)}
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

/**
 * Explore Lab Page - Burnita Shop
 * Design: Artesanía Cálida Contemporánea
 * Interactive candle customization and generation with AI
 */

import { useState, useRef } from "react";
import html2canvas from "html2canvas";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

type CandleType = "Cóctel" | "Postre" | "Temporada" | "Recordatorio" | "Corporativo";
type CandleAroma = "Frutal" | "Dulce" | "Cítrico" | "Especiado";
type CandleColor = "Rojo" | "Azul" | "Amarillo" | "Verde" | "Naranja" | "Morado" | "Rosado" | "Negro" | "Blanco" | "Cafe" | "Beige" | "Dorado" | "Plateado";
type CandleDecoration = "Frutas" | "Crema" | "Especias" | "Minimalista";

interface CandleCustomization {
  type: CandleType | "";
  aroma: CandleAroma | "";
  colors: CandleColor[];
  decoration: CandleDecoration | "";
}

interface GeneratedCandle {
  type: CandleType;
  aroma: CandleAroma;
  colors: CandleColor[];
  decoration: CandleDecoration;
  imageUrl: string;
}

const CANDLE_OPTIONS = {
  type: [
    { label: "Cóctel", value: "Cóctel" as CandleType },
    { label: "Postre", value: "Postre" as CandleType },
    { label: "Temporada", value: "Temporada" as CandleType },
    { label: "Recordatorio", value: "Recordatorio" as CandleType },
    { label: "Corporativo", value: "Corporativo" as CandleType },
  ],
  aroma: [
    { label: "Frutal", value: "Frutal" as CandleAroma },
    { label: "Dulce", value: "Dulce" as CandleAroma },
    { label: "Cítrico", value: "Cítrico" as CandleAroma },
    { label: "Especiado", value: "Especiado" as CandleAroma },
  ],
  color: [
    { label: "Rojo", value: "Rojo" as CandleColor, hex: "#EF4444" },
    { label: "Azul", value: "Azul" as CandleColor, hex: "#3B82F6" },
    { label: "Amarillo", value: "Amarillo" as CandleColor, hex: "#FBBF24" },
    { label: "Verde", value: "Verde" as CandleColor, hex: "#10B981" },
    { label: "Naranja", value: "Naranja" as CandleColor, hex: "#F97316" },
    { label: "Morado", value: "Morado" as CandleColor, hex: "#A855F7" },
    { label: "Rosado", value: "Rosado" as CandleColor, hex: "#EC4899" },
    { label: "Negro", value: "Negro" as CandleColor, hex: "#1F2937" },
    { label: "Blanco", value: "Blanco" as CandleColor, hex: "#F3F4F6" },
    { label: "Cafe", value: "Cafe" as CandleColor, hex: "#92400E" },
    { label: "Beige", value: "Beige" as CandleColor, hex: "#D2B48C" },
    { label: "Dorado", value: "Dorado" as CandleColor, hex: "#D4AF37" },
    { label: "Plateado", value: "Plateado" as CandleColor, hex: "#C0C0C0" },
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
    colors: [],
    decoration: "",
  });

  const [generatedCandle, setGeneratedCandle] = useState<GeneratedCandle | null>(null);
  const generateImageMutation = trpc.candles.generateImage.useMutation();
  const previewImageRef = useRef<HTMLImageElement>(null);

  const handleSelect = (category: keyof CandleCustomization, value: string) => {
    if (category === "colors") {
      // Multi-select for colors
      setCustomization((prev) => {
        const colorValue = value as CandleColor;
        const isSelected = prev.colors.includes(colorValue);
        return {
          ...prev,
          colors: isSelected
            ? prev.colors.filter((c) => c !== colorValue)
            : [...prev.colors, colorValue],
        };
      });
    } else {
      // Single select for other categories
      setCustomization((prev) => ({
        ...prev,
        [category]: prev[category as keyof Omit<CandleCustomization, "colors">] === value ? "" : (value as any),
      }));
    }
  };

  const handleGenerate = async () => {
    if (!customization.type || !customization.aroma || customization.colors.length === 0 || !customization.decoration) {
      alert("Por favor selecciona una opción en cada categoría, incluyendo al menos un color");
      return;
    }

    try {
      const result = await generateImageMutation.mutateAsync({
        type: customization.type,
        aroma: customization.aroma,
        colors: customization.colors,
        decoration: customization.decoration,
      });

      const candle: GeneratedCandle = {
        type: customization.type as CandleType,
        aroma: customization.aroma as CandleAroma,
        colors: customization.colors,
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
      "Cóctel": 60000,
      "Postre": 55000,
      "Temporada": 55000,
      "Recordatorio": 60000,
      "Corporativo": 65000,
    };
    return customization.type ? basePrice[customization.type] : 60000;
  };

  const handleSendToWhatsApp = async () => {
    if (!generatedCandle || !previewImageRef.current) return;

    const price = getRecommendedPrice();
    const colorsText = generatedCandle.colors.join(", ");
    
    // Crear mensaje LIMPIO sin emojis (solo ASCII/UTF-8 seguro)
    const message = `Hola Burnita

Hemos creado un diseno personalizado de vela y queremos cotizarlo.

DISENO DE VELA

- Tipo: ${generatedCandle.type}
- Aroma preferido: ${generatedCandle.aroma}
- Colores: ${colorsText}
- Decoracion: ${generatedCandle.decoration}
- Precio estimado: $${price.toLocaleString()} COP

Queremos hacer esta vela realidad.

La imagen del diseno se descargo automaticamente para adjuntarla a este chat.`;
    
    // Número de WhatsApp empresarial de Burnita
    const whatsappNumber = "573214175699";
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Capturar la imagen del preview usando html2canvas
    try {
      // Capturar el elemento img renderizado
      const canvas = await html2canvas(previewImageRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      // Convertir canvas a blob y descargar
      canvas.toBlob((blob) => {
        if (blob) {
          // Crear URL del blob
          const url = window.URL.createObjectURL(blob);
          
          // Crear elemento de descarga
          const link = document.createElement("a");
          link.href = url;
          link.download = "burnita-diseno-vela.png";
          document.body.appendChild(link);
          
          // Descargar
          link.click();
          
          // Limpiar
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          // Abrir WhatsApp después de descargar
          setTimeout(() => {
            window.open(whatsappUrl, "_blank");
          }, 800);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error capturando imagen:", error);
      // Si falla, abrir WhatsApp igualmente
      window.open(whatsappUrl, "_blank");
    }
  };

  const isLoading = generateImageMutation.isPending;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff6ea' }}>
      
      <main>
        {/* Hero Section */}
        <section className="px-4 overflow-hidden" style={{ backgroundColor: '#fff6ea', paddingTop: '7rem', paddingBottom: '4rem' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black" style={{ marginTop: 0 }}>
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

                {/* Color - Multi-select Visual Selector */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-black">Colores (selecciona uno o más)</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                    {CANDLE_OPTIONS.color.map((option: any) => {
                      const isSelected = customization.colors.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleSelect("colors", option.value)}
                          className={`flex flex-col items-center gap-2 transition-all ${
                            isSelected
                              ? "scale-110"
                              : "hover:scale-105"
                          }`}
                          title={option.label}
                        >
                          <div
                            className="w-14 h-14 rounded-full shadow-md border-2 transition-all cursor-pointer"
                            style={{
                              backgroundColor: option.hex,
                              borderColor: isSelected ? "#000" : "#ddd",
                              borderWidth: isSelected ? "3px" : "2px",
                              boxShadow: isSelected ? "0 0 12px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          />
                          <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {customization.colors.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900">
                        Colores seleccionados: {customization.colors.join(", ")}
                      </p>
                    </div>
                  )}
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
                        ref={previewImageRef}
                        src={generatedCandle.imageUrl}
                        alt="Tu vela personalizada"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Candle Details */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 font-semibold">Tipo</p>
                          <p className="text-black font-bold">{generatedCandle.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-semibold">Aroma</p>
                          <p className="text-black font-bold">{generatedCandle.aroma}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-semibold">Colores</p>
                          <p className="text-black font-bold text-xs">{generatedCandle.colors.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-semibold">Decoración</p>
                          <p className="text-black font-bold">{generatedCandle.decoration}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-600 font-semibold mb-2">Precio estimado</p>
                        <p className="text-3xl font-bold text-[#FF5CA8]">
                          {getRecommendedPrice().toLocaleString()} COP
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => setGeneratedCandle(null)}
                          className="flex-1 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg font-semibold"
                        >
                          Crear otra
                        </Button>
                        <Button
                          onClick={handleSendToWhatsApp}
                          className="flex-1 py-3 bg-[#FF5CA8] text-white hover:bg-[#FF3D8F] rounded-lg font-semibold transition-all"
                        >
                          Enviar diseño de vela
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <p className="text-gray-500 font-semibold text-lg mb-2">
                        Tu vela personalizada
                      </p>
                      <p className="text-gray-400 text-sm">
                        Selecciona opciones y haz clic en "Generar mi vela"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

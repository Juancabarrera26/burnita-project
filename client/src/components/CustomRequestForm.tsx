import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, CheckCircle } from "lucide-react";

interface CustomRequestFormProps {
  requestType: "recordatorios" | "empresarial";
  title: string;
  subtitle: string;
}

export default function CustomRequestForm({
  requestType,
  title,
  subtitle,
}: CustomRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRequest = trpc.requests.createCustomRequest.useMutation();

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientCompany: "",
    clientLocation: "",
    generalDescription: "",
    candleType: "",
    quantity: 1,
    message: "",
    colors: "",
    style: "",
    references: "",
    event: "",
    deliveryDate: "",
    budget: "",
    urgency: "normal" as const,
    additionalComments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createRequest.mutateAsync({
        requestType,
        ...formData,
      });
      setIsSuccess(true);
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        clientCompany: "",
        clientLocation: "",
        generalDescription: "",
        candleType: "",
        quantity: 1,
        message: "",
        colors: "",
        style: "",
        references: "",
        event: "",
        deliveryDate: "",
        budget: "",
        urgency: "normal",
        additionalComments: "",
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar la solicitud"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-guayaba mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">
            ¡Solicitud enviada!
          </h2>
          <p className="font-body text-charcoal/70 mb-8">
            Tu solicitud fue enviada correctamente. Nos pondremos en contacto
            pronto para confirmar los detalles.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-guayaba text-crema hover:bg-guayaba/90 font-body font-medium rounded-full px-8 py-6"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {title}
          </h1>
          <p className="font-body text-lg text-charcoal/70">{subtitle}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="font-body text-red-700">{error}</p>
            </div>
          )}

          {/* Datos del Cliente */}
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Datos de contacto
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {requestType === "empresarial" && (
                <div>
                  <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="clientCompany"
                    value={formData.clientCompany}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              )}

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Ubicación *
                </label>
                <input
                  type="text"
                  name="clientLocation"
                  value={formData.clientLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Ciudad, País"
                />
              </div>
            </div>
          </div>

          {/* Descripción General */}
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Cuéntanos tu idea
            </h3>
            <div>
              <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                Descripción general *
              </label>
              <textarea
                name="generalDescription"
                value={formData.generalDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                placeholder="Cuéntanos qué tipo de velas necesitas y para qué ocasión..."
              />
            </div>
          </div>

          {/* Producto */}
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Producto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Tipo de vela *
                </label>
                <input
                  type="text"
                  name="candleType"
                  value={formData.candleType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Ej: Vela aromática, Vela decorativa"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Cantidad *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="1"
                />
              </div>
            </div>
          </div>

          {/* Personalización */}
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Personalización
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Ej: Feliz cumpleaños, Con amor, etc."
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Colores preferidos
                </label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Ej: Rosa, Dorado, Blanco"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Estilo
                </label>
                <input
                  type="text"
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Ej: Moderno, Clásico, Lúdico"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Referencias (URL o descripción)
                </label>
                <textarea
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Links a imágenes o descripciones de lo que te inspira"
                />
              </div>
            </div>
          </div>

          {/* Contexto */}
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Contexto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Evento
                </label>
                <input
                  type="text"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Ej: Cumpleaños, Boda, Corporativo"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Fecha de entrega
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Presupuesto y Urgencia */}
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Detalles adicionales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Presupuesto aproximado
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                  placeholder="Ej: $100 - $500"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Urgencia
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                >
                  <option value="normal">Normal</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Comentarios */}
          <div className="mb-8">
            <div>
              <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                Comentarios adicionales
              </label>
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba transition-colors"
                placeholder="Cualquier otra información que consideres importante"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-guayaba text-crema hover:bg-guayaba/90 disabled:bg-charcoal/30 font-body font-medium rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar solicitud"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

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
      // Guardar en base de datos
      await createRequest.mutateAsync({
        requestType,
        ...formData,
      });

      // Enviar email a través de PHP
      const emailFormData = new FormData();
      emailFormData.append("form_type", "custom_request");
      emailFormData.append("name", formData.clientName);
      emailFormData.append("email", formData.clientEmail);
      emailFormData.append("phone", formData.clientPhone);
      emailFormData.append("company", formData.clientCompany);
      emailFormData.append("location", formData.clientLocation);
      emailFormData.append("description", formData.generalDescription);
      emailFormData.append("candle_type", formData.candleType);
      emailFormData.append("quantity", formData.quantity.toString());
      emailFormData.append("message", formData.message);
      emailFormData.append("colors", formData.colors);
      emailFormData.append("style", formData.style);
      emailFormData.append("references", formData.references);
      emailFormData.append("event", formData.event);
      emailFormData.append("delivery_date", formData.deliveryDate);
      emailFormData.append("budget", formData.budget);
      emailFormData.append("urgency", formData.urgency);
      emailFormData.append("comments", formData.additionalComments);
      emailFormData.append("request_type", requestType);

      const emailResponse = await fetch("/send-email.php", {
        method: "POST",
        body: emailFormData,
      });

      const emailData = await emailResponse.json();

      if (emailData.success) {
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
      } else {
        toast.error(emailData.message || "Error al enviar el correo");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar la solicitud"
      );
      toast.error(error || "Error al procesar la solicitud");
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
            ¡Solicitud Enviada!
          </h2>
          <p className="font-body text-charcoal/70 mb-8">
            Tu solicitud fue enviada correctamente. Te responderemos pronto.
          </p>
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-guayaba text-white hover:bg-guayaba/90 w-full"
          >
            Volver al Inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema py-12 md:py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            {title}
          </h1>
          <p className="font-body text-lg text-charcoal/70">
            {subtitle}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl p-8 shadow-lg">
          {/* Datos del Cliente */}
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Datos de Contacto
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
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
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
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
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
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="clientCompany"
                  value={formData.clientCompany}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="Nombre de tu empresa (opcional)"
                />
              </div>
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
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="Ciudad, País"
                />
              </div>
            </div>
          </div>

          {/* Descripción General */}
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Descripción General
            </h3>
            <textarea
              name="generalDescription"
              value={formData.generalDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba font-body"
              placeholder="Cuéntanos sobre tu idea..."
            />
          </div>

          {/* Producto */}
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Producto
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Tipo de Vela *
                </label>
                <select
                  name="candleType"
                  value={formData.candleType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="cocteles">Cócteles</option>
                  <option value="postres">Postres</option>
                  <option value="temporada">Temporada</option>
                  <option value="otro">Otro</option>
                </select>
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
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                />
              </div>
            </div>
          </div>

          {/* Personalización */}
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Personalización
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Mensaje
                </label>
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="Mensaje personalizado (opcional)"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Colores
                </label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="Describe los colores deseados"
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
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="Describe el estilo deseado"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Referencias
                </label>
                <textarea
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba font-body"
                  placeholder="Links, imágenes o descripciones de referencias"
                />
              </div>
            </div>
          </div>

          {/* Contexto */}
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Contexto
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Evento
                </label>
                <input
                  type="text"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="¿Para qué evento? (opcional)"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Fecha de Entrega
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                />
              </div>
            </div>
          </div>

          {/* Detalles Adicionales */}
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-6">
              Detalles Adicionales
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Presupuesto
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                  placeholder="Rango de presupuesto (opcional)"
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
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba"
                >
                  <option value="normal">Normal</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-2">
                  Comentarios Adicionales
                </label>
                <textarea
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-lg focus:outline-none focus:border-guayaba font-body"
                  placeholder="Algo más que quieras agregar? (opcional)"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-guayaba text-white hover:bg-guayaba/90 font-body font-medium py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar solicitud"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

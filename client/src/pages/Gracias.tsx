import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface OrderData {
  referencia: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  productos: Array<{
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
  subtotal: number;
  envio: number;
  total: number;
  estado: string;
  fecha: string;
}

export default function Gracias() {
  const [, navigate] = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get reference from URL query params
    const params = new URLSearchParams(window.location.search);
    const referencia = params.get("referencia");

    // If no reference in URL, try to get from localStorage
    const storedReference = !referencia ? localStorage.getItem("lastOrderReference") : referencia;

    if (!storedReference) {
      setError("No se encontró información de la orden. Por favor, contacta con soporte.");
      setLoading(false);
      return;
    }

    // Fetch order details
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${storedReference}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información de la orden");
        }
        const data = await response.json();
        if (data.success) {
          setOrder(data.order);
          // Clear stored reference after successful retrieval
          localStorage.removeItem("lastOrderReference");
        } else {
          setError(data.error || "Error al obtener la orden");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const handleWhatsApp = () => {
    if (!order) return;
    const message = `Hola, tengo una pregunta sobre mi orden ${order.referencia}`;
    const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-guayaba-500 mx-auto mb-4" />
          <p className="text-charcoal-600">Cargando información de tu orden...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-cream-50 py-12 px-4 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Oops, algo salió mal</h1>
              <p className="text-charcoal-600 mb-6">{error}</p>
              <Button
                onClick={() => navigate("/")}
                className="bg-guayaba-500 hover:bg-guayaba-600 text-white"
              >
                Volver a la tienda
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-charcoal-900 mb-2">¡Pago realizado con éxito!</h1>
            <p className="text-charcoal-600 mb-4">Tu orden ha sido confirmada y está siendo procesada</p>
            <p className="text-2xl font-bold text-guayaba-500">Orden #{order.referencia}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Products Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-charcoal-900 mb-4">Resumen de tu compra</h2>
                <div className="space-y-3 border-b border-cream-200 pb-4 mb-4">
                  {order.productos.map((producto, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-charcoal-800">{producto.nombre}</p>
                        <p className="text-sm text-charcoal-600">Cantidad: {producto.cantidad}</p>
                      </div>
                      <p className="font-semibold text-charcoal-900">
                        {formatCurrency(producto.precio * producto.cantidad)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-charcoal-700">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-700">
                    <span>Envío</span>
                    <span>{formatCurrency(order.envio)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-charcoal-900 pt-2 border-t border-cream-200">
                    <span>Total</span>
                    <span className="text-guayaba-500">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-charcoal-900 mb-4">Información de envío</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-charcoal-600">Nombre completo</p>
                    <p className="font-semibold text-charcoal-900">
                      {order.nombre} {order.apellido}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-600">Email</p>
                    <p className="font-semibold text-charcoal-900">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-600">Teléfono</p>
                    <p className="font-semibold text-charcoal-900">{order.telefono}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-600">Dirección</p>
                    <p className="font-semibold text-charcoal-900">{order.direccion}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-charcoal-600">Ciudad</p>
                      <p className="font-semibold text-charcoal-900">{order.ciudad}</p>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-600">Departamento</p>
                      <p className="font-semibold text-charcoal-900">{order.departamento}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Status */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-charcoal-900 mb-4">Estado de tu orden</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-charcoal-900 capitalize">{order.estado}</span>
                </div>
                <p className="text-sm text-charcoal-600 mb-4">
                  Recibirás actualizaciones por email en {order.email}
                </p>
                <p className="text-xs text-charcoal-500">
                  Fecha: {formatDate(order.fecha)}
                </p>
              </div>

              {/* What's Next */}
              <div className="bg-guayaba-50 rounded-2xl p-6 border border-guayaba-200">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">¿Qué sigue?</h3>
                <ul className="space-y-2 text-sm text-charcoal-700">
                  <li className="flex gap-2">
                    <span className="text-guayaba-500 font-bold">1.</span>
                    <span>Recibirás confirmación por email</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-guayaba-500 font-bold">2.</span>
                    <span>Prepararemos tu pedido</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-guayaba-500 font-bold">3.</span>
                    <span>Te enviaremos tu vela</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full bg-guayaba-500 hover:bg-guayaba-600 text-white font-semibold py-3 rounded-xl"
                >
                  Volver a la tienda
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl"
                >
                  Contactar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

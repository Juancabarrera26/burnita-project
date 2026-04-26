import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const SHIPPING_OPTIONS = {
  local: { label: 'Envío local', price: 10000 },
  national: { label: 'Envío nacional', price: 15000 },
};

export default function Checkout() {
  const { items, getTotalPrice } = useCart();
  const [, setLocation] = useLocation();
  const [selectedShipping, setSelectedShipping] = useState<'local' | 'national' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: '',
    notes: '',
  });

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
    if (!formData.department.trim()) newErrors.department = 'El departamento es obligatorio';
    if (!selectedShipping) newErrors.shipping = 'Selecciona un tipo de envío';
    if (items.length === 0) newErrors.cart = 'El carrito está vacío';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Manejar cambio de envío
  const handleShippingChange = (shipping: 'local' | 'national') => {
    setSelectedShipping(shipping);
    if (errors.shipping) {
      setErrors((prev) => ({
        ...prev,
        shipping: '',
      }));
    }
  };

  // Calcular totales
  const subtotal = getTotalPrice();
  const shippingCost = selectedShipping ? SHIPPING_OPTIONS[selectedShipping].price : 0;
  const total = subtotal + shippingCost;

  // Manejar pago con Wompi
  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular delay para mostrar loading state
    setTimeout(() => {
      // Generar referencia única
      const reference = `BURNITA-${Date.now()}`;
      const amountInCents = Math.round(total * 100);

      // Renderizar script de Wompi
      const container = document.getElementById('wompi-checkout-container');
      if (container) {
        container.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://checkout.wompi.co/widget.js';
        script.setAttribute('data-render', 'button');
        script.setAttribute('data-public-key', 'pub_prod_WYZrZvxxwpC34MYOIc5vDijzSwNB50PR');
        script.setAttribute('data-currency', 'COP');
        script.setAttribute('data-amount-in-cents', amountInCents.toString());
        script.setAttribute('data-reference', reference);
        script.setAttribute('data-redirect-url', `${window.location.origin}/gracias`);

        container.appendChild(script);
      }

      setIsLoading(false);
    }, 500);
  };

  // Si el carrito está vacío, redirigir a shop
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff6ea] flex flex-col">
        <main className="flex-1 pt-24 px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setLocation('/shop')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Volver al carrito
            </button>
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Carrito vacío</h2>
              <p className="text-gray-600 mb-6">No hay productos en tu carrito</p>
              <Button
                onClick={() => setLocation('/shop')}
                className="bg-[#d946a6] hover:bg-[#c0368a] text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Continuar comprando
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff6ea] flex flex-col">
      <main className="flex-1 pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setLocation('/cart')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Volver al carrito
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Checkout</h1>
          </div>

          {/* Layout 2 columnas (desktop) / 1 columna (mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario - Izquierda (2 columnas en desktop) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
                {/* Información de envío */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de envío</h2>

                  {/* Nombre y Apellido */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6] ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tu nombre"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6] ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tu apellido"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email y Teléfono */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6] ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6] ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+57 300 000 0000"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección completa *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6] ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Calle, número, apartamento"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Ciudad y Departamento */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6] ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tu ciudad"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departamento *
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6] ${
                          errors.department ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tu departamento"
                      />
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                      )}
                    </div>
                  </div>

                  {/* Notas adicionales */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notas adicionales (opcional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d946a6]"
                      placeholder="Instrucciones especiales para la entrega..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Tipo de envío */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipo de envío</h2>

                  {errors.shipping && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{errors.shipping}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {Object.entries(SHIPPING_OPTIONS).map(([key, option]) => (
                      <label
                        key={key}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                          selectedShipping === key
                            ? 'border-[#d946a6] bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={selectedShipping === key}
                          onChange={() => handleShippingChange(key as 'local' | 'national')}
                          className="w-4 h-4 text-[#d946a6] cursor-pointer"
                        />
                        <div className="ml-4 flex-1">
                          <p className="font-semibold text-gray-900">{option.label}</p>
                          <p className="text-sm text-gray-600">
                            {option.price.toLocaleString('es-CO')} COP
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen del pedido - Derecha (1 columna en desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Resumen del pedido</h2>

                {/* Lista de productos */}
                <div className="space-y-3 border-b border-gray-200 pb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toLocaleString('es-CO')} COP</span>
                    </div>
                  ))}
                </div>

                {/* Detalles de precios */}
                <div className="space-y-3 border-b border-gray-200 pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>{subtotal.toLocaleString('es-CO')} COP</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío:</span>
                    <span>
                      {selectedShipping
                        ? `${shippingCost.toLocaleString('es-CO')} COP`
                        : 'Por seleccionar'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Impuestos:</span>
                    <span>Incluidos</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-2xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-[#d946a6]">{total.toLocaleString('es-CO')} COP</span>
                </div>

                {/* Contenedor para Wompi */}
                <div id="wompi-checkout-container" className="min-h-[50px]" />

                {/* Botón de pago */}
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || !selectedShipping}
                  className="w-full bg-[#d946a6] hover:bg-[#c0368a] disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition"
                >
                  {isLoading ? 'Procesando...' : 'Finalizar compra'}
                </Button>

                {/* Nota de seguridad */}
                <p className="text-xs text-gray-500 text-center">
                  Paga de forma segura con Wompi
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

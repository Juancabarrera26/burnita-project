import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { ChevronLeft, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { DEPARTMENTS, CITIES, FIXED_SHIPPING_COST, getCitiesByDepartment } from '@shared/locations';
import { WOMPI_PUBLIC_KEY, WOMPI_INTEGRITY_KEY } from '@shared/const';
import SHA256 from 'crypto-js/sha256';

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

export default function Checkout() {
  const { items, getTotalPrice } = useCart();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showWompiCheckout, setShowWompiCheckout] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

  // Get available cities based on selected department
  const availableCities = formData.department ? getCitiesByDepartment(formData.department) : [];

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
    if (!formData.department.trim()) newErrors.department = 'El departamento es obligatorio';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
    if (items.length === 0) newErrors.cart = 'El carrito está vacío';
    if (!acceptedTerms) newErrors.terms = 'Debes aceptar los términos y condiciones';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset city when department changes
      ...(name === 'department' && { city: '' }),
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Calcular totales
  const subtotal = getTotalPrice();
  const shippingCost = FIXED_SHIPPING_COST;
  const total = subtotal + shippingCost;

  // Manejar pago con Wompi
  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Crear orden en backend
      const orderResponse = await fetch('/api/orders/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          telefono: formData.phone,
          direccion: formData.address,
          ciudad: formData.city,
          departamento: formData.department,
                  productos: items.map(item => ({
            id: item.id,
            nombre: item.name,
            precio: item.price,
            cantidad: item.quantity,
          })),
          subtotal,
          envio: shippingCost,
          total,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Error al crear la orden');
      }

      const orderData = await orderResponse.json();
      const referencia = orderData.referencia;

      // Guardar referencia en localStorage para la página de gracias
      localStorage.setItem('lastOrderReference', referencia);

      // Generar firma de integridad SHA256
      const amountInCents = total * 100;
      const cadena = referencia + amountInCents + 'COP' + WOMPI_INTEGRITY_KEY;
      const signature = SHA256(cadena).toString();

      // Abrir Wompi Checkout
      const WompiCheckout = (window as any).WidgetCheckout;
      if (WompiCheckout) {
        const checkout = new WompiCheckout({
          currency: 'COP',
          amountInCents,
          reference: referencia,
          publicKey: WOMPI_PUBLIC_KEY,
          signature: {
            integrity: signature,
          },
          redirectUrl: `${window.location.origin}/gracias?referencia=${referencia}`,
        });
        checkout.open((transaction: any) => {
          console.log('Transaction:', transaction);
        });
      } else {
        console.error('Wompi Checkout no está disponible');
        setErrors({ wompi: 'Error al cargar el sistema de pago' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ checkout: error instanceof Error ? error.message : 'Error desconocido' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Header */}
      <header className="bg-cream-100 border-b border-cream-200 py-4 px-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setLocation('/cart')}
            className="p-2 hover:bg-cream-200 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5 text-charcoal-700" />
          </button>
          <h1 className="text-2xl font-bold text-charcoal-900">Finalizar compra</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Error Messages */}
          {(errors.cart || errors.checkout || errors.wompi) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">
                  {errors.cart || errors.checkout || errors.wompi}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Información de envío</h2>

                <div className="space-y-6">
                  {/* Nombre y Apellido */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Juan"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.firstName ? 'border-red-500' : 'border-cream-300'
                        } focus:outline-none focus:ring-2 focus:ring-guayaba-500`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Pérez"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.lastName ? 'border-red-500' : 'border-cream-300'
                        } focus:outline-none focus:ring-2 focus:ring-guayaba-500`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email y Teléfono */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="juan@example.com"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-cream-300'
                        } focus:outline-none focus:ring-2 focus:ring-guayaba-500`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="300 123 4567"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone ? 'border-red-500' : 'border-cream-300'
                        } focus:outline-none focus:ring-2 focus:ring-guayaba-500`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Dirección */}
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Dirección completa *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Calle 123 #45-67"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.address ? 'border-red-500' : 'border-cream-300'
                      } focus:outline-none focus:ring-2 focus:ring-guayaba-500`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Departamento y Ciudad */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Departamento *
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.department ? 'border-red-500' : 'border-cream-300'
                        } focus:outline-none focus:ring-2 focus:ring-guayaba-500 bg-white`}
                      >
                        <option value="">Selecciona un departamento</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Ciudad *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!formData.department}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.city ? 'border-red-500' : 'border-cream-300'
                        } focus:outline-none focus:ring-2 focus:ring-guayaba-500 bg-white disabled:bg-cream-100 disabled:text-charcoal-400`}
                      >
                        <option value="">
                          {formData.department ? 'Selecciona una ciudad' : 'Selecciona departamento primero'}
                        </option>
                        {availableCities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  {/* Notas adicionales */}
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Notas adicionales (opcional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Ej: Entregar entre 9am-5pm, dejar en portería..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-cream-300 focus:outline-none focus:ring-2 focus:ring-guayaba-500 resize-none"
                    />
                  </div>

                  {/* Aceptar terminos */}
                  <div className="mt-6 p-4 bg-guayaba-50 rounded-lg border border-guayaba-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => {
                          setAcceptedTerms(e.target.checked);
                          if (errors.terms) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.terms;
                              return newErrors;
                            });
                          }
                        }}
                        className="w-5 h-5 mt-0.5 accent-guayaba-500 cursor-pointer"
                      />
                      <span className="text-sm text-charcoal-700">
                        He leido y acepto los{' '}
                        <a
                          href="/terminos-y-condiciones"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-guayaba-500 hover:text-guayaba-600 font-semibold underline"
                        >
                          Terminos y Condiciones
                        </a>
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-red-500 text-sm mt-2">{errors.terms}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Resumen del pedido</h3>

                {/* Productos */}
                <div className="space-y-3 border-b border-cream-200 pb-4 mb-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-charcoal-800">{item.name}</p>
                        <p className="text-sm text-charcoal-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-charcoal-900">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </p>
                    </div>
                  ))}

                </div>

                {/* Desglose de precios */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-charcoal-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-700">
                    <span>Envío</span>
                    <span>${shippingCost.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-charcoal-900 pt-2 border-t border-cream-200">
                    <span>Total</span>
                    <span className="text-guayaba-500">${total.toLocaleString('es-CO')}</span>
                  </div>
                </div>

                {/* Botón de pago */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  style={{
                    backgroundColor: isLoading ? '#ccc' : '#ff4fa3',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '14px 24px',
                    fontWeight: '600',
                    fontSize: '16px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      (e.target as HTMLButtonElement).style.backgroundColor = '#e84393';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      (e.target as HTMLButtonElement).style.backgroundColor = '#ff4fa3';
                    }
                  }}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Finalizar compra'
                  )}
                </button>

                <p className="text-xs text-charcoal-500 text-center mt-3">
                  Serás redirigido a Wompi para completar el pago
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

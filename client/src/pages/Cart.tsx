import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWompiCheckout } from '@/hooks/useWompiCheckout';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { openCheckout } = useWompiCheckout();

  const WOMPI_PUBLIC_KEY = 'pub_prod_WYZrZvxxwpC34MYOIc5vDijzSwNB50PR';
  const WOMPI_CURRENCY = 'COP';

  const handleCheckout = () => {
    if (items.length === 0) return;

    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const total = getTotalPrice();
      const amountInCents = Math.round(total * 100);
      const reference = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      openCheckout({
        amountInCents,
        currency: WOMPI_CURRENCY,
        reference,
        publicKey: WOMPI_PUBLIC_KEY,
        customerEmail: undefined,
        onSuccess: (transactionId: string) => {
          console.log('Pago exitoso:', transactionId);
          clearCart();
          setIsCheckingOut(false);
          setLocation('/checkout-success');
        },
        onError: (error: string) => {
          console.error('Error en pago:', error);
          setCheckoutError(error);
          setIsCheckingOut(false);
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setCheckoutError(errorMessage);
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff6ea] flex flex-col">
      <main className="flex-1 pt-24 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setLocation('/shop')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Volver a la tienda
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Mi Carrito</h1>
          </div>

          {items.length === 0 ? (
            // Carrito vacío
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-6">Agrega productos para comenzar a comprar</p>
              <Button
                onClick={() => setLocation('/shop')}
                className="bg-[#d946a6] hover:bg-[#c0368a] text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            // Carrito con productos
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Header tabla */}
                  <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50">
                    <div className="col-span-1">Imagen</div>
                    <div className="col-span-4">Producto</div>
                    <div className="col-span-2">Precio</div>
                    <div className="col-span-3">Cantidad</div>
                    <div className="col-span-2">Total</div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                      >
                        {/* Imagen */}
                        <div className="md:col-span-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </div>

                        {/* Nombre */}
                        <div className="md:col-span-4">
                          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        </div>

                        {/* Precio unitario */}
                        <div className="md:col-span-2">
                          <p className="text-gray-600">
                            {item.price.toLocaleString('es-CO')} COP
                          </p>
                        </div>

                        {/* Cantidad */}
                        <div className="md:col-span-3">
                          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-3 py-2 font-semibold text-gray-900 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="md:col-span-2 flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            {(item.price * item.quantity).toLocaleString('es-CO')} COP
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-50 rounded transition ml-auto"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resumen de compra */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Resumen</h2>

                  {/* Detalles */}
                  <div className="space-y-3 border-b border-gray-200 pb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>{getTotalPrice().toLocaleString('es-CO')} COP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Envío:</span>
                      <span>A confirmar</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Impuestos:</span>
                      <span>Incluidos</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-[#d946a6]">
                      {getTotalPrice().toLocaleString('es-CO')} COP
                    </span>
                  </div>

                  {/* Error message */}
                  {checkoutError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-900 font-semibold text-sm">Error en el pago</p>
                        <p className="text-red-700 text-sm">{checkoutError}</p>
                      </div>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      disabled={isCheckingOut || items.length === 0}
                      className="w-full bg-[#d946a6] hover:bg-[#c0368a] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                    >
                      {isCheckingOut ? 'Abriendo Wompi...' : 'Finalizar compra'}
                    </Button>
                    <Button
                      onClick={() => setLocation('/shop')}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition"
                    >
                      Continuar comprando
                    </Button>
                  </div>

                  {/* Nota */}
                  <p className="text-xs text-gray-500 text-center">
                    Paga de forma segura con Wompi
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

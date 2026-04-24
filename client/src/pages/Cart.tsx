import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import CheckoutSection from '@/components/CheckoutSection';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [, setLocation] = useLocation();

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

                  {/* Sección de checkout con Wompi */}
                  <CheckoutSection totalPrice={getTotalPrice()} hasItems={items.length > 0} />

                  {/* Botón continuar comprando */}
                  <Button
                    onClick={() => setLocation('/shop')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition"
                  >
                    Continuar comprando
                  </Button>

                  {/* Nota de seguridad */}
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

import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [, setLocation] = useLocation();

  const handleGoToCart = () => {
    setLocation('/cart');
    onClose();
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Construir mensaje para WhatsApp
    const message = items
      .map((item) => `${item.name} x${item.quantity} - ${item.price.toLocaleString('es-CO')} COP`)
      .join('\n');

    const total = getTotalPrice();
    const fullMessage = `Hola, me gustaría hacer un pedido:\n\n${message}\n\nTotal: ${total.toLocaleString('es-CO')} COP`;

    // Redirigir a WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel lateral */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Carrito</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm mt-2">Agrega productos para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border border-gray-200 rounded-lg p-4"
                >
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.price.toLocaleString('es-CO')} COP
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded transition"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-2 font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con resumen */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>{getTotalPrice().toLocaleString('es-CO')} COP</span>
            </div>

            {/* Total */}
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total:</span>
              <span className="text-[#d946a6]">
                {getTotalPrice().toLocaleString('es-CO')} COP
              </span>
            </div>

            {/* Botones */}
            <Button
              onClick={handleGoToCart}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Ir al carrito
            </Button>
            <Button
              onClick={handleCheckout}
              className="w-full bg-[#d946a6] hover:bg-[#c0368a] text-white py-3 rounded-lg font-semibold transition"
            >
              Finalizar pedido por WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

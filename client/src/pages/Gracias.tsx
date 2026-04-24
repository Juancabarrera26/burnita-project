import { useLocation } from 'wouter';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function Gracias() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#fff6ea] flex flex-col">
      <main className="flex-1 pt-24 px-4 pb-12 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center space-y-6">
            {/* Icono de éxito */}
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Título */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pago realizado con éxito!</h1>
              <p className="text-gray-600">
                Gracias por tu compra. Pronto recibirás un email con los detalles de tu pedido y el estado del envío.
              </p>
            </div>

            {/* Detalles */}
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estado:</span>
                <span className="font-semibold text-green-600">Confirmado</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Próximo paso:</span>
                <span className="font-semibold text-gray-900">Preparar envío</span>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <Button
                onClick={() => setLocation('/shop')}
                className="w-full bg-[#d946a6] hover:bg-[#c0368a] text-white py-3 rounded-lg font-semibold transition"
              >
                Continuar comprando
              </Button>
              <Button
                onClick={() => setLocation('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition"
              >
                Ir al inicio
              </Button>
            </div>

            {/* Nota */}
            <p className="text-xs text-gray-500">
              Revisa tu email para el comprobante de pago y detalles del envío.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

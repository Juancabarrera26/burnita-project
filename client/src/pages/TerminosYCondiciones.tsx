import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TerminosYCondiciones() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-guayaba-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        {/* Términos y Condiciones */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-charcoal-900 mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg max-w-none text-charcoal-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Introducción</h2>
              <p>
                Bienvenido a Burnita. Al acceder a nuestro sitio web y realizar una compra, aceptas los siguientes términos y condiciones. Te recomendamos leerlos con atención antes de comprar.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Sobre nuestros productos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>En Burnita elaboramos velas artesanales de cera de soja, hechas a mano.</li>
                <li>Cada pieza es única, por lo que pueden existir ligeras variaciones en color, textura o detalles frente a las imágenes mostradas.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Precios y pagos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Todos los precios están expresados en pesos colombianos (COP) e incluyen impuestos.</li>
                <li>Los pagos se procesan de forma segura a través de Wompi.</li>
                <li>Burnita no almacena datos de tarjetas ni información financiera del cliente.</li>
                <li>El pedido solo será procesado una vez el pago haya sido aprobado.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Envíos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Realizamos envíos a todo Colombia.</li>
                <li>El costo de envío es de $15.000 COP y se incluye en el total de la compra.</li>
                <li>El tiempo estimado de entrega es de 3 a 7 días hábiles después de la confirmación del pago.</li>
                <li>Es responsabilidad del cliente ingresar correctamente los datos de envío. No nos hacemos responsables por retrasos o problemas derivados de información incorrecta.</li>
                <li>La entrega podrá realizarse a: el comprador, un tercero autorizado, o portería/recepción del lugar.</li>
                <li>Una vez entregado el producto, la responsabilidad pasa al cliente.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Devoluciones y reembolsos</h2>
              <p className="mb-3">Al tratarse de productos artesanales, no se aceptan devoluciones por cambio de opinión, gusto o percepción del tamaño.</p>
              <p className="font-semibold mb-2">Solo aplican devoluciones en los siguientes casos:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Producto dañado</li>
                <li>Error en el pedido</li>
                <li>Producto incorrecto</li>
              </ul>
              <p className="mb-3">Debes reportarlo dentro de las primeras 48 horas después de recibirlo, enviando evidencia (foto o video).</p>
              <p className="font-semibold mb-2">Si aplica:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Se realizará cambio del producto, o</li>
                <li>Reembolso del dinero</li>
              </ul>
              <p>El reembolso se procesa entre 5 y 7 días hábiles después de recibir el producto.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Uso del producto</h2>
              <p className="mb-3">Las velas deben usarse con precaución:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>No dejar encendidas sin supervisión</li>
                <li>Mantener lejos de niños y mascotas</li>
                <li>Usar sobre superficies resistentes al calor</li>
                <li>Evitar contacto con materiales inflamables</li>
              </ul>
              <p>Burnita no se hace responsable por daños derivados del mal uso del producto.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Propiedad intelectual</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Todo el contenido del sitio (imágenes, textos, diseño, marca) pertenece a Burnita.</li>
                <li>No está permitido su uso sin autorización.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Modificaciones</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Burnita puede actualizar estos términos en cualquier momento.</li>
                <li>El uso continuo del sitio implica aceptación de los cambios.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Contacto</h2>
              <p className="mb-3">Para cualquier duda puedes escribirnos a:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email: Info@burnita.com</li>
                <li>WhatsApp: 3214175699</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Política de Privacidad */}
        <section className="mb-16 pt-16 border-t-2 border-guayaba-200">
          <h1 className="text-4xl font-bold text-charcoal-900 mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none text-charcoal-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. Responsable</h2>
              <p>
                Burnita es responsable del tratamiento de tus datos personales.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. Información que recopilamos</h2>
              <p className="mb-3">Cuando realizas una compra, recopilamos:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Nombre y apellido</li>
                <li>Correo electrónico</li>
                <li>Teléfono</li>
                <li>Dirección de envío (ciudad y departamento)</li>
              </ul>
              <p className="mb-2">Los datos de pago son procesados directamente por Wompi.</p>
              <p>Burnita no tiene acceso a tu información bancaria.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. Uso de la información</h2>
              <p className="mb-3">Usamos tus datos para:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Procesar tu pedido</li>
                <li>Gestionar envíos</li>
                <li>Contactarte si hay algún problema con tu compra</li>
              </ul>
              <p className="mt-3">No vendemos ni compartimos tus datos con terceros con fines comerciales.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. Compartición de datos</h2>
              <p className="mb-3">Solo compartimos información cuando es necesario:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Empresas de envío (para entregar tu pedido)</li>
                <li>Wompi (para procesar el pago)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. Almacenamiento</h2>
              <p>
                Los datos se almacenan únicamente para gestión de pedidos y control interno.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. Derechos del usuario</h2>
              <p className="mb-3">Puedes solicitar en cualquier momento:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Acceso a tus datos</li>
                <li>Corrección</li>
                <li>Eliminación</li>
              </ul>
              <p>Escribiendo a: <a href="mailto:Info@burnita.com" className="text-guayaba hover:underline">Info@burnita.com</a></p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">7. Seguridad</h2>
              <p>
                Tomamos medidas para proteger tu información, pero ningún sistema es 100% seguro.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">8. Cambios</h2>
              <p>
                Esta política puede actualizarse en cualquier momento.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">9. Contacto</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Email: <a href="mailto:Info@burnita.com" className="text-guayaba hover:underline">Info@burnita.com</a></li>
                <li>WhatsApp: 3214175699</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Última actualización */}
        <div className="text-center text-charcoal-600 text-sm mt-12 pt-8 border-t border-guayaba-200">
          <p>Última actualización: Mayo 2026</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

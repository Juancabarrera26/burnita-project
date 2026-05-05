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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Identidad del responsable</h2>
              <p>
                Burnita es el responsable del tratamiento de datos personales. Nos comprometemos a proteger tu privacidad y a cumplir con todas las leyes aplicables de protección de datos en Colombia.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Datos recopilados</h2>
              <p className="mb-3">Recopilamos la siguiente información personal:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Datos de contacto:</strong> Nombre, apellido, email, teléfono</li>
                <li><strong>Datos de envío:</strong> Dirección completa, ciudad, departamento</li>
                <li><strong>Datos de pago:</strong> Procesados de forma segura a través de Wompi (no almacenamos tarjetas)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Finalidad del uso de datos</h2>
              <p className="mb-3">Tus datos personales se utilizan para:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Procesar y completar tus órdenes de compra</li>
                <li>Enviar confirmaciones de pedido y actualizaciones de envío</li>
                <li>Contactarte en caso de problemas con tu orden</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
                <li>Cumplir con obligaciones legales y fiscales</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Base legal</h2>
              <p>
                El tratamiento de tus datos se basa en: tu consentimiento explícito al realizar una compra, la ejecución del contrato de compra-venta, y nuestras obligaciones legales.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Compartición de datos</h2>
              <p className="mb-3">Tus datos pueden ser compartidos con terceros de confianza únicamente para:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Empresas de envío:</strong> Para procesar la entrega de tu orden</li>
                <li><strong>Procesadores de pago:</strong> Wompi, para procesar pagos de forma segura</li>
                <li><strong>Autoridades:</strong> Si es requerido por ley</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Tiempo de almacenamiento</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Datos de órdenes: Se conservan durante 3 años para fines contables y fiscales</li>
                <li>Datos de contacto: Se conservan mientras tengas una relación comercial activa</li>
                <li>Después del período de retención, los datos se eliminan de forma segura</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Derechos del usuario</h2>
              <p className="mb-3">Tienes derecho a:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li><strong>Acceso:</strong> Solicitar acceso a tus datos personales</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en formato legible</li>
                <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
              </ul>
              <p>Para ejercer cualquiera de estos derechos, contáctanos a: Info@burnita.com</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Uso de cookies</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                <li><strong>Cookies de análisis:</strong> Para entender cómo los usuarios interactúan con nuestro sitio</li>
                <li>Puedes desactivar cookies en la configuración de tu navegador</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Edad mínima</h2>
              <p>
                Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente datos de menores de edad.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Contacto</h2>
              <p className="mb-3">Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tus datos, contáctanos a:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email: Info@burnita.com</li>
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

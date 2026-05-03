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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. Introducción y Aceptación de Términos</h2>
              <p>
                Bienvenido a Burnita Shop ("Sitio Web"). Al acceder y utilizar este sitio web, así como al realizar compras, 
                usted acepta estar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos 
                términos, le recomendamos que no utilice nuestros servicios.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. Descripción del Servicio</h2>
              <p>
                Burnita Shop es una tienda online especializada en la venta de velas artesanales de cera de soja, elaboradas 
                de forma manual con ingredientes naturales. Ofrecemos una variedad de aromas, colores y diseños personalizados 
                para satisfacer las necesidades de nuestros clientes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. Precios y Métodos de Pago</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Todos los precios están expresados en Pesos Colombianos (COP) e incluyen impuestos.</li>
                <li>Los precios pueden cambiar sin previo aviso, pero los cambios no afectarán órdenes ya confirmadas.</li>
                <li>Aceptamos pagos a través de Wompi, plataforma de pago segura certificada.</li>
                <li>El pago debe completarse antes de que se procese su orden.</li>
                <li>Garantizamos la seguridad de sus datos de pago mediante encriptación SSL.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. Envíos y Entregas</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>El costo de envío es de $15.000 COP para todo el territorio colombiano.</li>
                <li>Los tiempos de entrega son de 3 a 7 días hábiles después de confirmado el pago.</li>
                <li>Nos reservamos el derecho de rechazar entregas en zonas de difícil acceso.</li>
                <li>El cliente es responsable de proporcionar una dirección correcta y completa.</li>
                <li>Burnita Shop no se responsabiliza por daños causados por terceros durante el transporte.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. Devoluciones y Reembolsos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Los clientes tienen un plazo de 14 días desde la fecha de entrega para solicitar devoluciones.</li>
                <li>Las velas deben estar sin usar, en su empaque original y en perfecto estado.</li>
                <li>Los motivos válidos para devolución incluyen: producto defectuoso, daño en tránsito, o error en el pedido.</li>
                <li>Los reembolsos se procesarán en un plazo de 5 a 10 días hábiles después de recibir el producto.</li>
                <li>El cliente debe contactar a nuestro equipo de atención al cliente para iniciar el proceso de devolución.</li>
                <li>Los gastos de envío para devoluciones corren por cuenta del cliente, excepto en caso de error nuestro.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. Uso Seguro del Producto</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Las velas deben usarse en superficies planas, resistentes al calor y alejadas de materiales inflamables.</li>
                <li>Nunca deje velas encendidas sin supervisión.</li>
                <li>Mantenga las velas alejadas del alcance de niños y mascotas.</li>
                <li>Recorte la mecha a 1 cm antes de cada uso para evitar humo excesivo.</li>
                <li>No use las velas en espacios cerrados sin ventilación adecuada.</li>
                <li>Burnita Shop no se responsabiliza por lesiones o daños causados por mal uso del producto.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">7. Propiedad Intelectual</h2>
              <p>
                Todo el contenido del sitio web, incluyendo textos, imágenes, logotipos, diseños y fotografías, son propiedad 
                intelectual de Burnita Shop o están utilizados con permiso. Está prohibido reproducir, distribuir o transmitir 
                cualquier contenido sin autorización expresa.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">8. Limitación de Responsabilidad</h2>
              <p>
                Burnita Shop no se responsabiliza por daños indirectos, incidentales, especiales o consecuentes derivados del 
                uso o la imposibilidad de usar nuestros servicios. Nuestra responsabilidad se limita al monto total pagado por 
                la orden.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">9. Modificación de Términos</h2>
              <p>
                Burnita Shop se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios 
                serán efectivos inmediatamente después de su publicación en el sitio web. El uso continuado del sitio constituye 
                aceptación de los términos modificados.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">10. Ley Aplicable</h2>
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Cualquier disputa será 
                resuelta en los juzgados competentes de Colombia.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">11. Información de Contacto</h2>
              <p>
                Para preguntas sobre estos Términos y Condiciones, contáctenos a través de:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Email: contacto@burnitashop.com</li>
                <li>WhatsApp: +57 300 123 4567</li>
                <li>Formulario de contacto en nuestro sitio web</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Política de Privacidad */}
        <section className="mb-16 pt-16 border-t-2 border-guayaba-200">
          <h1 className="text-4xl font-bold text-charcoal-900 mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none text-charcoal-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. Identidad del Responsable</h2>
              <p>
                Burnita Shop es el responsable del tratamiento de datos personales. Nos comprometemos a proteger su privacidad 
                y a cumplir con todas las leyes aplicables de protección de datos en Colombia.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. Datos Recopilados</h2>
              <p>Recopilamos la siguiente información personal:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Datos de contacto:</strong> Nombre, apellido, email, teléfono</li>
                <li><strong>Datos de envío:</strong> Dirección completa, ciudad, departamento</li>
                <li><strong>Datos de pago:</strong> Información de tarjeta (procesada de forma segura por Wompi)</li>
                <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. Finalidad del Uso de Datos</h2>
              <p>Sus datos personales se utilizan para:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Procesar y completar sus órdenes de compra</li>
                <li>Enviar confirmaciones de pedido y actualizaciones de envío</li>
                <li>Contactarlo en caso de problemas con su orden</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
                <li>Enviar promociones y ofertas (solo si ha consentido)</li>
                <li>Cumplir con obligaciones legales y fiscales</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. Base Legal</h2>
              <p>
                El tratamiento de sus datos se basa en: (a) su consentimiento explícito al realizar una compra, 
                (b) la ejecución del contrato de compra-venta, y (c) nuestras obligaciones legales.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. Compartición de Datos</h2>
              <p>
                Sus datos pueden ser compartidos con terceros de confianza únicamente para:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Empresas de envío:</strong> Para procesar la entrega de su orden</li>
                <li><strong>Procesadores de pago:</strong> Wompi, para procesar pagos de forma segura</li>
                <li><strong>Proveedores de servicios:</strong> Hosting, email, análisis (bajo acuerdos de confidencialidad)</li>
                <li><strong>Autoridades:</strong> Si es requerido por ley</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. Tiempo de Almacenamiento</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Datos de órdenes: Se conservan durante 3 años para fines contables y fiscales</li>
                <li>Datos de contacto: Se conservan mientras tenga una cuenta o relación comercial activa</li>
                <li>Datos de marketing: Se conservan hasta que se retire su consentimiento</li>
                <li>Después del período de retención, los datos se eliminan de forma segura</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">7. Derechos del Usuario</h2>
              <p>
                Usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Acceso:</strong> Solicitar acceso a sus datos personales</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos (derecho al olvido)</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en formato legible</li>
                <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
                <li><strong>Restricción:</strong> Limitar el procesamiento de sus datos</li>
              </ul>
              <p className="mt-4">
                Para ejercer cualquiera de estos derechos, contáctenos a: contacto@burnitashop.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">8. Uso de Cookies</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                <li><strong>Cookies de análisis:</strong> Para entender cómo los usuarios interactúan con nuestro sitio</li>
                <li><strong>Cookies de marketing:</strong> Para personalizar anuncios (solo con consentimiento)</li>
                <li>Puede desactivar cookies en la configuración de su navegador</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">9. Edad Mínima</h2>
              <p>
                Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente datos de 
                menores de edad. Si descubrimos que hemos recopilado datos de un menor, los eliminaremos inmediatamente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">10. Seguridad de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizacionales para proteger sus datos contra acceso no 
                autorizado, alteración o destrucción. Sin embargo, ningún método de transmisión por internet es 100% seguro.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">11. Cambios en la Política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios serán 
                efectivos inmediatamente después de su publicación. Le recomendamos revisar esta política periódicamente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">12. Contacto</h2>
              <p>
                Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos sus datos, contáctenos a:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Email: contacto@burnitashop.com</li>
                <li>WhatsApp: +57 300 123 4567</li>
                <li>Formulario de contacto en nuestro sitio web</li>
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

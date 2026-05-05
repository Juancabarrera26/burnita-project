/**
 * FAQ Page - BURNITA
 * Preguntas Frecuentes
 * Diseño: Limpio, minimalista, coherente con la marca
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqData: FAQItem[] = [
  {
    category: "Envíos",
    questions: [
      {
        question: "¿A dónde envían?",
        answer:
          "Realizamos envíos a todo Colombia. El costo de envío es de $15.000 COP y se incluye en el total de la compra.",
      },
      {
        question: "¿Cuál es el tiempo de entrega?",
        answer:
          "El tiempo estimado de entrega es de 3 a 7 días hábiles después de la confirmación del pago.",
      },
      {
        question: "¿Puedo cambiar la dirección después de comprar?",
        answer:
          "Si tu pedido aún no ha sido procesado, puedes contactarnos a través de WhatsApp (3214175699) o email (Info@burnita.com) para solicitar cambios. Si ya fue enviado, no es posible modificar la dirección.",
      },
    ],
  },
  {
    category: "Pagos",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos todos los métodos de pago a través de Wompi: tarjetas de crédito, débito, transferencia bancaria y billeteras digitales.",
      },
      {
        question: "¿Es seguro pagar en línea?",
        answer:
          "Sí, completamente. Los pagos se procesan de forma segura a través de Wompi. Burnita no almacena datos de tarjetas ni información financiera.",
      },
      {
        question: "¿Recibo confirmación del pago?",
        answer:
          "Sí, recibirás un correo de confirmación inmediatamente después de que tu pago sea aprobado.",
      },
    ],
  },
  {
    category: "Personalización",
    questions: [
      {
        question: "¿Puedo personalizar mis velas?",
        answer:
          "Sí, ofrecemos opciones de personalización. Puedes contactarnos a Info@burnita.com o WhatsApp 3214175699 para conocer las opciones disponibles y costos adicionales.",
      },
      {
        question: "¿Cuánto tiempo tarda una vela personalizada?",
        answer:
          "Los tiempos de personalización varían según la solicitud. Te recomendamos contactarnos con anticipación para coordinar fechas.",
      },
    ],
  },
  {
    category: "Tiempos de Entrega",
    questions: [
      {
        question: "¿Puedo solicitar entrega urgente?",
        answer:
          "No ofrecemos servicio de entrega urgente actualmente. Trabajamos con los tiempos estándar de 3 a 7 días hábiles.",
      },
      {
        question: "¿Qué pasa si mi paquete se retrasa?",
        answer:
          "Si tu paquete se retrasa más de lo esperado, contacta a Info@burnita.com o WhatsApp 3214175699 y nos encargaremos de investigar con la transportadora.",
      },
    ],
  },
  {
    category: "Cuidados de la Vela",
    questions: [
      {
        question: "¿Cuánto tiempo dura una vela?",
        answer:
          "El tiempo de quemado depende del tamaño y tipo de vela. En promedio, nuestras velas duran entre 30 y 50 horas de uso continuo.",
      },
      {
        question: "¿Cómo debo cuidar mi vela?",
        answer:
          "Recomendamos: no dejar encendidas sin supervisión, mantener lejos de niños y mascotas, usar sobre superficies resistentes al calor, evitar contacto con materiales inflamables, y recortar la mecha a 1cm antes de cada uso.",
      },
      {
        question: "¿Puedo reutilizar el recipiente?",
        answer:
          "Sí, nuestros recipientes son reutilizables. Puedes usarlos como macetas, portavelas, o contenedores decorativos.",
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="font-body text-lg text-charcoal/60">
            Encuentra respuestas a las preguntas más comunes sobre nuestras velas, envíos, pagos y más.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto space-y-12">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Category Title */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6">
                {section.category}
              </h2>

              {/* Questions */}
              <div className="space-y-3">
                {section.questions.map((item, questionIndex) => {
                  const itemId = `${sectionIndex}-${questionIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div
                      key={itemId}
                      className="border border-charcoal/10 rounded-lg overflow-hidden hover:border-guayaba/30 transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-crema/30 transition-colors"
                      >
                        <span className="font-body font-semibold text-charcoal text-left">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-charcoal/60 flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 py-4 bg-crema/20 border-t border-charcoal/10">
                          <p className="font-body text-charcoal/70 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-charcoal/10">
          <div className="bg-crema/30 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-display text-2xl font-bold text-charcoal mb-3">
              ¿No encontraste tu respuesta?
            </h3>
            <p className="font-body text-charcoal/60 mb-6">
              Contacta directamente con nuestro equipo. Estamos aquí para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/573214175699"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-guayaba text-white font-body font-semibold rounded-full hover:bg-guayaba/90 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:Info@burnita.com"
                className="px-6 py-3 border-2 border-charcoal text-charcoal font-body font-semibold rounded-full hover:bg-charcoal hover:text-crema transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

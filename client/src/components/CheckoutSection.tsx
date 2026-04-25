import { useEffect, useRef } from 'react';
import './CheckoutSection.css';

interface CheckoutSectionProps {
  totalPrice: number;
  hasItems: boolean;
}

export default function CheckoutSection({ totalPrice, hasItems }: CheckoutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  
  const totalInCents = Math.round(totalPrice * 100);
  const reference = `BURNITA-${Date.now()}`;
  const publicKey = 'pub_prod_WYZrZvxxwpC34MYOIc5vDijzSwNB50PR';
  const redirectUrl = `${window.location.origin}/gracias`;

  useEffect(() => {
    if (!hasItems || !containerRef.current) return;

    // Limpiar contenedor antes de renderizar
    containerRef.current.innerHTML = '';

    // Crear script de Wompi solo si no está cargado
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://checkout.wompi.co/widget.js';
      script.async = true;
      script.id = 'wompi-checkout-script';
      script.dataset.render = 'button';
      script.dataset.publicKey = publicKey;
      script.dataset.currency = 'COP';
      script.dataset.amountInCents = totalInCents.toString();
      script.dataset.reference = reference;
      script.dataset.redirectUrl = redirectUrl;

      containerRef.current.appendChild(script);
      scriptLoadedRef.current = true;

      // Esperar a que el botón se renderice y cambiar el texto
      const changeButtonText = () => {
        const button = containerRef.current?.querySelector('button');
        if (button) {
          button.textContent = 'Finalizar compra';
        } else {
          // Reintentar si el botón aún no está disponible
          setTimeout(changeButtonText, 100);
        }
      };

      // Esperar un poco para que Wompi renderice el botón
      setTimeout(changeButtonText, 500);
    }

    return () => {
      // No limpiar el script aquí para evitar duplicación
    };
  }, [hasItems]);

  if (!hasItems) {
    return null;
  }

  return (
    <div className="wompi-button-wrapper">
      <div ref={containerRef} className="w-full checkout-section">
        {/* El script de Wompi se renderizará aquí */}
      </div>
    </div>
  );
}

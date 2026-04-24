import { useEffect, useRef } from 'react';

interface CheckoutSectionProps {
  totalPrice: number;
  hasItems: boolean;
}

export default function CheckoutSection({ totalPrice, hasItems }: CheckoutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalInCents = Math.round(totalPrice * 100);
  const reference = `BURNITA-${Date.now()}`;
  const publicKey = 'pub_prod_WYZrZvxxwpC34MYOIc5vDijzSwNB50PR';
  const redirectUrl = `${window.location.origin}/gracias`;

  useEffect(() => {
    if (!hasItems || !containerRef.current) return;

    // Crear script de Wompi
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    script.dataset.render = 'button';
    script.dataset.publicKey = publicKey;
    script.dataset.currency = 'COP';
    script.dataset.amountInCents = totalInCents.toString();
    script.dataset.reference = reference;
    script.dataset.redirectUrl = redirectUrl;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, [hasItems, totalInCents, reference, publicKey, redirectUrl]);

  if (!hasItems) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* El script de Wompi se renderizará aquí */}
    </div>
  );
}

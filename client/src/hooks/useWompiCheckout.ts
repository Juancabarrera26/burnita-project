import { useEffect, useRef } from 'react';

export interface WompiCheckoutConfig {
  amountInCents: number;
  currency: string;
  reference: string;
  publicKey: string;
  customerEmail?: string;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    WidgetCheckout?: any;
  }
}

export function useWompiCheckout() {
  const scriptLoaded = useRef(false);

  // Cargar el script de Wompi
  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    script.onerror = () => {
      console.error('Error cargando script de Wompi');
    };
    document.body.appendChild(script);

    return () => {
      // No remover el script para evitar problemas con múltiples cargas
    };
  }, []);

  const openCheckout = (config: WompiCheckoutConfig) => {
    if (!window.WidgetCheckout) {
      console.error('Wompi Checkout no está cargado');
      config.onError?.('Error al cargar Wompi Checkout');
      return;
    }

    try {
      const checkout = new window.WidgetCheckout({
        currency: config.currency,
        amountInCents: config.amountInCents,
        reference: config.reference,
        publicKey: config.publicKey,
        customerEmail: config.customerEmail,
        redirectUrl: `${window.location.origin}/checkout-success`,
      });

      // Escuchar eventos
      checkout.addEventListener('payment.success', (event: any) => {
        console.log('Pago exitoso:', event);
        config.onSuccess?.(event.data.transactionId);
      });

      checkout.addEventListener('payment.error', (event: any) => {
        console.error('Error en pago:', event);
        config.onError?.(event.data.message || 'Error en el pago');
      });

      checkout.addEventListener('payment.pending', (event: any) => {
        console.log('Pago pendiente:', event);
      });

      // Abrir el checkout
      checkout.open((error: any) => {
        if (error) {
          console.error('Error al abrir checkout:', error);
          config.onError?.(error.message || 'Error al abrir Wompi Checkout');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      config.onError?.(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return { openCheckout };
}

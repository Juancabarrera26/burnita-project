import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook para manejar scroll al top cuando cambia la ruta
 * Asegura que cada navegación comience desde el inicio de la página
 */
export function useNavigationScroll() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll al top cuando cambia la ruta
    window.scrollTo(0, 0);
  }, [location]);
}

/**
 * Hook para scroll suave a una sección específica
 * Espera a que el DOM esté listo antes de hacer scroll
 */
export function useSmoothScroll(sectionId: string | null, delay: number = 100) {
  useEffect(() => {
    if (!sectionId) return;

    // Esperar a que el DOM esté listo
    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [sectionId, delay]);
}

/**
 * Hook para navegar a una URL y opcionalmente hacer scroll a una sección
 */
export function useSmartNavigation() {
  const [, navigate] = useLocation();

  const navigateTo = (path: string, sectionId?: string) => {
    if (sectionId) {
      // Si hay una sección, navegar y luego hacer scroll
      navigate(path);
      // El scroll se hará automáticamente gracias a useNavigationScroll
      // y luego se ejecutará el scroll suave a la sección
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Solo navegar
      navigate(path);
    }
  };

  return { navigateTo };
}

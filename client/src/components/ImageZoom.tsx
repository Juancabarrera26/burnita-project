import { useState, useRef, useEffect } from 'react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageZoom({ src, alt, className = '' }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ============ DESKTOP: ZOOM CON SEGUIMIENTO DE CURSOR ============
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isZoomed || isMobile) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular porcentaje exacto (0-100%)
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setZoomPosition({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };

  // ============ MOBILE: ZOOM CON ARRASTRE ============
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;

    if (!isZoomed) {
      // Activar zoom
      setIsZoomed(true);
      setDragOffset({ x: 0, y: 0 });
    } else {
      // Iniciar arrastre
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || !isZoomed || !isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    // Calcular diferencia de movimiento
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;

    // Limitar el movimiento (máximo 50% del contenedor en cada dirección)
    const maxOffset = rect.width * 0.3;
    const newX = Math.max(-maxOffset, Math.min(maxOffset, dragOffset.x + deltaX));
    const newY = Math.max(-maxOffset, Math.min(maxOffset, dragOffset.y + deltaY));

    setDragOffset({ x: newX, y: newY });
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchCancel = () => {
    setIsDragging(false);
  };

  // Cerrar zoom en mobile con doble tap
  const handleDoubleTap = () => {
    if (isMobile && isZoomed) {
      setIsZoomed(false);
      setDragOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-lg ${
        isZoomed && isMobile ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
      } ${className}`}
      style={{
        aspectRatio: '1',
        backgroundColor: '#fff6ea',
        touchAction: isZoomed && isMobile ? 'none' : 'auto',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onDoubleClick={handleDoubleTap}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform"
        style={{
          transform: isZoomed
            ? isMobile
              ? `scale(2) translate(${dragOffset.x}px, ${dragOffset.y}px)`
              : `scale(2)`
            : 'scale(1) translate(0, 0)',
          transformOrigin: !isMobile ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
          transitionDuration: isDragging ? '0ms' : '300ms',
        }}
      />

      {/* Indicador de zoom en mobile */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-semibold pointer-events-none">
          {isZoomed ? (
            <span>
              {isDragging ? '👆 Arrastrando...' : '👆 Arrastra para explorar'}
            </span>
          ) : (
            <span>🔍 Toca para zoom</span>
          )}
        </div>
      )}

      {/* Indicador de zoom en desktop */}
      {!isMobile && !isZoomed && (
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          🔍 Pasar mouse para zoom
        </div>
      )}

      {/* Indicador de zoom activo en desktop */}
      {!isMobile && isZoomed && (
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-semibold pointer-events-none">
          ✓ Zoom activo
        </div>
      )}
    </div>
  );
}

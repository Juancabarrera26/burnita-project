import { useState, useRef, useEffect } from 'react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageZoom({ src, alt, className = '' }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  // Manejo de mouse para desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current || isMobile) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular posición relativa (0-1)
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setPosition({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  };

  // Manejo de touch para mobile
  const handleTouchStart = () => {
    if (isMobile) {
      setIsZoomed(!isZoomed);
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
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-300"
        style={{
          transform: isZoomed
            ? `scale(2) translate(calc(${position.x}% - 50%), calc(${position.y}% - 50%))`
            : 'scale(1) translate(0, 0)',
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />

      {/* Indicador de zoom en mobile */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {isZoomed ? '✕ Cerrar zoom' : '🔍 Zoom'}
        </div>
      )}

      {/* Indicador de zoom en desktop */}
      {!isMobile && !isZoomed && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity">
          🔍 Pasar mouse
        </div>
      )}
    </div>
  );
}

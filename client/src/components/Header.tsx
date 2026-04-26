/**
 * Header Component - BURNITA
 * Brandbook: Charcoal Night para textos/logo
 * Tipografía: Manrope para logo, Inter para navegación
 * Navegación limpia: Logo + Links + Carrito (SIN botón de login)
 * Mobile Menu: Modal flotante tipo tarjeta premium (no sidebar)
 */

import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLocation } from "wouter";

const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Shop", href: "/shop" },
  { label: "Colecciones", href: "/#colecciones" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

interface HeaderProps {
  onCartClick?: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath] = useLocation();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Cerrar menú cuando cambia la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Cerrar menú al presionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        handleMobileMenuClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/#inicio" && currentPath === "/") return true;
    if (href === "/shop" && currentPath === "/shop") return true;
    return false;
  };

  return (
    <>
      {/* Header - Siempre con fondo sólido */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-crema shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Imagen Burnita */}
            <a href="/" className="hover:opacity-80 transition-opacity">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/ZVHHNJjKALrylsDS.png"
                alt="Burnita Logo"
                className="h-12 md:h-16 w-auto"
              />
            </a>

            {/* Desktop Navigation - Inter 500 */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions - Solo carrito e ícono de menú móvil */}
            <div className="flex items-center gap-4">
              <button
                onClick={onCartClick}
                className="relative p-2 text-charcoal/80 hover:text-guayaba transition-colors"
                aria-label="Abrir carrito"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-guayaba text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-charcoal"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Modal - Floating Card */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay oscuro con backdrop-blur */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={handleMobileMenuClose}
            style={{
              animation: "fadeIn 0.3s ease-out",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          {/* Modal Card Menu - Centrado */}
          <div
            className="fixed z-50 md:hidden"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(90vw, 340px)",
              animation: "fadeInScale 0.3s ease-out",
            }}
          >
            <div
              className="bg-crema rounded-2xl p-8 shadow-2xl"
              style={{
                boxShadow:
                  "0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Menu Items */}
              <nav className="flex flex-col gap-3">
                {navLinks.map((link, index) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={handleMobileMenuClose}
                      className={`px-4 py-3 rounded-lg font-body text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-guayaba text-white"
                          : "text-charcoal hover:bg-crema-light hover:text-guayaba"
                      }`}
                      style={{
                        animation: `slideInItem 0.3s ease-out ${
                          index * 0.05
                        }s backwards`,
                      }}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Estilos de animación */}
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.92);
              }
              to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
            }

            @keyframes slideInItem {
              from {
                opacity: 0;
                transform: translateY(-8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
}

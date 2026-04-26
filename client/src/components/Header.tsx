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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath] = useLocation();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Cerrar menú cuando cambia la ruta
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const isLinkActive = (href: string) => {
    if (href === "/#inicio" && currentPath === "/") return true;
    if (href === "/shop" && currentPath === "/shop") return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-crema/95 backdrop-blur-sm shadow-sm"
          : "bg-crema shadow-sm"
      }`}
    >
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

      {/* Mobile Menu Modal - Floating Card */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay oscuro con backdrop-blur */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={handleMobileMenuClose}
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
          />

          {/* Modal Card Menu */}
          <div
            className="fixed top-1/2 left-1/2 z-50 md:hidden transition-all duration-300"
            style={{
              transform: "translate(-50%, -50%)",
              width: "80vw",
              maxWidth: "320px",
              animation: "fadeInScale 0.3s ease-out",
            }}
          >
            <div
              className="bg-charcoal rounded-2xl p-8 shadow-2xl"
              style={{
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Menu Items */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={handleMobileMenuClose}
                      className={`px-4 py-3 rounded-full font-body text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-guayaba/20 text-guayaba"
                          : "text-crema hover:text-guayaba"
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
                transform: translate(-50%, -50%) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
            }

            @keyframes slideInItem {
              from {
                opacity: 0;
                transform: translateX(-10px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </>
      )}
    </header>
  );
}

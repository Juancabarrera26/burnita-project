/**
 * Header Component - BURNITA
 * Brandbook: Charcoal Night para textos/logo
 * Tipografía: Manrope para logo, Inter para navegación
 * Navegación limpia: Logo + Links + Carrito (SIN botón de login)
 */

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-crema/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
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
              <ShoppingBag className="w-5 h-5" />
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

      {/* Mobile Menu Drawer - Lateral desde la derecha */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay oscuro */}
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={handleMobileMenuClose}
            style={{ top: "64px" }}
          />

          {/* Drawer Menu */}
          <div
            className="fixed top-16 right-0 bottom-0 w-4/5 max-w-xs z-40 md:hidden transition-transform duration-300 ease-out"
            style={{
              backgroundColor: "#FFF6EA",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
              transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <nav className="flex flex-col gap-6 p-6 pt-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleMobileMenuClose}
                  className="font-body text-lg font-medium text-charcoal hover:text-guayaba transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

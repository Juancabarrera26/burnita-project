/**
 * Header Component - BURNITA
 * Brandbook: Charcoal Night para textos/logo
 * Tipografía: Manrope para logo, Inter para navegación
 * Navegación limpia: Logo + Links + Carrito (SIN botón de login)
 */

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Shop", href: "#products" },
  { label: "Colecciones", href: "#categories" },
  { label: "Nosotros", href: "#about" },
  { label: "Contacto", href: "#newsletter" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <a
            href="#"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/lATeDrfPhZfExvMs.png"
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
              className="p-2 text-charcoal/80 hover:text-guayaba transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-charcoal/10">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-base font-medium text-charcoal/80 hover:text-charcoal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

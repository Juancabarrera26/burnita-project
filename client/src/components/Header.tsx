/**
 * Header Component - Burnita Shop
 * Design: Warm Minimalism with Neo-Artisan touches
 * Features: Sticky navigation, transparent to solid on scroll
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
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
          ? "bg-cream/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl md:text-3xl text-brown-dark hover:opacity-80 transition-opacity"
          >
            Burnita.
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm font-medium text-brown-dark/80 hover:text-brown-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-brown-dark/80 hover:text-brown-dark transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex bg-gold hover:bg-gold/90 text-white font-sans font-medium rounded-full px-5"
            >
              Sign In
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-brown-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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
          <div className="md:hidden py-4 border-t border-brown-dark/10">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-base font-medium text-brown-dark/80 hover:text-brown-dark transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="default"
                size="sm"
                className="sm:hidden bg-gold hover:bg-gold/90 text-white font-sans font-medium rounded-full w-full mt-2"
              >
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

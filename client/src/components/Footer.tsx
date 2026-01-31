/**
 * Footer Component - Burnita Shop
 * Design: Dark brown background with organized links
 * Features: Logo, navigation columns, social links, legal
 */

import { Instagram, Facebook, Twitter } from "lucide-react";

const shopLinks = [
  { label: "All Candles", href: "#products" },
  { label: "New Arrivals", href: "#products" },
  { label: "Burnita Lab", href: "#" },
  { label: "Gift Sets", href: "#" },
];

const companyLinks = [
  { label: "Our Story", href: "#about" },
  { label: "Sustainability", href: "#" },
  { label: "Contact Us", href: "#newsletter" },
  { label: "FAQ", href: "#" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-brown-dark py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="font-serif text-2xl md:text-3xl text-cream hover:opacity-80 transition-opacity inline-block mb-4"
            >
              Burnita.
            </a>
            <p className="font-sans text-sm text-cream/60 leading-relaxed max-w-xs">
              Handcrafted soy candles made to illuminate your space and elevate
              your mood.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-sans text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-sans text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="font-sans text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/40">
            © 2026 Burnita Candles. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-sans text-xs text-cream/40 hover:text-cream/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-xs text-cream/40 hover:text-cream/60 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

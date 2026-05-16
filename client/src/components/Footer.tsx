/**
 * Footer Component - BURNITA
 * Brandbook: Fondo Charcoal Night, texto Crema Vitrina
 * Acentos: Guayaba Pop para hover
 * Tipografía: Manrope para logo, Inter para texto
 */

import { Instagram, Facebook } from "lucide-react";

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 1 1-2.4-2.4c.34 0 .67.03 1 .1V9.81a7.81 7.81 0 0 0-1-.08A4.3 4.3 0 0 0 5 14.53a4.3 4.3 0 0 0 4.3 4.3 4.3 4.3 0 0 0 4.3-4.3V10.88a6.04 6.04 0 0 0 3.7 1.2v-3.4a4.93 4.93 0 0 1-.6-.05z"/>
  </svg>
);

const shopLinks = [
  { label: "Todas las Velas", href: "/#products" },
  { label: "Nuevos Lanzamientos", href: "/#unete-circulo" },
  { label: "BURNITA Lab", href: "/#burnita-lab" },
];

const companyLinks = [
  { label: "Nuestra Historia", href: "/#nosotros" },
  { label: "Contáctanos", href: "/#contacto" },
  { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/burnitacandles/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61589415022349", label: "Facebook" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@burnitacandles", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo - Imagen Burnita */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block mb-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/ZVHHNJjKALrylsDS.png"
                alt="Burnita Logo"
                className="h-12 md:h-16 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </a>
            {/* Description - Inter */}
            <p className="font-body text-sm text-crema/60 leading-relaxed max-w-xs">
              Velas artesanales de cera de soya hechas para iluminar tu espacio y
              elevar tu estado de ánimo.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-body text-sm font-semibold text-crema uppercase tracking-wider mb-4">
              Tienda
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-crema/60 hover:text-guayaba transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-body text-sm font-semibold text-crema uppercase tracking-wider mb-4">
              Compañía
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-crema/60 hover:text-guayaba transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="font-body text-sm font-semibold text-crema uppercase tracking-wider mb-4">
              Síguenos
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-crema/30 flex items-center justify-center text-crema/60 hover:text-guayaba hover:border-guayaba transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-crema/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-crema/40">
            © 2026 BURNITA. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="/terminos-y-condiciones"
              className="font-body text-xs text-crema/40 hover:text-guayaba transition-colors"
              title="Consulta nuestra política de privacidad"
            >
              Política de Privacidad
            </a>
            <a
              href="/terminos-y-condiciones"
              className="font-body text-xs text-crema/40 hover:text-guayaba transition-colors"
              title="Consulta nuestros términos y condiciones de servicio"
            >
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

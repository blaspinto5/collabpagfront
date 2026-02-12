/**
 * Footer Component
 * Clean, minimal footer
 */

import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="sticky bottom-0 z-50 w-full bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Logo" className="h-12" />
              <span className="text-gold font-bold text-xl">Sorteando Weas</span>
            </Link>
            <p className="text-slate-400 text-base max-w-sm mb-6 leading-relaxed">
              La plataforma de sorteos más confiable de Chile.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Youtube} />
              <SocialLink href="mailto:contacto@sorteandoweas.cl" icon={Mail} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <FooterLink to="/sorteos">Sorteos</FooterLink>
              <FooterLink to="/como-funciona">¿Cómo funciona?</FooterLink>
              <FooterLink to="/terminos">Términos</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>contacto@sorteandoweas.cl</li>
              <li>+56 9 1234 5678</li>
              <li>Santiago, Chile</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-10 pt-6 text-center">
          <p className="text-slate-500 text-xs">
            © {year} Sorteando Weas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-gold hover:bg-white/10 transition-colors"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-slate-400 text-sm hover:text-gold transition-colors">
      {children}
    </Link>
  </li>
);

export default Footer;

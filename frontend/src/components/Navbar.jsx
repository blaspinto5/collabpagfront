/**
 * Navbar Component
 * Clean, minimal navigation
 */

import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ticket, LayoutDashboard, Image } from 'lucide-react';
import { useState, useCallback } from 'react';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/sorteos', label: 'Sorteos', icon: Ticket },
  { path: '/ilustraciones', label: 'Ilustraciones', icon: Image },
  { path: '/admin', label: 'Admin', icon: LayoutDashboard },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-24 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-16 md:h-18 lg:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
            <span className="text-gold font-bold text-2xl hidden sm:block tracking-tight">
              Sorteando Weas
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(path)
                    ? 'text-gold bg-gold/15 shadow-lg shadow-gold/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {Icon && <Icon size={18} />}
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-300 hover:text-gold rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5 bg-[#0f172a]/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                    isActive(path)
                      ? 'text-gold bg-gold/15'
                      : 'text-slate-300 hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon size={20} />}
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

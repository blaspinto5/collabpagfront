/**
 * Design System - Centralized Theme
 * All design tokens and style utilities in one place
 * Change values here to update styles across the entire app
 */

// ===========================================
// COLOR PALETTE
// ===========================================
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: '#0a1628',
    light: '#0f2847',
    dark: '#020617',
  },
  
  // Accent colors
  gold: {
    DEFAULT: '#FFD700',
    light: '#ffe44d',
    dark: '#b8860b',
  },
  cyan: {
    DEFAULT: '#00BFFF',
    light: '#66d9ff',
  },
  
  // Semantic colors
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  
  // Neutral colors
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
};

// ===========================================
// SPACING
// ===========================================
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

// ===========================================
// TYPOGRAPHY
// ===========================================
export const typography = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
};

// ===========================================
// BORDER RADIUS
// ===========================================
export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
};

// ===========================================
// SHADOWS
// ===========================================
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  gold: '0 0 30px rgba(255, 215, 0, 0.4)',
  goldIntense: '0 0 40px rgba(255, 215, 0, 0.5)',
};

// ===========================================
// TRANSITIONS
// ===========================================
export const transitions = {
  fast: '150ms ease',
  normal: '300ms ease',
  slow: '500ms ease',
};

// ===========================================
// COMPONENT STYLES - Centralized Tailwind Classes
// ===========================================

// Button variants
export const buttonStyles = {
  base: 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  sizes: {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  },
  variants: {
    primary: 'bg-gradient-to-r from-gold to-amber-600 text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]',
    secondary: 'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-slate-900',
    ghost: 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  },
};

// Card styles
export const cardStyles = {
  base: 'bg-primary-light/60 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300',
  hover: 'hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl',
  sizes: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
};

// Input styles
export const inputStyles = {
  base: 'w-full bg-slate-800/50 border border-white/10 text-slate-200 placeholder:text-slate-500 transition-all duration-300 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20',
  sizes: {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3.5 text-base rounded-xl',
    lg: 'px-5 py-4 text-lg rounded-xl',
  },
};

// Badge styles
export const badgeStyles = {
  base: 'inline-flex items-center gap-1.5 font-bold uppercase rounded-md',
  sizes: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  },
  variants: {
    gold: 'bg-gold/90 text-slate-900',
    cyan: 'bg-cyan/90 text-slate-900',
    hot: 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-[shake_0.5s_ease-in-out_infinite]',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400',
  },
};

// Container styles
export const containerStyles = {
  base: 'w-full mx-auto px-6',
  sizes: {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
  },
};

// Section styles
export const sectionStyles = {
  base: 'relative overflow-hidden',
  padding: {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
  },
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Combine multiple class strings
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Get button classes based on variant and size
 */
export const getButtonClasses = (variant = 'primary', size = 'md') => 
  cn(buttonStyles.base, buttonStyles.sizes[size], buttonStyles.variants[variant]);

/**
 * Get card classes based on options
 */
export const getCardClasses = (size = 'md', hoverable = true) => 
  cn(cardStyles.base, cardStyles.sizes[size], hoverable && cardStyles.hover);

/**
 * Get input classes based on size
 */
export const getInputClasses = (size = 'md') => 
  cn(inputStyles.base, inputStyles.sizes[size]);

/**
 * Get badge classes based on variant and size
 */
export const getBadgeClasses = (variant = 'gold', size = 'md') => 
  cn(badgeStyles.base, badgeStyles.sizes[size], badgeStyles.variants[variant]);

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  buttonStyles,
  cardStyles,
  inputStyles,
  badgeStyles,
  containerStyles,
  sectionStyles,
  cn,
  getButtonClasses,
  getCardClasses,
  getInputClasses,
  getBadgeClasses,
};

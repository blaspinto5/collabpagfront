/**
 * Button Component
 * Centralized button with all variants
 * 
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="secondary" icon={<Icon />}>With Icon</Button>
 */

import { memo, forwardRef } from 'react';
import { getButtonClasses, cn } from '../../styles/theme';

const Button = forwardRef(({ 
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  disabled = false,
  loading = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(getButtonClasses(variant, size), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      {children}
      {iconRight}
    </button>
  );
});

Button.displayName = 'Button';

export default memo(Button);

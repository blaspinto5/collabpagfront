/**
 * Input Component
 * Centralized input field
 * 
 * @example
 * <Input placeholder="Enter text" size="lg" />
 * <Input icon={<SearchIcon />} />
 */

import { memo, forwardRef } from 'react';
import { getInputClasses, cn } from '../../styles/theme';

const Input = forwardRef(({ 
  type = 'text',
  size = 'md',
  icon,
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  if (icon) {
    return (
      <div className={cn('relative', containerClassName)}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          ref={ref}
          type={type}
          className={cn(getInputClasses(size), 'pl-12', className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      className={cn(getInputClasses(size), className)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default memo(Input);

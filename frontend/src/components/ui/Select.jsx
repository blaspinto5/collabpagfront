/**
 * Select Component
 * Centralized select/dropdown
 * 
 * @example
 * <Select options={options} value={value} onChange={onChange} />
 */

import { memo, forwardRef } from 'react';
import { getInputClasses, cn } from '../../styles/theme';

const Select = forwardRef(({ 
  options = [],
  size = 'md',
  className = '',
  placeholder,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(getInputClasses(size), 'cursor-pointer', className)}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';

export default memo(Select);

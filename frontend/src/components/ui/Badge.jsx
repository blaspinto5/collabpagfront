/**
 * Badge Component
 * Centralized badge/tag component
 * 
 * @example
 * <Badge variant="gold">Category</Badge>
 * <Badge variant="hot" icon={<Flame />}>Hot</Badge>
 */

import { memo } from 'react';
import { getBadgeClasses, cn } from '../../styles/theme';

const Badge = ({ 
  children,
  variant = 'gold',
  size = 'md',
  icon,
  className = '',
  ...props 
}) => {
  return (
    <span
      className={cn(getBadgeClasses(variant, size), className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default memo(Badge);

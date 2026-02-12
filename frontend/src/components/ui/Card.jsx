/**
 * Card Component
 * Centralized card with glass morphism effect
 * 
 * @example
 * <Card size="lg" hoverable>Content</Card>
 * <Card as="article" className="custom-class">Content</Card>
 */

import { memo, forwardRef } from 'react';
import { getCardClasses, cn } from '../../styles/theme';

const Card = forwardRef(({ 
  children,
  as: Component = 'div',
  size = 'md',
  hoverable = true,
  className = '',
  ...props 
}, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(getCardClasses(size, hoverable), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export default memo(Card);

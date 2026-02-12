/**
 * Container Component
 * Centralized container with max-width options
 * 
 * @example
 * <Container size="lg">Content</Container>
 */

import { memo } from 'react';
import { containerStyles, cn } from '../../styles/theme';

const Container = ({ 
  children,
  size = 'lg',
  className = '',
  ...props 
}) => {
  return (
    <div
      className={cn(containerStyles.base, containerStyles.sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export default memo(Container);

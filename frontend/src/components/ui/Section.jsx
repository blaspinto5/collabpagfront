/**
 * Section Component
 * Centralized section wrapper with padding options
 * 
 * @example
 * <Section padding="lg" className="bg-primary">Content</Section>
 */

import { memo } from 'react';
import { sectionStyles, cn } from '../../styles/theme';

const Section = ({ 
  children,
  padding = 'md',
  className = '',
  ...props 
}) => {
  return (
    <section
      className={cn(sectionStyles.base, sectionStyles.padding[padding], className)}
      {...props}
    >
      {children}
    </section>
  );
};

Section.displayName = 'Section';

export default memo(Section);

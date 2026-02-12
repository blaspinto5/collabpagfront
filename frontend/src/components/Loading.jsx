/**
 * Loading Component
 * Spinner and skeleton loader components
 * Optimized with React.memo - Using centralized UI components
 */

import { memo } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from './ui';

export const Spinner = memo(({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <Loader2 
      className={`animate-spin text-gold ${sizeClasses[size]} ${className}`} 
    />
  );
});

Spinner.displayName = 'Spinner';

export const PageLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Spinner size="xl" />
      <p className="mt-4 text-slate-400">Cargando...</p>
    </div>
  </div>
));

PageLoader.displayName = 'PageLoader';

export const CardSkeleton = memo(() => (
  <Card hoverable={false} className="overflow-hidden animate-pulse !p-0">
    <div className="h-48 bg-primary-light/50" />
    <div className="p-5 space-y-4">
      <div className="h-6 bg-primary-light/50 rounded w-3/4" />
      <div className="h-4 bg-primary-light/50 rounded w-full" />
      <div className="h-4 bg-primary-light/50 rounded w-2/3" />
      <div className="h-2 bg-primary-light/50 rounded-full" />
      <div className="flex justify-between">
        <div className="h-4 bg-primary-light/50 rounded w-1/3" />
        <div className="h-4 bg-primary-light/50 rounded w-1/4" />
      </div>
      <div className="h-12 bg-primary-light/50 rounded-lg" />
    </div>
  </Card>
));

CardSkeleton.displayName = 'CardSkeleton';

export const TableRowSkeleton = memo(() => (
  <tr className="animate-pulse">
    <td className="px-4 py-3"><div className="h-4 bg-primary-light/50 rounded w-12" /></td>
    <td className="px-4 py-3"><div className="h-4 bg-primary-light/50 rounded w-24" /></td>
    <td className="px-4 py-3"><div className="h-4 bg-primary-light/50 rounded w-32" /></td>
    <td className="px-4 py-3"><div className="h-4 bg-primary-light/50 rounded w-20" /></td>
    <td className="px-4 py-3"><div className="h-4 bg-primary-light/50 rounded w-16" /></td>
  </tr>
));

TableRowSkeleton.displayName = 'TableRowSkeleton';

const Loading = Spinner;
export default Loading;

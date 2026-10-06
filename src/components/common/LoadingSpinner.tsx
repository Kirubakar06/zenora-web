import React from 'react';
import { cn } from '../../lib/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label = 'Loading...',
}) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div
        className={cn(
          'rounded-full border-indigo-500 border-t-transparent animate-spin',
          sizes[size],
          className
        )}
      />
      {label && <p className="text-xs text-slate-400 font-medium">{label}</p>}
    </div>
  );
};

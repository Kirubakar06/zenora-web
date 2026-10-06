import React from 'react';
import { cn } from '../../lib/utils/cn';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'busy' | 'away' | 'offline';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  status,
  className,
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const statusColors = {
    online: 'bg-emerald-400 ring-slate-900',
    busy: 'bg-rose-400 ring-slate-900',
    away: 'bg-amber-400 ring-slate-900',
    offline: 'bg-slate-500 ring-slate-900',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={cn('relative inline-flex flex-shrink-0 items-center justify-center', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover border border-slate-700/60', sizeClasses[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 font-bold text-white flex items-center justify-center border border-indigo-400/30',
            sizeClasses[size]
          )}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

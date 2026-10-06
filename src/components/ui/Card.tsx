import React from 'react';
import { cn } from '../../lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, glow = false, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[#111726]/80 backdrop-blur-xl border border-slate-800/80 shadow-xl transition-all duration-200',
        glow && 'border-indigo-500/30 shadow-indigo-500/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

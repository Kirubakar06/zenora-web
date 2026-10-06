import React from 'react';
import { Card } from '../../components/ui/Card';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, subtitle, children }) => {
  return (
    <Card className="w-full max-w-md p-8 border-slate-800 bg-[#101626]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-6 relative">
        <img src="/nexora-logo.png" alt="Nexora AI" className="h-24 w-auto mx-auto mb-4 drop-shadow-[0_0_24px_rgba(37,99,235,0.4)]" />
        <h2 className="text-2xl font-extrabold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>

      <div className="relative">{children}</div>
    </Card>
  );
};

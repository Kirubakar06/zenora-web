import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { AuthCard } from '../../features/auth/AuthCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../constants/routes';
import { useAuthStore as useAuthGate } from '../../store/authStore';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const alreadyLoggedIn = useAuthGate((s) => s.isAuthenticated);
  const { register, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  if (alreadyLoggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register({ name, email, password, companyName });
    if (ok) {
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/25 via-black to-black pointer-events-none" />

      <AuthCard
        title="Create SaaS Workspace"
        subtitle="Deploy your autonomous AI agent in under 2 minutes"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Company / Workspace Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <Input
            label="Work Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="glow" className="w-full mt-2" isLoading={isLoading}>
            Deploy AI Workspace
          </Button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-400">
          Already have an account?{' '}
          <Link to={ROUTES.AUTH.LOGIN} className="text-indigo-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

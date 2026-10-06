import React from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { AuthCard } from '../../features/auth/AuthCard';
import { LoginForm } from '../../components/forms/LoginForm';
import { SocialLogin } from '../../features/auth/SocialLogin';
import { ROUTES } from '../../constants/routes';
import { useAuthStore as useAuthGate } from '../../store/authStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const alreadyLoggedIn = useAuthGate((s) => s.isAuthenticated);

  if (alreadyLoggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/25 via-black to-black pointer-events-none" />

      <AuthCard
        title="Welcome to Nexora AI"
        subtitle="Sign in to your autonomous AI customer support command center"
      >
        <LoginForm onSuccess={() => navigate(ROUTES.DASHBOARD)} />
        <SocialLogin onSuccess={() => navigate(ROUTES.DASHBOARD)} />

        <div className="text-center mt-6 text-xs text-slate-400">
          Don't have a workspace yet?{' '}
          <Link to={ROUTES.AUTH.REGISTER} className="text-indigo-400 font-semibold hover:underline">
            Start Free 14-Day Trial
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

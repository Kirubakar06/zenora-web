import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/authStore';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
          {error}
        </div>
      )}

      <Input
        label="Work Email"
        type="email"
        icon={<Mail className="h-4 w-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        icon={<Lock className="h-4 w-4" />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700" />
          <span>Remember me for 30 days</span>
        </label>
        <a href="#forgot" className="text-indigo-400 hover:underline">
          Forgot password?
        </a>
      </div>

      <Button type="submit" variant="glow" className="w-full mt-2" isLoading={isLoading}>
        <span>Sign In to Workspace</span>
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </form>
  );
};

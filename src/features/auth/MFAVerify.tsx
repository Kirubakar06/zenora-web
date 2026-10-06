import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { KeyRound } from 'lucide-react';

interface MFAVerifyProps {
  onVerify: (code: string) => void;
}

export const MFAVerify: React.FC<MFAVerifyProps> = ({ onVerify }) => {
  const [code, setCode] = useState('');

  return (
    <div className="space-y-4 text-center">
      <div className="p-3 bg-indigo-500/10 rounded-2xl w-fit mx-auto text-indigo-400">
        <KeyRound className="h-6 w-6" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
        <p className="text-xs text-slate-400 mt-1">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <Input
        placeholder="000 000"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="text-center font-mono tracking-widest text-lg"
        maxLength={6}
      />

      <Button variant="glow" className="w-full" onClick={() => onVerify(code)}>
        Verify Code
      </Button>
    </div>
  );
};

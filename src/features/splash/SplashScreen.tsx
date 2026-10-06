import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, duration = 2400 }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), duration);
    const doneTimer = setTimeout(onFinish, duration + 500);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.22),_transparent_60%)] pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow pointer-events-none" />

      <img
        src="/nexora-logo.png"
        alt="Nexora AI"
        className="relative w-64 sm:w-80 h-auto animate-splash-in drop-shadow-[0_0_40px_rgba(37,99,235,0.45)]"
      />

      <div className="relative mt-10 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 animate-splash-bar" />
      </div>
    </div>
  );
};

export default SplashScreen;

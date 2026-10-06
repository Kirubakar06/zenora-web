import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Globe } from 'lucide-react';

export const LocalizationSettings: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-cyan-400" />
        <h3 className="text-base font-bold text-white">Localization & Multilingual AI</h3>
      </div>
      <p className="text-xs text-slate-400">
        AI auto-detects customer languages (Tamil, English, Spanish, German, French, etc.)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Default Interface Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm px-3.5 py-2.5"
          >
            <option value="en">English (US)</option>
            <option value="ta">Tamil (தமிழ்)</option>
            <option value="es">Spanish (Español)</option>
            <option value="de">German (Deutsch)</option>
            <option value="fr">French (Français)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Operating Timezone
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm px-3.5 py-2.5"
          >
            <option value="UTC">UTC (Universal Coordinated Time)</option>
            <option value="IST">IST (India Standard Time UTC+5:30)</option>
            <option value="EST">EST (Eastern Standard Time UTC-5)</option>
            <option value="CET">CET (Central European Time UTC+1)</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useTenantStore } from '../../store/tenantStore';

export const GeneralSettings: React.FC = () => {
  const { tenant, updateSettings } = useTenantStore();
  const [botName, setBotName] = useState(tenant?.settings.botName || 'Aura Support Bot');
  const [brandColor, setBrandColor] = useState(tenant?.settings.brandColor || '#6366f1');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ botName, brandColor });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSave} className="space-y-4">
        <h3 className="text-base font-bold text-white">General SaaS & Branding Settings</h3>
        <p className="text-xs text-slate-400">
          Customize your AI bot identity and primary branding color theme
        </p>

        <Input
          label="AI Assistant Display Name"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Accent Brand Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="h-10 w-12 rounded-xl bg-transparent border-0 cursor-pointer"
            />
            <span className="font-mono text-xs text-slate-300">{brandColor}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {saved && <span className="text-xs text-emerald-400 font-semibold">✓ Settings updated!</span>}
          <Button type="submit" variant="glow" className="ml-auto">
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};

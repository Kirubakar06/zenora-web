import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Check, Sparkles } from 'lucide-react';
import { useTenantStore } from '../../store/tenantStore';

export const PricingPlans: React.FC = () => {
  const { tenant, updatePlan } = useTenantStore();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$99',
      period: '/mo',
      desc: 'Ideal for early-stage products testing autonomous AI deflection',
      features: [
        'Up to 2,000 AI Conversations/mo',
        '3 Agent seats included',
        'Standard GPT-4o mini engine',
        'Email & Web Chat widget',
        'Standard 24h SLA',
      ],
    },
    {
      id: 'growth',
      name: 'Growth Scale',
      price: '$499',
      period: '/mo',
      desc: 'High velocity SaaS teams automating Tier 1 support',
      popular: true,
      features: [
        'Up to 15,000 AI Conversations/mo',
        '10 Agent seats included',
        'Full GPT-4o & Claude 3.5 Sonnet RAG',
        'Slack, WhatsApp & Zendesk Sync',
        'Autonomous Ticket Dispatch & Actions',
        'Custom domain & widget branding',
        '99.9% SLA & SOC2 report access',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Dedicated',
      price: '$1,999',
      period: '/mo',
      desc: 'Mission-critical operations with strict data sovereignty',
      features: [
        'Unlimited AI Conversations',
        'Unlimited Agent seats',
        'Private VPC & On-Prem RAG cluster',
        'Custom fine-tuned embeddings',
        'Dedicated Solutions Architect',
        'Custom SSO (Okta, Entra ID) & SCIM',
        '15-minute emergency SLA',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((p) => {
        const isCurrent = tenant?.plan === p.id;
        return (
          <Card
            key={p.id}
            glow={p.popular}
            className={`p-6 flex flex-col justify-between relative ${
              p.popular ? 'border-indigo-500/50 bg-[#12192c]' : ''
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white">{p.name}</h3>
                {isCurrent && <Badge variant="success">Active Plan</Badge>}
              </div>

              <p className="text-xs text-slate-400 min-h-[36px]">{p.desc}</p>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{p.price}</span>
                <span className="text-xs text-slate-400">{p.period}</span>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Included Features
                </span>
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Button
                variant={isCurrent ? 'outline' : p.popular ? 'glow' : 'primary'}
                className="w-full"
                onClick={() => updatePlan(p.id as any)}
                disabled={isCurrent}
              >
                {isCurrent ? 'Current Plan' : 'Select Plan'}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

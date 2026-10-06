import React from 'react';
import { Card } from '../../components/ui/Card';

export const SkillMatrix: React.FC = () => {
  const skills = [
    { skill: 'API & Webhooks', coverage: '4 Agents', proficiency: '94%' },
    { skill: 'Billing & VAT Compliance', coverage: '3 Agents', proficiency: '98%' },
    { skill: 'SAML SSO & Security', coverage: '2 Agents', proficiency: '89%' },
    { skill: 'Vector RAG Knowledge Tuning', coverage: '2 Agents', proficiency: '92%' },
  ];

  return (
    <Card className="p-5 space-y-3">
      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
        Agent Skill Routing Matrix
      </h4>
      <div className="space-y-2">
        {skills.map((s) => (
          <div
            key={s.skill}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
          >
            <span className="font-semibold text-slate-200">{s.skill}</span>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">{s.coverage}</span>
              <span className="font-bold text-cyan-400">{s.proficiency}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

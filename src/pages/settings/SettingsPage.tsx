import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { GeneralSettings } from '../../features/settings/GeneralSettings';
import { SecuritySettings } from '../../features/settings/SecuritySettings';
import { LocalizationSettings } from '../../features/settings/LocalizationSettings';
import { SoundSettings } from '../../features/notifications/SoundSettings';
import { AgentsTable } from '../../components/tables/AgentsTable';
import { TeamList } from '../../features/teams/TeamList';
import { EscalationRules } from '../../features/teams/EscalationRules';
import { InviteMemberModal } from '../../components/modals/InviteMemberModal';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { MOCK_TEAM_MEMBERS } from '../../lib/api/mockData';
import { UserPlus } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState(MOCK_TEAM_MEMBERS);

  const tabs = [
    { id: 'general', label: 'General & Branding' },
    { id: 'team', label: 'Team & Agents' },
    { id: 'security', label: 'Security & Access' },
    { id: 'notifications', label: 'Notifications & Audio' },
  ];

  const handleInvite = (email: string, role: any) => {
    const newMember = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      tenantId: 'ten_9942',
      department: 'Support',
      status: 'offline' as const,
      assignedTicketsCount: 0,
      maxActiveChats: 6,
      permissions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  return (
    <PageContainer
      title="Workspace Settings & Administration"
      subtitle="Configure organizational policies, roles, AI bot themes, and team rosters"
      action={
        activeTab === 'team' ? (
          <Button variant="glow" size="sm" onClick={() => setInviteModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-1.5" /> Invite Teammate
          </Button>
        ) : undefined
      }
    >
      <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pt-4">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <GeneralSettings />
            <LocalizationSettings />
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamList />
              <EscalationRules />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-3">All Active Agents & Operators</h3>
              <AgentsTable agents={teamMembers} />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <SecuritySettings />
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <SoundSettings />
          </div>
        )}
      </div>

      <InviteMemberModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </PageContainer>
  );
};

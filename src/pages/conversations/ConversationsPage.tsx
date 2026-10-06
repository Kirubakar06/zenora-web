import React from 'react';
import { ConversationList } from '../../features/conversations/ConversationList';
import { ChatWindow } from '../../features/conversations/ChatWindow';

export const ConversationsPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
      <ConversationList />
      <ChatWindow />
    </div>
  );
};

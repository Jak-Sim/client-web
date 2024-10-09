'use client';

import ChatTab from '@/app/(pages)/chat/_components/ChatTab';
import ChatList from '@/app/(pages)/chat/_components/ChatList';
import { useState } from 'react';

export type Chat = 'challenge' | 'private';

const ChatListPage = () => {
  const [chatType, setChatType] = useState<Chat>('challenge');

  const handleChatType = (type: Chat) => {
    setChatType(type);
  };

  return (
    <>
      <ChatTab chatType={chatType} handleChatType={handleChatType} />
      <ChatList chatType={chatType} />
    </>
  );
};

export default ChatListPage;

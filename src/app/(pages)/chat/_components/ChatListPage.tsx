'use client';

import ChatTab from '@/app/(pages)/chat/_components/ChatTab';
import ChatList from '@/app/(pages)/chat/_components/ChatList';
import { useState } from 'react';
import type { ChatItem } from '@/app/(pages)/chat/page';

export type Chat = 'challenge' | 'private';

const ChatListPage = ({
  groupChatListData,
  challengeChatListData,
}: {
  groupChatListData: ChatItem[];
  challengeChatListData: ChatItem[];
}) => {
  const [chatType, setChatType] = useState<Chat>('challenge');

  const handleChatType = (type: Chat) => {
    setChatType(type);
  };

  return (
    <>
      <ChatTab chatType={chatType} handleChatType={handleChatType} />
      <ChatList
        chatType={chatType}
        groupChatListData={groupChatListData}
        challengeChatListData={challengeChatListData}
      />
    </>
  );
};

export default ChatListPage;

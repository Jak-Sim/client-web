'use client';

import { useState } from 'react';
import ChatList from '@/app/(pages)/chat/_components/ChatList';
import ChatTab from '@/app/(pages)/chat/_components/ChatTab';
import { ChatRoom } from '@/models/chat/data-contracts';

export type Chat = 'challenge' | 'private';

const ChatListPage = ({
  groupChatListData,
  challengeChatListData,
}: {
  groupChatListData: ChatRoom[];
  challengeChatListData: ChatRoom[];
}) => {
  const [chatType, setChatType] = useState<Chat>('challenge');

  const handleChatType = (type: Chat) => {
    setChatType(type);
  };

  return (
    <>
      <ChatTab
        chatType={chatType}
        handleChatType={handleChatType}
        groupChatListData={groupChatListData}
        challengeChatListData={challengeChatListData}
      />
      <ChatList
        chatType={chatType}
        groupChatListData={groupChatListData}
        challengeChatListData={challengeChatListData}
      />
    </>
  );
};

export default ChatListPage;

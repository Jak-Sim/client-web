'use client';

import { useState } from 'react';
import Link from 'next/link';
import ChatList from '@/app/(pages)/chat/_components/ChatList';
import ChatTab from '@/app/(pages)/chat/_components/ChatTab';
import { AvatarPlus } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
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
    <PageLayout
      className={'bg-[#f2f2f7]pt-2 flex flex-col'}
      header={
        <Header>
          <Header.Item>
            <Header.BoldText bold={chatType === 'challenge' ? '챌린지' : '개인'} text={'채팅'} />
          </Header.Item>
          <Header.Item>
            <Link href={'/chat/add'}>
              <AvatarPlus />
            </Link>
          </Header.Item>
        </Header>
      }
    >
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
    </PageLayout>
  );
};

export default ChatListPage;

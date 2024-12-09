'use client';

import type { Chat } from '@/app/(pages)/chat/_components/ChatListPage';
import { cn } from '@/lib/shadcn/utils';
import { ChatRoom } from '@/models/chat/data-contracts';

interface ChatTabProps {
  chatType: Chat;
  handleChatType: (type: Chat) => void;
  groupChatListData: ChatRoom[];
  challengeChatListData: ChatRoom[];
}

const ChatTab = ({ chatType, handleChatType }: ChatTabProps) => {
  return (
    <ul className={'flex'}>
      <li className={'flex flex-1'}>
        <button
          className={cn(
            'relative w-full p-3 text-center font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full', // 기본 after 스타일
            {
              'after:bg-black': chatType === 'challenge',
              'text-v1-text-primary-200 after:h-[1px] after:bg-v1-text-primary-100': chatType !== 'challenge',
            },
          )}
          onClick={() => handleChatType('challenge')}
        >
          챌린지 (단체)
        </button>
      </li>
      <li className={'flex flex-1'}>
        <button
          className={cn(
            'relative w-full p-3 text-center font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full', // 기본 after 스타일
            {
              'after:bg-black': chatType === 'private',
              'text-v1-text-primary-200 after:h-[1px] after:bg-v1-text-primary-100': chatType !== 'private',
            },
          )}
          onClick={() => handleChatType('private')}
        >
          개인
        </button>
      </li>
    </ul>
  );
};

export default ChatTab;

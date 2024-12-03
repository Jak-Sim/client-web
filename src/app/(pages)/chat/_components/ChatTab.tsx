'use client';

import type { Chat } from '@/app/(pages)/chat/_components/ChatListPage';
import { Comments, FlagChat } from '@/assets/images/icons';
import { ChatRoom } from '@/models/chat/data-contracts';

interface ChatTabProps {
  chatType: Chat;
  handleChatType: (type: Chat) => void;
  groupChatListData: ChatRoom[];
  challengeChatListData: ChatRoom[];
}

const ChatTab = ({ chatType, handleChatType, groupChatListData, challengeChatListData }: ChatTabProps) => {
  return (
    <ul className={'flex gap-1.5'}>
      <li className={'flex flex-1'}>
        <button
          className={`flex flex-1 items-center justify-center rounded-xl border bg-white py-2 pl-6 pr-4 ${chatType === 'challenge' ? 'border-primary' : 'border-white'}`}
          onClick={() => handleChatType('challenge')}
        >
          <FlagChat className={`${chatType === 'challenge' && 'fill-primary'}`} />
          <div className={'line-clamp-1 flex-1 text-center text-sm font-semibold leading-6'}>챌린지 채팅</div>
          <div
            className={`${chatType === 'challenge' ? 'bg-primary' : 'bg-[#969696]'} rounded-full px-2 py-1 text-center text-[8px] font-semibold text-white shadow-primary`}
          >
            {challengeChatListData.length || 0}
          </div>
        </button>
      </li>
      <li className={'flex flex-1'}>
        <button
          className={`flex flex-1 items-center justify-center rounded-xl border bg-white px-4 py-2 ${chatType === 'private' ? 'border-primary' : 'border-white'}`}
          onClick={() => handleChatType('private')}
        >
          <Comments className={`${chatType === 'private' && 'fill-primary'}`} />
          <div className={'line-clamp-1 flex-1 text-center text-sm font-semibold leading-6'}>개인 채팅</div>
          <div
            className={`${chatType === 'private' ? 'bg-primary' : 'bg-[#969696]'} rounded-full px-2 py-1 text-center text-[8px] font-semibold text-white shadow-primary`}
          >
            {groupChatListData.length || 0}
          </div>
        </button>
      </li>
    </ul>
  );
};

export default ChatTab;

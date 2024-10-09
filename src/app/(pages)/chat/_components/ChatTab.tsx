'use client';

import { Comments, FlagChat } from '@/assets/images/icons';
import type { Chat } from '@/app/(pages)/chat/_components/ChatListPage';

interface ChatTabProps {
  chatType: Chat;
  handleChatType: (type: Chat) => void;
}

const ChatTab = ({ chatType, handleChatType }: ChatTabProps) => {
  return (
    <ul className={'flex gap-1.5'}>
      <li className={'flex flex-1'}>
        <button
          className={`flex-1 flex justify-center items-center py-2 pl-6 pr-4 bg-white rounded-xl border ${chatType === 'challenge' ? 'border-primary' : 'border-white'}`}
          onClick={() => handleChatType('challenge')}
        >
          <FlagChat className={`${chatType === 'challenge' && 'fill-primary'}`} />
          <div className={'flex-1 text-center font-semibold text-sm leading-6 line-clamp-1'}>챌린지 채팅</div>
          <div
            className={
              'px-2 py-1 rounded-full text-[8px] font-semibold text-white bg-primary text-center shadow-primary'
            }
          >
            100
          </div>
        </button>
      </li>
      <li className={'flex flex-1'}>
        <button
          className={`flex-1 flex justify-center items-center py-2 px-4 bg-white rounded-xl border ${chatType === 'private' ? 'border-primary' : 'border-white'}`}
          onClick={() => handleChatType('private')}
        >
          <Comments className={`${chatType === 'private' && 'fill-primary'}`} />
          <div className={'flex-1 text-center font-semibold text-sm leading-6 line-clamp-1'}>개인 채팅</div>
          <div
            className={
              'px-2 py-1 rounded-full text-[8px] font-semibold text-white bg-[#969696] text-center shadow-primary'
            }
          >
            0
          </div>
        </button>
      </li>
    </ul>
  );
};

export default ChatTab;

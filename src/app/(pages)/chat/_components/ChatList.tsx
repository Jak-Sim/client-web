import Image from 'next/image';
import Link from 'next/link';
import type { Chat } from '@/app/(pages)/chat/_components/ChatListPage';
import { ChatCrown } from '@/assets/images/icons';
import placeholder from '@/assets/images/placeholder/chat-list.png';
import { GroupListData } from '@/models/chat/data-contracts';

interface ChatListProps {
  chatType: Chat;
  groupChatListData: GroupListData;
  challengeChatListData: GroupListData;
}

interface ChatItemProps {
  data: GroupListData;
}

const ChatItem = ({ data }: ChatItemProps) => {
  return (
    <li className={'border-b border-[#e2e2e2] py-4 pl-2 pr-3'}>
      <Link href={`/chat/${data.roomId}`}>
        <div className={'relative flex'}>
          <div className={'h-12 w-12 overflow-hidden rounded-xl'}>
            <Image src={placeholder} alt={'placeholder'} />
          </div>
          <div className={'ml-2 flex flex-1 flex-col gap-1.5 py-1.5'}>
            <div className={'flex items-center justify-between gap-1'}>
              <div className={'mr-8 line-clamp-1 flex-1 text-xs font-bold text-[#141414]'}>
                {data.roomName} <span className={'text-[#969696]'}>10</span>
                <ChatCrown className={'ml-0.5 inline-block'} />
              </div>
              <div className={'h-3 w-3 rounded-full bg-primary'}></div>
            </div>
            <div className={'flex items-center justify-between gap-1'}>
              <div className={'mr-8 line-clamp-1 flex-1 text-[10px] tracking-tighter text-[#969696]'}>
                게임하고 싶다... 근데 할 일이 너무 많고 긴 채팅이 오면 이렇게 표현이 되야되는데
              </div>
              <div className={'text-[6px] text-[#969696]'}>08:24</div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const ChatList = ({ chatType, groupChatListData, challengeChatListData }: ChatListProps) => {
  return (
    <div className={'mt-2 flex flex-1 flex-col'}>
      <ul className={'flex-1 flex-col rounded-xl px-2'}>
        {chatType === 'challenge' && challengeChatListData.map((item, index) => <ChatItem data={item} key={index} />)}
        {chatType === 'private' && groupChatListData.map((item, index) => <ChatItem data={item} key={index} />)}
      </ul>
    </div>
  );
};

export default ChatList;

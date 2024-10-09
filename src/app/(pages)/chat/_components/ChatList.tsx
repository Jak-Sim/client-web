import placeholder from '@/assets/images/placeholder/chat-list.png';
import { ChatCrown } from '@/assets/images/icons';
import Image from 'next/image';
import type { Chat } from '@/app/(pages)/chat/_components/ChatListPage';
import Link from 'next/link';

interface ChatListProps {
  chatType: Chat;
}

const ChatList = ({ chatType }: ChatListProps) => {
  return (
    <div className={'flex-1 flex flex-col mt-2'}>
      <ul className={'flex-1 flex-col px-2 bg-white rounded-xl'}>
        {chatType === 'challenge' && (
          <li className={'pl-2 pr-3 py-4 border-b border-[#e2e2e2]'}>
            <Link href={'/chat/1'}>
              <div className={'flex relative'}>
                <div className={'overflow-hidden w-12 h-12 rounded-xl'}>
                  <Image src={placeholder} alt={'placeholder'} />
                </div>
                <div className={'flex-1 flex flex-col gap-1.5 ml-2 py-1.5'}>
                  <div className={'flex justify-between items-center gap-1'}>
                    <div className={'flex-1 font-bold text-xs text-[#141414] line-clamp-1 mr-8'}>
                      독서 습관 들이기 <span className={'text-[#969696]'}>10</span>
                      <ChatCrown className={'inline-block ml-0.5'} />
                    </div>
                    <div className={'w-3 h-3 rounded-full bg-primary'}></div>
                  </div>
                  <div className={'flex justify-between items-center gap-1'}>
                    <div className={'flex-1 text-[#969696] text-[10px] tracking-tighter line-clamp-1  mr-8'}>
                      게임하고 싶다... 근데 할 일이 너무 많고 긴 채팅이 오면 이렇게 표현이 되야되는데
                    </div>
                    <div className={'text-[#969696] text-[6px]'}>08:24</div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChatList;

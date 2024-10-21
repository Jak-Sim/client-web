import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import { Plus } from '@/assets/images/icons';
import ChatListPage from '@/app/(pages)/chat/_components/ChatListPage';
import Link from 'next/link';
import { socketApi } from '@/lib/axios/axios';

export interface ChatItem {
  roomId: number;
  roomName: string;
  roomType: string;
  lastMessage: null | string;
  lastTimestamp: null | string;
  hasNewMessages: boolean;
}

const Page = async () => {
  const data = await socketApi.get<ChatItem[]>('/chat/list/user1');

  return (
    <PageLayout
      className={'bg-[#f2f2f7] p-3 pt-2 flex flex-col'}
      header={{
        title: '채팅',
        left: <HeaderBackButton />,
        right: (
          <Link href={'/chat/create'}>
            <Plus />
          </Link>
        ),
      }}
    >
      <ChatListPage data={data.data} />
    </PageLayout>
  );
};

export default Page;

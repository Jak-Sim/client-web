import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import { Plus } from '@/assets/images/icons';
import ChatListPage from '@/app/(pages)/chat/_components/ChatListPage';
import Link from 'next/link';
import { socketApi } from '@/lib/axios/axios';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export interface ChatItem {
  roomId: number;
  roomName: string;
  roomType: string;
  lastMessage: null | string;
  lastTimestamp: null | string;
  hasNewMessages: boolean;
}

interface FetchProps {
  userId: string;
}

const fetchGroupChatListData = async ({ userId }: FetchProps) => {
  const groupChatListData = await socketApi.get<ChatItem[]>('/chat/list/group', {
    headers: {
      'user-id': userId,
    },
  });
  return groupChatListData.data;
};

const fetchChallengeChatListData = async ({ userId }: FetchProps) => {
  const challengeChatListData = await socketApi.get<ChatItem[]>('/chat/list/challenge', {
    headers: {
      'user-id': userId,
    },
  });
  return challengeChatListData.data;
};

const Page = async () => {
  const session = await getServerSession(nextAuthOptions);

  const groupChatListData = await fetchGroupChatListData({ userId: 'user1' });
  const challengeChatListData = await fetchChallengeChatListData({ userId: 'user1' });

  // if (!session) {
  //   return redirect('/sign-in');
  // }

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
      <ChatListPage groupChatListData={groupChatListData} challengeChatListData={challengeChatListData} />
    </PageLayout>
  );
};

export default Page;

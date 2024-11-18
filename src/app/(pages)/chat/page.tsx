import { getServerSession } from 'next-auth';
import Link from 'next/link';
import ChatListPage from '@/app/(pages)/chat/_components/ChatListPage';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { Plus } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { socketApi } from '@/lib/axios/axios';

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

const room1 = [
  {
    roomId: 1,
    roomName: 'General Chat',
    roomType: 'challenge',
    lastMessage: 'Hello everyone!',
    lastTimestamp: '2024-11-07T15:30:00',
    hasNewMessages: true,
  },
  {
    roomId: 2,
    roomName: 'Project Alpha',
    roomType: 'challenge',
    lastMessage: 'Please review the document.',
    lastTimestamp: '2024-11-06T09:15:00',
    hasNewMessages: false,
  },
  {
    roomId: 3,
    roomName: 'Random',
    roomType: 'challenge',
    lastMessage: 'Check out this meme!',
    lastTimestamp: '2024-11-05T12:45:00',
    hasNewMessages: true,
  },
];

const room2 = [
  {
    roomId: 4,
    roomName: 'Support',
    roomType: 'private',
    lastMessage: null,
    lastTimestamp: null,
    hasNewMessages: false,
  },
  {
    roomId: 5,
    roomName: 'Development Team',
    roomType: 'private',
    lastMessage: 'Code review at 3 PM.',
    lastTimestamp: '2024-11-07T10:00:00',
    hasNewMessages: true,
  },
];

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
      className={'flex flex-col bg-[#f2f2f7] p-3 pt-2'}
      header={
        <Header>
          <Header.Item>
            <Header.BoldText bold={'채팅'} />
          </Header.Item>
          <Header.Item>
            <Link href={'/chat/create'}>
              <Plus />
            </Link>
          </Header.Item>
        </Header>
      }
    >
      <ChatListPage groupChatListData={groupChatListData} challengeChatListData={challengeChatListData} />
    </PageLayout>
  );
};

export default Page;

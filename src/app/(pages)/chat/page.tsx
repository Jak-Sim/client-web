import Link from 'next/link';
import ChatListPage from '@/app/(pages)/chat/_components/ChatListPage';
import { Plus } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { List } from '@/models/chat/List';

const Page = async () => {
  // const session = await getServerSession(nextAuthOptions);

  // if (!session) {
  //   return redirect('/sign-in');
  // }

  const listApi = new List();
  const { data: groupChatListData } = await listApi.groupList({
    headers: { 'user-id': 'user1' },
  });
  const { data: challengeChatListData } = await listApi.challengeList({
    headers: { 'user-id': 'user1' },
  });

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

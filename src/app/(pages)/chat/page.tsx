import Link from 'next/link';
import ChatListPage from '@/app/(pages)/chat/_components/ChatListPage';
import { Plus } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { Chat } from '@/models/chat/Chat';

const Page = async () => {
  // const session = await getServerSession(nextAuthOptions);

  // if (!session) {
  //   return redirect('/sign-in');
  // }

  const chatApi = new Chat();
  const { data: groupChatListData } = await chatApi.listGroupList({
    headers: { 'user-id': 'user1' },
  });
  const { data: challengeChatListData } = await chatApi.listChallengeList({
    headers: { 'user-id': 'user1' },
  });

  console.log(groupChatListData);

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

import { Chat } from '@/models/chat/Chat';
import ChatListPage from './_components/ChatListPage';

const chatApi = new Chat();

const Page = async () => {
  // const session = await getServerSession(nextAuthOptions);

  const { data: groupChatListData } = await chatApi.listGroupList({
    headers: {
      'user-id': 'user1',
    },
  });
  const { data: challengeChatListData } = await chatApi.listChallengeList({
    headers: {
      'user-id': 'user1',
    },
  });


  return <ChatListPage groupChatListData={groupChatListData} challengeChatListData={challengeChatListData} />;
};

export default Page;

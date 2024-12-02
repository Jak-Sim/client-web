import ChatRoomPage from '@/app/(pages)/chat/[id]/_components/ChatRoomPage';
import { Chat } from '@/models/chat/Chat';

interface PageProps {
  params: {
    id: string;
  };
}

const chatApi = new Chat();

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  const { data: previousChatMessageData } = await chatApi.messageDetail(id);

  return <ChatRoomPage id={id} previousChatMessageData={previousChatMessageData} />;
};

export default Page;

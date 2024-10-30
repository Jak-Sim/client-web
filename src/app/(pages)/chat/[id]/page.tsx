import ChatRoomPage from '@/app/(pages)/chat/[id]/_components/ChatRoomPage';
import { socketApi } from '@/lib/axios/axios';

interface PageProps {
  params: {
    id: string;
  };
}

interface FetchProps {
  roomId: string;
}

export interface ChatMessage {
  id: string;
  roomId: number;
  userId: string;
  message: string;
  timestamp: Date;
  type: 'text';
}

const fetchPreviousChatMessageData = async ({ roomId }: FetchProps) => {
  const previousChatMessageData = await socketApi.get<ChatMessage[]>(`/chat/message/${roomId}`);
  return previousChatMessageData.data;
};

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  const previousChatMessageData = await fetchPreviousChatMessageData({ roomId: id });

  console.log(previousChatMessageData);

  return <ChatRoomPage id={id} previousChatMessageData={previousChatMessageData} />;
};

export default Page;

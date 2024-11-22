import ChatRoomPage from '@/app/(pages)/chat/[id]/_components/ChatRoomPage';
import { Message } from '@/models/chat/Message';

interface PageProps {
  params: {
    id: string;
  };
}

export interface ChatMessage {
  id: string;
  roomId: number;
  userId: string;
  message: string;
  timestamp: Date;
  type: 'text';
}

export interface ImageChatMessage {
  id: string;
  imageId: number;
  imageType: 'normal' | 'challenge';
  imageUrl: string;
  roomId: number;
  timestamp: number;
  type: 'image';
  userId: 'string';
}

const messageApi = new Message();

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  const { data: previousChatMessageData } = await messageApi.messageDetail(Number(id));

  return <ChatRoomPage id={id} previousChatMessageData={previousChatMessageData} />;
};

export default Page;

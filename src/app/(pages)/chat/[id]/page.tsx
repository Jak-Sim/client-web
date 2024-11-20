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

// id: '1731860245286-0';
// imageId: 6;
// imageType: 'normal';
// imageUrl: 'https://jaksimimage2.s3.ap-northeast-2.amazonaws.com/uploads/1731860245137-154101143.jpeg';
// roomId: 17;
// timestamp: 1731860245285;
// type: 'image';
// userId: 'user2';

const fetchPreviousChatMessageData = async ({ roomId }: FetchProps) => {
  const previousChatMessageData = await socketApi.get<(ChatMessage | ImageChatMessage)[]>(`/chat/message/${roomId}`);
  return previousChatMessageData.data;
};

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  const previousChatMessageData = await fetchPreviousChatMessageData({ roomId: id });

  return <ChatRoomPage id={id} previousChatMessageData={previousChatMessageData} />;
};

export default Page;

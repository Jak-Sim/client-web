import ChatRoomPage from '@/app/(pages)/chat/[id]/_components/ChatRoomPage';
import { MessageListData } from '@/models/chat/data-contracts';

interface PageProps {
  params: {
    id: string;
  };
}

// const chatApi = new Chat();

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  // const { data: previousChatMessageData } = await chatApi.messageDetail(id);

  const messages: MessageListData = [
    {
      messageId: 'msg1',
      roomId: 'room1',
      senderId: '김작심',
      content: '안녕하세요! 다들 이번 미션두 미션 진행 하셨을까요? 저는 진행완료 했는데 이해하기 쉽지 않더라구요 ㅎㅎ',
      type: 'text',
      timestamp: '2024-12-24T10:00:00Z',
    },
    {
      messageId: 'msg2',
      roomId: 'room1',
      senderId: '김작심',
      content: '다들 화이팅 하세요!',
      type: 'text',
      timestamp: '2024-12-24T10:01:00Z',
    },
    {
      messageId: 'msg2',
      roomId: 'room1',
      senderId: 'user1',
      content: '저도 읽었어요!!',
      type: 'text',
      timestamp: '2024-12-24T10:01:00Z',
    },
    {
      messageId: 'msg2',
      roomId: 'room1',
      senderId: 'user1',
      content: '생각보다 너무 어려워서 힘들었어요 ㅠㅠ',
      type: 'text',
      timestamp: '2024-12-24T10:01:00Z',
    },
    {
      messageId: 'msg3',
      roomId: 'room1',
      senderId: '봄보미',
      content: '저두 읽었습니다, 힘들더군요ㅎ',
      type: 'text',
      timestamp: '2024-12-24T10:02:00Z',
    },
    {
      messageId: 'msg4',
      roomId: 'room1',
      senderId: '멍뭉이',
      content: '저는 아직 못했어요..',
      type: 'text',
      timestamp: '2024-12-24T10:02:10Z',
    },
    {
      messageId: 'msg4',
      roomId: 'room1',
      senderId: '멍뭉이',
      type: 'submission',
      timestamp: '2024-12-24T10:02:10Z',
      title: '한줄 읽고 후기 쓰기',
      description:
        '챕터를 읽고 난 후, 가장 인상 깊었던 부분이나 기억에 남는 내용을 간략하게 정리해 1~2문장으로 작성해 주세요. 관련된 사진을 함께 첨부해 주시면 됩니다!',
    },
  ];

  return <ChatRoomPage id={id} previousChatMessageData={messages} />;
};

export default Page;

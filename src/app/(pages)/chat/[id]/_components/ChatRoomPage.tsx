'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import ChatSendFooter from '@/app/(pages)/chat/[id]/_components/ChatSendFooter';
import MyChat from '@/app/(pages)/chat/[id]/_components/MyChat';
import OtherChat from '@/app/(pages)/chat/[id]/_components/OtherChat';
import { ChatMessage, ImageChatMessage } from '@/app/(pages)/chat/[id]/page';
import { Plus } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { socketApi } from '@/lib/axios/axios';

interface ChatRoomPageProps {
  id: string;
  previousChatMessageData: (ChatMessage | ImageChatMessage)[];
}

const ChatRoomPage = ({ id, previousChatMessageData }: ChatRoomPageProps) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<(ChatMessage | ImageChatMessage)[]>(previousChatMessageData);
  const roomRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>('');
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_API_URL_SOCKET), []);

  useEffect(() => {
    socket.emit('joinRoom', id);

    socket.on('chat message', (data: ChatMessage | ImageChatMessage) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on('chat image', (data: ChatMessage | ImageChatMessage) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('chat message');
      socket.off('chat image');
    };
  }, [id]);

  const sendMessage = () => {
    socket.emit('chat message', { message, userId, roomId: id });

    setMessage('');
  };

  const sendImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const response = await socketApi.post<{ success: boolean; imageUrl: string }>(
        `/chat/image/upload`,
        {
          roomId: id,
          image: e.target.files[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'user-id': userId,
          },
        },
      );

      if (response.data.success) {
        socket.emit('chat image', {
          roomId: id,
          userId: userId,
          imageUrl: response.data.imageUrl,
        });
      }
    }
  };

  console.log(previousChatMessageData);

  return (
    <PageLayout
      header={
        <Header>
          <Header.Item>
            <Header.BackButton />
          </Header.Item>
          <Header.Title>채팅</Header.Title>
          <Header.Item>
            <Header.Icon Icon={Plus} />
          </Header.Item>
        </Header>
      }
      footer={
        <ChatSendFooter message={message} setMessage={setMessage} sendMessage={sendMessage} sendImage={sendImage} />
      }
    >
      <div className={'flex'}>
        <input
          className={'fixed top-0 w-full flex-1 border'}
          type='text'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className={'px-4 py-3'} ref={roomRef}>
        <div className='flex flex-col'>
          {chat.map((msg, index) => (
            <div key={index}>{msg.userId === userId ? <MyChat {...msg} /> : <OtherChat {...msg} />}</div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatRoomPage;

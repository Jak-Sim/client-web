'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import ChatSendFooter from '@/app/(pages)/chat/[id]/_components/ChatSendFooter';
import MyChat from '@/app/(pages)/chat/[id]/_components/MyChat';
import OtherChat from '@/app/(pages)/chat/[id]/_components/OtherChat';
import { Plus } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { socketApi } from '@/lib/axios/axios';
import { ChatMessage, MessageDetailData } from '@/models/chat/data-contracts';

interface ChatRoomPageProps {
  id: string;
  previousChatMessageData: MessageDetailData;
}

const ChatRoomPage = ({ id, previousChatMessageData }: ChatRoomPageProps) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const roomRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>('user1');

  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_API_URL_SOCKET), []);

  useEffect(() => {
    socket.emit('joinRoom', id);

    socket.on('chat message', (data: ChatMessage) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on('chat image', (data: ChatMessage) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('chat message');
      socket.off('chat image');
    };
  }, [id, socket]);

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

  useEffect(() => {
    roomRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [chat]);

  return (
    <PageLayout
      header={
        <Header className={'bg-v1-background'}>
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
      <div className={'px-5 py-3'} ref={roomRef}>
        <div className='flex flex-col'>
          {previousChatMessageData.map((msg, index) => {
            const isFirstMessage = index === 0 || previousChatMessageData[index - 1].senderId !== msg.senderId;
            const isLastMessage =
              index === previousChatMessageData.length - 1 ||
              previousChatMessageData[index + 1].senderId !== msg.senderId;

            return (
              <div key={index}>
                {msg.senderId === userId ? (
                  <MyChat {...msg} isFirstMessage={isFirstMessage} isLastMessage={isLastMessage} />
                ) : (
                  <OtherChat {...msg} isFirstMessage={isFirstMessage} isLastMessage={isLastMessage} />
                )}
              </div>
            );
          })}
          {/*{chat.map((msg, index) => (*/}
          {/*  <div key={index}>{msg.senderId === userId ? <MyChat {...msg} /> : <OtherChat {...msg} />}</div>*/}
          {/*))}*/}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatRoomPage;

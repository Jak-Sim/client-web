'use client';

import ChatSendFooter from '@/app/(pages)/chat/[id]/_components/ChatSendFooter';
import MyChat from '@/app/(pages)/chat/[id]/_components/MyChat';
import OtherChat from '@/app/(pages)/chat/[id]/_components/OtherChat';
import { ChatMessage } from '@/app/(pages)/chat/[id]/page';
import { Plus } from '@/assets/images/icons';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import PageLayout from '@/components/layout/PageLayout';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface ChatRoomPageProps {
  id: string;
  previousChatMessageData: ChatMessage[];
}

let socket: Socket;

const ChatRoomPage = ({ id, previousChatMessageData }: ChatRoomPageProps) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>(previousChatMessageData);
  const roomRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_API_URL_SOCKET);
    socket.emit('joinRoom', id);

    socket.on('chat message', (data: ChatMessage) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [id]);

  console.log(chat);

  const sendMessage = () => {
    socket.emit('chat message', { message, userId, roomId: id });
    setChat((prev) => [
      ...prev,
      { message, userId, roomId: Number(id), timestamp: new Date(), type: 'text', id: Math.random().toString() },
    ]);
    if (roomRef.current) {
      roomRef.current.scrollTop = roomRef.current.scrollHeight;
    }
    setMessage('');
  };

  return (
    <PageLayout
      header={{ title: '채팅', left: <HeaderBackButton />, right: <Plus /> }}
      footer={<ChatSendFooter message={message} setMessage={setMessage} sendMessage={sendMessage} />}
    >
      <div className={'flex'}>
        <input className={'flex-1 border'} type='text' value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div className={'px-4 py-3'}>
        <div className='flex flex-col' ref={roomRef}>
          {chat.map((msg, index) => (
            <div key={index}>{msg.userId === userId ? <MyChat {...msg} /> : <OtherChat {...msg} />}</div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatRoomPage;

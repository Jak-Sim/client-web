'use client';

import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Plus } from '@/assets/images/icons';
import ChatSendFooter from '@/app/(pages)/chat/[id]/_components/ChatSendFooter';
import OtherChat from '@/app/(pages)/chat/[id]/_components/OtherChat';
import MyChat from './_components/MyChat';

const socket = io(process.env.NEXT_PUBLIC_API_URL_SOCKET);

export interface ChatProps {
  id: string;
  msg: string;
  date: string;
  viewer: number;
}

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const roomId = params.id;
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatProps[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    socket.on('chat message', ({ id, msg, date, viewer }: ChatProps) => {
      console.log(id, msg);
      setChat((prev) => [...prev, { id, msg, date, viewer }]);
    });

    return () => {
      if (socket) {
        socket.off('chat message');
      }
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', { message, userId, roomId });
    setMessage('');
  };

  return (
    <PageLayout
      header={{ title: '채팅', left: <HeaderBackButton />, right: <Plus /> }}
      footer={<ChatSendFooter message={message} setMessage={setMessage} sendMessage={sendMessage} />}
    >
      <div className={'flex'}>
        <input className={' flex-1 border'} type='text' value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div className={'px-4 py-3'}>
        <div className='flex flex-col'>
          {chat.map((msg, index) => (
            <div key={index}>{msg.id === userId ? <MyChat {...msg} /> : <OtherChat {...msg} />}</div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Page;

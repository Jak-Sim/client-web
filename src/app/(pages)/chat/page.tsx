'use client';

import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Plus } from '@/assets/images/icons';
import ChatSendFooter from '@/app/(pages)/chat/_components/ChatSendFooter';
import OtherChat from '@/app/(pages)/chat/_components/OtherChat';
import MyChat from './_components/MyChat';

const socket = io('http://localhost:5000');

export interface ChatProps {
  id: string;
  msg: string;
  date: string;
  viewer: number;
}

const Page = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatProps[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    socket.on('chatMessage', ({ id, msg, date, viewer }: ChatProps) => {
      console.log(id, msg);
      setChat((prev) => [...prev, { id, msg, date, viewer }]);
    });

    return () => {
      if (socket) {
        socket.off('chatMessage');
      }
    };
  }, []);

  const sendMessage = () => {
    if (!message && !userId) return;
    socket.emit('chatMessage', message);
    setMessage('');
  };

  const sendUser = () => {
    if (!userId) return;
    socket.emit('registerUser', userId);
  };

  return (
    <PageLayout
      header={{ title: '채팅', left: <HeaderBackButton />, right: <Plus /> }}
      footer={<ChatSendFooter message={message} setMessage={setMessage} sendMessage={sendMessage} />}
    >
      <div className={'flex'}>
        <input className={' flex-1 border'} type='text' value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button onClick={sendUser}>Send</button>
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

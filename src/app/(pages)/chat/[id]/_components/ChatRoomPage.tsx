'use client';

import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Plus } from '@/assets/images/icons';
import ChatSendFooter from '@/app/(pages)/chat/[id]/_components/ChatSendFooter';
import { ChatMessage } from '@/app/(pages)/chat/[id]/page';
import MyChat from '@/app/(pages)/chat/[id]/_components/MyChat';
import OtherChat from '@/app/(pages)/chat/[id]/_components/OtherChat';

const socket = io(process.env.NEXT_PUBLIC_API_URL_SOCKET);

interface ChatRoomPageProps {
  id: string;
  previousChatMessageData: ChatMessage[];
}

const ChatRoomPage = ({ id, previousChatMessageData }: ChatRoomPageProps) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>(previousChatMessageData);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off('chat message');
      }
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', { message, userId, roomId: id });
    setMessage('');
  };

  console.log(chat);

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
            <div key={msg.id}>{msg.userId === userId ? <MyChat {...msg} /> : <OtherChat {...msg} />}</div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatRoomPage;

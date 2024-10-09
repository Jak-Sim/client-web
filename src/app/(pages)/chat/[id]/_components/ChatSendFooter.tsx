import { Dispatch, SetStateAction } from 'react';
import { AddCircle, UpArrowCircle, UpArrowCircleActive } from '@/assets/images/icons';

interface ChatSendFooterProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
}

const ChatSendFooter = ({ message, setMessage, sendMessage }: ChatSendFooterProps) => {
  return (
    <>
      <div className={'flex pt-2 pb-8 px-2 border-t border-[#e2e2e2]'}>
        <button type={'button'} className={'p-1'}>
          <AddCircle />
        </button>
        <input
          className={'flex-1 px-4 py-3 text-xs border border-[#e2e2e2] rounded-[50px] placeholder:text-[#999999]'}
          type='text'
          placeholder={'채팅 메세지를 입력해주세요.'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type={'submit'} className={'p-1'} onClick={sendMessage}>
          {message ? <UpArrowCircleActive /> : <UpArrowCircle />}
        </button>
      </div>
    </>
  );
};

export default ChatSendFooter;

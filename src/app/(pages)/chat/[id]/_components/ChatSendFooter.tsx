import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { ChatArrowUp, ChatPlus } from '@/assets/images/icons';

interface ChatSendFooterProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
  sendImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ChatSendFooter = ({ message, setMessage, sendMessage, sendImage }: ChatSendFooterProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  return (
    <>
      <div className={'flex items-center border-t border-[#e2e2e2] bg-v1-background px-2 pb-4 pt-2'}>
        <label htmlFor='image' className={'flex items-center p-1'} ref={labelRef}>
          <button
            type={'button'}
            onClick={() => {
              if (labelRef.current) {
                labelRef.current.click();
              }
            }}
          >
            <ChatPlus />
            <input type='file' hidden id={'image'} accept='image/*' onChange={sendImage} />
          </button>
        </label>
        <form
          className={'relative flex flex-1'}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            className={
              'flex-1 rounded-[50px] bg-v1-text-primary-50 py-3 pl-[26px] pr-[48px] placeholder:text-v1-text-primary-200'
            }
            type='text'
            placeholder={'채팅 메세지를 입력해주세요.'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type={'submit'}
            className={'absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-v1-text-primary-100 p-1'}
          >
            <ChatArrowUp />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatSendFooter;

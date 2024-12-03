import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { AddCircle, UpArrowCircle, UpArrowCircleActive } from '@/assets/images/icons';

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
      <div className={'flex border-t border-[#e2e2e2] px-2 pb-4 pt-2'}>
        <label htmlFor='image' className={'p-1'} ref={labelRef}>
          <button
            type={'button'}
            onClick={() => {
              if (labelRef.current) {
                labelRef.current.click();
              }
            }}
          >
            <AddCircle />
            <input type='file' hidden id={'image'} accept='image/*' onChange={sendImage} />
          </button>
        </label>
        <form
          className={'flex flex-1'}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            className={'flex-1 rounded-[50px] border border-[#e2e2e2] px-4 py-3 text-xs placeholder:text-[#999999]'}
            type='text'
            placeholder={'채팅 메세지를 입력해주세요.'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type={'submit'} className={'p-1'}>
            {message ? <UpArrowCircleActive /> : <UpArrowCircle />}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatSendFooter;

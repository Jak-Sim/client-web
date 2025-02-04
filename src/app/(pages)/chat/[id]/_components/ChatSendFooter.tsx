import { ChangeEvent, Dispatch, forwardRef, SetStateAction, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useClickAway } from 'react-use';
import { ChatArrowUp, ChatAttach, ChatLightning, ChatPhoto, ChatPlus } from '@/assets/images/icons';

interface ChatSendFooterProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
  sendImage: (e: ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatSendFooter = ({ message, setMessage, sendMessage, sendImage, setIsOpen, isOpen }: ChatSendFooterProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useClickAway(popupRef, () => {
    setIsOpen(false);
  });

  return (
    <>
      <div className={'flex items-center border-t border-[#e2e2e2] bg-v1-background px-2 pb-4 pt-2'}>
        <label htmlFor='image' className={'relative flex items-center p-1'} ref={labelRef}>
          <button
            type={'button'}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <ChatPlus />
            <input type='file' hidden id={'image'} accept='image/*' onChange={sendImage} />
            {isOpen && <MissionPopup ref={popupRef} />}
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

const MissionPopup = forwardRef<HTMLDivElement>((props, ref) => {
  const router = useRouter();
  const params = useParams();

  const { id } = params;

  return (
    <div className={'absolute bottom-[44px] left-0 z-10 w-[210px] rounded-2xl bg-white'} ref={ref}>
      <div className={'border-b px-6 py-4'} onClick={() => router.push(`/chat/${id}/submission`)}>
        <div className={'flex justify-between font-medium text-v1-text-primary-700'}>
          미션완료 제출
          <ChatLightning />
        </div>
      </div>
      <div className={'border-b px-6 py-4'}>
        <div className={'flex justify-between font-medium text-v1-text-primary-700'}>
          사진 촬영
          <ChatPhoto />
        </div>
      </div>
      <div className={'px-6 py-4'}>
        <div className={'flex justify-between font-medium text-v1-text-primary-700'}>
          사진 첨부
          <ChatAttach />
        </div>
      </div>
    </div>
  );
});

export default ChatSendFooter;

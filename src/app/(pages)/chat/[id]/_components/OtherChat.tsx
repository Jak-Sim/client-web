import React, { ReactNode } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useToggle } from 'react-use';
import SubmissionDetailModal from '@/app/(pages)/chat/[id]/_components/SubmissionDetailModal';
import { ChatSubmissionCancel, ChatSubmissionConfirm, ChatSubmissionLightning } from '@/assets/images/icons';
import defaultAvatar from '@/assets/images/placeholder/face-default.png';
import Portal from '@/components/modal/ModalPortal';
import {
  ChatBase,
  ChatImageProps,
  ChatMessageProps,
  ChatSubmissionProps,
  MessageData,
} from '@/models/chat/data-contracts';

type OtherChatProps = MessageData & {
  isFirstMessage: boolean;
  isLastMessage: boolean;
  isAdmin: boolean;
};

export type SubMissionImageProps = OtherChatProps & {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const OtherChat = (props: OtherChatProps) => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <div
        className={clsx(
          'flex flex-nowrap gap-1 overflow-hidden',
          props.isLastMessage ? 'mb-3' : 'mb-0.5',
          props.type !== 'submission' ? 'max-w-[calc(100%-75px)]' : 'max-w-[calc(100%-40px)]',
        )}
      >
        <Avatar isFirstMessage={props.isFirstMessage} />
        <ContentWrapper>
          <SenderId {...props} />
          {props.type === 'text' && <TextMessage {...props} />}
          {props.type === 'image' && <ImageMessage {...props} />}
          {props.type === 'submission' && (
            <SubmissionMessage {...props} isOpen={isOpen} open={() => toggle(true)} close={() => toggle(false)} />
          )}
          {props.isLastMessage && <TimeStamp timestamp={props.timestamp} />}
        </ContentWrapper>
      </div>
    </>
  );
};

const Avatar = ({ isFirstMessage }: { isFirstMessage: boolean }) => {
  return (
    <div className={clsx('relative h-11 w-11 rounded-full', isFirstMessage ? 'cursor-pointer bg-gray-900' : '')}></div>
  );
};

const SenderId = (props: OtherChatProps) => {
  return props.isFirstMessage && <div className={'pb-0.5 text-sm text-v1-text-primary-400'}>{props.senderId}</div>;
};

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'flex-1'}>
      <div className={'relative w-fit'}>{children}</div>
    </div>
  );
};

const TextMessage = (props: OtherChatProps & ChatMessageProps) => {
  return (
    <div
      className={clsx(
        'break-words rounded-2xl bg-white px-4 py-3 font-normal text-v1-text-primary-600',
        props.isFirstMessage && 'rounded-tl-none',
      )}
    >
      {props.content}
    </div>
  );
};

const ImageMessage = (props: OtherChatProps & ChatImageProps) => {
  return (
    <>
      <div className={'relative h-[170px] overflow-hidden rounded-2xl bg-[#f6f6f6] text-xs font-normal'}>
        <Image src={props.src || defaultAvatar} sizes={'170px'} className={'object-cover'} fill alt={'image'} />
      </div>
    </>
  );
};

const SubmissionMessage = (props: SubMissionImageProps & ChatSubmissionProps) => {
  return (
    <>
      <div className={'flex flex-col overflow-hidden'}>
        <p
          className={clsx(
            'mb-0.5 flex items-center gap-1 rounded-2xl rounded-tl-none bg-v1-orange-500 px-4 py-3 font-medium text-white',
          )}
        >
          <ChatSubmissionLightning />
          미션 제출!
          <ChatSubmissionLightning />
          확인해주세요
        </p>
        <div className={'relative h-[240px] cursor-pointer rounded-2xl rounded-b-none bg-white'} onClick={props.open}>
          <Image src={props.src || defaultAvatar} sizes={'240px'} className={'object-cover'} alt='submission' fill />
        </div>
        <div className={'rounded-2xl rounded-t-none bg-white px-4 py-2'}>
          <p className={'pb-2 text-v1-text-primary-600'}>{props.title}</p>
          <p className={'truncate pb-3 text-v1-text-primary-300'}>{props.description}</p>
          <div className={'pb-2.5'}>
            <div className='flex flex-nowrap gap-1 font-semibold text-v1-text-primary-700'>
              <button
                className='flex flex-1 items-center justify-center gap-2 truncate rounded-2xl border border-v1-text-primary-300 px-3 py-2 font-normal text-v1-text-primary-600'
                type='button'
              >
                <ChatSubmissionCancel />
                다시 도전
              </button>
              <button
                className='flex flex-1 items-center justify-center gap-2 truncate rounded-2xl border border-v1-text-primary-300 px-3 py-2 font-normal text-v1-text-primary-600'
                type='button'
              >
                <ChatSubmissionConfirm />
                미션 확인
              </button>
            </div>
          </div>
        </div>
      </div>
      {props.isOpen && (
        <Portal>
          <SubmissionDetailModal {...props} />
        </Portal>
      )}
    </>
  );
};

const TimeStamp = ({ timestamp }: { timestamp: ChatBase['timestamp'] }) => {
  return (
    <div className={'absolute bottom-0 right-0 translate-x-[calc(100%+2px)] transform'}>
      <div className={'text-[10px] text-v1-text-primary-200'}>
        {format(timestamp, 'a HH:mm', {
          locale: ko,
        })}
      </div>
    </div>
  );
};

export default OtherChat;

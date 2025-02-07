import React, { ReactNode } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { ChatSubmissionLightning } from '@/assets/images/icons';
import defaultAvatar from '@/assets/images/placeholder/face-default.png';
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
};

const OtherChat = (props: OtherChatProps) => {
  return (
    <div className={clsx('flex max-w-[calc(100%-75px)] flex-nowrap gap-1', props.isLastMessage ? 'mb-3' : 'mb-0.5')}>
      <Avatar isFirstMessage={props.isFirstMessage} />
      <ContentWrapper>
        <SenderId {...props} />
        {props.type === 'text' && <TextMessage {...props} />}
        {props.type === 'image' && <ImageMessage {...props} />}
        {props.type === 'submission' && <SubmissionMessage {...props} />}
        {props.isLastMessage && <TimeStamp timestamp={props.timestamp} />}
      </ContentWrapper>
    </div>
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

const SubmissionMessage = (props: OtherChatProps & ChatSubmissionProps) => {
  //todo 버튼 아이콘 추가 및 로직 추가
  return (
    <div className={'w-full'}>
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
      <div className={'relative h-[240px] w-full max-w-[260px] rounded-2xl rounded-b-none bg-white'}>
        <Image src={props.src || defaultAvatar} sizes={'240px'} className={'object-cover'} alt='submission' fill />
      </div>
      <div className={'w-f rounded-2xl rounded-t-none bg-white px-4 py-2'}>
        <p className={'pb-2 text-v1-text-primary-600'}>{props.title}</p>
        <p className={'pb-3 text-v1-text-primary-300'}>{props.description}</p>
        <div className={'pb-2.5'}>
          <div className='flex flex-wrap gap-1 font-semibold text-v1-text-primary-700'>
            <button
              className='flex-1 rounded-2xl border border-v1-text-primary-300 px-3 py-2 text-v1-text-primary-600'
              type='button'
            >
              다시 도전
            </button>
            <button
              className='flex-1 rounded-2xl border border-v1-text-primary-300 px-3 py-2 text-v1-text-primary-600'
              type='button'
            >
              미션 확인
            </button>
          </div>
        </div>
      </div>
    </div>
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

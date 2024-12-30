import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { ChatMessage } from '@/models/chat/data-contracts';

interface OtherChatProps extends ChatMessage {
  isFirstMessage: boolean;
  isLastMessage: boolean;
}

const OtherChat = (props: OtherChatProps) => {
  return (
    <div className={clsx('flex max-w-[calc(100%-75px)] flex-nowrap gap-1', props.isLastMessage ? 'mb-3' : 'mb-0.5')}>
      <Avatar isFirstMessage={props.isFirstMessage} />
      <ContentWrapper>
        <SenderId {...props} />
        <Content {...props} />
        {props.isLastMessage && <TimeStamp timestamp={props.timestamp} />}
      </ContentWrapper>
    </div>
  );
};

const Avatar = ({ isFirstMessage }: { isFirstMessage: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        if (isFirstMessage) {
          setIsOpen(!isOpen);
        }
      }}
      className={clsx('relative h-11 w-11 rounded-full', isFirstMessage ? 'cursor-pointer bg-gray-900' : '')}
    >
      {isOpen && <ProfileModal />}
    </div>
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

const Content = (props: OtherChatProps) => {
  return (
    <>
      {props.type === 'text' && (
        <div
          className={clsx(
            'break-words rounded-2xl bg-white px-4 py-3 font-normal text-v1-text-primary-600',
            props.isFirstMessage && 'rounded-tl-none',
          )}
        >
          {props.content}
        </div>
      )}
      {props.type === 'image' && (
        <div className={'relative h-[170px] overflow-hidden rounded-2xl bg-[#f6f6f6] text-xs font-normal'}>
          <Image src={props.content} sizes={'170px'} className={'object-cover'} fill alt={props.type} />
        </div>
      )}
    </>
  );
};

const TimeStamp = ({ timestamp }: { timestamp: ChatMessage['timestamp'] }) => {
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

const ProfileModal = () => {
  return (
    <div
      className={'absolute bottom-0 left-0 z-10 w-[210px] translate-y-[calc(100%+15px)] transform rounded-2xl bg-white'}
    >
      <div className={'border-b px-6 py-4'}>
        <div className={'flex justify-between font-medium text-v1-text-primary-700'}>미션완료 제출</div>
      </div>
      <div className={'border-b px-6 py-4'}>
        <div className={'flex justify-between font-medium text-v1-text-primary-700'}>사진 촬영</div>
      </div>
      <div className={'px-6 py-4'}>
        <div className={'flex justify-between font-medium text-v1-text-primary-700'}>사진 첨부</div>
      </div>
    </div>
  );
};

export default OtherChat;

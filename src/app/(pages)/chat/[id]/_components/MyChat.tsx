import Image from 'next/image';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { ChatMessage } from '@/models/chat/data-contracts';

interface MyChatProps extends ChatMessage {
  isFirstMessage: boolean;
  isLastMessage: boolean;
}

const MyChat = (props: MyChatProps) => {
  return (
    <div className={clsx('flex justify-end', props.isLastMessage ? 'mb-3' : 'mb-0.5')}>
      <div className={'relative max-w-[calc(100%-123px)]'}>
        <Content {...props} />
        {props.isLastMessage && <TimeStamp timestamp={props.timestamp} />}
      </div>
    </div>
  );
};

const Content = (props: MyChatProps) => {
  return (
    <>
      {props.type === 'text' && (
        <div
          className={clsx(
            'w-full break-words rounded-2xl bg-[#323254] px-4 py-2 text-white',
            props.isLastMessage && 'rounded-br-none',
          )}
        >
          {props.content}
        </div>
      )}

      {props.type === 'image' && (
        <div className={'relative h-[170px] overflow-hidden rounded-2xl bg-[#323254]'}>
          <Image src={props.content} sizes={'170px'} className={'object-cover'} fill alt={props.type} />
        </div>
      )}
    </>
  );
};

const TimeStamp = ({ timestamp }: { timestamp: ChatMessage['timestamp'] }) => {
  return (
    <div className={'absolute bottom-0 left-0 -translate-x-[calc(100%+2px)] transform'}>
      <div className={'text-[10px] text-v1-text-primary-200'}>
        {format(timestamp, 'a HH:mm', {
          locale: ko,
        })}
      </div>
    </div>
  );
};

export default MyChat;

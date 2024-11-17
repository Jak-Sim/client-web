import { ChatMessage } from '@/app/(pages)/chat/[id]/page';
import { format } from 'date-fns';

const OtherChat = ({ message, userId, timestamp }: ChatMessage) => {
  return (
    <div className={'mb-4 flex gap-2'}>
      <div className={'h-8 w-8 rounded-full bg-[#f6f6f6]'} />
      <div className={'relative'}>
        <div className={'pb-0.5 text-[8px] font-bold'}>{userId}</div>
        <div
          className={'max-w-[170px] break-words rounded-2xl bg-[#f6f6f6] px-4 py-3 text-xs font-normal leading-[14px]'}
        >
          {message}
        </div>
        <div className={'absolute bottom-0 right-[-25px]'}>
          <div className={'text-[8px] font-normal text-[#969696]'}>{format(timestamp, 'HH:mm')}</div>
          <div className={'text-[6px] font-normal text-[#969696]'}>{0}명 읽음</div>
        </div>
      </div>
    </div>
  );
};

export default OtherChat;

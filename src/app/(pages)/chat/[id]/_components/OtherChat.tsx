import { ChatMessage } from '@/app/(pages)/chat/[id]/page';
import { format } from 'date-fns';

const OtherChat = ({ message, userId, timestamp }: ChatMessage) => {
  return (
    <div className={'flex gap-2 mb-4'}>
      <div className={'w-8 h-8 rounded-full bg-[#f6f6f6]'} />
      <div className={'relative'}>
        <div className={'font-bold text-[8px] pb-0.5'}>{userId}</div>
        <div
          className={'max-w-[170px] break-words rounded-2xl bg-[#f6f6f6] py-3 px-4 font-normal text-xs leading-[14px]'}
        >
          {message}
        </div>
        <div className={'absolute bottom-0 right-[-25px]'}>
          <div className={'text-[#969696] font-normal text-[8px]'}>{format(timestamp, 'HH:mm')}</div>
          <div className={'text-[#969696] font-normal text-[6px]'}>{0}명 읽음</div>
        </div>
      </div>
    </div>
  );
};

export default OtherChat;

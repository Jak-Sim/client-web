import { format } from 'date-fns';
import { ChatMessage } from '@/app/(pages)/chat/[id]/page';

const MyChat = ({ message, timestamp }: ChatMessage) => {
  return (
    <div className={'mb-4 mr-3 flex justify-end'}>
      <div className={'relative'}>
        <div
          className={
            'max-w-[170px] break-words rounded-2xl bg-primary px-4 py-3 text-xs font-normal leading-[14px] text-white'
          }
        >
          {message}
        </div>
        <div className={'absolute bottom-0 left-[-25px]'}>
          <div className={'text-[8px] font-normal text-[#969696]'}>{format(timestamp, 'HH:mm')}</div>
          <div className={'text-[6px] font-normal text-[#969696]'}>{0}명 읽음</div>
        </div>
      </div>
    </div>
  );
};

export default MyChat;

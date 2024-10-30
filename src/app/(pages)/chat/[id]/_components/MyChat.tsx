import { format } from 'date-fns';
import { ChatMessage } from '@/app/(pages)/chat/[id]/page';

const MyChat = ({ message, timestamp }: ChatMessage) => {
  return (
    <div className={'flex justify-end mb-4 mr-3'}>
      <div className={'relative'}>
        <div
          className={
            'max-w-[170px] break-words rounded-2xl bg-primary text-white py-3 px-4 font-normal text-xs leading-[14px]'
          }
        >
          {message}
        </div>
        <div className={'absolute bottom-0 left-[-25px]'}>
          <div className={'text-[#969696] font-normal text-[8px]'}>{format(timestamp, 'HH:mm')}</div>
          <div className={'text-[#969696] font-normal text-[6px]'}>{0}명 읽음</div>
        </div>
      </div>
    </div>
  );
};

export default MyChat;

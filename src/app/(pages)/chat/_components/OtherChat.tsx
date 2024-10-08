import type { ChatProps } from '@/app/(pages)/chat/page';
import { format } from 'date-fns';

const OtherChat = ({ msg, id, viewer, date }: ChatProps) => {
  return (
    <div className={'flex gap-2 mb-4'}>
      <div className={'w-8 h-8 rounded-full bg-[#f6f6f6]'} />
      <div className={'relative'}>
        <div className={'font-bold text-[8px] pb-0.5'}>{id}</div>
        <div
          className={'max-w-[170px] break-words rounded-2xl bg-[#f6f6f6] py-3 px-4 font-normal text-xs leading-[14px]'}
        >
          {msg}
        </div>
        <div className={'absolute bottom-0 right-[-25px]'}>
          <div className={'text-[#969696] font-normal text-[8px]'}>{format(date, 'HH:mm')}</div>
          <div className={'text-[#969696] font-normal text-[6px]'}>{viewer}명 읽음</div>
        </div>
      </div>
    </div>
  );
};

export default OtherChat;

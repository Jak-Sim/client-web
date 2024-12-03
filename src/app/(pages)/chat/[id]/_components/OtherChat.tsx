import Image from 'next/image';
import { format } from 'date-fns';
import { ChatMessage } from '@/models/chat/data-contracts';

const OtherChat = (props: ChatMessage) => {
  return (
    <div className={'mb-4 flex gap-2'}>
      <div className={'h-8 w-8 rounded-full bg-[#f6f6f6]'} />
      <div className={'relative'}>
        <div className={'pb-0.5 text-[8px] font-bold'}>{props.senderId}</div>
        {props.type === 'text' && (
          <div
            className={
              'max-w-[170px] break-words rounded-2xl bg-[#f6f6f6] px-4 py-3 text-xs font-normal leading-[14px]'
            }
          >
            {props.content}
          </div>
        )}
        {props.type === 'image' && (
          <div className={'relative h-[170px] w-[170px] overflow-hidden rounded-2xl bg-[#f6f6f6] text-xs font-normal'}>
            <Image src={props.content} sizes={'170px'} className={'object-cover'} fill alt={props.type} />
          </div>
        )}
        <div className={'absolute bottom-0 right-[-25px]'}>
          <div className={'text-[8px] font-normal text-[#969696]'}>{format(props.timestamp, 'HH:mm')}</div>
          <div className={'text-[6px] font-normal text-[#969696]'}>{0}명 읽음</div>
        </div>
      </div>
    </div>
  );
};

export default OtherChat;

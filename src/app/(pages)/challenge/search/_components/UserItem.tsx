import Image from 'next/image';
import defaultImage from '@/assets/images/placeholder/face-default.png';
import Button from '@/components/button/Button';
import { User } from '@/types/challenge';

export default function UserItem({ user }: { user: User }) {
  return (
    <div className='flex h-[232px] w-full shrink-0 flex-col items-center justify-between gap-2 rounded-3xl bg-white px-6 py-6'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image
          src={user.profileImageUrl || defaultImage}
          alt={user.name}
          width={84}
          height={84}
          className='h-[84px] w-[84px] rounded-full object-cover'
        />
        <p className='font-semibold'>{user.name}</p>
      </div>
      <Button size='md' className='max-w-[250px]'>
        채팅 하러가기
      </Button>
    </div>
  );
}

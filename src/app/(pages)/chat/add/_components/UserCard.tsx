'use client';

import { useSearchParams } from 'next/navigation';

const UserCard = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  if (username === '없음') {
    return (
      <div className={'flex flex-1 items-center justify-center text-v1-text-primary-300'}>검색결과가 없습니다</div>
    );
  }

  return (
    <div className={'flex flex-col items-center justify-center rounded-[20px] bg-white p-6'}>
      <div className={'h-[84px] w-[84px] rounded-full bg-v1-text-primary-300'}></div>
      <p className={'w-full pb-[28px] text-center font-medium text-v1-text-primary-700'}>{username}</p>
      <div className={'w-full px-6'}>
        <button className={'w-full rounded-2xl bg-v1-orange-500 p-[10px] text-white'} type={'button'}>
          채팅하러 가기
        </button>
      </div>
    </div>
  );
};

export default UserCard;

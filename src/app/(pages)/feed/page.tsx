import Link from 'next/link';
import Complete from '@/assets/images/emojis/Complete.png';
import Compliment from '@/assets/images/emojis/Compliment.png';
import Neighbors from '@/assets/images/emojis/Neighbors.png';
import Recommend from '@/assets/images/emojis/Recommend.png';
import { Filter, Search } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import Title from './_components/Title';

const Page = () => {
  return (
    <PageLayout
      className={'bg-v1-background'}
      header={
        <Header>
          <Header.Item>
            <Header.BoldText bold={'피드'} className={'text-v1-text-primary-500'} />
          </Header.Item>
          <Header.Item>
            <Header.IconWrapper>
              <Header.Icon Icon={Search} />
              <Header.Icon Icon={Filter} />
            </Header.IconWrapper>
          </Header.Item>
        </Header>
      }
    >
      <div>
        <div className={'pt-3'}>
          <Title emoji={Recommend} text={'추천 챌린지'} />
          <ul className='flex w-full gap-2 overflow-hidden px-6'>
            <li className={'w-full flex-none'}>
              <div className='aspect-square rounded-[20px] bg-black'></div>
            </li>
            <li className={'w-full flex-none'}>
              <div className='aspect-square rounded-[20px] bg-red-500'></div>
            </li>
            <li className={'w-full flex-none'}>
              <div className='aspect-square rounded-[20px] bg-blue-500'></div>
            </li>
          </ul>
        </div>
        <div className={'pt-8'}>
          <Title emoji={Neighbors} text={'잠식 이웃들'} />
          <ul className='flex w-full gap-2 overflow-hidden px-6'>
            <li>
              <Link href={'/feed/1'} className={'flex cursor-pointer flex-col items-center justify-center gap-1'}>
                <div className={'h-[84px] w-[84px] rounded-full bg-gray-300'}></div>
                <p className={'font-semibold'}>떤아</p>
              </Link>
            </li>
            <li>
              <Link href={'/feed/1'} className={'flex cursor-pointer flex-col items-center justify-center gap-1'}>
                <div className={'h-[84px] w-[84px] rounded-full bg-gray-300'}></div>
                <p className={'font-semibold'}>asd</p>
              </Link>
            </li>
            <li>
              <Link href={'/feed/1'} className={'flex cursor-pointer flex-col items-center justify-center gap-1'}>
                <div className={'h-[84px] w-[84px] rounded-full bg-gray-300'}></div>
                <p className={'font-semibold'}>유쥬디</p>
              </Link>
            </li>
            <li>
              <Link href={'/feed/1'} className={'flex cursor-pointer flex-col items-center justify-center gap-1'}>
                <div className={'h-[84px] w-[84px] rounded-full bg-gray-300'}></div>
                <p className={'font-semibold'}>종버미</p>
              </Link>
            </li>
            <li>
              <Link href={'/feed/1'} className={'flex cursor-pointer flex-col items-center justify-center gap-1'}>
                <div className={'h-[84px] w-[84px] rounded-full bg-gray-300'}></div>
                <p className={'font-semibold'}>햄니</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={'pt-10'}>
          <Title emoji={Compliment} text={'칭찬을 나눠요!'} />
          <ul className='flex w-full gap-2 overflow-hidden px-6'>
            <li className={'w-[200px] flex-none'}>
              <div className='aspect-square rounded-[20px] bg-black'></div>
              <p className={'truncate text-v1-text-primary-400'}>우리만의 만보 🐾 발아프다asdasda</p>
            </li>
            <li className={'w-[200px] flex-none'}>
              <div className='aspect-square rounded-[20px] bg-red-500'></div>
              <p className={'truncate text-v1-text-primary-400'}>우리만의 만보 🐾 발아프다asdasda</p>
            </li>
            <li className={'w-[200px] flex-none'}>
              <div className='aspect-square rounded-[20px] bg-blue-500'></div>
              <p className={'truncate text-v1-text-primary-400'}>우리만의 만보 🐾 발아프다asdasda</p>
            </li>
          </ul>
        </div>
        <div className={'py-10'}>
          <Title emoji={Complete} text={'챌린지 완료!!'} />
          <ul className='flex w-full gap-2 overflow-hidden px-6'>
            <li className={'w-[200px] flex-none'}>
              <div className='aspect-square rounded-[20px] bg-black'></div>
              <p className={'truncate text-v1-text-primary-400'}>우리만의 만보 🐾 발아프다asdasda</p>
            </li>
            <li className={'w-[200px] flex-none'}>
              <div className='aspect-square rounded-[20px] bg-red-500'></div>
              <p className={'truncate text-v1-text-primary-400'}>우리만의 만보 🐾 발아프다asdasda</p>
            </li>
            <li className={'w-[200px] flex-none'}>
              <div className='aspect-square rounded-[20px] bg-blue-500'></div>
              <p className={'truncate text-v1-text-primary-400'}>우리만의 만보 🐾 발아프다asdasda</p>
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default Page;

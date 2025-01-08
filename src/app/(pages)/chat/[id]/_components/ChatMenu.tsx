'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { useClickAway } from 'react-use';
import {
  ChatMenuChallenge,
  ChatMenuChallenger,
  ChatMenuChallengerCrown,
  ChatMenuChevronRight,
  ChatMenuMission,
} from '@/assets/images/icons';
import FaceDefault from '@/assets/images/placeholder/face-default.png';

interface ChatMenuProps {
  isOpen: boolean;
  close: () => void;
}

const ChatMenu = ({ isOpen, close }: ChatMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useClickAway(menuRef, close);

  return (
    <aside>
      <div
        className={clsx(
          'fixed inset-x-0 top-0 z-[101] m-auto h-screen w-full max-w-[400px] overflow-hidden transition-all duration-300',
          {
            ['visible bg-black/10']: isOpen,
            ['invisible bg-black/0']: !isOpen,
          },
        )}
      >
        <div
          ref={menuRef}
          className={clsx(
            'absolute right-0 h-full w-5/6 bg-white px-5 py-3 shadow-2xl transition-transform duration-300',
            {
              'translate-x-0': isOpen,
              'translate-x-full': !isOpen,
            },
          )}
        >
          <div className={'flex h-full flex-col'}>
            <div className={'border-b border-b-v1-text-primary-100'}>
              <ul>
                <li className={'flex cursor-pointer py-3'}>
                  <div className={'flex flex-1 items-center gap-2'}>
                    <ChatMenuChallenge />
                    <p className={'font-medium text-v1-text-primary-400'}>챌린지 보기</p>
                  </div>
                  <ChatMenuChevronRight />
                </li>
                <li className={'flex cursor-pointer py-3'}>
                  <div className={'flex flex-1 items-center gap-2'}>
                    <ChatMenuMission />
                    <p className={'font-medium text-v1-text-primary-400'}>미션 보기</p>
                  </div>
                  <ChatMenuChevronRight />
                </li>
              </ul>
            </div>
            <div className={'border-b border-b-v1-text-primary-100'}>
              <p className={'py-3 text-sm font-medium text-v1-text-primary-400'}>오늘 미션</p>
              <ul>
                <li className={'cursor-pointer py-3 font-medium text-v1-text-primary-700'}>
                  한 챕터 읽고 한줄 후기 쓰기
                </li>
                <li className={'cursor-pointer py-3 font-medium text-v1-text-primary-700'}>책 한권 노션에 정리하기</li>
              </ul>
            </div>
            <div className={'border-b border-b-v1-text-primary-100'}>
              <p className={'py-3 text-sm font-medium text-v1-text-primary-400'}>내일 미션</p>
              <ul>
                <li className={'cursor-pointer py-3 font-medium text-v1-text-primary-700'}>
                  이쁜곳에서 책 읽고 사진업로드
                </li>
              </ul>
            </div>
            <div className={'flex-1 overflow-auto'}>
              <div className={'flex items-center gap-2 py-3'}>
                <ChatMenuChallenger />
                <p>챌린저</p>
              </div>
              <ul className={'flex flex-col gap-3'}>
                <li className={'flex items-center'}>
                  <Image src={FaceDefault} alt={'avatar'} width={44} height={44} />
                  <p className={'flex items-center gap-[10px] p-[10px]'}>
                    종버미 <ChatMenuChallengerCrown />
                  </p>
                </li>
                <li className={'flex items-center'}>
                  <Image src={FaceDefault} alt={'avatar'} width={44} height={44} />
                  <p className={'p-[10px]'}>창슈니</p>
                </li>
                <li className={'flex items-center'}>
                  <Image src={FaceDefault} alt={'avatar'} width={44} height={44} />
                  <p className={'p-[10px]'}>유쥬디</p>
                </li>
                <li className={'flex items-center'}>
                  <Image src={FaceDefault} alt={'avatar'} width={44} height={44} />
                  <p className={'p-[10px]'}>떤아</p>
                </li>
                <li className={'flex items-center'}>
                  <Image src={FaceDefault} alt={'avatar'} width={44} height={44} />
                  <p className={'p-[10px]'}>혬니</p>
                </li>
                <li className={'flex items-center'}>
                  <Image src={FaceDefault} alt={'avatar'} width={44} height={44} />
                  <p className={'p-[10px]'}>삼식이</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatMenu;

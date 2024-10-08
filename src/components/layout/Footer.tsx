'use client';

import FooterItem from '@/components/layout/FooterItem';
import Flag from '../../assets/images/icons/flag.svg';
import Comment from '../../assets/images/icons/comment.svg';
import Search from '../../assets/images/icons/search.svg';
import Profile from '../../assets/images/icons/profile.svg';

const Footer = () => {
  return (
    <footer className='bg-white border-t border-[#e2e2e2]'>
      <ul className='flex justify-between text-center pt-[14px] px-2 pb-[3px]'>
        <FooterItem name={'challenge'} text={'챌린지'} icon={Flag} />
        <FooterItem name={'chat'} text={'채팅'} icon={Comment} />
        <FooterItem name={'feed'} text={'피드'} icon={Search} />
        <FooterItem name={'mypage'} text={'마이페이지'} icon={Profile} />
      </ul>
    </footer>
  );
};

export default Footer;

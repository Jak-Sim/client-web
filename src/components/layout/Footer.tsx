import FooterItem from '@/components/layout/FooterItem';
import flagActive from '../../assets/images/icons/flag-active.svg';
import flag from '../../assets/images/icons/flag.svg';
import commentActive from '../../assets/images/icons/comment-active.svg';
import comment from '../../assets/images/icons/comment.svg';
import searchActive from '../../assets/images/icons/search-active.svg';
import search from '../../assets/images/icons/search.svg';
import profileActive from '../../assets/images/icons/profile-active.svg';
import profile from '../../assets/images/icons/profile.svg';

const Footer = () => {
  return (
    <footer className='bg-white border-t border-[#e2e2e2]'>
      <ul className='flex justify-between text-center pt-[14px] px-2 pb-[3px]'>
        <FooterItem name={'challenge'} text={'챌린지'} activeIcon={flagActive} inActiveIcon={flag} />
        <FooterItem name={'chat'} text={'채팅'} activeIcon={commentActive} inActiveIcon={comment} />
        <FooterItem name={'feed'} text={'피드'} activeIcon={searchActive} inActiveIcon={search} />
        <FooterItem name={'mypage'} text={'마이페이지'} activeIcon={profileActive} inActiveIcon={profile} />
      </ul>
    </footer>
  );
};

export default Footer;

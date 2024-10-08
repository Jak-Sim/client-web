'use client';
import kakaoLogin from '@/assets/images/icons/kakao-login.svg';
import naverLogin from '@/assets/images/icons/naver-login.svg';
import googleLogin from '@/assets/images/icons/google-login.svg';
import useSocialLogin from '../_hooks/useSocialLogin';
import SocialLoginButton from './SocialLoginButton';

export default function ButtonBox() {
  const { login } = useSocialLogin();

  return (
    <div className='flex gap-4 justify-center'>
      <SocialLoginButton
        iconSrc={kakaoLogin}
        onClick={() => login('kakao')}
        className='bg-[#fee502]'
        alt='카카오 로그인'
      />
      <SocialLoginButton
        iconSrc={naverLogin}
        onClick={() => login('naver')}
        className='bg-[#1ec800]'
        alt='네이버 로그인'
      />
      <SocialLoginButton iconSrc={googleLogin} onClick={() => login('google')} className='bg-white' alt='구글 로그인' />
    </div>
  );
}

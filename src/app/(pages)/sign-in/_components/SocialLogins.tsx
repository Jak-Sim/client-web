'use client';
import { GoogleLogin, KakaoLogin, NaverLogin } from '@/assets/images/icons';
import useSocialLogin from '../_hooks/useSocialLogin';
import SocialLoginButton from './SocialLoginButton';

export default function SocialLogins() {
  const { login, isLoading } = useSocialLogin();

  return (
    <div
      className={`w-full flex flex-col gap-4 justify-center px-6 ${isLoading ? 'cursor-default pointer-events-none' : ''}`}
    >
      <SocialLoginButton
        icon={KakaoLogin}
        onClick={() => login('kakao')}
        className='bg-[#fee501]'
        buttonText='카카오 로그인'
      />
      <SocialLoginButton
        icon={NaverLogin}
        onClick={() => login('naver')}
        className='bg-[#01c75a] text-white'
        buttonText='네이버 로그인'
      />
      <SocialLoginButton
        icon={GoogleLogin}
        onClick={() => login('google')}
        className='bg-white text-v1-text-primary-700'
        buttonText='구글 로그인'
      />
    </div>
  );
}

'use client';
import { GoogleLogin, KakaoLogin, NaverLogin } from '@/assets/images/icons';
import useSocialLogin from '../_hooks/useSocialLogin';
import SocialLoginButton from './SocialLoginButton';

export default function SocialLogins() {
  const { login, isLoading } = useSocialLogin();

  return (
    <div className={`flex gap-4 justify-center ${isLoading ? 'cursor-default pointer-events-none' : ''}`}>
      <SocialLoginButton icon={KakaoLogin} onClick={() => login('kakao')} className='bg-[#fee501]' />
      <SocialLoginButton icon={NaverLogin} onClick={() => login('naver')} className='bg-[#01c75a]' />
      <SocialLoginButton icon={GoogleLogin} onClick={() => login('google')} className='bg-white' />
    </div>
  );
}

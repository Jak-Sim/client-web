'use client';
import useSocialLogin from '../_hooks/useSocialLogin';
import SocialLoginButton from './SocialLoginButton';
import { GoogleLogin, KakaoLogin, NaverLogin } from '@/assets/images/icons';

export default function ButtonBox() {
  const { login } = useSocialLogin();

  return (
    <div className='flex gap-4 justify-center'>
      <SocialLoginButton icon={KakaoLogin} onClick={() => login('kakao')} className='bg-[#fee502]' />
      <SocialLoginButton icon={NaverLogin} onClick={() => login('naver')} className='bg-[#1ec800]' />
      <SocialLoginButton icon={GoogleLogin} onClick={() => login('google')} className='bg-white' />
    </div>
  );
}

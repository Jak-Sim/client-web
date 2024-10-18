'use client';
import { signOut, useSession } from 'next-auth/react';
import { GoogleLogin, KakaoLogin, NaverLogin } from '@/assets/images/icons';
import useSocialLogin from '../_hooks/useSocialLogin';
import SocialLoginButton from './SocialLoginButton';

export default function SocialLogins() {
  const { login, isLoading } = useSocialLogin();

  return (
    <div className={`flex gap-4 justify-center ${isLoading ? 'cursor-default pointer-events-none' : ''}`}>
      <SocialLoginButton icon={KakaoLogin} onClick={() => login('KAKAO')} className='bg-[#fee501]' />
      <SocialLoginButton icon={NaverLogin} onClick={() => login('NAVER')} className='bg-[#01c75a]' />
      <SocialLoginButton icon={GoogleLogin} onClick={() => login('GOOGLE')} className='bg-white' />

      <TempLogOutButton />
    </div>
  );
}

function TempLogOutButton() {
  const { data: session } = useSession();

  return (
    <div>
      <button
        onClick={() => signOut()}
        className='absolute bottom-0 right-1/2 translate-x-1/2 py-6 text-sm text-red-500 underline'
      >
        {session ? '테스트용 로그아웃' : ''}
      </button>
    </div>
  );
}

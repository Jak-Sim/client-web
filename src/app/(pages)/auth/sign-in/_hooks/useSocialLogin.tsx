import { useCallback, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { CustomSession, JaksimOAuthProviderType } from '@/lib/next-auth/auth';

export default function useSocialLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const sessionWithAccount = session as CustomSession;
  const statusCode = sessionWithAccount?.auth?.statusCode;

  const newUserRedirect = useCallback(() => router.push('/auth/sign-up'), [router]);
  const loginUserRedirect = useCallback(() => router.push('/'), [router]);

  const login = async (provider: JaksimOAuthProviderType) => {
    setIsLoading(true);
    try {
      const response = await signIn(provider);
      if (response?.ok) {
        router.push('/auth/sign-up');
      }
    } catch (error) {
      console.error(`${provider} 로그인 시도 중 오류 발생:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionWithAccount) return;
    const { AT = null, RT = null } = sessionWithAccount?.auth;

    if (statusCode === 208) {
      newUserRedirect();
    } else if (statusCode === 209 || statusCode === 200) {
      setCookie('AT', AT);
      setCookie('RT', RT);
      loginUserRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCode, sessionWithAccount, newUserRedirect, loginUserRedirect]);

  return {
    login,
    isLoading,
  };
}

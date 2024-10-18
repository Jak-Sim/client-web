import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import { type JaksimOAuthProviderType, CustomSession } from '@/app/api/auth/[...nextauth]/route';

export default function useSocialLogin() {
  const router = useRouter();
  const { userData, setUserData } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const sessionWithAccount = session as CustomSession;
  const statusCode = sessionWithAccount?.auth?.statusCode;

  const newUserRedirect = useCallback(() => router.push('/sign-up'), [router]);
  const loginUserRedirect = useCallback(() => router.push('/'), [router]);

  const login = async (provider: JaksimOAuthProviderType) => {
    setIsLoading(true);
    try {
      const response = await signIn(provider);
      if (response?.ok) {
        router.push('/sign-up');
      }
    } catch (error) {
      console.error(`${provider} 로그인 중 오류 발생:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (statusCode === 208) {
      newUserRedirect();
    } else if (statusCode === 209) {
      setUserData(sessionWithAccount.user);
      loginUserRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCode, sessionWithAccount, newUserRedirect, loginUserRedirect]);

  return {
    login,
    userData,
    isLoading,
  };
}

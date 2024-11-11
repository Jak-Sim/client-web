import { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import NextAuth, { User, type Account, type NextAuthOptions, type Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { api } from '@/lib/axios/axios';
import { coloredStatusCode } from '@/utils/coloredStatusCode';

export type JaksimOAuthProviderType = 'google' | 'kakao' | 'naver';

export interface CustomAuth {
  auth: {
    statusCode: number;
    AT: string | null;
    RT: string | null;
    social: JaksimOAuthProviderType;
  };
}

export interface CustomUser extends User {
  name: string;
}

type AccountWithAuth = Account & CustomAuth;
export type CustomSession = Session & CustomAuth & { account: Account; user: CustomUser };

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? '',
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      try {
        if (account) {
          const provider = account.provider as JaksimOAuthProviderType;
          const response = await api.post(`/sign-in/${provider}`, account);

          const statusCode = response.status;
          if (!(statusCode >= 200 && statusCode < 300)) {
            throw new Error(`예상치 못한 응답 상태: ${statusCode}`);
          }

          const { AT, RT } = response.data.data;
          (account as AccountWithAuth).auth = { statusCode, AT, RT, social: provider };
        }
      } catch (error) {
        throw new Error('소셜 로그인 실패', { cause: error });
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (account) {
        const { auth, ...rest } = account as AccountWithAuth;
        token.account = rest;
        token.auth = auth;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      let AT = (token.auth as CustomAuth['auth'])?.AT;
      let RT = (token.auth as CustomAuth['auth'])?.RT;

      if (AT && RT) {
        const exp = jwtDecode(AT).exp;
        const isATCloseToExpiration = exp && exp - Date.now() / 1000 <= 300;

        if (isATCloseToExpiration) {
          try {
            const response = await api.post('/refresh-token', { AT, RT });
            AT = response.data.data.AT;
            RT = response.data.data.RT;
            setCookie('AT', AT);
            setCookie('RT', RT);
          } catch (error) {
            const statusCode = (error as AxiosError).response?.status;

            switch (statusCode) {
              case 422: // 로그아웃 처리
                signOut();
                break;
              case 423: // 알 수 없는 에러
                signOut();
                break;
              default:
                console.error(
                  `\x1b[31m[ERROR]\x1b[0m 토큰 갱신 에러${statusCode ? `, statusCode: ${coloredStatusCode(statusCode)}` : ''}`,
                );
            }
          }
        }
      }

      return {
        ...session,
        account: token.account as Account,
        auth: { ...(token.auth as CustomAuth['auth']), AT, RT },
        user: token.user as CustomUser,
      };
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

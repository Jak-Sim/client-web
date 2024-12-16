import NextAuth, { type Account, type NextAuthOptions, type Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { signOut } from 'next-auth/react';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
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
  userUniqueId: string;
}

type AccountWithAuth = Account & CustomAuth & { userUniqueId: string };
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

          const { AT, RT, userUniqueId } = response.data.data;
          (account as AccountWithAuth).auth = { statusCode, AT, RT, social: provider };
          (account as AccountWithAuth).userUniqueId = userUniqueId;
        }
      } catch (error) {
        let errMsg = '';
        if (error instanceof Error) {
          errMsg = encodeURIComponent(error.message);
          if (errMsg.includes('ECONNREFUSED')) {
            errMsg = 'ECONNREFUSED';
          }
        }
        return `/auth/error${errMsg ? `?message=${errMsg}` : ''}`;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (account) {
        const { auth, userUniqueId, ...rest } = account as AccountWithAuth;
        token.account = rest;
        token.auth = auth;
        token.user = { ...user, userUniqueId };
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
            if (error instanceof AxiosError) {
              const statusCode = error.response?.status;
              switch (statusCode) {
                case 422: // 로그아웃 처리
                  signOut();
                  break;
                case 423: // 알 수 없는 에러
                  signOut();
                  break;
                default:
                  console.error(
                    `\x1b[31m[ERROR]\x1b[0m 토큰 갱신 에러${statusCode ? `, statusCode: ${coloredStatusCode(statusCode)}` : ''}\n${error.message}`,
                  );
              }
            }
          }
        }
      }

      return {
        ...session,
        account: token.account as AccountWithAuth as AccountWithAuth,
        auth: { ...(token.auth as CustomAuth['auth']), AT, RT },
        user: token.user as CustomUser,
      };
    },
  },
};

export const handler = NextAuth(nextAuthOptions);
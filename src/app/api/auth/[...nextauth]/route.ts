import NextAuth, { type Account, type NextAuthOptions, type Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { api } from '@/lib/axios/axios';
import type { UserData } from '@/types/user';

export type JaksimOAuthProviderType = 'google' | 'kakao' | 'naver';

export interface Auth {
  auth: {
    statusCode: number;
    AT: string | null;
    RT: string | null;
    social: JaksimOAuthProviderType;
  };
}

type AccountWithAuth = Account & Auth;
export type CustomSession = Session & Auth & { account: Account; user: UserData };

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
          const sendOauthToApi = async (payload: Account) => await api.post(`/sign-in/${provider}`, payload);
          const response = await sendOauthToApi(account);

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
      return {
        ...session,
        account: token.account as Account,
        auth: token.auth as Auth['auth'],
        user: token.user as UserData,
      };
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

import NextAuth, { Account, NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import type { UserData } from '@/types/user';

export type JaksimOAuthProviderType = 'google' | 'kakao' | 'naver';

type AccountWithStatusCode = Account & { statusCode: number };
export type SessionWithAccount = Session & { account: AccountWithStatusCode; statusCode: number; user: UserData };

const nextAuthOptions: NextAuthOptions = {
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
          // TODO: 소셜 로그인 후 account 전달: api, session
          // const sendOauthToApi = async (payload: Account) => await api.post('/sign-in/oauth', payload);
          // const response = await sendOauthToApi(account);
          // if (response.status >= 200 && response.status < 300) {
          //   throw new Error(`예상치 못한 응답 상태: ${response.status}`);
          // }
          // (account as any).statusCode = response.status;
          (account as AccountWithStatusCode).statusCode = 208;
          (account as AccountWithStatusCode).user = {
            social: account.provider,
            nickname: 'test',
            email: 'test@test.com',
            accessToken: 'test',
            refreshToken: 'test',
          };
        }
      } catch (error) {
        throw new Error('소셜 로그인 실패', { cause: error });
      }

      return true;
    },
    async jwt({ token, account, user }) {
      if (account) {
        const { statusCode, ...rest } = account;
        token.account = rest;
        token.statusCode = statusCode;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }): Promise<SessionWithAccount> {
      return {
        ...session,
        account: token.account as AccountWithStatusCode,
        statusCode: token.statusCode as number,
        user: token.user as UserData,
      };
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

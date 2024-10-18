import NextAuth, { type Account, type NextAuthOptions, type Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import type { UserData } from '@/types/user';

export type JaksimOAuthProviderType = 'GOOGLE' | 'KAKAO' | 'NAVER';

interface Auth {
  auth: {
    statusCode: number;
  };
}

type AccountWithAuth = Account & Auth;
export type CustomSession = Session & Auth & { account: Account; user: UserData };

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
          // const provider = account.provider as JaksimOAuthProviderType;
          // const sendOauthToApi = async (payload: Account) => await api.post(`/sign-in/oauth/${provider.toLowerCase()}`, account);
          // const response = await sendOauthToApi(account);
          // if (response.status >= 200 && response.status < 300) {
          //   throw new Error(`예상치 못한 응답 상태: ${response.status}`);
          // }
          // (account as AccountWithAuth).auth = {
          //   statusCode: response.status
          // };
          // const { AT, RT } = response.data;
          // if (AT && RT) {
          //   cookies().set('AT', AT);
          //   cookies().set('RT', RT);
          // }

          (account as AccountWithAuth).auth = {
            statusCode: 208,
          };
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

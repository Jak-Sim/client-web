import { JaksimOAuthProviderType } from '@/app/api/auth/[...nextauth]/route';

export interface UserData {
  AT: string | null;
  RT: string | null;
  userUniqueId: string;
  nickname: string;
  social: JaksimOAuthProviderType;
}

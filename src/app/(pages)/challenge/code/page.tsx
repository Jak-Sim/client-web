import { getServerSession } from 'next-auth';
import { getServerSession } from 'next-auth';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { CustomSession } from '@/lib/next-auth/auth';
import { CustomSession } from '@/lib/next-auth/auth';
import CodeForm from './_components/CodeForm';


const Page = async () => {
  const session = await getServerSession();

  if (!session) {
    // TODO: 로그인 페이지로 리다이렉트
  }
  const notNullSession = session as CustomSession;
  const userId = notNullSession?.user.userUniqueId;

  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BackButton />
          <Header.Center>코드 찾아보기</Header.Center>
        </Header>
      }
      className='bg-v1-background'
    >
      <CodeForm userId={userId} />
      <CodeForm userId={userId} />
    </PageLayout>
  );
};

export default Page;
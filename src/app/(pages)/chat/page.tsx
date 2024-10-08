import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import { Plus } from '@/assets/images/icons';
import ChatListPage from '@/app/(pages)/chat/_components/ChatListPage';
import Link from 'next/link';

const Page = () => {
  return (
    <PageLayout
      className={'bg-[#f2f2f7] p-3 pt-2 flex flex-col'}
      header={{
        title: '채팅',
        left: <HeaderBackButton />,
        right: (
          <Link href={'/chat/create'}>
            <Plus />
          </Link>
        ),
      }}
    >
      <ChatListPage />
    </PageLayout>
  );
};

export default Page;

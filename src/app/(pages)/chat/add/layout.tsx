import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PageLayout
      className={'flex flex-col bg-[#f2f2f7] p-3 pt-2'}
      header={
        <Header className={'bg-[#f2f2f7]'}>
          <Header.Item>
            <Header.BackButton />
          </Header.Item>
          <Header.Title>대화 상대 검색</Header.Title>
        </Header>
      }
    >
      {children}
    </PageLayout>
  );
};

export default Layout;

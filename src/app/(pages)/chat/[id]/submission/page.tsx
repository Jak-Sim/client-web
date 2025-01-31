import { Fragment } from 'react';
import Link from 'next/link';
import SubmissionPage from '@/app/(pages)/chat/[id]/submission/_components/SubmissionPage';
import { AvatarPlus } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return (
    <PageLayout
      header={
        <Header>
          <Header.Item>
            <Header.BackButton />
          </Header.Item>
          <Header.Item>
            <Header.Title>미션완료 제출</Header.Title>
          </Header.Item>
        </Header>
      }
      footer={<Fragment />}
    >
      <SubmissionPage />
    </PageLayout>
  );
};

export default Page;

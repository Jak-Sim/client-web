'use client';

import { useForm } from 'react-hook-form';
import UsernameForm from '@/app/(pages)/chat/add/_components/UsernameForm';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

const ChatAddPage = () => {
  const formData = useForm({ defaultValues: { username: '' } });

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
      <UsernameForm formData={formData} />
      <button
        onClick={() => {
          console.log(formData.watch('username'));
        }}
      >
        get
      </button>
    </PageLayout>
  );
};

export default ChatAddPage;

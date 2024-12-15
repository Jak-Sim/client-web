'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';
import KeywordTags from '@/app/(pages)/chat/add/_components/KeywordTags';
import RecommendedUserList from '@/app/(pages)/chat/add/_components/RecommendedUserList';
import UserCard from '@/app/(pages)/chat/add/_components/UserCard';
import UsernameForm from '@/app/(pages)/chat/add/_components/UsernameForm';

export interface Username {
  username: string;
}

const ChatAddPage = () => {
  const router = useRouter();
  const formData = useForm<Username>({ defaultValues: { username: '' } });
  const localStorage = useLocalStorage<string[]>('recentSearch', []);
  const [searchHistory, setSearchHistory] = localStorage;
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const onSubmit = (data: Username) => {
    if (!data.username.trim()) {
      return router.push(`/chat/add`);
    }

    const updatedHistory = [...(searchHistory || [])];

    if (!updatedHistory.includes(data.username)) {
      updatedHistory.unshift(data.username);
      if (updatedHistory.length > 10) updatedHistory.pop();
      setSearchHistory(updatedHistory);
    }
    router.push(`/chat/add?username=${data.username}`);
  };

  return (
    <>
      <form onSubmit={formData.handleSubmit(onSubmit)}>
        <UsernameForm formData={formData} />
      </form>
      {!username && (
        <>
          <KeywordTags localStorage={localStorage} />
          <RecommendedUserList />
        </>
      )}
      {username && <UserCard />}
    </>
  );
};

export default ChatAddPage;

'use client';

import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';
import KeywordTags from '@/app/(pages)/chat/add/_components/KeywordTags';
import RecommendedUserList from '@/app/(pages)/chat/add/_components/RecommendedUserList';
import UsernameForm from '@/app/(pages)/chat/add/_components/UsernameForm';

export interface Username {
  username: string;
}

const ChatAddPage = () => {
  const formData = useForm<Username>({ defaultValues: { username: '' } });
  const localStorage = useLocalStorage<string[]>('recentSearch', []);
  const [searchHistory, setSearchHistory] = localStorage;

  const onSubmit = (data: Username) => {
    if (!data.username.trim()) return;

    const updatedHistory = [...(searchHistory || [])];

    console.log(updatedHistory);
    if (!updatedHistory.includes(data.username)) {
      updatedHistory.unshift(data.username);
      if (updatedHistory.length > 10) updatedHistory.pop();
      setSearchHistory(updatedHistory);
    }
    formData.reset();
  };

  return (
    <>
      <form onSubmit={formData.handleSubmit(onSubmit)}>
        <UsernameForm formData={formData} />
      </form>
      <KeywordTags localStorage={localStorage} />
      <RecommendedUserList />
    </>
  );
};

export default ChatAddPage;

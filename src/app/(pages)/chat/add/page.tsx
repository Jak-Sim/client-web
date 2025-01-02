import { Suspense } from 'react';
import ChatAddPage from '@/app/(pages)/chat/add/_components/ChatAddPage';

const Page = () => {
  return (
    <Suspense>
      <ChatAddPage />
    </Suspense>
  );
};

export default Page;

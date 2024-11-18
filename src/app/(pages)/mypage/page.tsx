import { FiMenu } from 'react-icons/fi';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return (
    <PageLayout
      header={
        <Header>
          <Header.Item>
            <Header.BoldText className={'font-bold'} bold={'나의 작심'} />
          </Header.Item>
          <Header.Item>
            <Header.Icon Icon={FiMenu} />
          </Header.Item>
        </Header>
      }
    ></PageLayout>
  );
};

export default Page;

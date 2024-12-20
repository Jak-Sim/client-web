import Button from '@/components/button/Button';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { api } from '@/lib/axios/axios';
import ChallengeDetail from '../_components/ChallengeDetail';
import { Challenge } from '../_components/ChallengeList';
import ChallengeModal from './_components/ChallengeModal';

const Page = async ({ params }: { params: { challengeId: string } }) => {
  const challengeId = params.challengeId;
  const response = (await api.get(`http://localhost:3001/challenge/${challengeId}`)) as { data: Challenge };
  const challenge = response.data;

  // TODO: 챌린지 가입 여부 확인
  const isJoined = false;

  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BackButton tail={true} />
          <Header.Center>챌린지 정보</Header.Center>
          <ChallengeModal />
        </Header>
      }
      className='bg-v1-background'
    >
      <ChallengeDetail challenge={challenge} />

      {!isJoined && (
        <div className='h-20'>
          <div className='fixed bottom-0 left-1/2 w-full max-w-[400px] -translate-x-1/2 px-6 pb-20'>
            <Button>챌린지 가입하기</Button>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Page;
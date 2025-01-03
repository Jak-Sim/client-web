import Button from '@/components/button/Button';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { Challenge } from '@/models/challenge/Challenge';
import ChallengeDetail from '../../_components/ChallengeDetail';
import ChallengeModal from './_components/ChallengeModal';

const Page = async ({ params }: { params: { challengeId: string } }) => {
  const challengeId = params.challengeId;
  const challenge = await Challenge.getChallenge(parseInt(challengeId));

  // TODO: 챌린지 가입 여부 확인
  const isJoined = false;

  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BackButton tail={true} />
          <Header.Center>챌린지 정보</Header.Center>
          {isJoined && <ChallengeModal />}
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
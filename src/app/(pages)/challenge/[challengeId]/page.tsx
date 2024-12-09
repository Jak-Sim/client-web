import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import ChallengeDetail from '../_components/ChallengeDetail';
import { DummyChallenge } from '../_components/ChallengeList';

const Page = async ({ params }: { params: { challengeId: string } }) => {
  const challengeId = params.challengeId;
  const challenge = DummyChallenge;

  // TODO:
  console.log('fetch challenge data with id: ' + challengeId);

  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BackButton tail={true} />
          <Header.Center>챌린지 정보</Header.Center>
        </Header>
      }
      className='bg-v1-background'
    >
      <ChallengeDetail challenge={challenge} />
    </PageLayout>
  );
};

export default Page;
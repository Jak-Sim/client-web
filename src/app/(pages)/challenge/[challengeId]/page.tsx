import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import ChallengeDetail from '../_components/ChallengeDetail';
import { DummyChallenge } from '../_components/ChallengeList';

const Page = ({ params }: { params: { challengeId: string } }) => {
  const challenge = DummyChallenge;
  const challengeId = params.challengeId;

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

'use client';

import { useRouter } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import { Chevron, X } from '@/assets/images/icons';
import FunnelUi from '@/components/funnel/FunnelUi';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { type FunnelProps } from './_components/ChallengeCreateFunnel/_context/context';
import FunnelRender from './_components/ChallengeCreateFunnel/FunnelRender';


export default function Page() {
  const router = useRouter();
  const funnel = useFunnel<FunnelProps>({
    id: 'challenge-create-funnel',
    initial: {
      step: 'missionDescription',
      context: {},
    },
  });

  return (
    <PageLayout
      className='px-6'
      header={
        <Header className='border-none bg-v1-background'>
          <Header.Item>
            {funnel.index > 0 ? (
              <Header.Icon Icon={Chevron} onClick={() => funnel.history.back()} />
            ) : (
              <Header.Icon Icon={X} onClick={() => router.back()} />
            )}
          </Header.Item>
          <Header.Title>
            <FunnelUi.StepIndicator index={funnel.index} max={3} />
          </Header.Title>
          <Header.Item>
            <Header.GrayText disabled={true}>임시저장</Header.GrayText>
          </Header.Item>
        </Header>
      }
    >
      <FunnelRender funnel={funnel} />
    </PageLayout>
  );
}
'use client';

import { useRouter } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import { Chevron, X } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { type FunnelProps } from '../_components/ChallengeCreateFunnel/_context/context';
import FunnelRender from '../_components/ChallengeCreateFunnel/FunnelRender';

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
            <StepIndicator index={funnel.index} max={3} />
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

function StepIndicator({ index, max, className }: { index: number; max: number; className?: string }) {
  return (
    <div className={`flex h-12 w-full items-center justify-center gap-[10px] ${className}`}>
      {Array.from({ length: max }).map((_, idx) => (
        <div
          key={idx}
          className={`h-[6px] rounded-full bg-[#3E3D5D] transition-all duration-300 ${idx === index ? 'w-[24px]' : 'w-[6px]'}`}
        />
      ))}
    </div>
  );
}
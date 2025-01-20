'use client';

import { useRouter } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import { Chevron, X } from '@/assets/images/icons';
import FunnelUi from '@/components/funnel/FunnelUi';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import useTempSave from '@/hooks/useTempSave';
import isVaildObject from '@/utils/isVaildObject';
import { type FunnelProps } from './_components/RewardCreateFunnel/_context/context';
import FunnelRender from './_components/RewardCreateFunnel/FunnelRender';

export default function DynamicPageContent() {
  const router = useRouter();
  const { saveTempData, autoSave, updateDraftTempData, draftTempData, savedTempData, clearTempData } =
    useTempSave<FunnelProps>({
      id: 'reward-create',
    });
  const funnel = useFunnel<FunnelProps>({
    id: 'reward-create',
    initial: {
      step: 'rewardDescription',
      context: savedTempData as FunnelProps['rewardDescription'],
    },
  });

  return (
    <PageLayout
      className='px-6'
      header={
        <Header className='border-none bg-v1-background'>
          <Header.Item>
            {funnel.index > 0 ? (
              <Header.Icon
                Icon={Chevron}
                onClick={() => {
                  autoSave(funnel.context);
                  funnel.history.back();
                }}
              />
            ) : (
              <Header.Icon Icon={X} onClick={() => router.back()} />
            )}
          </Header.Item>
          <Header.Title>
            <FunnelUi.StepIndicator index={funnel.index} max={3} />
          </Header.Title>
          <Header.Item>
            <Header.GrayText disabled={!isVaildObject(draftTempData)}>
              <button onClick={() => saveTempData(funnel.context)}>임시저장</button>
            </Header.GrayText>
          </Header.Item>
        </Header>
      }
    >
      <FunnelRender
        funnel={funnel}
        updateDraftTempData={updateDraftTempData}
        autoSave={autoSave}
        clearTempData={clearTempData}
      />
    </PageLayout>
  );
}

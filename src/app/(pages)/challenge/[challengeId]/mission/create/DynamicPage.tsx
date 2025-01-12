'use client';

import { useRouter } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import { Chevron, X } from '@/assets/images/icons';
import FunnelUi from '@/components/funnel/FunnelUi';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import useTempSave from '@/hooks/useTempSave';
import { type FunnelProps } from './_components/ChallengeCreateFunnel/_context/context';
import FunnelRender from './_components/ChallengeCreateFunnel/FunnelRender';


export default function DynamicPageContent({ searchParams }: { searchParams: { temp: string } }) {
  const router = useRouter();
  const { saveTempData, autoSave, updateDraftTempData, draftTempData, tempData, clearTempData } =
    useTempSave<FunnelProps>({
      id: 'mission-create',
      useTempData: searchParams.temp === 'true',
    });
  const funnel = useFunnel<FunnelProps>({
    id: 'mission-create',
    initial: {
      step: 'missionDescription',
      context: tempData as FunnelProps['missionDescription'],
    },
  });

  const isValidObject = (obj: Record<string, unknown> | null) => {
    if (!obj) return false;
    const conditions = [
      typeof obj === 'object',
      Object.keys(obj as object).length > 0,
      Object.values(obj as object).some((value) => value),
    ];
    return conditions.every((condition) => condition);
  };

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
            <Header.GrayText disabled={!isValidObject(draftTempData)}>
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
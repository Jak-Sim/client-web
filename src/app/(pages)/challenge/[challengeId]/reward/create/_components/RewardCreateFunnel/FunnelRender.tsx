import { ValueOf } from 'next/dist/shared/lib/constants';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { type UseFunnelResults } from '@use-funnel/core';
import useTempSave from '@/hooks/useTempSave';
import type { FunnelProps } from './_context/context';
import RewardDescription from './RewardDescription';
import RewardPoint from './RewardPoint';

interface FunnelRenderProps {
  funnel: UseFunnelResults<FunnelProps, Partial<Record<string, unknown>>>;
  updateDraftTempData: ReturnType<typeof useTempSave<FunnelProps>>['updateDraftTempData'];
  autoSave: ReturnType<typeof useTempSave<FunnelProps>>['autoSave'];
  clearTempData: ReturnType<typeof useTempSave<FunnelProps>>['clearTempData'];
}

export default function FunnelRender({ funnel, updateDraftTempData, autoSave, clearTempData }: FunnelRenderProps) {
  const router = useRouter();
  const params = useParams();
  const challengeId = params.challengeId;

  const onSubmit = (props: ValueOf<FunnelProps>) => {
    console.log({ ...funnel.context, ...props });
    clearTempData();
    router.push(`/challenge/${challengeId}?tab=reward-page`);
  };

  return (
    <>
      <funnel.Render
        rewardDescription={({ context, history }) => (
          <RewardDescription
            {...context}
            onNext={(props) => {
              autoSave(context);
              history.push('rewardPoint', props);
            }}
            goBack={() => history.back()}
            updateDraftTempData={updateDraftTempData}
          />
        )}
        rewardPoint={({ context, history }) => (
          <RewardPoint
            {...context}
            onNext={(props) => {
              onSubmit(props);
            }}
            goBack={() => history.back()}
            updateDraftTempData={updateDraftTempData}
          />
        )}
      />
    </>
  );
}

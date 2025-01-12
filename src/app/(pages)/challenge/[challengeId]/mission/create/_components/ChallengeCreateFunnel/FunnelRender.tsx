import { ValueOf } from 'next/dist/shared/lib/constants';
import { useParams, useRouter } from 'next/navigation';
import { type UseFunnelResults } from '@use-funnel/core';
import useTempSave from '@/hooks/useTempSave';
import type { FunnelProps } from './_context/context';
import MissionDescription from './MissionDescription';
import MissionPeriod from './MissionPeriod';
import MissionPoint from './MissionPoint';

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
    router.push(`/challenge/${challengeId}`);
  };

  return (
    <>
      <funnel.Render
        missionDescription={({ context, history }) => (
          <MissionDescription
            {...context}
            onNext={(props) => {
              autoSave(context);
              history.push('missionPeriod', props);
            }}
            goBack={() => history.back()}
            updateDraftTempData={updateDraftTempData}
          />
        )}
        missionPeriod={({ context, history }) => (
          <MissionPeriod
            {...context}
            onNext={(props) => {
              autoSave(context);
              history.push('missionPoint', props);
            }}
            goBack={() => history.back()}
            updateDraftTempData={updateDraftTempData}
          />
        )}
        missionPoint={({ context, history }) => (
          <MissionPoint
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

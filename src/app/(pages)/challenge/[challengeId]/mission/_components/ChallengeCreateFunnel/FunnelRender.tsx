import { type UseFunnelResults } from '@use-funnel/core';
import type { FunnelProps } from './_context/context';
import MissionDescription from './MissionDescription';
import MissionPeriod from './MissionPeriod';
import MissionPoint from './MissionPoint';

export default function FunnelRender({
  funnel,
}: {
  funnel: UseFunnelResults<FunnelProps, Partial<Record<string, any>>>;
}) {
  return (
    <>
      <funnel.Render
        missionDescription={({ context, history }) => (
          <MissionDescription
            {...context}
            onNext={(props) => history.push('missionPeriod', props)}
            goBack={() => history.back()}
          />
        )}
        missionPeriod={({ context, history }) => (
          <MissionPeriod
            {...context}
            onNext={(props) => history.push('missionPoint', props)}
            goBack={() => history.back()}
          />
        )}
        missionPoint={({ context, history }) => (
          <MissionPoint
            {...context}
            onNext={(props) => history.push('missionPoint', props)}
            goBack={() => history.back()}
          />
        )}
      />
    </>
  );
}

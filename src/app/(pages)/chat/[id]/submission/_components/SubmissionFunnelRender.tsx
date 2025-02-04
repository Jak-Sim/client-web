import { type UseFunnelResults } from '@use-funnel/core';
import SubmissionDescription from '@/app/(pages)/chat/[id]/submission/_components/SubmissionDescription';
import { SubmissionFunnelProps } from '@/app/(pages)/chat/[id]/submission/_components/SubmissionPage';
import SubmissionCheckList from './SubmissionCheckList';

export default function SubmissionFunnelRender({
  funnel,
}: {
  funnel: UseFunnelResults<SubmissionFunnelProps, Partial<Record<string, unknown>>>;
}) {
  return (
    <>
      <funnel.Render
        first={({ context, history }) => (
          <SubmissionCheckList
            {...context}
            onNext={(props) => history.push('second', props)}
            goBack={() => history.back()}
          />
        )}
        second={() => <SubmissionDescription />}
      />
    </>
  );
}

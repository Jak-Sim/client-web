import Header from '@/components/layout/Header';

export default function HeaderTempSaveButton({
  saveTempFn,
  tempSaveExists,
}: {
  saveTempFn: () => void;
  tempSaveExists: boolean;
}) {
  return (
    <div onClick={saveTempFn}>
      <Header.GrayText disabled={!tempSaveExists}>임시저장</Header.GrayText>
    </div>
  );
}

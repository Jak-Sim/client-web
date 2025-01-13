import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-use';
import { useModal } from '@/hooks/useModal';
import AddItemButton from './AddItemButton';
import ContinueConfirmModal from './NewChallengeItemModal';


export default function NewMission({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const [localSavedMission, , removeSavedMission] = useLocalStorage('mission-create') as unknown as [
    { name: string } | null,
    (value: { name: string } | null) => void,
    () => void,
  ];
  const modalProps = useModal('new-mission');
  const goToCreateMission = () => {
    router.push(`/challenge/${challengeId}/mission/create`);
  };

  const onAddItemClick = () => {
    if (localSavedMission) {
      modalProps.openModal();
    } else {
      goToCreateMission();
    }
  };

  const onStartNew = () => {
    removeSavedMission();
    goToCreateMission();
  };

  return (
    <>
      {localSavedMission && (
        <ContinueConfirmModal
          type='mission'
          savedData={localSavedMission}
          onSaveLoad={goToCreateMission}
          onStartNew={onStartNew}
          modalProps={modalProps}
        />
      )}
      <AddItemButton color='orange' onClick={onAddItemClick} />
    </>
  );
}
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-use';
import { useModal } from '@/hooks/useModal';
import AddItemButton from './AddItemButton';
import ContinueConfirmModal from './NewChallengeItemModal';


export default function NewReward({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const [localSavedReward, , removeSavedReward] = useLocalStorage('reward-create') as unknown as [
    { name: string } | null,
    (value: { name: string } | null) => void,
    () => void,
  ];
  const modalProps = useModal('new-reward');
  const goToCreateReward = () => {
    router.push(`/challenge/${challengeId}/reward/create`);
  };

  const onAddItemClick = () => {
    if (localSavedReward) {
      modalProps.openModal();
    } else {
      goToCreateReward();
    }
  };

  const onStartNew = () => {
    removeSavedReward();
    goToCreateReward();
  };

  return (
    <>
      {localSavedReward && (
        <ContinueConfirmModal
          type='reward'
          savedData={localSavedReward}
          onSaveLoad={goToCreateReward}
          onStartNew={onStartNew}
          modalProps={modalProps}
        />
      )}
      <AddItemButton color='blue' onClick={onAddItemClick} />
    </>
  );
}
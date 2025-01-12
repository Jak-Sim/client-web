import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-use';
import { useModal } from '@/hooks/useModal';
import AddItemButton from './AddItemButton';
import ContinueConfirmModal from './NewChallengeItemModal';

export default function NewReward({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const [localSavedReward] = useLocalStorage('saved-reward') as unknown as [{ name: string } | null];
  const modalProps = useModal('new-reward');

  const REWARD_CREATE_PAGE = `/challenge/${challengeId}/reward/create`;
  const TEMP_REWARD_CREATE_PAGE = `/challenge/${challengeId}/reward/create?temp=true`;

  const newReward = () => {
    if (localSavedReward) {
      modalProps.openModal();
    } else {
      router.push(REWARD_CREATE_PAGE);
    }
  };

  const onNewReward = () => {
    router.push(REWARD_CREATE_PAGE);
  };

  const onSaveLoad = () => {
    router.push(TEMP_REWARD_CREATE_PAGE);
  };

  return (
    <>
      {localSavedReward && (
        <ContinueConfirmModal
          type='reward'
          savedData={localSavedReward}
          onSaveLoad={onSaveLoad}
          onNewMission={onNewReward}
          modalProps={modalProps}
        />
      )}
      <AddItemButton color='blue' onClick={newReward} />
    </>
  );
}

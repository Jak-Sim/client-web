import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-use';
import { useModal } from '@/hooks/useModal';
import AddItemButton from './AddItemButton';
import ContinueConfirmModal from './NewChallengeItemModal';


export default function NewMission({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const [localSavedMission] = useLocalStorage('mission-create') as unknown as [{ name: string } | null];
  const modalProps = useModal('new-mission');

  const MISSION_CREATE_PAGE = `/challenge/${challengeId}/mission/create`;
  const TEMP_MISSION_CREATE_PAGE = `/challenge/${challengeId}/mission/create?temp=true`;

  const onAddItemClick = () => {
    if (localSavedMission) {
      modalProps.openModal();
    } else {
      router.push(MISSION_CREATE_PAGE);
    }
  };

  const onNewMission = () => {
    router.push(MISSION_CREATE_PAGE);
  };

  const onSaveLoad = () => {
    router.push(TEMP_MISSION_CREATE_PAGE);
  };

  return (
    <>
      {localSavedMission && (
        <ContinueConfirmModal
          type='mission'
          savedData={localSavedMission}
          onSaveLoad={onSaveLoad}
          onNewMission={onNewMission}
          modalProps={modalProps}
        />
      )}
      <AddItemButton color='orange' onClick={onAddItemClick} />
    </>
  );
}
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddItemButton from './AddItemButton';
import ContinueConfirmModal, { type LocalSavedChallengeItem } from './NewChallengeItemModal';

export default function NewMission({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const [savedData, setSavedData] = useState<LocalSavedChallengeItem | null>(null);

  const newMission = () => {
    const localSavedMission = localStorage.getItem('saved-mission');

    if (localSavedMission) {
      const parsedMission = JSON.parse(localSavedMission);
      setSavedData({ tag: 'mission', data: parsedMission });
    } else {
      router.push(`/challenge/${challengeId}/mission/create`);
    }
  };

  const onSaveLoad = () => {
    router.push(`/challenge/${challengeId}/mission/create?continue=true`);
  };

  return (
    <>
      <ContinueConfirmModal savedData={savedData} onSaveLoad={onSaveLoad} />
      <AddItemButton color='orange' onClick={newMission} />
    </>
  );
}

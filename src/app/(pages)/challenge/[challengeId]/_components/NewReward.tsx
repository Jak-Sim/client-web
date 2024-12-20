import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddItemButton from './AddItemButton';
import ContinueConfirmModal, { type LocalSavedChallengeItem } from './NewChallengeItemModal';

export default function NewReward({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const [savedData, setSavedData] = useState<LocalSavedChallengeItem | null>(null);

  const newReward = () => {
    const localSavedReward = localStorage.getItem('saved-reward');

    if (localSavedReward) {
      const parsedReward = JSON.parse(localSavedReward);
      setSavedData({ tag: 'reward', data: parsedReward });
    } else {
      router.push(`/challenge/${challengeId}/reward/create`);
    }
  };

  const onSaveLoad = () => {
    router.push(`/challenge/${challengeId}/reward/create?continue=true`);
  };

  return (
    <>
      <ContinueConfirmModal savedData={savedData} onSaveLoad={onSaveLoad} />
      <AddItemButton color='blue' onClick={newReward} />
    </>
  );
}

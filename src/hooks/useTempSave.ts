'use client';

import { useCallback, useState } from 'react';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { useLocalStorage } from 'react-use';


type TemporarySaveType = 'mission-create' | 'reward-create';

export default function useTempSave<T>({ id }: { id: TemporarySaveType }) {
  const [savedTempData, setSavedTempData, removeSavedTempData] = useLocalStorage(id) as unknown as [
    ValueOf<T> | undefined,
    (value: ValueOf<T> | undefined) => void,
    () => void,
  ];
  const [draftTempData, setDraftTempData] = useState(savedTempData);
  const [isSaving, setIsSaving] = useState(false);

  const updateDraftTempData = useCallback(
    (newData: ValueOf<T>) => {
      const updatedTempData = { ...savedTempData, ...newData };
      setDraftTempData(updatedTempData);
    },
    [savedTempData],
  );

  const saveTempData = (context: ValueOf<T>) => {
    setSavedTempData({ ...context, ...draftTempData });
    setIsSaving(true);
  };

  const autoSave = (context: ValueOf<T>) => {
    if (isSaving) {
      saveTempData(context);
    }
  };

  const clearTempData = useCallback(() => {
    removeSavedTempData();
    setDraftTempData(undefined);
    setIsSaving(false);
  }, [removeSavedTempData]);

  return {
    isSaving,
    savedTempData,
    draftTempData,
    saveTempData,
    autoSave,
    clearTempData,
    updateDraftTempData,
  };
}
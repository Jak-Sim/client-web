'use client';

import { useCallback, useState } from 'react';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { useLocalStorage } from 'react-use';

type TemporarySaveType = 'mission-create';

export default function useTempSave<T>({ id }: { id: TemporarySaveType }) {
  const [savedTempData, setSavedTempData, removeSavedTempData] = useLocalStorage(id) as unknown as [
    ValueOf<T> | null,
    (value: ValueOf<T> | null) => void,
    () => void,
  ];
  const [draftTempData, setDraftTempData] = useState<ValueOf<T>>(savedTempData as ValueOf<T>);
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
    setDraftTempData({} as ValueOf<T>);
    setIsSaving(false);
  }, [removeSavedTempData]);

  return {
    isSaving,
    tempData: savedTempData,
    draftTempData,
    saveTempData,
    autoSave,
    clearTempData,
    updateDraftTempData,
  };
}
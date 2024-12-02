'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Challenge } from '../_components/CreateChallengeForm';

export default function useTempSaveChallenge() {
  const tempSaved = useRef<Challenge | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const loadChallenge = () => {
    if (typeof localStorage !== 'undefined') {
      const savedChallenge = localStorage.getItem('challenge');
      if (savedChallenge) {
        return JSON.parse(savedChallenge) as Challenge;
      }
    }
    return null;
  };

  const updateChallenge = useCallback(
    (challenge: Challenge) => {
      setChallenge(challenge);
    },
    [setChallenge],
  );

  const saveTempChallenge = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('challenge', JSON.stringify(challenge));
    }
  };

  const removeTempChallenge = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('challenge');
      tempSaved.current = null;
    }
  };

  useEffect(() => {
    const loadedChallenge = loadChallenge();
    if (loadedChallenge) {
      setChallenge(loadedChallenge);
      tempSaved.current = loadedChallenge;
    }
  }, []);

  return { challenge, loadChallenge, saveTempChallenge, removeTempChallenge, updateChallenge, tempSaved };
}

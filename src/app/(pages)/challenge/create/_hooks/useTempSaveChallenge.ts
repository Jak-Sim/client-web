'use client';

import { useEffect, useRef, useState } from 'react';

interface Challenge {
  title: string;
  description: string;
  tags: string[];
  public: boolean;
  person: {
    min: number;
    max: number;
  };
  thumbnail: string;
}

export default function useTempSaveChallenge() {
  const tempSaved = useRef<string | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const loadChallenge = () => {
    if (typeof localStorage !== 'undefined') {
      const savedChallenge = localStorage.getItem('challenge');
      if (savedChallenge) {
        return JSON.parse(savedChallenge);
      }
    }
    return null;
  };

  const saveTempChallenge = () => {
    const TEMP = {
      title: '제목',
      description: '설명',
      tags: ['태그1', '태그2', '태그3'],
      public: true,
      person: { min: 1, max: 10 },
      thumbnail: 'https://via.placeholder.com/150',
    };

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('challenge', JSON.stringify(TEMP));
      tempSaved.current = JSON.stringify(TEMP);
    }
  };

  const clearTempChallenge = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('challenge');
      tempSaved.current = null;
    }
  };

  useEffect(() => {
    setChallenge(loadChallenge());
  }, []);

  return { challenge, loadChallenge, saveTempChallenge, clearTempChallenge };
}

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import db from '@/../db.json';
import dummyMission from '../../_mock/dummyMission.json';
import dummyReward from '../../_mock/dummyReward.json';

export const TEMP_SEARCH_RESULT = {
  users: db.users,
  challenges: db.challenge,
  missions: dummyMission,
  rewards: dummyReward,
};

const MAX_SEARCH_HISTORY = 10;

export function useSearch<T>({ search: initialSearch }: { search: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(initialSearch);
  const [searchResult, setSearchResult] = useState<{ search: string; result: T | undefined }>({
    search: '',
    result: undefined,
  });
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('searchHistory');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const onSearch = useCallback(
    (search: string) => {
      const result = {
        search,
        result: TEMP_SEARCH_RESULT as unknown as T,
      };
      setSearchResult(result);

      const params = new URLSearchParams(searchParams.toString());
      params.set('search', search);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearSearch = () => {
    setSearch('');
    setSearchResult({ search: '', result: undefined });
  };

  const handleHistoryClick = (historyItem: string) => {
    setSearch(historyItem);
    onSearch(historyItem);
  };

  const addHistoryItem = (item: string) => {
    if (!searchHistory.includes(item)) {
      const newHistory = [item, ...searchHistory].slice(0, MAX_SEARCH_HISTORY);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const deleteHistoryItem = (item: string) => {
    const newHistory = searchHistory.filter((h) => h !== item);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearAllHistory = () => {
    setSearchHistory([]);
    localStorage.setItem('searchHistory', '[]');
  };

  useEffect(() => {
    if (initialSearch) {
      onSearch(initialSearch);
    }
  }, [initialSearch, onSearch]);

  return {
    search,
    setSearch,
    onSearch,
    searchResult,
    setSearchResult,
    searchHistory,
    setSearchHistory,
    clearSearch,
    handleHistoryClick,
    addHistoryItem,
    deleteHistoryItem,
    clearAllHistory,
  };
}

import { useState } from 'react';

const TEMP_SEARCH_HISTORY = ['검색어1', '검색어2', '검색어3', '검색어4', '검색어5'];
export const TEMP_SEARCH_RESULT = ['검색결과1'];

const MAX_SEARCH_HISTORY = 10;

export function useSearch<T>() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<{ search: string; result: T[] }>({ search: '', result: [] });
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('searchHistory');
      return saved ? JSON.parse(saved) : TEMP_SEARCH_HISTORY;
    }
    return TEMP_SEARCH_HISTORY;
  });

  const onSearch = (search: string) => {
    const result = {
      search,
      result: TEMP_SEARCH_RESULT as T[],
    };
    setSearchResult(result);
  };

  const clearSearch = () => {
    setSearch('');
    setSearchResult({ search: '', result: [] });
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

import { act, renderHook } from '@testing-library/react';
import { useSearch } from './useSearch';

describe('useSearch 커스텀훅 테스트', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('검색을 수행하고, 검색결과에 반영', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearch('입력한 검색어');
      result.current.setSearchResult({ search: '입력한 검색어', result: ['검색-결과-1'] });
    });

    expect(result.current.search).toBe('입력한 검색어');
    expect(result.current.searchResult.search).toBe('입력한 검색어');
  });

  it('검색 취소 시, 검색상태와 검색결과를 초기화', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearch('입력한 검색어');
      result.current.setSearchResult({ search: '입력한 검색어', result: ['검색-결과-1'] });
      result.current.clearSearch();
    });

    expect(result.current.search).toBe('');
    expect(result.current.searchResult).toEqual({ search: '', result: [] });
  });

  it('최근검색 항목 클릭시, 검색이 수행되어야 함', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleHistoryClick('검색어 기록1');
    });

    expect(result.current.search).toBe('검색어 기록1');
    expect(result.current.searchResult.search).toBe('검색어 기록1');
  });

  it('최근검색 항목 추가', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.addHistoryItem('검색어 기록1');
    });

    expect(result.current.searchHistory).toContain('검색어 기록1');
  });

  it('단일 검색기록 항목을 삭제', () => {
    const { result } = renderHook(() => useSearch());
    const initialHistory = ['item1', 'item2', 'item3'];

    act(() => {
      result.current.clearAllHistory();
      result.current.setSearchHistory(initialHistory);
      result.current.deleteHistoryItem('item2');
    });

    expect(result.current.searchHistory).not.toContain('item2');
  });

  it('모든 검색기록 항목을 삭제', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.clearAllHistory();
    });

    expect(result.current.searchHistory).toHaveLength(0);
    expect(localStorage.getItem('searchHistory')).toBe('[]');
  });
});

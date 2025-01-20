import { useRouter, useSearchParams } from 'next/navigation';
import { act, renderHook } from '@testing-library/react';
import { TEMP_SEARCH_RESULT, useSearch } from './useSearch';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useSearch 커스텀훅 테스트', () => {
  const mockRouterPush = jest.fn();
  const mockSearchParams = new URLSearchParams();
  let result: {
    current: ReturnType<typeof useSearch<typeof TEMP_SEARCH_RESULT>>;
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    localStorage.clear();
    result = renderHook(() => useSearch<typeof TEMP_SEARCH_RESULT>({ search: '' })).result;
  });

  describe('검색 기능', () => {
    it('초기 검색 값을 설정합니다.', () => {
      result = renderHook(() => useSearch<typeof TEMP_SEARCH_RESULT>({ search: 'initial' })).result;
      expect(result.current.search).toBe('initial');
    });

    it('onSearch 호출 시 searchResult와 URL을 업데이트합니다.', () => {
      act(() => {
        result.current.onSearch('newSearch');
      });

      expect(result.current.searchResult.search).toBe('newSearch');
      expect(result.current.searchResult.result).toBeDefined();
      expect(mockRouterPush).toHaveBeenCalledWith('?search=newSearch');
    });

    it('검색 취소 시, 검색상태와 검색결과를 초기화합니다.', () => {
      act(() => {
        result.current.setSearch('입력한 검색어');
        result.current.setSearchResult({ search: '입력한 검색어', result: TEMP_SEARCH_RESULT });
        result.current.clearSearch();
      });

      expect(result.current.search).toBe('');
      expect(result.current.searchResult).toEqual({ search: '', result: undefined });
    });

    it('검색어가 없을 때 URL에서 search 파라미터를 제거합니다.', () => {
      // 먼저 검색어로 URL 설정
      act(() => {
        result.current.onSearch('someSearch');
      });
      expect(mockRouterPush).toHaveBeenLastCalledWith('?search=someSearch');

      // 검색어를 지우면 search 파라미터가 제거됨
      act(() => {
        result.current.onSearch('');
      });
      expect(mockRouterPush).toHaveBeenLastCalledWith('?');
    });
  });

  describe('검색 기록 관리', () => {
    it('검색 기록을 추가합니다.', () => {
      act(() => {
        result.current.addHistoryItem('newSearch');
      });

      expect(result.current.searchHistory).toContain('newSearch');
      expect(localStorage.getItem('searchHistory')).toContain('newSearch');
    });

    it('검색 기록 중복 추가를 방지합니다.', () => {
      act(() => {
        result.current.addHistoryItem('newSearch');
        result.current.addHistoryItem('newSearch');
      });

      expect(result.current.searchHistory).toEqual(['newSearch']);
    });

    it('최근검색 항목 클릭시, 검색이 수행되어야 합니다.', () => {
      act(() => {
        result.current.handleHistoryClick('검색어 기록1');
      });

      expect(result.current.search).toBe('검색어 기록1');
      expect(result.current.searchResult.search).toBe('검색어 기록1');
    });

    it('단일 검색기록 항목을 삭제합니다.', () => {
      const initialHistory = ['item1', 'item2', 'item3'];

      act(() => {
        result.current.clearAllHistory();
        result.current.setSearchHistory(initialHistory);
        result.current.deleteHistoryItem('item2');
      });

      expect(result.current.searchHistory).not.toContain('item2');
    });

    it('모든 검색기록 항목을 삭제합니다.', () => {
      act(() => {
        result.current.clearAllHistory();
      });

      expect(result.current.searchHistory).toHaveLength(0);
      expect(localStorage.getItem('searchHistory')).toBe('[]');
    });
  });
});
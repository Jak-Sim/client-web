import { X } from 'lucide-react';
import { useSearch } from '../_hook/useSearch';
import HorizontalScrollList from './HorizontalScrollList';


interface RecentSearchProps {
  searchHistory: ReturnType<typeof useSearch>['searchHistory'];
  handleHistoryClick: ReturnType<typeof useSearch>['handleHistoryClick'];
  deleteHistoryItem: ReturnType<typeof useSearch>['deleteHistoryItem'];
  clearAllHistory: ReturnType<typeof useSearch>['clearAllHistory'];
}

export default function RecentSearch({
  searchHistory,
  handleHistoryClick,
  deleteHistoryItem,
  clearAllHistory,
}: RecentSearchProps) {
  return (
    <>
      <div className='flex h-10 items-center justify-between'>
        <p className='font-semibold'>최근 검색</p>
        <button className='h-full px-2 text-sm text-v1-text-primary-400' onClick={clearAllHistory}>
          전체삭제
        </button>
      </div>
      <HorizontalScrollList className='pt-0'>
        {searchHistory.map((history) => (
          <li key={history} className='shrink-0' onClick={() => handleHistoryClick(history)}>
            <button className='flex h-9 items-center justify-between gap-1 rounded-2xl bg-v1-text-primary-50 px-3'>
              <span className='text-sm text-v1-text-primary-500'>{history}</span>
              <div
                className='-mr-1 flex h-full items-center justify-center'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHistoryItem(history);
                }}
              >
                <X className='scale-75' />
              </div>
            </button>
          </li>
        ))}
      </HorizontalScrollList>
    </>
  );
}
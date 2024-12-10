'use client';

import { Dispatch, SetStateAction } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useMountedState } from 'react-use';

interface KeywordTagsProps {
  localStorage: [string[] | undefined, Dispatch<SetStateAction<string[] | undefined>>, () => void];
}

const KeywordTags = ({ localStorage }: KeywordTagsProps) => {
  const [searchHistory, setSearchHistory, removeSearchHistory] = localStorage;
  const isMounted = useMountedState();

  const clearSearchHistory = () => {
    removeSearchHistory();
  };

  return (
    <>
      <div className='mb-4'>
        <div className='flex items-center justify-between'>
          <p className='font-medium text-v1-text-primary-700'>최근 검색</p>
          <button onClick={clearSearchHistory} className='text-sm text-v1-text-primary-400 hover:underline'>
            전체 삭제
          </button>
        </div>
      </div>
      <ul className='flex gap-2 overflow-auto'>
        {isMounted() && searchHistory && searchHistory.length > 0 ? (
          searchHistory.map((keyword, index) => (
            <li key={index}>
              <button
                className='flex items-center gap-1 rounded-[30px] bg-v1-text-primary-50 px-3 py-2 transition'
                onClick={() => {}}
              >
                <p className={'leading-0 break-keep'}>{keyword}</p>
                <div>
                  <IoMdClose
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedHistory = searchHistory.filter((item) => item !== keyword);
                      setSearchHistory(updatedHistory);
                    }}
                  />
                </div>
              </button>
            </li>
          ))
        ) : (
          <li>
            <p className='text-sm text-gray-500'>최근 검색 기록이 없습니다.</p>
          </li>
        )}
      </ul>
    </>
  );
};

export default KeywordTags;

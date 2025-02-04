'use client';

import Link from 'next/link';
import { X } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import RecentSearch from './_components/RecentSearch';
import SearchInput from './_components/SearchInput';
import SearchResults from './_components/SearchResults';
import { TEMP_SEARCH_RESULT, useSearch } from './_hook/useSearch';


export default function DynamicPageContent({ searchParams }: { searchParams: { tab: string; search: string } }) {
  const {
    search,
    onSearch,
    searchResult,
    searchHistory,
    clearSearch,
    deleteHistoryItem,
    addHistoryItem,
    clearAllHistory,
    handleHistoryClick,
  } = useSearch<typeof TEMP_SEARCH_RESULT>({ search: searchParams.search });

  const tab = searchParams.tab || 'all';

  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Link href='.'>
            <Header.Icon Icon={X} />
          </Link>
          <Header.Center>검색</Header.Center>
        </Header>
      }
      className='px-6 pb-10'
    >
      <SearchInput search={search} onSearch={onSearch} clearSearch={clearSearch} addHistoryItem={addHistoryItem} />

      {tab === 'all' && !searchResult.result && searchHistory.length > 0 && (
        <RecentSearch
          searchHistory={searchHistory}
          deleteHistoryItem={deleteHistoryItem}
          clearAllHistory={clearAllHistory}
          handleHistoryClick={handleHistoryClick}
        />
      )}
      {searchResult.result && <SearchResults searchResult={searchResult} />}
    </PageLayout>
  );
}
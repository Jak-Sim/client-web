'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


type LinkTab<T> = T extends Array<{ type: string; label: string; href: string }> ? T[number] : never;

function LinkTabs<T extends Array<{ type: string; label: string; href: string }>>({
  tab,
  tabs,
  className,
}: {
  tab: LinkTab<T>['type'];
  tabs: T;
  className?: string;
}) {
  return (
    <ul
      className={`-mx-6 mt-4 flex min-h-12 flex-wrap justify-between border-b border-v1-text-primary-75 ${className}`}
    >
      {tabs.map((e) => (
        <TabLinkButton key={e.type} tab={e} currentTabType={tab} />
      ))}
    </ul>
  );
}

function TabLinkButton<T extends { type: string; label: string; href: string }>({
  tab,
  currentTabType,
}: {
  tab: T;
  currentTabType: T['type'];
}) {
  const isActive = tab.type === currentTabType;
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab.type);
    router.push(`?${params.toString()}`);
  };

  return (
    <li
      className={`text-md flex h-12 flex-1 items-center justify-center font-semibold ${isActive ? 'border-b-2 border-v1-text-primary-500 pt-[2px]' : 'text-v1-text-primary-200'}`}
    >
      <button onClick={handleClick} className='flex h-full w-full items-center justify-center whitespace-nowrap break-keep px-2'>
        {tab.label}
      </button>
    </li>
  );
}

export default LinkTabs;
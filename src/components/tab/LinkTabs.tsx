import Link from 'next/link';

type LinkTab<T> = T extends Array<{ type: string; label: string; href: string }> ? T[number] : never;

function LinkTabs<T extends Array<{ type: string; label: string; href: string }>>({
  tab,
  tabs,
}: {
  tab: LinkTab<T>['type'];
  tabs: T;
}) {
  return (
    <ul className='border-v1-text-primary-75 -mx-6 mt-4 flex h-12 justify-between border-b'>
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

  return (
    <li
      className={`text-md flex h-full w-full items-center justify-center font-semibold ${isActive ? 'border-b-2 border-v1-text-primary-500' : 'text-v1-text-primary-200'}`}
    >
      <Link href={tab.href} className='flex h-full w-full items-center justify-center'>
        {tab.label}
      </Link>
    </li>
  );
}

export default LinkTabs;

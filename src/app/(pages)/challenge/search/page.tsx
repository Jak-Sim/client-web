import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('./DynamicPage'), {
  ssr: false,
});

export default function Page({ searchParams }: { searchParams: { tab: string; search: string } }) {
  return <DynamicPage searchParams={searchParams} />;
}
import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('./DynamicPage'), {
  ssr: false,
});

export default function Page(props: { searchParams: { temp: string } }) {
  return <DynamicPage {...props} />;
}

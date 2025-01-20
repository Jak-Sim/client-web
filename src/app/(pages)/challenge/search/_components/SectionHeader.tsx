import MoreButton from './MoreButton';
import { TabType } from './SearchResults';

export default function SectionHeader({ title, tab }: { title: string; tab: TabType }) {
  return (
    <div className='flex h-14 items-center justify-between'>
      <p className='font-semibold'>{title}</p>
      <MoreButton tab={tab} />
    </div>
  );
}

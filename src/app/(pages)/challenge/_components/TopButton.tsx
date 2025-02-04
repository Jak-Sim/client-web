import { AlignUp } from '@/assets/images/icons';

export default function TopButton({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) {
  const toTop = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button onClick={toTop} className='flex items-center justify-center gap-2 text-lg text-v1-text-primary-400'>
      <AlignUp />
      위로 가기
    </button>
  );
}

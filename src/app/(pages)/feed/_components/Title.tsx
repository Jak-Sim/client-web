import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/shadcn/utils';

const Title = ({ emoji, text, className }: { emoji: StaticImageData; text: string; className?: string }) => {
  return (
    <h2 className={cn('flex items-center gap-1 px-6 py-2 text-2xl font-bold', className)}>
      <Image className={'h-8 w-8'} src={emoji} alt={text} /> <span>{text}</span>
    </h2>
  );
};

export default Title;

import { cn } from '@/lib/shadcn/utils';
import { Input } from './Input';
import './inputTime.css';

export default function InputTime({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Input className='text-center' value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

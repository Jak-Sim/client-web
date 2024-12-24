import { Input } from './Input';
import './inputTime.css';

export default function InputTime({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className='flex items-center justify-center'>
      <Input type='time' value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

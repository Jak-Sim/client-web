import { createContext, useContext } from 'react';
import { cn } from '@/lib/shadcn/utils';


type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  children?: React.ReactNode;
  maxWidth?: string;
};

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  children?: React.ReactNode;
  maxWidth?: string;
};

const commonContext = createContext<{
  length: number;
  maxLength: number;
}>({
  length: 0,
  maxLength: 0,
});
const commonStyle = 'w-full rounded-2xl bg-v1-text-primary-50 p-3 outline-none text-xl';

function Input({ children, className, maxWidth, ...props }: InputProps) {
  return (
    <commonContext.Provider value={{ length: props.value?.toString().length || 0, maxLength: props.maxLength || 0 }}>
      <div className='relative flex flex-1 flex-col gap-1' style={{ maxWidth }}>
        <input className={cn(commonStyle, className)} {...props} />
        {children}
      </div>
    </commonContext.Provider>
  );
}

function TextArea({ children, className, maxWidth, ...props }: TextAreaProps) {
  return (
    <commonContext.Provider value={{ length: props.value?.toString().length || 0, maxLength: props.maxLength || 0 }}>
      <div className='relative flex flex-col gap-1' style={{ maxWidth }}>
        <textarea className={cn('min-h-[150px]', commonStyle, className)} {...props} />
        {children}
      </div>
    </commonContext.Provider>
  );
}

function LengthCounter({ className }: { className?: string }) {
  const { length, maxLength } = useContext(commonContext)!;
  return (
    <p className={cn('absolute bottom-3 right-2 text-xs text-v1-text-primary-200', className)}>
      {length} / {maxLength}
    </p>
  );
}

Input.LengthCounter = LengthCounter;
TextArea.LengthCounter = LengthCounter;

export { Input, TextArea };
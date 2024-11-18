import { ButtonHTMLAttributes } from 'react';
import LoadingIcon from '@/assets/images/icons/loading.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline';
}

export default function Button({ children, className, isLoading, variant, ...props }: ButtonProps) {
  const vaiantStyle = variant==='outline' ? '!bg-white !text-v1-primary border-[2px] !border-v1-primary' : '';

  return (
    <button className={`button button-primary h-[3.75rem] w-full rounded-[20px] text-xl font-bold ${className} ${vaiantStyle} shadow-sm`} {...props}>
      <div className='flex items-center justify-center gap-1'>
        {isLoading ? (
          <LoadingIcon alt='loading' className='h-6 w-6 animate-spin' style={{ animationDuration: '3s' }} />
        ) : null}
        {children}
      </div>
    </button>
  );
}

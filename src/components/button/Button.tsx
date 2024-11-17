import { ButtonHTMLAttributes } from 'react';
import LoadingIcon from '@/assets/images/icons/loading.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({ children, className, isLoading, ...props }: ButtonProps) {
  return (
    <button className={`button button-primary h-[3.75rem] w-full rounded-xl text-xl font-bold ${className}`} {...props}>
      <div className='flex items-center justify-center gap-1'>
        {isLoading ? (
          <LoadingIcon alt='loading' className='h-6 w-6 animate-spin' style={{ animationDuration: '3s' }} />
        ) : null}
        {children}
      </div>
    </button>
  );
}

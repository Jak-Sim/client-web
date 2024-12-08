import { ButtonHTMLAttributes } from 'react';
import LoadingIcon from '@/assets/images/icons/loading.svg';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

export default function Button({ children, className, isLoading, variant = 'primary', ...props }: ButtonProps) {
  const variantStyle =
    variant === 'secondary' ? 'button-secondary' : variant === 'tertiary' ? 'button-tertiary' : 'button-primary';

  return (
    <button
      className={`button min-h-[3.75rem] w-full rounded-[20px] text-xl font-bold ${className} shadow-sm ${variantStyle}`}
      {...props}
    >
      <div className='flex items-center justify-center gap-1'>
        {isLoading ? (
          <LoadingIcon alt='loading' className='h-6 w-6 animate-spin' style={{ animationDuration: '3s' }} />
        ) : null}
        {children}
      </div>
    </button>
  );
}
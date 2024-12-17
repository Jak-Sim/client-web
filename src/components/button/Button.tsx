import { ButtonHTMLAttributes } from 'react';
import LoadingIcon from '@/assets/images/icons/loading.svg';


export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  asDiv?: boolean;
}

export default function Button({
  children,
  className,
  isLoading,
  variant = 'primary',
  asDiv: asChild,
  ...props
}: ButtonProps) {
  const variantStyle =
    variant === 'secondary' ? 'button-secondary' : variant === 'tertiary' ? 'button-tertiary' : 'button-primary';

  const Component = asChild ? 'div' : 'button';

  return (
    <Component
      className={`button min-h-[3.75rem] w-full rounded-[20px] text-xl font-bold ${className} flex items-stretch shadow-sm ${variantStyle}`}
      {...props}
    >
      <div className='flex flex-1 items-center justify-center gap-1'>
        {isLoading ? (
          <LoadingIcon alt='loading' className='h-6 w-6 animate-spin' style={{ animationDuration: '3s' }} />
        ) : null}
        {children}
      </div>
    </Component>
  );
}
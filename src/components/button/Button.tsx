import { ButtonHTMLAttributes } from 'react';
import LoadingIcon from '@/assets/images/icons/loading.svg';

const BUTTON_SIZE_STYLE = {
  sm: '!min-h-[2.25rem] text-base rounded-[20px]',
  md: '!min-h-[2.75rem] text-base rounded-2xl',
  lg: '!min-h-[3.75rem] text-xl rounded-[20px]',
};
const BUTTON_VARIANT_STYLE = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  tertiary: 'button-tertiary',
  outline: 'button-outline',
  blue: 'button-blue',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
  isLoading?: boolean;
  variant?: keyof typeof BUTTON_VARIANT_STYLE;
  asDiv?: boolean;
  className?: string;
  size?: keyof typeof BUTTON_SIZE_STYLE;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  className,
  isLoading,
  variant = 'primary',
  asDiv: asChild,
  size = 'lg',
  icon,
  ...props
}: ButtonProps) {
  const variantStyle = BUTTON_VARIANT_STYLE[variant];

  const Component = asChild ? 'div' : 'button';
  return (
    <Component
      className={`button w-full font-bold ${className} flex items-stretch shadow-sm ${variantStyle} ${BUTTON_SIZE_STYLE[size]}`}
      {...props}
    >
      <div className='flex flex-1 items-center justify-center gap-1'>
        {isLoading ? (
          <LoadingIcon alt='loading' className='h-6 w-6 animate-spin' style={{ animationDuration: '3s' }} />
        ) : null}
        {children}
        {icon}
      </div>
    </Component>
  );
}
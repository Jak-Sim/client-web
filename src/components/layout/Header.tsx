import { ComponentType, ReactNode, SVGProps } from 'react';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import { cn } from '@/lib/shadcn/utils';

const HeaderBoldText = ({ bold, text, className }: { bold: string; text?: string; className?: string }) => {
  return (
    <h1 className={'text-2xl'}>
      <span className={cn('font-semibold', className)}>{bold}</span> <span className={'font-normal'}>{text}</span>
    </h1>
  );
};

const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className='absolute left-1/2 -translate-x-1/2 transform text-center text-lg font-semibold'>{children}</div>
  );
};

const HeaderGrayText = ({ children, disabled }: { children: ReactNode; disabled?: boolean }) => {
  return (
    <div
      className={cn(
        'cursor-pointer text-sm font-medium text-v1-text-primary-400',
        disabled && 'text-v1-text-primary-200',
      )}
    >
      {children}
    </div>
  );
};

const HeaderIconWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={'flex items-center gap-4'}>{children}</div>;
};

const HeaderIcon = ({
  Icon,
  onClick,
  className,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button type={'button'} className={'flex h-6 w-6 items-center justify-center'} onClick={onClick}>
      <Icon className={cn(className)} />
    </button>
  );
};

const HeaderItem = ({ children }: { children?: ReactNode }) => {
  return <div className={'flex items-center justify-center'}>{children}</div>;
};

const HeaderCenter = ({ children }: { children: ReactNode }) => {
  return <h1 className='absolute left-1/2 -translate-x-1/2 transform text-center text-lg font-semibold truncate max-w-[40%] sm:max-w-[200px]'>{children}</h1>;
};

const Header = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        'relative flex h-[56px] items-center justify-between px-6 py-4 font-bold text-v1-text-primary-500',
        className,
      )}
    >
      {children}
    </div>
  );
};

Header.Center = HeaderCenter;
Header.Item = HeaderItem;

Header.BoldText = HeaderBoldText;
Header.Title = HeaderTitle;
Header.GrayText = HeaderGrayText;

Header.IconWrapper = HeaderIconWrapper;
Header.Icon = HeaderIcon;
Header.BackButton = HeaderBackButton;

export default Header;
